var __modules = [
    'ui.router',
    'ionic',
    'templates',
    'vehicle.services',
    'vehicle.list',
    'vehicle',
    'appCtrl'
];
var list =[
    {"id":"5230fkap2010sfos0984plco3849","label":"My pink car","since":1291983120,"until":1607775120,"vehicleType":{"id":"kt29w0a9s93i9le9gi923tg","type":{"id":"9k9kg930do","label":"Sedan, Car","parent":{"id":"39jg9j23g","label":"Car"}},"make":{"id":"230kg0k","label":"Ford"},"model":{"id":"39g001","label":"MY00","parent":{"id":"30kgk944","label":"Focus"}},"year":2000}},
    {"id":"g23h92h3g092h3039292340","label":"My green car","since":1291983120,"until":1607775120,"vehicleType":{"id":"kt29w0a9s93i9le9gi923tg","type":{"id":"9k9kg930do","label":"Sedan, Car","parent":{"id":"39jg9j23g","label":"Car"}},"make":{"id":"230kg0k","label":"Ford"},"model":{"id":"39g001","label":"MY00","parent":{"id":"30kgk944","label":"Focus"}},"year":2000}},
    {"id":"523923923gjjg94jg934jg09j032","label":"My yellow car","since":1291983120,"until":1607775120,"vehicleType":{"id":"kt29w0a9s93i9le9gi923tg","type":{"id":"9k9kg930do","label":"Sedan, Car","parent":{"id":"39jg9j23g","label":"Car"}},"make":{"id":"230kg0k","label":"Ford"},"model":{"id":"39g001","label":"MY00","parent":{"id":"30kgk944","label":"Focus"}},"year":2000}}
];
var item = {"id":"5230fkap2010sfos0984plco3849","label":"My pink car","since":1291983120,"until":1607775120,"vehicleType":{"id":"kt29w0a9s93i9le9gi923tg","type":{"id":"9k9kg930do","label":"Sedan, Car","parent":{"id":"39jg9j23g","label":"Car"}},"make":{"id":"230kg0k","label":"Ford"},"model":{"id":"39g001","label":"MY00","parent":{"id":"30kgk944","label":"Focus"}},"year":2000},"data":{"milage":359139,"updated":1451610060,"unitType":{"id":3,"label":"kms"},"units":"kms","lastupdate":{"id":"239j592j3509j23059sdg","units":352,"total":359139,"fuel":{"type":{"id":"3239","label":"Premium Unleaded"},"cost":"124.21","units":42,"total":"52.16"}},"updates":123,"avg":32,"max":32,"min":23,"range":200}}

angular.module("vehicleApp", __modules)
    .config(function($stateProvider, $urlRouterProvider) {
        $stateProvider
            .state('vehicleList', {
                url: '/vehicle',
                controller:'VehicleListCtrl',
                templateUrl: 'html/vehicleList.html',
                resolve:{
                    vehicleList: function($q, $state, VehicleService){
                        var defer = $q.defer();
                        VehicleService.fetchAll().then(defer.resolve, function(){
                            //defer.reject();
                            defer.resolve(list)
                        });
                        return defer.promise;
                    }
                }
            })
            .state('vehicle', {
                url: '/vehicle/:vehicle_id',
                controller:'VehicleCtrl',

                templateUrl: 'html/vehicle.html',
                resolve:{
                    vehicle: function($q, $state, $stateParams, VehicleService){
                        var defer = $q.defer();
                        VehicleService.fetch($stateParams.vehicle_id).then(defer.resolve, function(){
                            //defer.reject();
                            defer.resolve(VehicleService.formatVehicleData(item))
                        });
                        return defer.promise;
                    }
                }
            });
        $urlRouterProvider.otherwise("/vehicle");
    })
    .run(function ($http,$state, $rootScope) {
        $http.defaults.headers.common["Content-Type"] = 'application/json';

    });
