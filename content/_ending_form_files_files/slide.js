var count = 1;

$(document).ready(function() {

  var b = $(".bottom-arrow");

  var u = $(".up-arrow");

  b.click(function(e) {
    if ($(".slide" + (+count + 1)).length) {
			count++;
      goToByScroll("slide" + count);

      b.html('<span class="arrow-bounce">&#x25BC;</span>');
			u.html('<span class="arrow-bounce">&#x25B2;</span>');
    } else {
			$("#submitnarrative").submit;
		}

		if(!($(".slide" + (+count+1)).length)) {
      b.html('<span class="arrow-bounce">&#x276d;</span>');
    }

  });
  u.click(function(e) {
    if (count > 1) {
      count--;
      goToByScroll("slide" + count);

			b.html('<span class="arrow-bounce">&#x25BC;</span>');
      u.html('<span class="arrow-bounce">&#x25B2;</span>');
    } else {

		}

		if (count == 1){
      u.html('<span class="arrow-bounce">&#x27b0;</span>');
    }
  });
})
