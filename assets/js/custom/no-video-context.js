document.addEventListener('contextmenu', function(e) {
  if (e.target.tagName === 'VIDEO') {
    e.preventDefault();
  }
});
