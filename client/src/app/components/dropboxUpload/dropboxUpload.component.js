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

  dropboxUploadController.$inject = ['User'];
  function dropboxUploadController(User) {
    var $ctrl = this;
    $ctrl.uploadSnippetsFromDropboxLink = User.uploadSnippetsFromDropboxLink();

    ////////////////

    $ctrl.$onInit = function() { 

    };
    $ctrl.$onChanges = function(changesObj) {

     };
    $ctrl.$onDestroy = function() { };
  }
})();