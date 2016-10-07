(function() {
'use strict';

  angular
    .module('dlmSnippetMachine')
    .service('AuthService', AuthService);

  AuthService.$inject = ['$http', 'session'];
  function AuthService($http, session) {
    this.isLoggedIn = isLoggedIn;
    this.logIn = logIn;
    
    ////////////////

    function isLoggedIn() { 
      
    }

    function logIn(credentials) {
      return $http
              .post('/api/auth/sign_in', credentials)
              .then(function(res){
                var data = res;
                session.setUser(data);
                session.setAccessToken
              })

    }
  }
})();