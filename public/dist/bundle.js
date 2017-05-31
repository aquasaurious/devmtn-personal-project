'use strict';

angular.module('gibson', ['ui.router']).config(function ($stateProvider, $urlRouterProvider) {

    $stateProvider.state('home', {
        url: '/',
        templateUrl: './views/main.html',
        controller: 'mainCTRL'
    }).state('usa', {
        url: '/usa',
        templateUrl: './views/usa.html',
        controller: 'shopCTRL'
    }).state('memphis', {
        url: '/memphis',
        templateUrl: './views/memphis.html',
        controller: 'shopCTRL'
    }).state('acoustic', {
        url: '/acoustic',
        templateUrl: './views/acoustic.html',
        controller: function controller($scope) {
            console.log("routing to acoustic page");
        }
    }).state('custom', {
        url: '/custom',
        templateUrl: './views/custom.html',
        controller: 'shopCTRL'
    }).state('product', {
        url: "/:shopID/:productID",
        templateUrl: './acoustic/76.html',
        controller: 'mainCTRL'
    });

    $urlRouterProvider.otherwise('/');
});
'use strict';

angular.module('gibson').directive('footer', function () {
    return {
        restrict: 'E',
        templateUrl: './views/footer.html'
    };
});
'use strict';

angular.module('gibson').directive('guitar', function () {
    return {
        restrict: 'E',
        templateUrl: './views/guitar.html'
    };
});
'use strict';

angular.module('gibson').directive('header', function () {
    return {
        restrict: 'E',
        templateUrl: './views/header.html'
    };
});
'use strict';

angular.module('gibson').controller('mainCTRL', function ($scope, mainSRV) {
    // $scope.test = "CTRL works";


    var getProducts = function getProducts() {
        var promise = mainSRV.getProducts;
        //       console.log('promise' + promise);
        promise.then(function (response) {
            $scope.products = response.data;
            console.log($scope.products);
        });
    };
    getProducts();
});
'use strict';

angular.module('gibson').service('mainSRV', function ($http) {
    var baseURL = 'http://localhost:8080/guitars';

    this.getProducts = $http.get(baseURL);
    this.getProductbyId = function (id) {
        return $http.get(baseURL + '/' + id);
    };
});
"use strict";
"use strict";