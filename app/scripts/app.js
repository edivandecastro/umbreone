angular.module('UmbreoneApp', ['ngRoute'])

    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/registrar-os', {
           templateUrl: 'views/registrar-os.html',
           controller: 'RegisterCtrl',
           controllerAs: 'register'
        }).otherwise({
            rediretTo: '/'
        });
    }]);