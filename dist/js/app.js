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
		var todosJson = JSON.parse(localStorage.getItem("todoList")) || [];

		$scope.todos = todosJson;

		$scope.$watch('todos', function(newValue, oldValue) {
			if (angular.isObject(newValue)) {
				localStorage.setItem('todoList', JSON.stringify(newValue));
			}
		}, true);

		$scope.path = $location.path().split("/")[1] || "all";

		/** Add Todo */
		$scope.add = function(){
			$scope.todos.push({ "subject": $scope.subject, "status": false });
		}

		/** Todo Update */
		$scope.update = function(){
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
			$scope.todos = $scope.todos.map(function(todo) {
				todo.status = $scope.toggleAll;

				return todo;
			});
		}

		/** Remove One Todo */
		$scope.removeOne = function(a) {
			$scope.todos.splice(a, 1);
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