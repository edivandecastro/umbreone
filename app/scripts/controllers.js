angular.module('UmbreoneApp.controllers', [])

    .controller('RegisterOsCtrl', ['$scope', function($scope) {
    }])

    .controller('RegisterBrandCtrl', ['Brand', '$scope', function(Brand, $scope) {
        var self = this;

        self.brands = Brand.query();
        $scope.brand = new Brand();

        self.save = function() {
            $scope.brand.enterprise_id = 1;
            if (brandArePersisted()) {
                self.update();
            } else {
                $scope.brand.$save(function() {
                    addBrandInBrands();
                    cleanBrand();
                });
            }
        };

        self.destroy = function(brand) {
            brand.$delete(function () {
                removeBrandInBrands(brand);
            });
        };

        self.edit = function(brand) {
            $scope.brand = new Brand();
            $scope.brand.id = brand.id;
            $scope.brand.name = brand.name;
        };

        self.update = function() {
            $scope.brand.$update(function() {
                updateBrandInBrands();
                cleanBrand();
            });
        };

        var cleanBrand = function() {
            $scope.brand = new Brand();
        };

        var brandArePersisted = function() {
            return $scope.brand.id;
        };

        var addBrandInBrands = function() {
            self.brands.push($scope.brand);
        };

        var removeBrandInBrands = function(brand) {
            self.brands.splice(getBrandIdInBrands(brand), 1);
        };

        var updateBrandInBrands = function() {
            self.brands[getBrandIdInBrands($scope.brand)] = $scope.brand;
        };

        var getBrandIdInBrands = function (brand) {
            for (var i = 0; i < self.brands.length; i++) {
                if (self.brands[i].id == brand.id) {
                    return i;
                }
            }
        };
    }]);