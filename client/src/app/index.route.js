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
      })
      
      .state('register', {
        url: '/sign_up', 
        templateUrl: 'app/components/createAccount/createAccount.html', 
        controller: 'createAccountController', 
        controllerAs: 'vm'
      })
      
      .state('signIn', {
        url: '/sign_in', 
        templateUrl: 'app/components/loginForm/loginForm.html', 
        controller: 'loginFormController', 
        controllerAs: 'vm'
      })
      
      .state('snippetsIndex', {
        url: '/', 
        templateUrl: 'app/components/snippetIndex/snippetIndex.html', 
        controller: 'SnippetIndexController', 
        controllerAs: 'vm'
      })
      
      .state('snippetNew', {
        url: '/snippets/new', 
        templateUrl: 'app/components/snippetForm/snippetForm.html',
        controller: 'SnippetNewController', 
        controllerAs: 'vm', 
        resolve: {
          auth: ['$auth', '$q', function($auth, $q) {
            var deferred = $q.defer();
            if ($auth.validateUser()) {
              return deferred.resolve({});
            } else {
              return deferred.reject({redirectTo: 'signIn'});
            }
          }]
        }
      })
      
      .state('snippetShow', {
        url: '/snippets/:id',
        templateUrl: 'app/components/snippetShow/snippetShow.html', 
        controller: 'SnippetShowController', 
        controllerAs: 'vm'
      })
      
      .state('snippetShow.vscode', {
        url: '/vscode', 
        templateUrl: 'app/components/vsCodeView/vsCodeView.html',
        controller: 'SnippetShowController', 
        controllerAs: 'vm'
      })
      
      .state('snippetEdit', {
        url: '/snippets/:id/edit', 
        templateUrl: 'app/components/snippetForm/snippetForm.html', 
        controller: 'SnippetEditController', 
        controllerAs: 'vm'
      });

    $urlRouterProvider.otherwise('/');
  }

})();
