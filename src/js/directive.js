app.directive("focus", ["$timeout",
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

app.directive("escape", function() {
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