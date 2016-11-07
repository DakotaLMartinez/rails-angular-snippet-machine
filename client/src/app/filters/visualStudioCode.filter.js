(function() {
'use strict';

  angular
    .module('dlmSnippetMachine')
    .filter('visualStudioCode', visualStudioCode);

  function visualStudioCode() {
    return visualStudioCodeFilter;

    ////////////////

    function visualStudioCodeFilter(snippet) {
      var snipObj = snippet || {name: "", trigger: "", body: "", description: ""};
      var result = '"' + snipObj.name + "\": {\n";
      result += "  \"prefix\": {" + ' "' + snipObj.trigger + "\",\n";
      result += "  \"body\": [\n";
      result += formatSnippetBody(snipObj.body) + "\n";
      result += "  ],\n";
      result += "  \"description\": \"" + snipObj.description + "\"\n";
      result += "}";
      return result;
    }

    function formatSnippetBody(snippetBody) {
      if (snippetBody || snippetBody === "") {
        var array = snippetBody.split('\n') || [];
        for (var i = 0 ; i < array.length ; i++) {
          var tmp = array[i].replace(/\"/g,'\\"');
          array[i] = '    "' + tmp + '"';
        }
        var output = array.filter(function(x){
          return (x !== (undefined || ""));
        });
        return output.join(',\n');
      } else {
        return "formatSnippetBody must be given the snippetBody as an argument";
      }
    }
  }
})();