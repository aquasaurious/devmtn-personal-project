angular.module('gibson').service('mainSRV', function($http) {
    var baseURL = 'http://localhost:8080/guitars';

    this.getProducts = $http.get(baseURL);
    this.getProductbyId = function(id) {
        return $http.get(baseURL + '/' + id);
    };
});