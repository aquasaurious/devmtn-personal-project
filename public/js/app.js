angular.module('gibson', ['ui.router']).config(function($stateProvider, $urlRouterProvider){

    $stateProvider
    .state('home', {
        url: '/',
        templateUrl: './views/main.html',
        controller: 'mainCTRL'
    })
    .state('usa', {
        url: '/usa',
        templateUrl: './views/usa.html',
        controller: 'shopCTRL'
    })
    .state('memphis', {
        url: '/memphis',
        templateUrl: './views/memphis.html',
        controller: 'shopCTRL'
    })
    .state('acoustic', {
        url: '/acoustic',
        templateUrl: './views/acoustic.html',
        controller: function($scope) {
            console.log("routing to acoustic page");
        }
    })
    .state('custom', {
        url: '/custom',
        templateUrl: './views/custom.html',
        controller: 'shopCTRL'
    })
    .state('product', {
        url: "/:shopID/:productID",
        templateUrl: './js/products/productsTMPL.html',
        controller: 'productsCTRL'
    })
    
    $urlRouterProvider.otherwise('/');

});