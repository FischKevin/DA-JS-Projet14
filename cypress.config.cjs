const { defineConfig } = require('cypress');

module.exports = defineConfig({
    e2e: {
        baseUrl: 'http://localhost:5173',
        specPattern: 'cypress/e2e/**/*.cy.{js,jsx,ts,tsx}',
    },

    projectId: '76gu9z',

    component: {
        devServer: {
            framework: 'react',
            bundler: 'vite',
        },
    },
});
