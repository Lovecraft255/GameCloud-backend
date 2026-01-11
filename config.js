const jwtSecret = process.env.JWT_SECRET || 'Miku';
const jwtExpiration = process.env.JWT_EXPIRATION || '15m';
const jwtRefreshExpiration = process.env.JWT_REFRESH_EXPIRATION || '7d';

module.exports = {
  jwtSecret,
  jwtExpiration,
  jwtRefreshExpiration,
};
