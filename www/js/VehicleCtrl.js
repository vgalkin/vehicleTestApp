angular.module('vehicle', [])
    .controller('VehicleCtrl', function ($scope, $stateParams, vehicle) {
        $scope.vehicle = vehicle;
    });
