describe('Phasmine', function() {

  it('follows redirects', function() {
          
    var actions = [
      function(page) {
        page.open('http://localhost:3000/loginform');
      }, 
      
      function(page) {
        page.evaluate(function() {
          // jQuery is included in the requested page, so I can use it now.
          // Otherwise try page.includeJs().
          $('input[name="username"]').val('user');
          $('input[name="password"]').val('pass');
          $('input[type="submit"]').click();
        });
      },
      
      function(page) {
        var result = page.evaluate(function() {
          return $('body').text();
        });
        expect(result).toContain('OK');
      }
    ];
    
    runActions(actions, this);

    /*
    runs(function () {
      // other expectations
      expect(1+1).toEqual(2);
    });
    */

  });

});
