(function() {
  'use strict';

  angular
    .module('dlmSnippetMachine')
    .config(routerConfig);

  /** @ngInject */
  function routerConfig($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state('home', {
        url: '/main',
        templateUrl: 'app/main/main.html',
        controller: 'MainController',
        controllerAs: 'main'
      }).state('login', {
        component: 'loginForm',
        url: '/sign_in',
        template: '<login-form></login-form>'
      })
      .state('snippetsIndex', {
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
      }).state('snippetShow.vscode', {
        url: '/vscode', 
        templateUrl: 'app/components/vsCodeView/vsCodeView.html',
        controller: 'SnippetShowController', 
        controllerAs: 'vm'
      });

    $urlRouterProvider.otherwise('/snippets');
  }

})();
