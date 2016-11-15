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
      controller: dropboxUploadController
    });

  dropboxUploadController.$inject = ['User', '$rootScope'];
  function dropboxUploadController(User, $rootScope) {
    var $ctrl = this;
    $ctrl.uploadSnippetsFromDropboxLink = User.uploadSnippetsFromDropboxLink();
    $ctrl.user = $rootScope.user.signedIn;

    ////////////////

    $rootScope.$on('auth:login-success', function(){
      $ctrl.user = $rootScope.user.signedIn;
    });

    $rootScope.$on('auth:registration-success', function(){
      $ctrl.user = $rootScope.user.signedIn;
    })

    $ctrl.$onInit = function() { 

    };
    $ctrl.$onChanges = function() {
      
    };
    $ctrl.$onDestroy = function() { };
  }
})();