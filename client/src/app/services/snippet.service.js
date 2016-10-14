(function() {
'use strict';

  angular
    .module('dlmSnippetMachine')
    .service('Snippet', Snippet);

  Snippet.$inject = ['$http', 'getApiUrl'];
  function Snippet($http, getApiUrl) {
    this.getSnippets = getSnippets;
    this.getSnippet = getSnippet;
    this.createSnippet = createSnippet;
    this.updateSnippet = updateSnippet;
    var url = getApiUrl.getUrl();

    ////////////////

    function getSnippets() { 
      return $http
              .get(url + '/snippets')
              .then(handleGetSnippets);
              
      function handleGetSnippets(res){
        return res.data;
      }
    }

    function getSnippet(id) {
      return $http
              .get(url + '/snippets/' + id)
              .then(handleGetSnippet);
              
      function handleGetSnippet(res){
        return res.data;
      }
    }

    function createSnippet(data) {
      return $http
              .post(url + '/snippets', data)
              .then(handleCreateSnippet);
              
      function handleCreateSnippet(res){
        return res.data;
      }
    }

    function updateSnippet(id, data){
      var putUrl = url + '/snippets/' + id;
      return $http
              .put(putUrl, data)
              .then(handleUpdateSnippet);
              
      function handleUpdateSnippet(res){
        return res.data;
      }
    }

  }
})();