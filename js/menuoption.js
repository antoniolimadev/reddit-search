var menuOption = "Search '%s' on Reddit";
var id = chrome.contextMenus.create({"title": menuOption, "contexts":["selection"], "onclick": searchQuery});


chrome.commands.onCommand.addListener(function(command) {
	chrome.tabs.executeScript( {
	    code: "window.getSelection().toString();"
	}, function(selection) {
	    hotkeySearch(selection[0]);
	});
});