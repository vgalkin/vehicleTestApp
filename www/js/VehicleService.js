angular.module("vehicle.resources", ["ngResource"])
    .factory("VehicleResource", function ($resource) {
        return $resource('https://ecofuelmonitor.com/test/vehicles/:vehicle_id', {}, {
            put: {
                method: "PUT"
            }
        })
    });

angular.module("vehicle.services", ["vehicle.resources"])
    .factory("VehicleService", function ($q, VehicleResource) {
        function formatVehicleData(vehicle){
            vehicle.since = moment(vehicle.since*1000).format('DD/MMM/YYYY');
            return vehicle;
        }
        return{
            formatVehicleData:formatVehicleData,
            fetchAll:function(){
                var defer = $q.defer();
                VehicleResource.get().$promise.then(defer.resolve, defer.reject);
                return defer.promise;
            },
            fetch:function(vehicle_id){
                var defer = $q.defer();
                VehicleResource.get({vehicle_id:vehicle_id}).$promise.then(function(response){
                    defer.resolve(formatVehicleData(response));
                }, defer.reject);
                return defer.promise;
            }
        }
    });