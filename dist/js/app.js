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
		.controller('controller', control)

	function control($scope){
		var _this = this;
		this.todos = JSON.parse(localStorage.getItem("todoList")) || [];

		$scope.$watch(function() {
			return _this.todos;
		}, function(newValue, oldValue) {
			if (angular.isObject(newValue)) {
				localStorage.setItem('todoList', JSON.stringify(newValue));
				_this.toggleAll = !!_this.countStatus();
			}
		}, true);

		/** Add Todo */
		this.add = function(){
			this.todos.push({ "subject": this.subject, "status": false });
			this.subject = '';
		}

		/** Counter */
		this.countStatus = function() {
			return this.todos.filter(function(todo) { return todo.status == false; }).length;
		}

		/** Checking */
		this.checking = function() {
			this.todos = this.todos.map(function(todo) {
				todo.status = _this.toggleAll;

				return todo;
			});
		}

		/** Remove One Todo */
		this.removeOne = function(index) {
			this.todos.splice(index, 1);
		}

		/** Remove Done Todos */
		this.removeDoneTodos = function() {
			this.todos = this.todos.filter(function(todo) {
				return todo.status === false;
			});
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