/*global angular*/
var app = angular.module('crudApp', [
	'ui.router',
	'antrenoriController',
	'antrenorInfoController'
	])
 
app.config(function($stateProvider, $urlRouterProvider) {   	
	$urlRouterProvider.otherwise("/antrenori")
	$stateProvider
		.state('antrenori', {
			url: "/antrenori",
			templateUrl:'partials/persoane.html',
			controller:'antrenoriController'
		})
		.state('antrenorInfo', {
			url: "/antrenori/:antrenorId",
			templateUrl:'partials/persoanaInfo.html',
			controller:'antrenorInfoController'
		})
})

