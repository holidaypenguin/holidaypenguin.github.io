

$(document).ready(function(){
  console.log('====开发====');

  bindSearchKeyBoard();
});

function bindSearchKeyBoard(){

  var oldTime = 0;
  var newTime = 0;
  var clickTimes = 0;

  $(document).keydown(function(e){
    var key = e.key;
    if(key !== 'f') {
      return;
    }

    newTime = Date.now();

    if((newTime - oldTime > 300) || clickTimes >= 2) {
      clickTimes = 1;
    } else {
      clickTimes++;
    }

    oldTime = newTime;

    if(clickTimes >= 2) {
      $('.popup-trigger').click();
    }

  });
}
