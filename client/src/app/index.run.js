(function() {
  'use strict';

  angular
    .module('dlmSnippetMachine')
    .run(runBlock);

  /** @ngInject */
  runBlock.$inject = ['$log', '$rootScope', '$location', '$timeout', '$state'];
  function runBlock($log, $rootScope, $location, $timeout, $state) {
    $rootScope.$on('auth:invalid', function(){
      $timeout(function(){
        $state.go('signIn');
      });
    });
       
    $rootScope.$on('$stateChangeError', function(evt, to, toParams, from, fromParams, error){
      if (error.redirectTo) {
        $state.go(error.redirectTo);
      } else {
        $state.go('error', {status: error.status});
      }
    });

    $log.debug('runBlock end');
  }

})();
