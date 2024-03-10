module.exports = {
    setupFilesAfterEnv: ['@testing-library/jest-dom'],
    testEnvironment: 'jsdom',
    transform: {
        '^.+\\.jsx?$': 'babel-jest',
    },
};