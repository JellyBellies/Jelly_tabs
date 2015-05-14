mainController.controller('DaGameCtrl', function($scope, $stateParams, Friends) {
  $scope.gameTitle = 'My Game';
  $scope.button_say = function(){
  	$scope.hide_input = true; 
  	$scope.show_sentence = true;
  }
  $scope.button_go_back = function(){
  	$scope.hide_input = false;
  	$scope.show_sentence = false;
  }
});
