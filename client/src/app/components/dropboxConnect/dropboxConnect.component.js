(function() {
  'use strict';
  // Usage:
  //
  // Creates:
  //

  var dropboxConnect = {
    bindings: {
      property: '='
    },
    templateUrl: 'app/components/dropboxConnect/dropboxConnect.html',
    controller: dropboxConnectController,
    controllerAs: 'vm'
  };

  dropboxConnectController.$inject = ['$auth']
  function dropboxConnectController ($auth) {
    var vm = this;
    

    activate();

    ////////////////

    function activate() { 
      vm.authenticateWithDropbox = function() {
        $auth.authenticate('dropbox');
      };

    }
  }

  angular
    .module('dlmSnippetMachine')
    .component('dropboxConnect', dropboxConnect);

})();

