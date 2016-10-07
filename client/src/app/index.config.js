(function() {
  'use strict';

  angular
    .module('dlmSnippetMachine')
    .config(config);

  /** @ngInject */
  function config($logProvider, toastrConfig, $authProvider) {
    // Enable log
    $logProvider.debugEnabled(true);

    // Set options third-party lib
    toastrConfig.allowHtml = true;
    toastrConfig.timeOut = 3000;
    toastrConfig.positionClass = 'toast-top-right';
    toastrConfig.preventDuplicates = true;
    toastrConfig.progressBar = true;

    $authProvider.configure({
      // note: the defaults are fine for now
      // @see: https://github.com/lynndylanhurley/ng-token-auth#complete-config-example
    });

  }

})();
