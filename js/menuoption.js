var menuOption = "Search on Reddit";
var id = chrome.contextMenus.create({"title": menuOption, "contexts":["selection"], "onclick": searchQuery});