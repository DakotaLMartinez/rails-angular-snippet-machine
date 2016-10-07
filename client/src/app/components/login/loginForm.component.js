(function() {
  'use strict';
  // Usage:
  //
  // Creates:
  //

  var loginForm = {
    templateUrl: 'app/components/login/loginForm.html',
    controller: loginFormController,
    controllerAs: 'vm'
  };

  loginFormController.$inject = ['$scope', '$rootScope', '$auth', '$state', 'session']
  function loginFormController ($scope, $rootScope, $auth, $state, session) {
    $scope.handleLoginBtnClick = function() {
      $auth.submitLogin($scope.loginForm)
        .then(function(res){
          session.setUser(res);
          session.setAccessToken(res.uid);
          $state.go('snippetsIndex');
        })
        .catch(function(){
          
        });
    };
    
  }

  angular
    .module('dlmSnippetMachine')
    .component('loginForm', loginForm);

})();