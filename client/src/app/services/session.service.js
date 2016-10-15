(function() {
'use strict';

  angular
    .module('dlmSnippetMachine')
    .service('Session', Session);

  Session.$inject = ['$cookies'];
  function Session($cookies) {
    this.getCurrentUser = getCurrentUser;
    this.getCurrentUserId = getCurrentUserId;
    this.setCurrentUser = setCurrentUser;
    this.endSession = endSession;
    
    ////////////////

    function getCurrentUser() { 
      return $cookies.getObject('currentUser');
    }

    function getCurrentUserId() {
      return Number($cookies.get('currentUserId'));
    }

    function setCurrentUser(user) {
      $cookies.putObject('currentUser', user);
      $cookies.put('currentUserId', user.id);
    }

    function endSession() {
      $cookies.remove('currentUser');
      $cookies.remove('currentUserId');
    }
  }
})();