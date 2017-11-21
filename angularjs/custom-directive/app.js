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
        },
        //Compile expects is value to be a function, and when Angularjs runs that function it will pass that function two parameters. element and attributes of the piece
        //of html, piece of the dom that defines the directive.
        compile: function(elem, attrs) {
            console.log('Compiling...');
            //This will print what is inside the <a>, when we compile we can gain access to the html that defines the view for the directive
            console.log(elem.html());
            
            //The returning object can have two properties: pre (pre-linkng) and post(post-linking)
            //We're running this directives three times because of the ng-repeat and each time, it has its own scope. Every time that loop runs, I get a new instance of searchResult
            //with personObject as part of the scope. Essentialy, I have a model and a view three times. But compile only runs once
            //The linking functions what they do is let me change the html and access it as each directive is created a long the way.
            //Compile means I can change my directive on the fly before it gets used
            return {
                //The pre is also a function and it takes three elements, the scope, the element or elements involved and the attibutes for the html that's just been geenerated 
                //by creating the instance of the directive
                pre: function(scope, elements, attrs) {
/*                    console.log('Pre-linking...');
                    console.log(elements);*/
                },
                post: function(scope, elements, attrs) {
                    console.log('Post-linking...');
                    console.log(scope);
                    console.log(elements);
                }
            }
        }
    }
});

myApp.directive("fileChange", function() {
                
    return {
        compile: function(elem, attrs) {

            return {
                post: function(scope, elements, attrs) {
                    console.log('FileChange...');
                    console.log(scope);
                    
                }
            }
        }            
    }                            
});