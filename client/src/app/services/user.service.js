(function() {
'use strict';

  angular
    .module('dlmSnippetMachine')
    .service('User', User);

  User.$inject = ['$http', 'getApiUrl'];
  function User($http, getApiUrl) {
    this.getUserSnippets = getUserSnippets;
    var url = getApiUrl.getUrl();
    
    ////////////////

    function getUserSnippets(id) { 
      return $http
              .get(url + '/users/' + id)
              .then(function(res){
                return res.data;
              })
    }
  }
})();