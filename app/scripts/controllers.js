angular.module('UmbreoneApp.controllers', [])

    .controller('RegisterOsCtrl', ['$scope', function($scope) {
    }])

    .controller('RegisterBrandCtrl', ['Brand', '$scope', function(Brand, $scope) {
        var self = this;

        self.brands = Brand.query();

        self.save = function() {
            self.obj.brand.enterprise_id = 1;
            Brand.save(self.obj, function() {
                self.brands = Brand.query();
                self.obj.brand.name = null;
            });
        }

        self.destroy = function(brand) {
            brand.$delete(function () {
                for (i=0; i < self.brands.length; i++) {
                    if (self.brands[i].id == brand.id) {
                        self.brands.splice(i, 1);
                    }
                }
            });
        }
    }]);