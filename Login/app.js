var app = angular.module("app", ["ngResource","ngRoute"]);


//Routage
app.config(['$routeProvider', function($routeProvider){
$routeProvider
.when('/login',{
	templateUrl:'login.html',
	controller: 'loginCtrl'
})
.when('/dashboard',{
	templateUrl:'dashboard.html',
	controller: 'dashCtrl'
})
.otherwise({redirectTo:'/login'});

}]);




//creation du service des utilisateurs
app.factory('usersFactory',['$resource', function($resource){
	return $resource('http://localhost:3000/db', {}, {
        query: { method: 'GET', isArray: true },
        create: { method: 'POST' }
    });
}]);

app.factory('userFactory',['$resource', function($resource){
	return $resource('http://localhost:3000/db/:id', {},{
		show: { method: 'GET' },
        update: { method: 'PUT', params: {id: '@id'} },
        delete: { method: 'DELETE', params: {id: '@id'} }
	});
}]);

//controleurs
app.controller('loginCtrl',['$scope','$location','$route','usersFactory', function($scope, $location,$route, usersFactory){

$scope.users = usersFactory.query();

$scope.connect = function(){
var username = $scope.username;
var password = $scope.password;
var totalUsers = $scope.users.length; 
var loggedIn = false;
//$scope.users[0]['username'] :username du premier user
for(var i=0; i<totalUsers;i++){
	if($scope.users[i].username === username && $scope.users[i].password === password){
     loggedIn = true;
     break; // on s'arrête dès qu'on a trouvé
	}
}

if(loggedIn === true){
	$location.path('/dashboard');
	$route.reload;
}
else{
	alert('Aucune correspondance, créez un compte !');
}	
	
};

}]);


app.controller('dashCtrl', ['$scope', function($scope){
	$scope.connard = "Trou du cul";
}]);

