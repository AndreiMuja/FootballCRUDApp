/*global angular*/
var app = angular.module("antrenoriController",["ui.router"]);

var SERVER = 'https://workspaceandrei-1994-muja.c9.io'

app.controller('antrenoriController', function($scope, $http, $state){
	$scope.constructor = function(){
		$http.get(SERVER + '/antrenori')
			.then(function(response) {     
			    console.log(response.data)
				$scope.antrenori = response.data
			})
			.catch(function(response){
				console.log(response)
				$scope.status = 'error'
			})		  	
	}

	$scope.addAntrenor = function(antrenor){
		$http.post(SERVER + '/antrenori',antrenor)
			.then(function(response) {     
				$state.go($state.current, {}, {reload: true})
			})
			.catch(function(response){
				console.log(response)
				$scope.status = 'error'
			})		
	}

    $scope.deleteAntrenor = function(antrenor){
		$http.delete(SERVER + '/antrenori/ ' + antrenor.id)
			.then(function(response) {     
				$state.go($state.current, {}, {reload: true})
			})
			.catch(function(response){
				console.log(response)
				$scope.status = 'error'
			})		
	}
	
	$scope.selected = {}
	$scope.getTemplate = function(antrenor) {
		if (antrenor.id === $scope.selected.id){
			return 'edit'
		}  
		else{ 
			return 'display'
		}
	}
	
	$scope.editAntrenor = function (antrenor) {  
	    $scope.selected = angular.copy(antrenor)
	}
	
	 $scope.saveAntrenor = function(antrenor){
		$http.put(SERVER + '/antrenori/' + antrenor.id, antrenor)
			.then(function(response) {     
				$state.go($state.current, {}, {reload: true})
			})
			.catch(function(response){
				console.log(response)
				$scope.status = 'error'
			})		
	}

	$scope.constructor();
})