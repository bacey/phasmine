
if (phantom.args.length == 0) {
    var help = 
        "Usage: phantomjs phasmine.js [reporter] [SPECFILE]...\n" +
        "\n" +
        "Reporter is one of:\n" +
        "\t-qcr\t\tQasmineConsoleReporter (outputs to the console)\n" +
        "\t-tcr\t\tTrivialConsoleReporter (outputs to ./SpecRunner.html) (default)";
    
    console.log(help);
    phantom.exit(-1);
}

phantom.injectJs("lib/jasmine/jasmine.js");
phantom.injectJs("lib/interact.js");

var mode = 'TrivialConsoleReporter';
var verbose = false;
var specFiles = [];
var reporter;
var jasmineEnv = jasmine.getEnv();


phantom.args.forEach(function (arg, i) {
    if (arg === '-qcr') {
        mode = 'QasmineConsoleReporter';
    } else if (arg === '-tcr') {
        mode = 'TrivialConsoleReporter';
    } else { // arg is a specFile
        specFiles.push(arg);
    }
});


if (mode == 'QasmineConsoleReporter') {
    verbose = true;
    phantom.injectJs("lib/jasmine-qasmine.js");
    
    var qasmineConsoleReporter = new jasmine.QasmineConsoleReporter();
    qasmineConsoleReporter.verbose = true;
    reporter = qasmineConsoleReporter;
} else { // (mode == 'TrivialConsoleReporter') {
    verbose = false;
    phantom.injectJs("lib/jasmine-trivialconsole.js");
    
    var trivialConsoleReporter = new jasmine.TrivialConsoleReporter();
    reporter = trivialConsoleReporter;
    
    jasmineEnv.updateInterval = 1000;
    
    jasmineEnv.specFilter = function(spec) {
        return trivialConsoleReporter.specFilter(spec);
    };
}


var out = function(message) { console.log(message); };

var page = new WebPage();
page.settings.loadImages = false;
page.settings.loadPlugins = false;
page.onConsoleMessage = function(message) {
  if (message.indexOf("Unsafe JavaScript") === 0) {
    return;
  }
  return out(message);
};

var runActions = function(actions, spec) {
    var sign = { isFinished: false };
    window.interact(page, actions, verbose, sign);
    spec.waitsFor(function() { 
        return sign.isFinished; 
    }, 'Page never loaded!', 15000);
};

// Specfiles are loaded here, so that they can
// access the "out", "page", and "runActions" 
// variables defined above.
specFiles.forEach(function (specFile, i) {
    phantom.injectJs(specFile); 
});

jasmineEnv.addReporter(reporter);
jasmineEnv.execute();

