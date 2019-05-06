module.exports = {
  apps: [
    {
      name: 'Crypto API',
      script: 'bin/www',
      watch: true,
      ignore_watch: ["public/uploads/*","node_modules/*",".git/*"]
    }
  ],
};