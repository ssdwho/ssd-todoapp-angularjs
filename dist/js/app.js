(function(){
	'use strict';

	angular
		.module('todoApp', [

		]);

}());

(function(){
	'use strict';

	angular
		.module('todoApp')
		.controller('control', control)

	function control($scope, $location){
		$scope.todosJSON = localStorage.getItem("todoList");
		$scope.todos = (localStorage.getItem("todoList") !== null) ? JSON.parse($scope.todosJSON) : [];
		$scope.reset = (localStorage.getItem("todoList") !== null) ? JSON.parse($scope.todosJSON) : [];
		localStorage.setItem("todoList", JSON.stringify($scope.todos));
		$scope.path = $location.path().split("/")[1] || "all";

		/** Add Todo */
		$scope.add = function(){
			$scope.todos.push({"subject": $scope.subject, "status": false});
			$scope.subject = "";
			localStorage.setItem("todoList", JSON.stringify($scope.todos));

			$scope.todosJSON = localStorage.getItem("todoList");
			$scope.reset = (localStorage.getItem("todoList") !== null) ? JSON.parse($scope.todosJSON) : [];
		}

		/** Todo Update */
		$scope.update = function(){
			localStorage.setItem("todoList", JSON.stringify($scope.todos));
			if ($scope.countStatus() == 0) {
				$scope.toggleAll = true;
			} else {
				$scope.toggleAll = false;
			}
		}

		/** Counter */
		$scope.countStatus = function(){
			var count = 0;
			angular.forEach($scope.todos, function(todo){
				count += todo.status ? 0 : 1;
			});
		return count;
		}

		if ($scope.countStatus() == 0 && $scope.todos != 0) {
			$scope.toggleAll = true;
		} else if ($scope.todos == 0) {
			$scope.toggleAll = false;
		}

		/** Checking */
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

		/** Remove One Todo */
		$scope.removeOne = function(a) {
			$scope.todos.splice(a, 1);
			localStorage.setItem("todoList", JSON.stringify($scope.todos));
			if ($scope.countStatus() == 0 && $scope.todos != 0) {
				$scope.toggleAll = true;
			} else if ($scope.todos == 0) {
				$scope.toggleAll = false;
			} else {
				$scope.toggleAll = false;
			}
		}

		/** Remove All Todos */
		$scope.removeAll = function() {
			var allTodos = $scope.todos;
			$scope.todos = [];
			angular.forEach(allTodos, function(todo){
				if (!todo.status){
					$scope.todos.push(todo);
				}
			});
			$scope.toggleAll = false;
			localStorage.setItem("todoList", JSON.stringify($scope.todos));
		}
	}
}());
(function () {
	'use strict';

	angular
		.module ('todoApp')
		.directive("focus", ["$timeout",
			function ($timeout) {
				return {
					restrict: 'A',
					link: function (scope, element) {
						$timeout(function () {
							element[0].focus();
						});
					}
				};
			}
			]);

	angular
		.module ('todoApp')
		.directive("escape", function() {
			return {
				restrict: 'A',
				link: function (scope, element, attrs) {
					element.bind("keydown  keypress", function (event) {
						if (event.keyCode === 27) {
							scope.$apply(function (){
								scope.$eval(attrs.escape);
							});
							event.preventDefault();
						}
					});
				}
			};
			});
} ());