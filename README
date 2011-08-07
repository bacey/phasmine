

# phasmine

Write [Jasmine](http://pivotal.github.com/jasmine/) specs and check the webpages with [PhantomJS](http://code.google.com/p/phantomjs/). Similar to [capybara-webkit](https://github.com/thoughtbot/capybara-webkit).

## Install

You only need `phasmine.js` and the `lib` directory from this git repo.

## Usage

Write your Jasmine spec and place it into a `.js` file (for example `JQuerySiteSpec.js`).

    describe('Phasmine', function() {
    
      it('can search the jQuery site', function() {
        var actions = [
          function(page) {
            page.open('http://docs.jquery.com/Main_Page');
          }, 
          
          function(page) {
            page.evaluate(function() {
              $('input[name="search"]').val('bind');
              $('button[name="go"]').click();
            });
          },
          
          function(page) {
            var result = page.evaluate(function() {
              return $('body').text();
            });
            expect(result).toContain('Search results');
          }
        ];
        
        runActions(actions, this);
      });
    });

Run it with `phantomjs phasmine.js JQuerySiteSpec.js`
    
The output is in `SpecRunner.html`.

## Acknowledgements

* [PhantomJS](http://code.google.com/p/phantomjs/)
* [Jasmine](http://pivotal.github.com/jasmine/)
* [Qasmine](https://github.com/tart/qasmine/)
* Brian Theado and Peter Lyons for their [interact.coffee](https://groups.google.com/d/topic/phantomjs/20z8N8rwITw/discussion) script

