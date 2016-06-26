angular.module('UmbreoneApp', ['ngRoute', 'ngResource', 'UmbreoneApp.services', 'UmbreoneApp.controllers'])

    .config(['$routeProvider', function($routeProvider) {
        $routeProvider
            .when('/registrar-os', {
               templateUrl: 'views/registrar-os.html',
               controller: 'RegisterOsCtrl',
               controllerAs: 'registerOs'
            })
            .when('/registrar-marca', {
                templateUrl: 'views/registrar-brand.html',
                controller: 'RegisterBrandCtrl',
                controllerAs: 'registerBrand'
            })
            .otherwise({
                rediretTo: '/'
            });
    }]);