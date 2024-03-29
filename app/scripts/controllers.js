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
    }])
    .controller('RegisterModelCtrl', ['Model', 'Brand', '$scope', '$timeout', function(Model, Brand, $scope, $timeout) {
        var self = this;

        $scope.brands = Brand.query();
        $scope.models = Model.query();
        $scope.model = new Model();
        $scope.selected = { brand: null };

        self.save = function() {
            $scope.model.enterprise_id = 1;
            $scope.model.brand_id = $scope.selected.brand.id;
            if (modelArePersisted()) {
                var brand = $scope.selected.brand;
                self.update(brand);
            } else {
                $scope.model.$save(function() {
                    addModelInModels();
                    cleanModel();
                    cleanBrand();
                    $scope.brands = Brand.query();
                    showMessageSuccess();
                });
            }
        };

        self.update = function(brand) {
            $scope.model.$update(function() {
                $scope.model.brand = brand;
                updateModelInModels();
                cleanModel();
                cleanBrand();
            });
        };

        self.edit = function(model) {
            $scope.model = new Model();
            $scope.model.id = model.id;
            $scope.model.name = model.name;
            $scope.selected = { brand: model.brand };
        };

        self.destroy = function(model) {
            model.$delete(function () {
                removeModelInModels(model);
            });
        };

        self.switchBool = function(value) {
            $scope[value] = !$scope[value];
        };

        var updateModelInModels = function() {
            $scope.models[getModelIdInModels($scope.model)] = $scope.model;
            $scope.models[getModelIdInModels($scope.model)].brand = $scope.model.brand;
        };

        var cleanModel = function() {
            $scope.model = new Model();
        };

        var cleanBrand = function() {
            $scope.selected = { brand: null };
        }

        var modelArePersisted = function() {
            return $scope.model.id;
        };

        var addModelInModels = function() {
            $scope.model.brand = $scope.selected.brand;
            $scope.models.push($scope.model);
        };

        var removeModelInModels = function(model) {
            $scope.models.splice(getModelIdInModels(model), 1);
        };

        var getModelIdInModels = function (model) {
            for (var i = 0; i < $scope.models.length; i++) {
                if ($scope.models[i].id == model.id) {
                    return i;
                }
            }
        };

        var showMessageSuccess = function() {
            $scope.successTextAlert = "Cadastro efetuado com sucesso!";
            $scope.showSuccessAlert = true;

            $timeout(function() {
                self.switchBool('showSuccessAlert');
            }, 3000);
        };
    }]);
