function searchQuery(info, tab){
    searchFromPage(searchMethod,info,tab);
}

function searchFromPage(callback, info, tab){
  
  chrome.storage.sync.get(null, (items) => {
    
    var searchOptions = {
    	"sort": items.sortedByOption,
	    "links": items.linksFromOption,
	    "nsfw": items.nsfwOption,
	    "newtab": items.sametabOption
    }

    callback(searchOptions, info, tab)
  });
}

function searchMethod(searchOptions, info, tab){
  var terms = info.selectionText;

  terms = terms.replace( /^\s+|\s+$/g, "" );

  if( terms.length < 1 )
    return false;

  makeQuery(terms, searchOptions);
}

function customsearch(searchTerms){

	saerchFromCustom(customSearchMethod, searchTerms);
}

function saerchFromCustom(callback, searchTerms){
  
  chrome.storage.sync.get(null, (items) => {
    
    var searchOptions = {
    	"sort": items.sortedByOption,
	    "links": items.linksFromOption,
	    "nsfw": items.nsfwOption,
	    "newtab": items.sametabOption
    }

    callback(searchOptions, searchTerms)
  });
}

function customSearchMethod(searchOptions, searchTerms){

  var terms = searchTerms.searchquery;
  terms = terms.replace( /^\s+|\s+$/g, "" );

  if( terms.length < 1 )
    terms = "";
	
  makeQuery(terms, searchOptions, searchTerms);
}

function makeQuery(terms, searchOptions, refine){

  // checks if the expression to search comes from TERMS or REFINE.SEARCHQUERY
  if (refine.searchquery) { //if it's empty
  	terms = refine.searchquery;
  }
  var refineOptions = "";

  // adds a subreddit filter, if exists
  if (refine.searchsubreddit) {
  	refineOptions += "+subreddit%3A";
  	refineOptions += refine.searchsubreddit; 
  }
  // adds a website filter, if exists
  if (refine.searchsite) {
  	refineOptions += "+site%3A";
  	refineOptions += refine.searchsite;
  }

  var optionsQuery = "";
  optionsQuery += refineOptions;

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

  // adds nsfw filter
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
   launchSearchTab(terms, optionsQuery, searchOptions.newtab);
}

function launchSearchTab(terms, optionsQuery, newtab){

  chrome.tabs.create({ "url":"http://www.reddit.com/search?q=" + encodeURIComponent(terms) + optionsQuery,
               "selected":!newtab
  });
}