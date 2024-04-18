module.exports = process.env.CI
    ? {
          '**/*.(js|ts|json|yaml)': 'npm run lint',
      }
    : {
          '**/*.(js|ts|json|yaml)': 'npm run lint:fix',
      }
