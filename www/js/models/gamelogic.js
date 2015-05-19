mainServices.service('gameLogic', function(FiveLetterWords, $q){
	var gameLogic = {};
	gameLogic.getFiveLetterWords = function(){
		var wordsCount = FiveLetterWords.length;
		var min = 0;
  		var indexNum =  Math.floor(Math.random() * (wordsCount - min) + min);
		
		var randomWord = FiveLetterWords[indexNum];
		var randomWordSplit = randomWord.split("");
		console.log(randomWordSplit);
		return randomWordSplit;
	};

	gameLogic.LoadDatabase = function(){
		var xhr = new XMLHttpRequest('MSXML2.XMLHTTP.3.0');
		var defer = $q.defer();
    	xhr.open('GET', '../go5.sqlite');
    	xhr.responseType = 'arraybuffer';
    	xhr.onreadystatechange = function (e) {
	        if (xhr.readyState === 4) {
	          var uInt8Array = new Uint8Array(this.response);
		        //postMessage(uInt8Array);
		        defer.resolve(uInt8Array);
	        }	
    	}
    	xhr.send();
    	return defer.promise;
  	}
    
    gameLogic.CheckWords = function(words){
    	console.log(words);
    	var dbReady = gameLogic.LoadDatabase();
    	dbReady.then(function(uInt8Array){
    		var sql = window.SQL;
	    	var db = new SQL.Database(uInt8Array);
	    	var points = 0;
	    	
	    	for (i = 0; i < words.length; i++){
		    	  // Prepare a statement
		    	var stmt = db.prepare("SELECT * FROM dictionary WHERE word = '" +words[i].word+"'");
				    stmt.getAsObject({$start:1, $end:1}); // {col1:1, col2:111}

				    // Bind new values

				    stmt.bind({$start:1, $end:2});
				    while(stmt.step()) { 
						       points += words[i].points;
						       console.log('points' + i + ' ' + words[i].word+'  '+ points)
				        var row = stmt.getAsObject();
				        
				    }
			}
			db.close();
			console.log(points);
			return points;
    	});
    	

    }

	return gameLogic;
});