(function() {
  'use strict';

  angular
    .module('dlmSnippetMachine')
    .config(routerConfig);

  /** @ngInject */
  function routerConfig($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state('home', {
        url: '/',
        templateUrl: 'app/main/main.html',
        controller: 'MainController',
        controllerAs: 'main'
      }).state('snippets', {
        url: '/snippets', 
        templateUrl: 'app/snippetIndex/snippetIndex.html', 
        controller: 'SnippetIndexController', 
        controllerAs: 'vm'
      });

    $urlRouterProvider.otherwise('/');
  }

})();
