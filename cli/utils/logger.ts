import winston from 'winston';
import path from 'path';
import fs from 'fs';

const logDir = path.join(__dirname, '..', 'logs');
if (!fs.existsSync(logDir)) {
  fs.mkdirSync(logDir);
}

// const customFormat = winston.format.printf(({ level, message, label }) => {
//   return `[${label}] ${level}: ${message}`;
// });

const logger = winston.createLogger({
  level: 'info',
  transports: [
    new winston.transports.File({
      filename: path.join(logDir, 'import.log'),
      format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.json()
      ),
      options: { flags: 'w' }
    })
  ]
});

export { logger };

export function getLogger(label: string) {
  return logger.child({ label });
}
