import $ from 'jquery';

class Search {
  // 1.Describe and create/initialize the object
  constructor(){
    this.addSearchHtml();
    this.openButton = $(".js-search-trigger");
    this.closeButton = $(".search-overlay__close");
    this.searchOverlay = $(".search-overlay");
    this.events();
    this.isOverlayOpen = false;
    this.searchField = $("#search-term");
    this.typingTimer;
    this.resultsDiv = $("#search-overlay__results");
    this.isSpinnerVisible = false;
    this.previousValue;
  }

  // 2. Events
  events(){
    this.openButton.on("click", this.openOverlay.bind(this));
    this.closeButton.on("click", this.closeOverlay.bind(this));
    $(document).on("keydown", this.keyPressDispatcher.bind(this));
    this.searchField.on("keyup", this.typingLogic.bind(this));
  }

  // 3. Methods(function,action...)
  typingLogic(){
    if(this.searchField.val() != this.previousValue){
      clearTimeout(this.typingTimer);
      if(this.searchField.val()){
        if(!this.isSpinnerVisible){
          this.resultsDiv.html('<div class="spinner-loader"></div>');
          this.isSpinnerVisible = true;
        }
        this.typingTimer = setTimeout(this.getResults.bind(this), 750);
      } else {
        this.resultsDiv.html('');
        this.isSpinnerVisible = false;
      }

    }
    this.previousValue = this.searchField.val();
  }
  getResults(){
    $.when(
      $.getJSON(universityData.root_url + '/wp-json/wp/v2/posts?search=' + this.searchField.val()),
      $.getJSON(universityData.root_url + '/wp-json/wp/v2/pages?search=' + this.searchField.val())
    ).then((posts, pages) => {
      var combinedResults = posts[0].concat(pages[0]);
      this.resultsDiv.html(`
        <h2 class="search-overlay__section-title">General information</h2>
        ${combinedResults.length ? '<ul class="link-list min-list">' : '<p>No information matches</p>'}
          ${combinedResults.map(item => `<li><a href="${item.link}">${item.title.rendered}</a>`)}
        ${combinedResults ? '</ul>' : ''}
        `);
        this.isSpinnerVisible = false;
    }, () => {
      this.resultsDiv.html('<p> Unexpected error</p>');
    });
  }
  keyPressDispatcher(e){
    if(e.keyCode == 83 && !this.isOverlayOpen && !$("input, textarea").is(':focus')){
      this.openOverlay();
    }
    if(e.keyCode == 26 && this.isOverlayOpen){
      this.closeOverlay();
    }
  }
  openOverlay(){
    this.searchOverlay.addClass("search-overlay--active");
    $("body").addClass("body-no-scroll");
    this.searchField.val('');
    setTime(()=> this.searchField.focus(), 301);
    this.isOverlayOpen = true;
  }

  closeOverlay(){
    this.searchOverlay.removeClass("search-overlay--active");
    $("body").removeClass("body-no-scroll");
    this.isOverlayOpen = false;
  }

  addSearchHtml(){
    $("body").append(`
      <div class="search-overlay">
        <div class="search-overlay__top">
          <div class="container">
            <i class="fa fa-search search-overlay__icon"></i>
            <input type="text" class="search-term" placeholder="What are you looging for ?" id="search-term">
            <i class="fa fa-window-close search-overlay__close"></i>
          </div>
        </div>
        <div class="container">
          <div id="search-overlay__results">

          </div>
        </div>
      </div>
    `);
  }

}

var amazingsearch = new Search();
//export default Seacrh;
