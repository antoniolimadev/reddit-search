function searchQuery(info, tab){

	var searchOptions = {
        
        sort: "1",
        links: "6",
        nsfw: false,
        newtab: false
    }
    var terms = info.selectionText;

	terms = terms.replace( /^\s+|\s+$/g, "" );

	if( terms.length < 1 )
		return false;

	chrome.storage.sync.get({
		
		sortedByOption: "1",
		linksFromOption: "6",
		nsfwOption: false,
		sametabOption: false

	}, function(items) {
		
		searchOptions.sort = items.sortedByOption;
		searchOptions.links = items.linksFromOption;
		searchOptions.nsfw = items.nsfwOption;
		searchOptions.newtab = items.sametabOption;

		makeQuery(terms, searchOptions);
	});
}

function makeQuery(terms, searchOptions){

	var optionsQuery = "";
	var nsfwOn = "&restrict_sr=&include_over_18=on";

	//sort type
	var sortByRelevance = "&sort=relevance";
	var sortByTop = "&sort=top";
	var sortByNew = "&sort=new";
	var sortByComments = "&sort=comments";

	var linksFromHour = "&t=hour";
	var linksFromDay = "&t=day";
	var linksFromWeek = "&t=week";
	var linksFromMonth = "&t=month";
	var linksFromYear = "&t=year";
	var linksFromAll = "&t=all";

	if (searchOptions.nsfw == true) {
		optionsQuery += nsfwOn;
	}

	switch(searchOptions.sort){

		case "1":
			optionsQuery += sortByRelevance;
			break;
		case "2":
			optionsQuery += sortByTop;
			break;
		case "3":
			optionsQuery += sortByNew;
			break;
		case "4":
			optionsQuery += sortByComments;
			break;
		default:
			optionsQuery += "";
	}

	switch(searchOptions.links){

		case "1":
			optionsQuery += linksFromHour;
			break;
		case "2":
			optionsQuery += linksFromDay;
			break;
		case "3":
			optionsQuery += linksFromWeek;
			break;
		case "4":
			optionsQuery += linksFromMonth;
			break;
		case "5":
			optionsQuery += linksFromYear;
			break;
		case "6":
			optionsQuery += linksFromAll;
			break;
	}

 	chrome.tabs.create({ "url":"http://www.reddit.com/search?q=" + encodeURIComponent(terms) + optionsQuery,
 		 				 "selected":!searchOptions.newtab
	});
}

var menuOption = "Search on Reddit";
var id = chrome.contextMenus.create({"title": menuOption, "contexts":["selection"], "onclick": searchQuery});