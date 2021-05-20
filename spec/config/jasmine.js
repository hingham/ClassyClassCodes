const Jasmine = require("jasmine");
const SpecReporter = require("jasmine-spec-reporter").SpecReporter;

let jasmine = new Jasmine();

jasmine.loadConfig({
  spec_dir: "dist",
  spec_files: ["**/*[sS]pec.js"],
  helpers: ["helpers/**/*.js"],
  stopSpecOnExpectationFailure: false,
  random: false,
});

jasmine.env.addReporter(
  new SpecReporter({
    spec: {
      displayPending: true,
    },
  })
);

jasmine.execute();
