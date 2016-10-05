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
      }).state('snippetsIndex', {
        url: '/snippets', 
        templateUrl: 'app/components/snippetIndex/snippetIndex.html', 
        controller: 'SnippetIndexController', 
        controllerAs: 'vm'
      }).state('snippetNew', {
        url: '/snippets/new', 
        templateUrl: 'app/components/snippetNew/snippetNew.html',
        controller: 'SnippetNewController', 
        controllerAs: 'vm'
      }).state('snippetShow', {
        url: '/snippets/:id',
        templateUrl: 'app/components/snippetShow/snippetShow.html', 
        controller: 'SnippetShowController', 
        controllerAs: 'vm'
      });

    $urlRouterProvider.otherwise('/');
  }

})();
