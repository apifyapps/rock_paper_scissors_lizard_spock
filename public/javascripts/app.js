var rulesUrl = "http://apify.heroku.com/api/rpslsrules.json?callback=?";
var player1Score = 0;
var player2Score = 0;
var player1Type = 'You';
var player2Type = 'Computer';
var player1 = '';
var player2 = '';
var rules = [];
var options = ['Rock', 'Paper', 'Scissors', 'Lizard', 'Spock'];
$(function(){
  // Random utils
  function getRandomNumber(maxValue){
    return Math.floor(Math.random() * maxValue);
  }
  // Load rules
  $.getJSON(rulesUrl, function(data){
    rules = JSON.parse(data);
    $('area').click(function(){
      player1 = $(this).attr('title');
      player2 = options[getRandomNumber(options.length)];
      showResults(player1, player2);
    });
  });
  
  function showResults(player1, player2){
    var result = _.find(rules, function(rule){return rule.player1 == player1 && rule.player2 == player2});
    if(result.result1 == '1'){
      player1Score += 100;
      updateResult(player1Type + ' Won!!!');
    } else if (result.result2 == '1'){
      player2Score += 100;
      updateResult(player2Type + ' Won!!!');
    } else {
      updateResult('Tie');
    }
  }

  function updateResult(result){
    $('.vs').html('Vs')
    $('.player1type').html(player1Type);
    $('.player2type').html(player2Type);
    $('.player1choice').html(player1);
    $('.player2choice').html(player2);
    $('.player1score .points').html(player1Score);
    $('.player2score .points').html(player2Score);
    $('.result').html(result);
  }
});