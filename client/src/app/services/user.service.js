(function() {
'use strict';

  angular
    .module('dlmSnippetMachine')
    .service('User', User);

  User.$inject = ['$http', 'getApiUrl', 'Session', '$window'];
  function User($http, getApiUrl, Session, $window) {
    this.getUserSnippets = getUserSnippets;
    this.saveUserSnippets = saveUserSnippets;
    var url = getApiUrl.getUrl();
    var currentUserId = Session.getCurrentUserId();
    
    ////////////////

    function getUserSnippets(id) { 
      return $http
              .get(url + '/users/' + id)
              .then(function(res){
                return res.data;
              })
    }

    function saveUserSnippets() {
      var saveUrl = url + '/dropbox/users/' + currentUserId + '/add_snippets';
      $window.open(saveUrl, 'Save-to-Dropbox','width=500,height=400');
      // var popUp = $window.open(saveUrl, 'Save-to-Dropbox','width=500,height=400');
      // $timeout(function(){popUp.close()}, 8000);
    }
  }
})();