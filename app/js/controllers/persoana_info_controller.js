/*global angular*/
var app = angular.module("antrenorInfoController",["ui.router"]);

var SERVER = 'https://workspaceandrei-1994-muja.c9.io'

app.controller('antrenorInfoController', function($scope, $http, $state,  $stateParams){
	$scope.constructor = function(){
		$http.get(SERVER + '/antrenori/' + $stateParams.antrenorId)
		.then(function(response) {     
		    console.log(response.data)
			$scope.antrenor = response.data
			return $http.get(SERVER + '/antrenori/' + $scope.antrenor.id + '/jucatori')
		})
		.then(function(response){
			console.log(response.data)
			$scope.antrenor.jucatori = response.data
		})
		.catch(function(response){
			console.log(response)
			$scope.status = 'error'
		})			  
	}
	
	$scope.addJucator = function(jucator){
		$http.post(SERVER + '/antrenori/' + $stateParams.antrenorId + '/jucatori',jucator)
			.then(function(response) {     
				$state.go($state.current, {}, {reload: true})
			})
			.catch(function(response){
				console.log(response)
				$scope.status = 'error'
			})		
	}

    $scope.deleteJucator = function(jucator){
		$http.delete(SERVER + '/antrenori/' +  $stateParams.antrenorId + '/jucatori/' + jucator.id)
			.then(function(response) {     
				$state.go($state.current, {}, {reload: true})
			})
			.catch(function(response){
				console.log(response)
				$scope.status = 'error'
			})		
	}
	
	$scope.selected = {}
	$scope.getTemplate = function(jucator) {
		if (jucator.id === $scope.selected.id){
			return 'edit'
		}  
		else{ 
			return 'display'
		}
	}
	
	$scope.editJucator = function(jucator) {
	    $scope.selected = angular.copy(jucator)
	}
	
	 $scope.saveJucator = function(jucator){
	 	console.log('sending')
	 	console.log(jucator)
		$http.put(SERVER + '/antrenori/' +  $stateParams.antrenorId + '/jucatori/' + jucator.id, jucator)
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