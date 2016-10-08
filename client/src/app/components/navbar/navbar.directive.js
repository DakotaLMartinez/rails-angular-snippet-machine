(function() {
  'use strict';

  angular
    .module('dlmSnippetMachine')
    .directive('acmeNavbar', acmeNavbar);

  /** @ngInject */
  function acmeNavbar() {
    var directive = {
      restrict: 'E',
      templateUrl: 'app/components/navbar/navbar.html',
      scope: {
          creationDate: '='
      },
      controller: NavbarController,
      controllerAs: 'vm',
      bindToController: true
    };

    return directive;

    /** @ngInject */
    function NavbarController(moment, $auth, $rootScope, $state) {
      var vm = this;
      vm.user = $rootScope.user;
      vm.signOut = signOut;

      /////////////////

      function signOut() {
        $state.go('snippetsIndex');
        $rootScope.signOut();
      }
      // "vm.creationDate" is available by directive option "bindToController: true"
      vm.relativeDate = moment(vm.creationDate).fromNow();
    }
  }

})();
