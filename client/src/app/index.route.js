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
      }).state('register', {
        url: '/sign_up', 
        templateUrl: 'app/components/createAccount/createAccount.html', 
        controller: 'createAccountController', 
        controllerAs: 'vm'
      }).state('signIn', {
        url: '/sign_in', 
        templateUrl: 'app/components/loginForm/loginForm.html', 
        controller: 'loginFormController', 
        controllerAs: 'vm'
      }).state('snippetsIndex', {
        url: '/', 
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

    $urlRouterProvider.otherwise('/');
  }

})();
