var pageNum;
pageNum = 1;

window.interact = function(page, actions, verbose, sign) {
  var header;
  
  if (verbose == null) {
    verbose = true;
  }
  
  header = function(status) {
    if (!verbose) {
      return;
    }
    console.log(('Page ' + pageNum + ': ' + status + '. ') + page.evaluate(function() {
      return document.location.href + ' - ' + document.title;
    }));
    return pageNum++;
  };
  
  if (Array.isArray(actions)) {
    page.onLoadFinished = function(status) {
      header(status);
      interact(page, actions.slice(1), verbose, sign);
      
      if (actions.length == 2) {
          sign.isFinished = true;
      }
    };
    
    actions[0](page);
  }/* else { // object style
    page.onLoadFinished = function(status) {
      header(status);
      return actions.next(page, actions);
    };
    return actions.next(page, actions);
  }*/
};
