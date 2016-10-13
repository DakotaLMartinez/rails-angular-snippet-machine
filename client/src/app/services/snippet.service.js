(function() {
'use strict';

  angular
    .module('dlmSnippetMachine')
    .service('Snippet', Snippet);

  Snippet.$inject = ['$http'];
  function Snippet($http) {
    this.getSnippets = getSnippets;
    this.getSnippet = getSnippet;
    this.createSnippet = createSnippet;
    this.updateSnippet = updateSnippet;

    ////////////////

    function getSnippets() { 
      return $http
              .get('/api/snippets')
              .then(handleGetSnippets);
              
      function handleGetSnippets(res){
        return res.data;
      }
    }

    function getSnippet(id) {
      return $http
              .get('/api/snippets/' + id)
              .then(handleGetSnippet);
              
      function handleGetSnippet(res){
        return res.data;
      }
    }

    function createSnippet(data) {
      return $http
              .post('/api/snippets', data)
              .then(handleCreateSnippet);
              
      function handleCreateSnippet(res){
        return res.data;
      }
    }

    function updateSnippet(id, data){
      var url = '/api/snippets/' + id;
      return $http
              .put(url, data)
              .then(handleUpdateSnippet);
              
      function handleUpdateSnippet(res){
        return res.data;
      }
    }

  }
})();