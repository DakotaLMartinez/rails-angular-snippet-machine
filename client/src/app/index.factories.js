(function() {
'use strict';

  angular
    .module('dlmSnippetMachine')
    .factory('Snippet', Snippet);

  Snippet.$inject = ['railsResourceFactory'];
  function Snippet(railsResourceFactory) {
    var service = {
      getSnippets:getSnippets
    };
    
    return service;

    ////////////////
    function getSnippets() { 
      return railsResourceFactory({
        url: '/api/snippets', 
        name: 'snippet'
      }).query();
    }
  }
})();