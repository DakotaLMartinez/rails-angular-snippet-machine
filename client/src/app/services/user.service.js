(function() {
'use strict';

  angular
    .module('dlmSnippetMachine')
    .service('User', User);

  User.$inject = ['$http', 'getApiUrl', '$window', '$rootScope', '$log', '$q'];
  function User($http, getApiUrl, $window, $rootScope, $log, $q) {
    this.getUserSnippets = getUserSnippets;
    this.getCurrentUserPermissions = getCurrentUserPermissions;
    this.clearCachedPermissions = clearCachedPermissions;
    this.currentUserCanEditSnippet = currentUserCanEditSnippet;
    this.addSnippet = addSnippet;
    this.removeSnippet = removeSnippet;
    this.saveUserSnippets = saveUserSnippets;
    this.uploadSnippetsFromDropboxLink = uploadSnippetsFromDropboxLink;
    this.loggedIn = loggedIn;
  
    var currentUserPermissions;

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
      var promise;
      if (Object.keys($rootScope.user).length !== 0) {
        if (!currentUserPermissions) {
          currentUserId = $rootScope.user.id;
          promise = $http.get(url + '/users/' + currentUserId + '/permissions');
          promise.then(function(response){
            currentUserPermissions = response;
          });
        } else {
          promise = $q.when(currentUserPermissions);
        }
        return promise;
      }
    }

    function clearCachedPermissions() {
      currentUserPermissions = false;
    }

    function currentUserCanEditSnippet(id) {
      currentUserId = $rootScope.user.id;
      return $http
              .get(url + '/users/' + currentUserId + '/permissions')
              .then(function(res){
                var editable = res.data.can_edit;
                if(editable[id]) {
                  return true;
                } else {
                  return false;
                }
              });
    }

    function addSnippet(id){
      return $http.get(url + '/snippets/' + id + '/add_snippet');
    }

    function removeSnippet(id) {
        return $http.get(url + '/snippets/' + id + '/remove_snippet');
    }

    function saveUserSnippets() {
      if (loggedIn()) { 
        currentUserId = $rootScope.user.id;
        var saveUrl = url + '/dropbox/users/' + currentUserId + '/add_snippets';
        $window.open(saveUrl, 'Save-to-Dropbox','width=500,height=400');
      } else {
        $log.log('User must be loaded first');
      }
      // var popUp = $window.open(saveUrl, 'Save-to-Dropbox','width=500,height=400');
      // $timeout(function(){popUp.close()}, 8000);
    }

    function uploadSnippetsFromDropboxLink() {
      if (loggedIn()) {
        return url + '/dropbox/upload_existing_snippets';
      }
    }

    function loggedIn() {
      if(Object.keys($rootScope.user).length !== 0) {
        return true;
      } else {
        return false;
      }
    }
  }
})();