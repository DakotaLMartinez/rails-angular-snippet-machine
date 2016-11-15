(function() {
'use strict';

  // Usage:
  // 
  // Creates:
  // 

  angular
    .module('dlmSnippetMachine')
    .component('dropboxUpload', {
      templateUrl: 'app/components/dropboxUpload/dropboxUpload.html',
      controller: dropboxUploadController, 
      bindings: {
        loggedIn: '='
      }
    });

  dropboxUploadController.$inject = ['User', '$rootScope', '$log', 'getApiUrl'];
  function dropboxUploadController(User, $rootScope, $log, getApiUrl) {
    var $ctrl = this;
    $ctrl.signedIn = $ctrl.loggedIn || $rootScope.user.signedIn;
    $ctrl.uploadSnippetsFromDropboxLink = User.uploadSnippetsFromDropboxLink();
    

    ////////////////

    $rootScope.$on('auth:login-success', function(){
      $ctrl.signedIn = $rootScope.user.signedIn;
    });

    $rootScope.$on('auth:registration-email-success', function(){
      $ctrl.signedIn = $rootScope.user.signedIn;
    })

    $ctrl.$onInit = function() { 
      $ctrl.signedIn = $ctrl.loggedIn || $rootScope.user.signedIn;
      $ctrl.uploadSnippetsFromDropboxLink = User.uploadSnippetsFromDropboxLink();
      $log.log($ctrl.signedIn);
      $log.log($ctrl.uploadSnippetsFromDropboxLink);
    };
    $ctrl.$onChanges = function() {
      
    };
    $ctrl.$onDestroy = function() { };
  }
})();