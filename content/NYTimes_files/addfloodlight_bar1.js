(function (global) {
    "use strict";

    var $;

    // -----------------------------------------
    // ------      Select NYT4/NYT5       ------

    function isNyt5() {
        var nyt5meta = document.getElementsByName('sourceApp');
        var nytApps = {'nyt-v5': true , 'blogs': true};
        return (typeof nyt5meta[0] !== "undefined") && (nyt5meta[0].getAttribute('content') in nytApps) ;
    }

    if (isNyt5()) {
        require(['foundation/main'], function () {
            $ = require('jquery/nyt');
            run($);
        });
    } else {
        $ = window.NYTD && window.NYTD.jQuery || window.jQuery;
        run($);
        
    }

	// -----------------------------------------
	// ------  Add iCrossing Floodlight  ------

	function run($) {
			function addFloodlight(){
  				var axel = Math.random() + "";
  				var a = axel * 10000000000000;

  				document.getElementById('mkt-floodlight').innerHTML = '<iframe src="https://3951336.fls.doubleclick.net/activityi;src=3951336;type=remar664;cat=Bar1J0;ord=' + a + '?" width="1" height="1" style="display:none;"></iframe>';
			}
			
			addFloodlight();
	}
})(window);