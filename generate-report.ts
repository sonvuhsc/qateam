import reporter from 'cucumber-html-reporter';

const options = {
  theme: 'bootstrap', // <- this is valid, just needs to be narrowed
  jsonFile: 'reports/report.json',
  output: 'reports/report.html',
  reportSuiteAsScenarios: true,
  launchReport: true,
} as any;

reporter.generate(options);
