var app = angular.module("todoApp", ["ngRoute"]);



app.controller("control", function($scope){
        $scope.todosJSON = localStorage.getItem("todoList");
        $scope.todos = (localStorage.getItem("todoList") !== null) ? JSON.parse($scope.todosJSON) : [];
        localStorage.setItem("todoList", JSON.stringify($scope.todos));
        $scope.subject = "";

        $scope.add = function(){
                $scope.todos.push({"subject": $scope.subject, "status": false});
                $scope.subject = "";
                localStorage.setItem("todoList", JSON.stringify($scope.todos));
        }

        $scope.update = function(){
                localStorage.setItem("todoList", JSON.stringify($scope.todos));
                if ($scope.countStatus() == 0) {
                        $scope.toggleAll = true;
                } else {
                        $scope.toggleAll = false;
                }
        }

        $scope.countStatus = function(){
		var count = 0;
		angular.forEach($scope.todos, function(todo){
			count += todo.status ? 0 : 1;
		});
		return count;
	}

        if ($scope.countStatus() == 0 && $scope.todos != 0) {
                $scope.toggleAll = true;
        }

        $scope.checking = function(){
                if ($scope.toggleAll == true) {
                        var allTodos = $scope.todos;
                        $scope.todos = [];
                        angular.forEach(allTodos, function(todo){
                                $scope.todos.push({"subject": todo.subject, "status": true});
                        });
                        localStorage.setItem("todoList", JSON.stringify($scope.todos));
                } else {
                        var allTodos = $scope.todos;
                        $scope.todos = [];
                        angular.forEach(allTodos, function(todo){
                                $scope.todos.push({"subject": todo.subject, "status": false});
                        });
                        localStorage.setItem("todoList", JSON.stringify($scope.todos));
                }
        }

        $scope.removeOne = function(a) {
		$scope.todos.splice(a, 1);
		localStorage.setItem("todoList", JSON.stringify($scope.todos));
                if ($scope.countStatus() == 0) {
                        $scope.toggleAll = true;
                } else {
                        $scope.toggleAll = false;
                }
	}

        $scope.removeAll = function() {
		var allTodos = $scope.todos;
		$scope.todos = [];
		angular.forEach(allTodos, function(todo){
			if (!todo.status){
                                $scope.todos.push(todo);
                        }
		});
		localStorage.setItem("todoList", JSON.stringify($scope.todos));
	}
});
