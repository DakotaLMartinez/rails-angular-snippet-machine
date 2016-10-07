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
      apiUrl:                  '/api',
      tokenValidationPath: '/auth/validate_token',
      signOutUrl: '/auth/sign_out',
      emailSignInPath: '/auth/sign_in',
      storage: 'localStorage',
      tokenFormat: {
        "access-token": "{{ token }}",
        "token-type": "Bearer",
        "client": "{{ clientId }}",
        "expiry": "{{ expiry }}",
        "uid": "{{ uid }}"
      }
    });
  }

})();
