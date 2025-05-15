import { NestFactory } from '@nestjs/core';
import { ApiInterceptor, HttpExceptionFilter, swaggerConfiguration } from '@common/config';
import { ValidationPipe, Logger, BadRequestException } from '@nestjs/common';
import { configManager } from '@common/config';
import { ConfigKey } from '@common/config/enum';
import { AppModule } from './feature';
import helmet from 'helmet';
import { rateLimit } from 'express-rate-limit';
import { json } from 'express';
import * as express from 'express';

const bootstrap = async () => {
  try {
    const app = await NestFactory.create(AppModule, {
      logger: ['error', 'warn', 'debug', 'log', 'verbose'], // Activer tous les niveaux de log
      rawBody: true // Ajouter cette ligne
    });
    
    // Configuration CORS plus permissive pour le développement
    app.enableCors({
      origin: '*', // Permettre toutes les origines
      methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
      allowedHeaders: ['Content-Type', 'Accept', 'Authorization', 'stripe-signature'],
      credentials: true,
      preflightContinue: false,
      optionsSuccessStatus: 204
    });

    // Désactiver temporairement helmet pour le développement
    // app.use(helmet());

    // Limite le nombre de requêtes par IP
    app.use(rateLimit({
      windowMs: 15 * 60 * 1000, // 15 minute window
      max: 100 // Maximum 100 requests per window
    }));

    // Configuration pour Stripe webhooks - AVANT les autres middlewares
    app.use(
      '/api/payments/webhook',
      express.raw({ type: 'application/json' }),
      (req, res, next) => {
        if (req.body) {
          req.rawBody = req.body;
        }
        next();
      }
    );

    // Configuration globale pour les autres routes - APRÈS le middleware webhook
    app.use(express.json());

    app.useGlobalInterceptors(new ApiInterceptor());
    app.useGlobalFilters(new HttpExceptionFilter());
    app.setGlobalPrefix('api');
    app.useGlobalPipes(
      new ValidationPipe({
        exceptionFactory: (validationErrors = []) => {
          const messages = validationErrors.map(error => error.toString()).join(', ');
          throw new BadRequestException(messages);
        }
      })
    );

    swaggerConfiguration.config(app);

    const port = 2024; // Port fixé à 2024
    const logger: Logger = new Logger('Principal');
    
    try {
      // Modifier pour écouter sur toutes les interfaces
      await app.listen(port, '0.0.0.0');
      logger.log(`Serveur démarré sur le port ${port}`);
    } catch (error) {
      logger.error(`Échec du démarrage du serveur: ${error.message}`);
      throw error;
    }
  } catch (error) {
    console.error('Échec du démarrage de l\'application');
    console.error(error.message);
    // Ajout de logs détaillés pour les erreurs de base de données
    if (error.message.includes('1600 colonnes')) {
      console.error('Erreur de base de données: Le nombre maximum de colonnes (1600) a été dépassé. Veuillez vérifier vos définitions d\'entités et réduire le nombre de colonnes.');
    }
    process.exit(1);
  }
};

bootstrap();
