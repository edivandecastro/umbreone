angular.module('UmbreoneApp', [
    'ui.select',
    'ngSanitize',
    'ngRoute',
    'ngResource',
    'UmbreoneApp.services',
    'UmbreoneApp.controllers'])

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
                controllerAs: 'registerBrand',
            })
            .when('/registrar-modelo', {
                templateUrl: 'views/registrar-model.html',
                controller: 'RegisterModelCtrl',
                controllerAs: 'registerModel',
            })
            .otherwise({
                rediretTo: '/'
            });
    }]);