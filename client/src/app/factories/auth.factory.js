(function() {
'use strict';

  angular
    .module('dlmSnippetMachine')
    .factory('authInterceptor', authInterceptor);

  authInterceptor.$inject = ['$q', 'ipCookie', '$location'];
  function authInterceptor($q, ipCookie, $location) {
    var service = {
      request:request,
      responseError: responseError
    };
    
    return service;

    ////////////////
    function request(config) {
      config.headers = config.headers || {};
      if (ipCookie('access-token')) {
        config.headers['Access-Token'] = ipCookie('access-token');
        config.headers['Client'] = ipCookie('client');
        config.headers['Expiry'] = ipCookie('expriy');
        config.headers['Uid'] = ipCookie('uid');
      }
      return config;
    }

    function responseError(response) {
      if (response.status === 401) {
        $location.path('/sign_in');
        ipCookie.remove('access-token');
      }
      return $q.reject(response);
    }
  }
})();