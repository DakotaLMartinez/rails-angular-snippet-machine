(function() {
  'use strict';

  angular
    .module('dlmSnippetMachine')
    .run(runBlock);

  /** @ngInject */
  runBlock.$inject = ['$log', '$rootScope', '$location'];
  function runBlock($log, $rootScope, $location) {
    $rootScope.$on('auth:login-success', function(){
      $location.path('/');
    });
    $log.debug('runBlock end');
  }

})();
