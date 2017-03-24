angular.module('gibson').controller('mainCTRL', function($scope, mainSRV){
    // $scope.test = "CTRL works";

        
    var getProducts = function() {
        var promise = mainSRV.getProducts;
 //       console.log('promise' + promise);
        promise.then(function(response){
            $scope.products = response.data;
 //           console.log($scope.products);
        });
    };
 getProducts();
});
