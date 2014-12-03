// public/core.js
var nodeTodo = angular.module('nodeTodo', [])

nodeTodo.controller('MainController',['$scope', '$http', function($scope, $http) {
  $scope.formData = {};

  //get all todos and display on page load
  $http.get('/api/todos')
    .success(function(data){
      $scope.todos = data;
      console.log(data);
    })
    .error(function(data){
      console.log('Error: ' + data);
    });

  // on submit send data to API
  $scope.createTodo = function() {
    $http.post('/api/todos', $scope.formData)
      .success(function(data){
        $scope.formData = {}; //clear the form
        $scope.todos = data;
        console.log(data);
      })
      .error(function(data){
        console.log('Error: ' + data);
      });
  };

  // delete a todos
  $scope.deleteTodo = function(id) {
    $http.delete('/api/todos/' + id)
      .success(function(data) {
        $scope.todos = data;
        console.log(data);
      })
      .error(function(data){
        console.log('Error: ' + data);
      });
  };
}]);
