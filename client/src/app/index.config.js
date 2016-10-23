(function() {
  'use strict';

  angular
    .module('dlmSnippetMachine')
    .config(config);

  /** @ngInject */
  function config($logProvider, toastrConfig, $authProvider, getApiUrlProvider, FlashProvider) {
    // Enable log
    $logProvider.debugEnabled(true);

    // Set options third-party lib
    toastrConfig.allowHtml = true;
    toastrConfig.timeOut = 3000;
    toastrConfig.positionClass = 'toast-top-right';
    toastrConfig.preventDuplicates = true;
    toastrConfig.progressBar = true;
    
    var url = getApiUrlProvider.$get().getUrl();

    $authProvider.configure({
      apiUrl: url,
      omniauthWindowType: 'sameWindow',
      authProviderPaths: {
        dropbox: '/auth/dropbox'
      }
      // note: the defaults are fine for now
      // @see: https://github.com/lynndylanhurley/ng-token-auth#complete-config-example
    });

    FlashProvider.setTimeout(10000);
    FlashProvider.setShowClose(true);


  }

})();
