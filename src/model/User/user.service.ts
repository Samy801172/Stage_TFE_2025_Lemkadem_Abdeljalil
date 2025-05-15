import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserRole } from './entities/user-role.enum';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>
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

  async update(id: string, updateUserDto: UpdateUserDto): Promise<User> {
    const user = await this.userRepository.findOne({ where: { id } });
    if (!user) throw new NotFoundException('User not found');
    Object.assign(user, updateUserDto);
    return await this.userRepository.save(user);
  }

  async remove(id: string): Promise<void> {
    const user = await this.userRepository.findOne({ 
      where: { id } 
    });
    
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }

    if (!user.isActive) {
      throw new Error('Utilisateur déjà désactivé');
    }

    // Soft delete : on marque l'utilisateur comme inactif
    user.isActive = false;
    await this.userRepository.save(user);

    // Désactiver aussi le credential associé (active = false)
    // On suppose que le repository Credential est accessible via le SecurityService ou à injecter ici
    // Pour l'instant, on utilise une approche dynamique (import dynamique)
    const { getConnection } = require('typeorm');
    const connection = getConnection();
    const credentialRepository = connection.getRepository('Credential');
    const credential = await credentialRepository.findOne({ where: { mail: user.email } });
    if (credential) {
      credential.active = false;
      await credentialRepository.save(credential);
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
    const user = await this.userRepository.findOne({ where: { id } });

    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }

    if (user.isActive) {
      throw new Error('Utilisateur déjà actif');
    }

    // Réactiver l'utilisateur
    user.isActive = true;
    await this.userRepository.save(user);

    // Réactiver aussi le credential associé
    const { getConnection } = require('typeorm');
    const connection = getConnection();
    const credentialRepository = connection.getRepository('Credential');
    const credential = await credentialRepository.findOne({ where: { mail: user.email } });
    if (credential) {
      credential.active = true;
      await credentialRepository.save(credential);
    }
  }
} 