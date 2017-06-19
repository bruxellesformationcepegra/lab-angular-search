var searchApp = angular.module("searchApp", ["angucomplete-alt", 'ngRoute']);

searchApp.config(function($routeProvider){
    $routeProvider
        .when('/artist/:id', {
            templateUrl: "details.html",
            controller: 'DetailsController'
        })
        .otherwise({ redirectTo: '/' });
});

searchApp.controller("SearchController", function($location){
     this.selectedItem = function(selected) {
        $location.path('/artist/'+selected.originalObject.id);
    };
});

searchApp.controller("DetailsController",  ['$http','$routeParams', function($http, $routeParams) {
     console.log($routeParams.id);
     var detailsController = this;
    $http.get("https://api.discogs.com/artists/"+$routeParams.id)
    .then(function(response){
        console.log(response.data);
        detailsController.vm = response.data;
    });
}]);