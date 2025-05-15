import { Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { configManager } from '@common/config';
import { ConfigKey } from '@common/config/enum';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '@model/User/entities/user.entity';
import { Credential } from '../data/entity/credential.entity';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  private readonly logger = new Logger(JwtStrategy.name);

  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Credential)
    private readonly credentialRepository: Repository<Credential>
  ) {
    const secret = configManager.getValue(ConfigKey.JWT_TOKEN_SECRET);
    // Log complet pour debug
    console.log('--- JWT STRATEGY INIT ---');
    console.log('SECRET UTILISÉ POUR JWT:', secret, 'LENGTH:', secret?.length);
    if (!secret) {
      console.error('ERREUR: Le secret JWT est undefined ou vide !');
    }
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      // Ce secret doit être le même que celui utilisé pour signer l'access token
      secretOrKey: secret,
    });
    
    // Log de la configuration au démarrage
    this.logger.debug('JWT Strategy initialized with secret:', 
      secret?.substring(0, 10) + '...');
  }

  async validate(payload: any) {
    try {
      this.logger.debug('🔍 Validation du token JWT avec payload:', payload);
      // Log du payload reçu
      console.log('PAYLOAD REÇU DANS validate:', payload);
      // 1. Vérification des credentials
      const credential = await this.credentialRepository.findOne({
        where: { credential_id: payload.sub }
      });
      
      if (!credential) {
        this.logger.error('❌ Credentials non trouvés pour ID:', payload.sub);
        console.error('❌ Credentials non trouvés pour ID:', payload.sub);
        throw new UnauthorizedException('Invalid credentials');
      }

      // 2. Vérification de l'utilisateur
      const user = await this.userRepository.findOne({
        where: { email: credential.mail },
        select: ['id', 'type_user', 'email'] // Ajout de email pour le logging
      });
      
      if (!user) {
        this.logger.error('❌ Utilisateur non trouvé pour email:', credential.mail);
        console.error('❌ Utilisateur non trouvé pour email:', credential.mail);
        throw new UnauthorizedException('User not found');
      }

      // 3. Construction de l'objet utilisateur retourné
      const userData = { 
        userId: user.id,
        role: user.type_user,
        email: user.email,
        username: credential.username // Ajout du username pour le logging
      };

      this.logger.debug('✅ Token validé pour utilisateur:', userData);
      console.log('✅ Token validé pour utilisateur:', userData);

      return userData;
      
    } catch (error) {
      this.logger.error('❌ Erreur lors de la validation du token:', error.message);
      console.error('❌ Erreur lors de la validation du token:', error.message);
      throw new UnauthorizedException('Token validation failed');
    }
  }
} 