angular.module('vehicle.list', [])
    .controller('VehicleListCtrl', function ($scope, $stateParams, vehicleList) {
        $scope.vehicles = vehicleList;
    });
