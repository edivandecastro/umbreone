angular.module('UmbreoneApp.controllers', [])

    .controller('RegisterOsCtrl', ['$scope', function($scope) {
    }])

    .controller('RegisterBrandCtrl', ['Brand', '$scope', function(Brand, $scope) {
        var self = this;

        self.brands = Brand.query();
        console.log(self.brands);

        self.save = function () {
            self.obj.brand.enterprise_id = 1;
            Brand.save(self.obj, function() {
                self.brands = Brand.query();
                self.obj.brand.name = null;
            });
        }
    }]);