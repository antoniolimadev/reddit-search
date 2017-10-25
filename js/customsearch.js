function fill_info(){

	chrome.tabs.query({'active': true, 'lastFocusedWindow': true}, function (tabs) {
    
	    //get the current url, extract the domain and put it on the 'searchsite' box

	    var url = new URL(tabs[0].url);
  		var domain = url.hostname;

	    document.getElementById('searchsite').value = domain;
	});
}

document.addEventListener('DOMContentLoaded', fill_info);

var botao = document.getElementById('btnSearch');

botao.addEventListener('click', function myFunction() {
  
	var searchTerms = {
    	"searchquery": document.getElementById('searchquery').value,
	    "searchsite": document.getElementById('searchsite').value,
	    "searchsubreddit": document.getElementById('searchsubreddit').value
    }

	customsearch(searchTerms);
});