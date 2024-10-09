module.exports = {
  testTimeout: 20000,
  collectCoverage: true,
  coverageReporters: ['lcov', 'text-summary'],  // 'lcov' pour SonarCloud, 'text-summary' pour les rapports locaux
  reporters: [
    'default',
    [
      'jest-sonar-reporter',
      {
        outputDirectory: 'coverage', // le dossier où SonarCloud ira chercher le rapport
        outputName: 'sonar-report.xml', // nom du fichier rapport
      },
    ],
  ],
};
