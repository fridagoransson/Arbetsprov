const cSearchHistory = {
  searchInput : '.c-search__inner input',
  searchHistory : '.c-searchhistory',
  searchHistoryListitem : '.c-searchhistory__listitem',
  searchHistoryListitemTitle : '.c-searchhistory__title',
  searchHistoryDelete : '.c-searchhistory__deletebtn',
  init() {

    const $searchInput = $(this.searchInput);
    const $searchHistory = $(this.searchHistory);
    const searchHistoryListitem = this.searchHistoryListitem;
    const searchHistoryListitemTitle = this.searchHistoryListitemTitle;
    const searchHistoryDelete = this.searchHistoryDelete;
    var preventClick = false;

    $searchHistory.on("click", searchHistoryDelete, function(e) { //click on deletetn deletes the item from the history
      e.preventDefault();
      preventClick = true; // prevent click on searchHistoryListitem
      $(this).closest('.c-searchhistory__listitem').remove();
    });
    $searchHistory.on("focus", searchHistoryDelete, function(e) { // to make deletebtn focusable with keyboard we need to make it visible
      $(this).closest('.c-searchhistory__listitem').addClass('hasfocus'); // add class to parent to make deletebtn focusable
    });
    $searchHistory.on("blur", searchHistoryDelete, function(e) {
      $(this).closest('.c-searchhistory__listitem').removeClass('hasfocus');
    });

    $(document).on("click", searchHistoryListitem, function(e) { // if an item in the history is clicked, add it to searchfield
      e.preventDefault();
      if(preventClick) { //when deletebtn is clicked, prevent doubleclick on enter
        setTimeout(function(){
          preventClick = false;
        }, 150);
      }else {
        $searchInput.val($(this).find(searchHistoryListitemTitle).text());
        setTimeout(function(){
          $searchInput.focus();
        }, 150);
      }
    });
    $searchHistory.on("keydown", searchHistoryListitem, function(e) { //manage keyboard for items in historys
      if($(document.activeElement).attr('class') != $(searchHistoryDelete).attr('class')){ //but not when clicking deletebtn
        $(searchHistoryListitem).removeClass('hasfocus');
        if((e.keyCode || e.which) === 13) { // if enter is pressed
          $(this).trigger('click');
        }else if((e.keyCode || e.which) === 9) { // if tab is pressed
          if (!e.shiftKey){ //and not with shift
            $(this).addClass('hasfocus');
          }
        }
      }
    });

  }
};

export default cSearchHistory;
