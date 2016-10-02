angular
  .module('dlmSnippetMachine')
  .filter('visualStudioCode', visualStudioCode)
  
  function visualStudioCode() {
    return function(input) {
      if (input !== "") {
        return input;
      } else {
        throw new Error('visualStudioCodeFilter must be given a string of code as an input');
      }
    };
  };