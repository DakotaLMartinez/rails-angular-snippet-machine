(function() {
'use strict';

  angular
    .module('dlmSnippetMachine')
    .service('User', User);

  User.$inject = ['$http', 'getApiUrl', '$window', '$rootScope', '$log'];
  function User($http, getApiUrl, $window, $rootScope, $log) {
    this.getUserSnippets = getUserSnippets;
    this.getCurrentUserPermissions = getCurrentUserPermissions;
    this.addSnippet = addSnippet;
    this.removeSnippet = removeSnippet;
    this.saveUserSnippets = saveUserSnippets;
  
    var url = getApiUrl.getUrl();
    var currentUserId;
    
    ////////////////

    function getUserSnippets(id) { 
      return $http
              .get(url + '/users/' + id)
              .then(function(res){
                return res.data;
              });
    }

    function getCurrentUserPermissions() {
      if ($rootScope.user) {
        currentUserId = $rootScope.user.id;
        return $http.get(url + '/users/' + currentUserId + '/permissions');
      }
    }

    function addSnippet(id){
      if ($rootScope.user) {
        return $http.get(url + '/snippets/' + id + '/add_snippet');
      }
    }

    function removeSnippet(id) {
      if ($rootScope.user) {
        return $http.get(url + '/snippets/' + id + '/remove_snippet');
      }
    }

    function saveUserSnippets() {
      if ($rootScope.user) { 
        currentUserId = $rootScope.user.id;
        var saveUrl = url + '/dropbox/users/' + currentUserId + '/add_snippets';
        $window.open(saveUrl, 'Save-to-Dropbox','width=500,height=400');
      } else {
        $log.log('User must be loaded first');
      }
      // var popUp = $window.open(saveUrl, 'Save-to-Dropbox','width=500,height=400');
      // $timeout(function(){popUp.close()}, 8000);
    }
  }
})();