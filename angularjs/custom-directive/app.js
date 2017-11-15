var myApp = angular.module('myApp', ['ngRoute']);

myApp.config(function ($routeProvider) {
    
    $routeProvider
    
    .when('/', {
        templateUrl: 'pages/main.html',
        controller: 'mainController'
    })
    
    .when('/second', {
        templateUrl: 'pages/second.html',
        controller: 'secondController'
    })
    
    .when('/second/:num', {
        templateUrl: 'pages/second.html',
        controller: 'secondController'
    })
    
});

myApp.controller('mainController', ['$scope', '$log', function($scope, $log) {
    
    /*No longer works, because we isolate the scope in the directive defining the scope property, we have to create a hole in the directive in
    order to access this scope person value*/
    $scope.person = {
        name: 'John Doe',
        address: '555 Main St., New York, NY 11111'
    } 
    
    
    
}]);

myApp.controller('secondController', ['$scope', '$log', '$routeParams', function($scope, $log, $routeParams) {
    
    
    
}]);

myApp.directive("searchResults", function() {
    return { //This will return the directive
        templateUrl: 'directives/searchResults.html', 
        //Doing this, we are isolating the scope. Now this directive can be directly affected by whats happening in his parent pages. It has
        //its own model and its own view. This isn't even a child scope, this is its own scope. It has no idea of whats going in the scope of 
        //the page that contains this directive.
        scope: {
            
        }
    }
});