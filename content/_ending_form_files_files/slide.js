var count = 1;

var max = 7;

//function onNext()

//function onPrev(){}

$(document).ready(function(){
    $(".bottom-arrow").click(function (e) {
        if(count < max)
          count++;
        goToByScroll("slide" + count);
        //    console.log("#slide" + count);

    });
    $(".up-arrow").click(function (e){
        if (count > 1)
          count--;
        goToByScroll("slide" + count);
          //  console.log("#slide" + count);

    });

})
