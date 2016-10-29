(function() {
'use strict';

  // Usage:
  // 
  // Creates:
  // 

  angular
    .module('dlmSnippetMachine')
    .component('navbar', {
      // template:'htmlTemplate',
      templateUrl: 'app/components/myNavbar/myNavbar.html',
      controller: myNavbarController,
      bindings: {
        Binding: '=',
      },
    });

  myNavbarController.$inject = ['$rootScope', '$auth', '$state', '$log', 'User'];
  function myNavbarController($rootScope, $auth, $state, $log, User) {
    var $ctrl = this;
    $ctrl.user = $rootScope.user;
    $ctrl.signOut = signOut
    // $ctrl.loggedIn = Object.keys($rootScope.user).length !== 0;
    // $log.log($rootScope.user);
    // $log.log(Object.keys($rootScope.user));
    // $ctrl.checkLoggedInStatus = checkLoggedInStatus;

    ////////////////

    function signOut() {
      $auth
        .signOut()
        .then(function(){
          // $log.log($ctrl.user);
          // $ctrl.loggedIn = User.loggedIn();
          $state.go('snippetsIndex');
        });
    }

    // function checkLoggedInStatus() {
    //   $ctrl.loggedIn = User.loggedIn();
    //   return $ctrl.loggedIn;
    // }

    $ctrl.$onInit = function() { 
      // $ctrl.loggedIn = checkLoggedInStatus();
    };
    $ctrl.$onChanges = function() { 
      // $ctrl.loggedIn = checkLoggedInStatus();
    };
    $ctrl.$onDestroy = function() { };
  }
})();