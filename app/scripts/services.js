angular.module('UmbreoneApp.services', [])
    .factory('Brand', ['$resource', function($resource) {
        return $resource('http://localhost:3000/brands/:id', {id: '@id'}, {
            'update': {method: 'PUT'}
        });
    }]);