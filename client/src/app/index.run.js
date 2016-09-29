(function() {
  'use strict';

  angular
    .module('dlmSnippetMachine')
    .run(runBlock);

  /** @ngInject */
  function runBlock($log) {

    $log.debug('runBlock end');
  }

})();
