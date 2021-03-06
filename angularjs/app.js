;(function() {
  'use strict';

  angular
    .module('chuCooListApp', [
      'ngMaterial',
      'ngRoute',
      'ngAria',
      'ngAnimate',
      'ngMessages'
    ])
    .config(config);

  config.$inject = ['$httpProvider', '$routeProvider'];

  function config($httpProvider, $routeProvider) {
    $httpProvider.defaults.withCredentials = true;

    $routeProvider
        .when('/', {
          templateUrl: 'auth.html',
          controller: 'AuthController',
          controllerAs: 'vm',
        })
        .when('/list', {
          templateUrl: 'list.html',
          controller: 'ListController',
          controllerAs: 'vm',
        })
        .otherwise({
          redirectTo: '/'
        });
  }

})();
