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
    order to access this scope person value */
    $scope.person = {
        name: 'John Doe',
        address: '555 Main St.',
        city: "New York",
        state: "NY",
        zip: "11111",
        email: "john.doe@yahoo.com"
    } 
    
    $scope.formattedAddress = function(person) {
        console.log('formattedAddressFunction');
        return person.address + ', ' + person.city + ', ' + person.state + ' ,' + person.zip;
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
            //I'm telling the directive that I want to create a hole through the attribute person-name in the element (normalized to personName),
            //and the "@" means that is text.
            personName: "@",
            personAddress: '@',
            //We're passing the object person through the attribute person-object. And this is a two way binding, whatever happpens to this objects
            //inside the directive will update the object that is pass it from the outside ('mainController'), but it will allow to pass the object down to the directive
            personObject: "=",
            //'&' used to speficy passing a function
            formattedAddressFunction: "&"
        }
    }
});