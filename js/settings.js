// Saves options to chrome.storage
function save_options() {
  
  var sortedBy = document.getElementById('sortedBy').value;
  var linksFrom = document.getElementById('linksFrom').value;
  var nsfw = document.getElementById('nsfw').checked;
  var sametab = document.getElementById('sametab').checked;
  var currentUrl = document.getElementById('currentUrl').checked;
  
  chrome.storage.sync.set({
    
    sortedByOption: sortedBy,
    linksFromOption: linksFrom,
    nsfwOption: nsfw,
    sametabOption: sametab,
    currentUrlOption: currentUrl
  
  }, function() {
    // Update status to let user know options were saved.
    var status = document.getElementById('status');
    status.textContent = 'Settings saved.';
    setTimeout(function() {
      status.textContent = '';
    }, 1000);
  });
}

// Restores select box and checkbox state using the preferences
// stored in chrome.storage.
function restore_options() {

  // ------- default values -------
  // sortedBy = 'relevance' (1)
  // linksFrom = 'all time' (6)
  // nsfw = false
  // sametab = true
  
  chrome.storage.sync.get({

    sortedByOption: 1,
    linksFromOption: 6,
    nsfwOption: false,
    sametabOption: true,
    currentUrlOption: true

  }, function(items) {

    document.getElementById('sortedBy').value = items.sortedByOption;
    document.getElementById('linksFrom').value = items.linksFromOption;
    document.getElementById('nsfw').checked = items.nsfwOption;
    document.getElementById('sametab').checked = items.sametabOption;
    document.getElementById('currentUrl').checked = items.currentUrlOption;
  });
}
document.addEventListener('DOMContentLoaded', restore_options);
document.getElementById('save').addEventListener('click', save_options);