angular.module('gibson').service('mainSRV', function($http) {
    var baseURL = 'localhost:8080';

    this.getProducts = $http.get(baseURL);
    this.getProductbyId = function(id) {
        return $http.get(baseURL + '/' + id);
    };
});