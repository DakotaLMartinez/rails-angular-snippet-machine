angular
  .module('dlmSnippetMachine')
  .filter('visualStudioCode', visualStudioCode)
  
  function visualStudioCode() {
    return function(input) {
      if (angular.isDefined(input)) {
        var array = input.split('\n') || [];
        for (var i = 0 ; i < array.length ; i++) {
          var tmp = array[i].replace(/\"/g,'\\"');
          array[i] = '    "' + tmp + '"';
        }
        var output = array.filter(function(x){
          return (x !== (undefined || ""));
        });
        return output.join(',\n');
      } else {
        throw new Error('visualStudioCodeFilter must be given a string of code as an input');
      }
    };
  }