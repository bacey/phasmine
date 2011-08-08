
if (phantom.args.length == 0) {
    var help = 
        "Usage: phantomjs phasmine.js [reporter] [SPECFILE]...\n" +
        "\n" +
        "Reporter is one of:\n" +
        "\t-cr\t\tConsoleReporter (outputs to the console) (default)" +
        "\t-tr\t\tTrivialReporter (outputs to ./SpecRunner.html)" +
        "\t-qr\t\tQasmineReporter (outputs to the console)";
    
    console.log(help);
    phantom.exit(-1);
}

phantom.injectJs('lib/jasmine/jasmine.js');
phantom.injectJs('lib/interact.js');

var mode = 'ConsoleReporter';
var verboseInteract = true;
var specFiles = [];
var reporter;
var jasmineEnv = jasmine.getEnv();
var out = function(message) { console.log(message); };


phantom.args.forEach(function (arg, i) {
    if (arg === '-cr') {
        mode = 'ConsoleReporter';
    } else if (arg === '-tr') {
        mode = 'TrivialReporter';
    } else if (arg === '-qr') {
        mode = 'QasmineReporter';
    } else { // arg is a specFile
        specFiles.push(arg);
    }
});

if (mode == 'QasmineReporter') {
    verboseInteract = true;
    phantom.injectJs('lib/jasmine-qasmine.js');
    
    var qasmineConsoleReporter = new jasmine.QasmineReporter();
    qasmineConsoleReporter.verbose = true;
    reporter = qasmineConsoleReporter;
} else if (mode == 'TrivialReporter') {
    verboseInteract = false;
    phantom.injectJs('lib/jasmine-trivialreporter.js');
    
    var trivialConsoleReporter = new jasmine.TrivialReporter();
    reporter = trivialConsoleReporter;
    
    jasmineEnv.updateInterval = 1000;
    
    jasmineEnv.specFilter = function(spec) {
        return trivialConsoleReporter.specFilter(spec);
    };
} else if (mode == 'ConsoleReporter') {
    verboseInteract = false;
    phantom.injectJs('lib/ConsoleReporter.js');
    var doneCallback = function() { phantom.exit(); };
    var consoleReporter = new jasmine.ConsoleReporter(out, doneCallback, true);
    reporter = consoleReporter;
}


var page = new WebPage();
page.settings.loadImages = false;
page.settings.loadPlugins = false;
page.onConsoleMessage = function(message) {
  if (message.indexOf('Unsafe JavaScript') === 0) {
    return;
  }
  return out(message);
};

var runActions = function(actions, spec) {
    var sign = { isFinished: false };
    window.interact(page, actions, verboseInteract, sign);
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

