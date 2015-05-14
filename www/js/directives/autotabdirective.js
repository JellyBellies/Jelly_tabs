var Directives = angular.module('starter.directives', [])

Directives.directive('autoTabTo', [function () {
  return {
    restrict: "A",
    link: function (scope, el, attrs) {
      var input_list = el.find('input');
      angular.forEach(input_list, function(input_element,key){
        input_element.onkeyup = function(e) {
          if (e.which == 8  && this.value ==''){
            var element = input_list[key-1];
            if (element)
              element.focus();
          }
          if (this.value.length === +attrs.maxLength) {
            var element = input_list[key+1];
            if (element)
              element.focus();
          }
        };  
      });
      
    }
  }
}]);