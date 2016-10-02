(function() {
'use strict';

  angular
    .module('dlmSnippetMachine')
    .service('Snippet', Snippet);

  Snippet.$inject = ['$http'];
  function Snippet($http) {
    this.getSnippets = getSnippets;
    this.getSnippet = getSnippet;

    ////////////////

    function getSnippets() { 
      return $http.get('/api/snippets').then(function(res){
        return res.data;
      });
    }

    function getSnippet(id) {
      return $http.get('/api/snippets/' + id).then(function(res){
        return res.data;
      });
    }

  }
})();