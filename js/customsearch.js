//var domain = "";

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
  
	var searchquery = document.getElementById('searchquery').value;
	var searchsite = document.getElementById('searchsite').value;
	var searchsubreddit = document.getElementById('searchsubreddit').value;

	//customsearch(searchquery, searchsite, searchsubreddit);
});


/*
	MUST PUT contextMenus.menuOption SOMEWHERE ELSE
*/