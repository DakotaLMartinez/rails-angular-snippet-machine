(function() {
'use strict';

  angular
    .module('dlmSnippetMachine')
    .controller('StoryIndexController', StoryIndexController);

  StoryIndexController.$inject = ['$http'];
  function StoryIndexController($http) {
    var vm = this;
    

    activate();

    ////////////////

    function activate() { }
  }
})();