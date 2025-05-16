import * as dotenv from 'dotenv';
import * as fs from 'fs';

class ConfigManager {
  private readonly envConfig: { [key: string]: string };

  constructor() {
    const isDevelopmentEnv = process.env.NODE_ENV !== 'production';

    if (isDevelopmentEnv) {
      const envFilePath = __dirname + '/../../../.env';
      const existsPath = fs.existsSync(envFilePath);

      if (!existsPath) {
        console.log('.env file does not exist');
        process.exit(0);
      }

      this.envConfig = dotenv.parse(fs.readFileSync(envFilePath));
    } else {
      // En production, utiliser les variables d'environnement du système
      this.envConfig = process.env;
    }
  }

  /**
   * Get env variable by key
   */
  getValue(key: string, throwOnMissing: boolean = true): string {
    const value = this.envConfig[key] || process.env[key];

    if (!value && throwOnMissing) {
      // En production avec MongoDB, certaines variables TypeORM ne sont pas nécessaires
      if (process.env.NODE_ENV === 'production' && 
          ['DB_HOST', 'DB_PORT', 'DB_USER', 'DB_PASSWORD', 'DB_DATABASE'].includes(key)) {
        // Pour les variables PostgreSQL en mode MongoDB, retourner une valeur par défaut
        return 'not_needed_in_mongodb_mode';
      }
      
      throw new Error(`config error - missing env.${key}`);
    }

    return value;
  }

  /**
   * Ensure all needed variables are set
   * @param {Array} envs Array of variables to check
   */
  ensureValues(keys: string[]) {
    keys.forEach(k => this.getValue(k));
    return this;
  }

  /**
   * Read port from env
   */
  getPort() {
    return this.getValue('PORT', true);
  }

  /**
   * Read MongoDB
   */
  getMongoConfig() {
    return {
      host: this.getValue('MONGO_HOST'),
      port: parseInt(this.getValue('MONGO_PORT'), 10),
      database: this.getValue('MONGO_DATABASE'),
      user: this.getValue('MONGO_USER'),
      password: this.getValue('MONGO_PASSWORD'),
    };
  }

  /**
   * Get JWT secret
   */
  getJwtSecret() {
    return this.getValue('JWT_TOKEN_SECRET');
  }
}

export const configManager = new ConfigManager(); 