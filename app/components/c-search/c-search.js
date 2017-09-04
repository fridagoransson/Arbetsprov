import jQuery from 'jquery';
global.$ = global.jQuery = require('jquery');

const cSearch = {
  searchInput : '.c-search__inner input',
  searchResult : '.c-search__result',
  searchHistory : '.c-searchhistory__list',
  init() {

    const $searchInput = $(this.searchInput);
    const $searchResult = $(this.searchResult);
    const $searchHistory = $(this.searchHistory);

    $searchInput.on("keyup", function(e) {
      const query = $(this).val();
      const searchWord  = $searchInput.val();
      const date = new Date();
      const searchDate = date.getFullYear() + '-' + date.getMonth()+1 + '-' + date.getDate() + " " + date.getHours() + ":" + date.getMinutes();

      if (query == "") { // if textbox is empty
        return
      }

      if((e.keyCode || e.which) === 13){ // if enter is pressed, add a new item in the search history
        $searchHistory.append('<li class="c-searchhistory__listitem c-searchhistory__listitem--active" tabindex="0"><div class="c-searchhistory__listiteminner"><span class="c-searchhistory__title">' + searchWord +'</span><span class="c-searchhistory__date">' + searchDate + '</span><span class="c-searchhistory__delete"><a href="#" class="c-searchhistory__deletebtn"><span class="c-searchhistory__deletebtninner"></span></a></span></div></li>');
        $searchResult.html('').addClass('c-search__result--hide').attr('aria-hidden', 'true');
        $searchInput.val('');
        setTimeout(function(){
          $searchInput.focus();
        }, 150);
      }else if((e.keyCode || e.which) === 40){ // if down arrow is pressed, go to first item in searchresult
          $searchResult.find('.c-search__resultitem:eq(0) .c-search__resultlink').focus();
      }else {
        $searchResult.html(''); //empty searchresult
        $.get('http://api.tvmaze.com/search/shows?q='+query, function( data ) { //show search result based on query
          $.each(data, function (key, shows) {
              $searchResult.append('<li class="c-search__resultitem"><a href="#" class="c-search__resultlink" option="role" aria-label="Suggestion '+ shows.show.name + '">' + shows.show.name + '</a></li>');
              $searchResult.removeClass('c-search__result--hide').attr('aria-hidden', 'false');
          });
        });
      }
      $searchInput.on("input", function(e) {
        if ($(this).val() === '') {
          $searchResult.html('').addClass('c-search__result--hide').attr('aria-hidden', 'true');
        }
      });

    });


    $searchResult.on("keyup", '.c-search__resultitem', function(e) {
      if((e.keyCode || e.which) === 38){ // if up arrow is pressed
        if( $(this).is(':first-child') ){ // if first result, go to searchfield
          $searchInput.focus();
        }else { // go to prevous searchresult in list
          $(this).prev('.c-search__resultitem').find('.c-search__resultlink').focus();
        }
      }else if((e.keyCode || e.which) === 40){ // if down arrow is pressed
        if( $(this).is(':last-child') ){ //if last result, go to first result
          $('.c-search__resultitem:eq(0)').find('.c-search__resultlink').focus();
        }else { // go to next searchresult in list
          $(this).next('.c-search__resultitem').find('.c-search__resultlink').focus();
        }
      }else if((e.keyCode || e.which) === 13){ // if enter is pressed
        $(this).find('.c-search__resultlink').trigger('click');
      }
    });

    $searchResult.on("click", '.c-search__resultlink', function(ev) { // trigger search when someone clicks on an item in the result-list
      ev.preventDefault();
      $searchInput.val($(this).text());
      const e = $.Event("keyup");
      e.keyCode = 13;
      $searchInput.trigger(e);
    });

  }
};

export default cSearch;
