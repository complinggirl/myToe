$(document).ready(function() {

  function getRandomStartSymbol(){
      var rand = (Math.floor((Math.random() * 10) + 1));
      if (rand % 2 === 0){
        return [1,0];
      }
      else{
        return [0,1];
      };
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
      alert(name1+" "+name2);
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
      // $("ul#"+name).append('<li>Win!</li>');
      // $('.cell>img').remove();
  };

  function resetGame(player1, player2){
    alert(player1.getName()+" "+player1.getSymbol());
    //remove images
    $('.cell>img').remove();
    $('td').off();
    $('div').prop('disabled',false);
    player1.resetArray();
    player2.resetArray();
    playGame(player1, player2);
  };


  function onePlay(player, number, id){
    var myName = player.getName();
    var $myO = $("<img/>").attr({class: 'image', src: player.getImage()});
    $("#"+id).append($myO);
    $("#"+id).off();
    player.addToArray(number);
    if (player.checkGame()){
      alert(myName+" wins this one!");
      addToScoreBoard(player);
      if (confirm("would you like to play again?"));
        // alert("yes");
        return true;
    }
    else{
        return false;
    };
  }

  function playGame(player1, player2){
      var moveCounter=0;
      $('.cell>img').remove();
      $('div').prop('disabled',false);
      player1.resetArray();
      player2.resetArray();
      var myTurn=true;
      $(".cell").click(function (event){
        moveCounter++;
        var cellNum = clean(this.id);
        if (myTurn){
          if (onePlay(player1, cellNum, this.id)){
            resetGame(player2, player1);
          }
          else{
            if (moveCounter===9){
              alert("stalemate!");
              if(confirm("play again?")){
                resetGame(player2, player1);
              };
            };
          };
        }
        else{
          if(onePlay(player2, cellNum, this.id)){
            resetGame(player1, player2);
          }
          else{
            if (moveCounter===9){
              alert("stalemate!");
              if(confirm("play again?")){
                resetGame(player1, player2);
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
    var symbols = (getRandomStartSymbol());

    //get two names
    var name1 = prompt("Please enter the first players name");
    var name2 = prompt("Please enter the first players name");
    $(this).off();

    var player1 = new person(name1, symbols[0], myImages[symbols[0]], 1);
    var player2 = new person(name2, symbols[1], myImages[symbols[1]], 0);
    addHeaderBoard(player1, player2);
    playGame(player1, player2);
    $("#reset").click(function (event){
        if(confirm("are you sure?")){
          resetGame(player1, player2);
        };
    });
  });
});
