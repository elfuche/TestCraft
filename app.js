var surfApp = angular.module('surfApp',['ngResource','ngRoute']);
//routage
surfApp.config(['$routeProvider', function($routeProvider){
	$routeProvider
	.when('/',{
		templateUrl: 'index.html',
		controller: 'prdCtrl'
	})
	.when('/article-detail/:id', {
		templateUrl: 'article-detail.html',
		controller: 'prduCtrl'
	})
	.when('/panier',{
		templateUrl : 'panier.html',
		controller: 'prdvCtrl'
	})
	.otherwise({redirectTo:'/'});
}]);

//creation du service des articles
surfApp.factory('articlesFactory',['$resource', function($resource){
	return $resource('http://localhost:3000/users', {}, {
        query: { method: 'GET', isArray: true },
        create: { method: 'POST' }
    });
}]);

surfApp.factory('articleFactory',['$resource', function($resource){
	return $resource('http://localhost:3000/users/:id', {},{
		show: { method: 'GET'},
        update: { method: 'PUT', params: {id: '@id'} },
        delete: { method: 'DELETE', params: {id: '@id'} }
	});
}]);

surfApp.factory('cartFactory',['$resource', function($resource){
	return $resource('/:cart.json', {},{
		query: { method: 'GET', isArray: true },
        create: { method: 'POST' }
	});
}]);


surfApp.controller('prdCtrl',['$scope','$routeParams','$location','$route','articlesFactory','articleFactory',function($scope, $routeParams,$location,$route,articlesFactory, articleFactory){
    $scope.ok="surf";
	$scope.articles = articlesFactory.query();
   
	$scope.details= function(articleId){
	 $location.path('/article-detail/'+ articleId);

	    //$location.path('/user-detail/' + userId);
	 $route.reload;
	};
	      //$scope.article = articleFactory.show({id: $routeParams.id});
	
}]);
surfApp.controller('prduCtrl',['$scope','$routeParams','$route','$location','articleFactory','cartFactory',function($scope,$routeParams,$route,$location,articleFactory,cartFactory){
var id;
var choix=$scope.choix;
	$scope.art = articleFactory.show({id: $routeParams.id});
    $scope.updatePanier = function(idPrd,qt){
    	$scope.carts=cartFactory.query();
    	alert($scope.carts);
    	//$scope.carts.push({"idArticle":idPrd, "quantite":qt});
       cartFactory.create({"idArticle":idPrd, "quantite":qt});       
       $location.path('/panier'); 
       $route.reload;     
	};
	
}]);

//Faire apparaître le panier
surfApp.controller('prdvCtrl',['$scope','$http', function($scope,$http){

$http.get('cart.json').success(function(response){
	$scope.myData=response;
});




}]);