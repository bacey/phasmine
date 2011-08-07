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
