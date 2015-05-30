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


var addings = document.querySelectorAll('*[id^="add_cell_"], *[id^="remove_cell_"]');


function generateNewCell(cellParams) {
  var lastChar = cellParams.id.slice(-1);
  
  if (cellParams.id.search("right") > -1) {
    var col = parseInt(cellParams.previousElementSibling.previousElementSibling.firstElementChild.getAttribute('col')) + 1 ;
  } else {
    
    var col = parseInt(cellParams.nextElementSibling.nextElementSibling.firstElementChild.getAttribute('col')) - 1 ;
  }
  var templateDiv = document.createElement('div');
  templateDiv.innerHTML = '<input type="text" row="'+lastChar+'" col="'+col+'" id="letter_'+lastChar+'_'+col+'">';
  templateDiv.setAttribute('class', 'col cell');
  return templateDiv;
};

 for (var i = 0 ; i < addings.length; i++){
 addings[i].addEventListener('click', function(e) {
   
      var a = generateNewCell(e.target);
    if (e.target.id.search("right") > -1) {
        if (e.target.id.search("remove") > -1  && (e.target.previousElementSibling.firstElementChild.getAttribute('col') < 1 || e.target.previousElementSibling.firstElementChild.getAttribute('col') > 5) ){
          e.target.parentElement.removeChild(e.target.previousElementSibling);
        } 
        if (e.target.id.search("add") > -1 ) {
         e.target.parentElement.insertBefore(a, e.target.previousElementSibling.previousElementSibling.nextSibling);
        }
    } else {
      console.log(e.target.id.slice(-1));
      if(e.target.id.search("remove") > -1 && (e.target.nextElementSibling.firstElementChild.getAttribute('col') < 1 || e.target.previousElementSibling.firstElementChild.getAttribute('col') > 5) ) {
        e.target.parentElement.removeChild(e.target.nextElementSibling);
      }  
      if (e.target.id.search("add") > -1 ) {
        e.target.parentElement.insertBefore(a, e.target.nextSibling.nextSibling.nextSibling);

      }
    }
  }); 
};
 
 


  grid.addEventListener('submit', function(evt){
   
    var wordsAndPoints = [];

    for (var i = 0; i < evt.target.length; i++) {
      if(evt.target[i].getAttribute('row')){
        row = Number(evt.target[i].getAttribute('row'));
        col = Number(evt.target[i].getAttribute('col'));

        if(wordsAndPoints[row-1]){
          console.log('adding 5');
            wordsAndPoints[row-1].word += evt.target[i].value;
            if(evt.target[i].value.length > 0){
              if (col > 5 || col < 1 ){
                wordsAndPoints[row-1].points += -1;
              }  else {
                wordsAndPoints[row-1].points += 5;
              }            
            }

                 
          //  console.log(evt.target[i]);
        }else{
          wordsAndPoints[row-1] = {word:evt.target[i].value};
          if(wordsAndPoints[row-1].word){
            console.log('setting points 5');
               if(evt.target[i].value.length > 0){
              if (col > 5 || col < 1 ){
                wordsAndPoints[row-1].points = -1;
              }  else {
                wordsAndPoints[row-1].points = 5;
              }            
            }
          }
        //  console.log(evt.target[i]);
        }
        
      }
    };

    var submittedWords = [];
console.log(wordsAndPoints);

    wordsAndPoints.forEach(function(entry) {
      if (entry.word.length > 2) {
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
