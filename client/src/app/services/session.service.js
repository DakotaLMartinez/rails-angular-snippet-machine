// (function() {
// 'use strict';

//   angular
//     .module('dlmSnippetMachine')
//     .service('session', SessionService);

//   SessionService.$inject = ['$log', 'localStorage'];
//   function SessionService($log, localStorage) {
//     this._user = localStorage.getItem('session.user').fromJSON;
//     this._accessToken = localStorage.getItem('session.accessToken').fromJSON;

//     this.getUser = getUser;
//     this.setUser = setUser;
//     this.getAccessToken = getAccessToken;
//     this.setAccessToken = setAccessToken;
//     this.destroy = destroy;
    
//     ////////////////

//     function getUser() { 
//       return this._user;
//     }

//     function setUser(user) {
//       this._user = user;
//       localStorage.setItem('session.user', user.toJSON);
//       return this;
//     }

//     function getAccessToken() {
//       return this._accessToken;
//     }

//     function setAccessToken(token) {
//       this._accessToken = token; 
//       localStorage.setItem('session.accessToken', token);
//       return this;
//     }

//     function destroy() {
//       this.setUser(null);
//       this.setAccessToken(null);
//     }
//   }
// })();