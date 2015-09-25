$(document).ready(function() {



  function getRandomStart(){
      var rand = (Math.floor((Math.random() * 10) + 1));
      if (rand % 2 === 0){
        return [1,0];
      }
      else{
        return [0,1];
      };
    };

  function upDateInstructions(string){
    $("#instructions").text(string);
    return true;
  };

  function person(name, symbol, image, side) {
      this.game = [0,0,0,0,0,0,0,0,0];
      this.name = name;
      this.symbol = symbol;
      this.image = image;
      this.side = side;
      this.getName = function() {
        return this.name;
      };
      this.getImage = function() {
          return this.image;
      };
      this.addToArray=function(num){
        this.game[num]++;
        // alert(this.game);
      };
      this.getSymbol = function() {
            return this.symbol;
      };
      this.resetArray = function(){
        this.game = [0,0,0,0,0,0,0,0,0];
      };
      this.getSide=function(){
        return side;
      };
      this.getArray=function(){
        var tempArray = this.game;
        return tempArray;
      };
      this.checkGame=function(){
        if((this.game[0]+this.game[1]+this.game[2]===3)
        ||(this.game[3]+this.game[4]+this.game[5]===3)
        ||(this.game[6]+this.game[7]+this.game[8]===3)
        ||(this.game[0]+this.game[4]+this.game[8]===3)
        ||(this.game[2]+this.game[4]+this.game[6]===3)
        ||(this.game[0]+this.game[3]+this.game[6]===3)
        ||(this.game[1]+this.game[4]+this.game[7]===3)
        ||(this.game[2]+this.game[5]+this.game[8]===3))
        {
            return true;
        };
      };
    };

  function addHeaderBoard(player1, player2){
      name1 = player1.getName();
      name2 = player2.getName();
      $("h2#player1").text(name1);
      $("h2#player2").text(name2);
      $("#left").append("<h3 id=totalL value=0>0 wins</h3>");
      $("#right").append("<h3 id=totalR value=0>0 wins</h3>");
    };

  function addToScoreBoard(player){
    var name = player.getName();
    var side = player.getSide();
    var totalWins = (parseInt($("#totalL").text()));
    $("#total")
    if (side === 1){
      var totalWins = (parseInt($("#totalL").text()));
      $("#totalL").text((totalWins+1)+" wins");
    }
    else{
      var totalWins = (parseInt($("#totalR").text()));
      $("#totalR").text((totalWins+1)+" wins");
    };
  };

  function resetGame(player1, player2){
    $('.cell>img').remove();
    $('td').off();
    $('div').prop('disabled',false);
    player1.resetArray();
    player2.resetArray();
    playGame(player1, player2);
  };

  function checkStalemate(player1, player2){
      var counter = 0;
      var a = player1.getArray();
      var b = player2.getArray();
      if ($.inArray(1, [b[0], b[1], b[2]]) > -1 && $.inArray(1, [a[0], a[1], a[2]]) > -1){
      counter++};
      if ($.inArray(1, [b[3], b[4], b[5]]) > -1 && $.inArray(1, [a[3], a[4], a[5]]) > -1){
      counter++};
      if ($.inArray(1, [b[6], b[7], b[8]]) > -1 && $.inArray(1, [a[6], a[7], a[8]]) > -1){
      counter++};
      if ($.inArray(1, [b[0], b[3], b[6]]) > -1 && $.inArray(1, [a[0], a[3], a[6]]) > -1){
      counter++};
      if ($.inArray(1, [b[1], b[4], b[7]]) > -1 && $.inArray(1, [a[1], a[4], a[7]]) > -1){
      counter++};
      if ($.inArray(1, [b[2], b[5], b[8]]) > -1 && $.inArray(1, [a[2], a[5], a[8]]) > -1){
      counter++};
      if ($.inArray(1, [b[0], b[4], b[8]]) > -1 && $.inArray(1, [a[0], a[4], a[8]]) > -1){
      counter++};
      if ($.inArray(1, [b[2], b[4], b[6]]) > -1 && $.inArray(1, [a[2], a[4], a[6]]) > -1){
      counter++};
      if (counter === 8){
        return true;
      }
      else{
        return false;
      };
  };

  function onePlay(player, number, id){
    var myName = player.getName();
    var $myO = $("<img/>").attr({class: 'image', src: player.getImage()});
    $("#"+id).append($myO);
    $("#"+id).off();
    player.addToArray(number);
    if (player.checkGame()){
      alert(myName+" wins this one!");
      upDateInstructions(myName+" won the last round!");
      addToScoreBoard(player);
      if(confirm("Would you like to play again?")){
        // alert("yes");
        return true;
      }
      else{
        upDateInstructions(myName+"Game Over");
        return false;
      };
    }
    else{
        return false;
    };
  };


  function playGame(player1, player2){
      var myToken;
      if (player1.getSymbol === 1){
        myToken = "X"
      }
      else{
        myToken = "O"
      };
      upDateInstructions(player1.getName()+" plays first");
      $('.cell>img').remove();
      $('div').prop('disabled',false);
      player1.resetArray();
      player2.resetArray();
      var myTurn=true;
      $(".cell").click(function (event){
        var cellNum = clean(this.id);
        if (myTurn){
          if (onePlay(player1, cellNum, this.id)){
            resetGame(player2, player1);
          }
          else{
            if (checkStalemate(player1, player2)){
              upDateInstructions("Last round was a STALEMATE");
              if(confirm("Stalemate. Would you like to play again?")){
                resetGame(player2, player1);
              };
            };
          };
        }
        else{
          if(onePlay(player2, cellNum, this.id)){
            resetGame(player2, player1);
          }
          else{
            if (checkStalemate(player2, player2)){
              upDateInstructions("Last round was a STALEMATE");
              if(confirm("Stalemate. Would you like to play again?")){
                resetGame(player2, player1);
              };
          };
        };
      }
      myTurn = !myTurn;
       });
    };

  function clean(id){
    return parseInt(id.substr(id.length - 1));
  };

  //main

  $("#start").click(function (event){
    var myImages = ["o-icon.png", "x-icon.png"]
    var symbols = (getRandomStart());
    var playorder = (getRandomStart());

    upDateInstructions("Let's find out who is playing today!");
    //get two names
    $(this).off();
    var name1 = prompt("Please enter the first players name");
    var name2 = prompt("Please enter the second players name");

    upDateInstructions("I'm tossing a coin to see who goes first!")

    if (playorder[0] === 1){
      var player1 = new person(name1, symbols[0], myImages[symbols[0]], 1);
      var player2 = new person(name2, symbols[1], myImages[symbols[1]], 0);
    }
    else{
      var player1 = new person(name2, symbols[0], myImages[symbols[0]], 1);
      var player2 = new person(name1, symbols[1], myImages[symbols[1]], 0);
    };

    var firstsymbol = symbols[0];
    if (firstsymbol === 1){ firstsymbol = "X"}
    else{firstsymbol = "0"};

    upDateInstructions(player1.getName()+" will play first with "+firstsymbol);

    addHeaderBoard(player1, player2);
    playGame(player1, player2);
    $("#reset").click(function (event){
        if(confirm("are you sure?")){
          resetGame(player1, player2);
        };
    });
  });
});
