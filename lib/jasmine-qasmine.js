jasmine.QasmineConsoleReporter = function(doc) {
    this.tmpSpec = null;
    this.verbose = false;
    this.allSpecs = [];
    this.succeededSpecs = [];
    this.failedSpecs = [];
    this.startedAt = new Date();

    this.output = "";

    this.qasmine = {};
    this.qasmine.log = function (text) {
	    console.log(text);
    };
    
    this.qasmine.exitConditionally = function (code) {
	    //console.log('Should exit with code : ' + code);
	    phantom.exit(code);
    };
};


jasmine.QasmineConsoleReporter.prototype.includeJs = function (jsFile) {
    var script  = document.createElement('script');
    //add dayOfMonth to disable caching
    script.src  = jsFile
    script.type = 'text/javascript';
    script.defer = true;
    document.getElementsByTagName('head').item(0).appendChild(script);
};

jasmine.QasmineConsoleReporter.prototype.setQasmine = function (qasmine) {
    this.qasmine = qasmine;
}


jasmine.QasmineConsoleReporter.prototype.setVerbose = function (verbose) {
    this.verbose = verbose;
};


jasmine.QasmineConsoleReporter.prototype.reportRunnerStarting = function(runner) {
    //console.log('runner', runner);
    /*
    var suites = runner.suites();
    for (var i = 0; i < suites.length; i++) {
        var suite = suites[i];
        //console.log('parent suite', suite.parentSuite );
        //console.log('suite info' , suite);
        this.startedAt = new Date();
    }
    */
};

jasmine.QasmineConsoleReporter.prototype.reportRunnerResults = function(runner) {

    //console.log(this.allSpecs);
    var totalSpecCount = this.allSpecs.length;
    var failedSpecCount = this.failedSpecs.length;
    var executionTime = (new Date().getTime()) - this.startedAt.getTime();

    this.output = totalSpecCount  + " Specs, " + failedSpecCount  + " failures in " + executionTime  + "ms";

    //console.log(this.allSpecs);

    if (this.verbose) {
        for(var i = 0; i < totalSpecCount; i++) {
            var spec = this.allSpecs[i];
            var successText = spec.success ? "OK" : "FAIL";
            var testResult = " (" + spec.total + "/" + spec.passed + ")"; 
            this.output += "\n" + successText + " | " + spec.name + testResult;
	    
            for(var x = 0, xx = spec.traceMessages.length; x < xx; x++) {
                this.output += "\n   >> " + spec.traceMessages[x];
            }
        }
    }
    
    //console.log(this.output);
    
    if (false) {
        var specs = runner.specs();
        //console.log(jasmine.pp(specs));
        for(var i = 0; i < specs.length; i++) {
            var spec = specs[i];
            var results = spec.results();
            console.log(jasmine.pp(spec));
            console.log(jasmine.pp(results));
            for(var j = 0; j < results.length; j++) {
                var result = results[j];
                var items = result.getItems();
                console.log(jasmine.pp(result));
                console.log(jasmine.pp(items));
                for(var k = 0; k < items.length; k++) {
                    var item = items[k];
                    console.log(jasmine.pp(item));
                    console.log(jasmine.pp(item.toString()));
                }
            }
        }
    }
    
    this.qasmine.log(this.output);
    this.qasmine.exitConditionally(failedSpecCount);
    

    //console.log(this.output);
    //return this.output;

    /*
    console.info('report runner results');
    var results = runner.results();
    
    console.log(results);
    var rootSpecs = [];
    var specs = runner.specs();
    console.info("osman", specs);

    for(var i in specs) {
        var spec = specs[i];

        console.log(spec);

        if (spec.suite && spec.suite.parentSuite) {

            continue;
        }

        rootSpecs[rootSpecs.length] = spec;
    }

    console.log('specs' , rootSpecs);
    this.ended = new Date();
    */
};

jasmine.QasmineConsoleReporter.prototype.reportSuiteResults = function(suite) {
    //console.info('report suite results');
    //var results = suite.results();
    //console.log(results, 'result status : ', results.passed());
};

jasmine.QasmineConsoleReporter.prototype.reportSpecStarting = function(spec) {
    //this.tmpSpec = spec.suite.description + ' ' + spec.description;
    this.tmpSpec = spec.getFullName();
    //console.info('running ' + this.tmpSpec + '...');
};

jasmine.QasmineConsoleReporter.prototype.reportSpecResults = function(spec) {
    //console.info('report spec results');
    var results = spec.results();

    var total = results.totalCount;
    var passed = results.passedCount;
    var failedCount = results.failedCount;
    
    var items = results.getItems();
    
    var traceMessages = [];
    
    for(var i in items) {
	var item = items[i];
	if(item.trace.message) {
	  traceMessages.push(item.trace.name + " : " + item.trace.message);
	}
    }
       
    var spec ={ name : this.tmpSpec,
                total : total,
                passed : passed,
                traceMessages : traceMessages,
                success : (failedCount == 0)
             };

    this.allSpecs.push(spec);


    if (failedCount > 0 ) {
        this.failedSpecs.push(spec);
    }
    else {
        this.succeededSpecs.push(spec);
    }

    /*
    //console.log(results, 'status : ' + results.passed());

    var items = results.getItems();
    for(var i in items) {
        var result = items[i];
        if (result.trace.stack) {
            //console.log('stack', result.trace.stack);
        }

    }
    */
};

jasmine.QasmineConsoleReporter.prototype.log = function(text) {
    //this.logger(text);
};

jasmine.QasmineConsoleReporter.prototype.getLocation = function() {
};

jasmine.QasmineConsoleReporter.prototype.specFilter = function(spec) {
};
