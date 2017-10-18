function searchQuery(info, tab){

	var searchOptions = {
        sort: "",
        nsfw: false
    }
    var terms = info.selectionText;

	terms = terms.replace( /^\s+|\s+$/g, "" );

	if( terms.length < 1 )
		return false;

	chrome.storage.sync.get({
		sortedByOption: 'relevance',
		nsfw: true
	}, function(items) {
		
		searchOptions.sort = items.sortedByOption;
		searchOptions.nsfw = items.nsfw;
		
		makeQuery(terms, searchOptions);
	});

	//if( terms.length < 1 )
	//	return false;

	/*if (searchOptions.nsfw == true) {

		console.log(searchOptions.nsfw);
		optionsQuery = nsfwOn;
	}

 	chrome.tabs.create({ "url":"http://www.reddit.com/search?q=" + encodeURIComponent(terms) + optionsQuery,
 		 				 "selected":true
	});*/
}

function makeQuery(terms, searchOptions){

	var optionsQuery = "";
	var nsfwOn = "&restrict_sr=&include_over_18=on";

	if (searchOptions.nsfw == true) {

		optionsQuery = nsfwOn;
	}

 	chrome.tabs.create({ "url":"http://www.reddit.com/search?q=" + encodeURIComponent(terms) + optionsQuery,
 		 				 "selected":true
	});
}

var menuOption = "Search on Reddit";
var id = chrome.contextMenus.create({"title": menuOption, "contexts":["selection"], "onclick": searchQuery});