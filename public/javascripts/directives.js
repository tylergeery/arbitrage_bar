angular.module('wildcat').directive('flipManager', function () {
    return {
        restrict: 'A',
        link: function (scope, element, attrs) {
            element.tagsManager();
            //whatever other logic would go here
        }
    };
});