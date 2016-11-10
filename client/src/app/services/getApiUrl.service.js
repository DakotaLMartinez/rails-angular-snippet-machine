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
      var protocol = $location.protocol();
      var host = $location.host();
      var port = $location.port();
      var apiUrl = protocol + '://'+ host + port + '/api';

      if (host === 'localhost' && port === 3000) {
        apiUrl = 'http://localhost:4000/api';
      }
      return apiUrl;
    }
    }
})();