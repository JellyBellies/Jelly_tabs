mainController.controller('PlayCtrl', function($scope, $stateParams, Friends, gameLogic) {
  $scope.gameTitle = 'Go !';
  $scope.randomWordSplit = gameLogic.getFiveLetterWords();
  $scope.checkForWord = 'empty';
  $scope.letter = [];


  
  // var worker = new Worker("js/loaddictionary.worker.js");
  
  // var sql = window.SQL;
  // worker.onmessage = function(e){
  //   console.log(e.data);
  // //   var db = new SQL.Database(e.data);
   
  // // // Prepare a statement
  // //   var stmt = db.prepare("SELECT * FROM dictionary WHERE word = 'pillow'");
  // //   stmt.getAsObject({$start:1, $end:1}); // {col1:1, col2:111}

  // //   // Bind new values
  // //   stmt.bind({$start:1, $end:2});
  // //   while(stmt.step()) { //
  // //       var row = stmt.getAsObject();
  // //       // [...] do something with the row of result
  // //       $scope.checkForWord = row.word;
  // //   }

  // //   db.close();
  // };

  // worker.postMessage();

    var words = [], row = 1;

  var grid = document.querySelector('#main_table');

  /*  $scope.addCell = function(e){
      console.log(angular.element(e.srcElement));  
      return false;
    }*/
    
/*document.getElementByID('').addEventListener('addCell', function(e){
  console.log('lalalla');
})*/


var addings = document.querySelectorAll('*[id^="add_cell_right_"]');


function generateNewCell() {
  var templateDiv = document.createElement('div');
  templateDiv.innerHTML = '<input type="text" row="5" col="2" id="letter_5_2">';
  templateDiv.setAttribute('class', 'col cell');
  return templateDiv;
};

 for (var i = 0 ; i < addings.length; i++){
 addings[i].addEventListener('click', function(e) {
      var a = generateNewCell();
      e.target.parentElement.insertBefore(a, e.target);
  }); 
};
 
 


  grid.addEventListener('submit', function(evt){
   
    for (var i = 0; i < evt.target.length; i++) {
      if(evt.target[i].getAttribute('row')){
        row = Number(evt.target[i].getAttribute('row'));
        if(words[row-1]){
            words[row-1] += evt.target[i].value;
        }else{
          words[row-1] = evt.target[i].value;
        }
        
      }
    };

    var submittedWords = [];
    words.forEach(function(entry) {
      if (entry.length > 2) {
          submittedWords.push(entry);
      }
    });

    try {
        gameLogic.CheckWords(submittedWords);
    } 
    catch(e) { 
      console.log (e);
    } 
        return false;
  }, false);
  
});
