import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserRole } from './entities/user-role.enum';
import { MailService } from '../../common/services/mail.service';
import { Credential } from '../../feature/security/data/entity/credential.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Credential)
    private readonly credentialRepository: Repository<Credential>,
    private readonly mailService: MailService
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const user = this.userRepository.create(createUserDto);
    return await this.userRepository.save(user);
  }

  /**
   * Retourne tous les membres, qu'ils soient actifs ou inactifs.
   * Le frontend pourra ainsi afficher le statut de chaque membre.
   */
  async findAll(): Promise<User[]> {
    // On enlève le filtre sur isActive pour tout retourner
    return await this.userRepository.find({
      order: {
        created_at: 'DESC'
      }
    });
  }

  async findOne(id: string): Promise<any> {
    const user = await this.userRepository.findOne({ 
      where: { id, isActive: true } 
    });
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    return {
      id: user.id,
      nom: user.nom,
      prenom: user.prenom,
      email: user.email,
      entreprise: user.entreprise,
      type_user: user.type_user,
      telephone: user.telephone,
      secteur: user.secteur,
      bio: user.bio,
      photo: user.photo,
      linkedin: user.linkedin,
      isActive: user.isActive,
      created_at: user.created_at,
      updated_at: user.updated_at
    };
  }

  async findByEmail(email: string): Promise<User | undefined> {
    return await this.userRepository.findOne({ 
      where: { email } 
    });
  }

  async put(id: string, updateUserDto: UpdateUserDto): Promise<User> {
    const user = await this.userRepository.findOne({ where: { id } });
    if (!user) throw new NotFoundException('User not found');
    Object.assign(user, updateUserDto);
    await this.userRepository.save(user);

    // After saving the updated user, send a confirmation email
    await this.mailService.sendMail(
      user.email,
      'Mise à jour du profil',
      'Votre profil a été mis à jour avec succès.'
    );
    console.log('[UserService] Mail de confirmation de mise à jour envoyé à:', user.email);

    return user;
  }

  async remove(id: string): Promise<void> {
    const user = await this.userRepository.findOne({ where: { id } });
    console.log('[UserService] Recherche du user à désactiver:', user);

    if (!user) {
      console.log('[UserService] User non trouvé');
      throw new NotFoundException(`User with ID ${id} not found`);
    }

    if (!user.isActive) {
      console.log('[UserService] User déjà désactivé');
      throw new Error('Utilisateur déjà désactivé');
    }

    // Soft delete : on marque l'utilisateur comme inactif
    user.isActive = false;
    await this.userRepository.save(user);
    console.log('[UserService] User désactivé, envoi du mail à:', user.email);

    // Envoi d'un email de notification de désactivation
    await this.mailService.sendMail(
      user.email,
      'Compte désactivé',
      'Votre compte a été désactivé par un administrateur. Contactez-nous si besoin.'
    );
    console.log('[UserService] Mail de désactivation envoyé à:', user.email);

    // Désactiver aussi le credential associé (active = false)
    const credential = await this.credentialRepository.findOne({ where: { mail: user.email } });
    if (credential) {
      credential.active = false;
      await this.credentialRepository.save(credential);
      console.log('[UserService] Credential désactivé pour:', user.email);
    }
  }

  async findByUsername(username: string): Promise<User> {
    const user = await this.userRepository.findOne({
      where: { email: username },
      select: ['id', 'email', 'password', 'type_user']
    });
    console.log('User trouvé dans DB:', user);
    return user;
  }

  async restore(id: string): Promise<void> {
    console.log('[UserService] Tentative de restauration pour ID:', id);
    const user = await this.userRepository.findOne({ where: { id } });

    if (!user) {
      console.error('[UserService] Utilisateur non trouvé');
      throw new NotFoundException(`User with ID ${id} not found`);
    }

    if (user.isActive) {
      console.error('[UserService] Utilisateur déjà actif');
      throw new Error('Utilisateur déjà actif');
    }

    // Réactiver l'utilisateur
    user.isActive = true;
    await this.userRepository.save(user);
    console.log('[UserService] Utilisateur réactivé:', user.email);

    // Réactiver aussi le credential associé
    const credential = await this.credentialRepository.findOne({ where: { mail: user.email } });
    if (credential) {
      credential.active = true;
      await this.credentialRepository.save(credential);
      console.log('[UserService] Credential réactivé pour:', user.email);
    }

    try {
      // Envoi d'un email de notification de restauration
      await this.mailService.sendMail(
        user.email,
        'Compte restauré',
        'Votre compte a été restauré par un administrateur. Vous pouvez maintenant vous reconnecter.'
      );
      console.log('[UserService] Mail de restauration envoyé à:', user.email);
    } catch (error) {
      console.error('Erreur lors de l\'envoi de l\'email de restauration:', error);
    }
  }

  /**
   * Récupère tous les contacts potentiels pour un utilisateur
   * - Exclut l'utilisateur lui-même
   * - Ne retourne que les utilisateurs actifs
   * - Limite les champs retournés aux informations essentielles
   *
   * @param userId ID de l'utilisateur courant
   * @returns Liste des contacts potentiels
   */
  async findContacts(userId: string) {
    // Importer Not depuis typeorm si ce n'est pas déjà fait
    const { Not } = require('typeorm');
    
    return this.userRepository.find({
      where: { 
        isActive: true, 
        id: Not(userId) 
      },
      select: ['id', 'nom', 'prenom', 'email']
    });
  }
} 