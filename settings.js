// Saves options to chrome.storage
function save_options() {
  var sortedBy = document.getElementById('sortedBy').value;
  var nsfw = document.getElementById('nsfw').checked;
  chrome.storage.sync.set({
    sortedByOption: sortedBy,
    nsfw: nsfw
  }, function() {
    // Update status to let user know options were saved.
    var status = document.getElementById('status');
    status.textContent = 'Options saved.';
    setTimeout(function() {
      status.textContent = '';
    }, 750);
  });
}

// Restores select box and checkbox state using the preferences
// stored in chrome.storage.
function restore_options() {

  // ------- default values -------
  // sortedBy = 'relevance' 
  // nsfw = false
  
  chrome.storage.sync.get({
    sortedByOption: 'relevance',
    nsfw: true
  }, function(items) {
    document.getElementById('sortedBy').value = items.sortedByOption;
    document.getElementById('nsfw').checked = items.nsfw;
  });
}
document.addEventListener('DOMContentLoaded', restore_options);
document.getElementById('save').addEventListener('click', save_options);