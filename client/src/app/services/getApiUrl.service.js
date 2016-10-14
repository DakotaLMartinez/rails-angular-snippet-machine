(function() {
'use strict';

  angular
    .module('dlmSnippetMachine')
    .service('getApiUrl', getApiUrl);

  getApiUrl.$inject = ['$location'];
  function getApiUrl($location) {
    this.getUrl = getUrl;

    ////////////////

    function getUrl() { 
      var host = $location.host();
      var port = $location.port();
      var apiUrl = '/api';

      if (host === 'localhost' && port === 3000) {
        var apiUrl = 'http://localhost:4000/api';
      }
      return apiUrl;
    }
    }
})();