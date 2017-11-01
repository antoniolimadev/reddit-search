function fill_info(){

	chrome.tabs.query({'active': true, 'lastFocusedWindow': true}, function (tabs) {
    
	    //get url from current active tab	    
	    var url = new URL(tabs[0].url);
	    //convert it to a string
	    var dec = decodeURIComponent(url);
	    // filter for "chrome://"
	    var filter = dec.startsWith("http");

	    // if the url is clean
  		if (filter) {
			// extract the domain and put it on the 'searchsite' box
  			var domain = url.hostname;
  			document.getElementById('searchsite').value = domain;
  		}	    
	});
}
document.addEventListener('DOMContentLoaded', fill_info);

var botao = document.getElementById('btnSearch');

botao.addEventListener('click', function funcSearch() {

	var searchTerms = {
    	"searchquery": document.getElementById('searchquery').value,
	    "searchsite": document.getElementById('searchsite').value,
	    "searchsubreddit": document.getElementById('searchsubreddit').value
    }
    // if all fields are empty
    if (!searchTerms.searchquery &&
    	!searchTerms.searchsite &&
    	!searchTerms.searchsubreddit) {
	    // tell user there's no input
	}
	else{
		//implemented on search.js
		customsearch(searchTerms);
	}
});

// user can press Esc to exit popup
var bodypopup = document.getElementById('bodypopup');

bodypopup.addEventListener('keydown', function closePopup(event) {

	if (event.keyCode == 27) {
    	window.close();
	}
});