import $ from 'jquery';

class Search {
  // 1.Describe and create/initialize the object
  constructor(){
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
        this.typingTimer = setTimeout(this.getResults.bind(this), 2000);
      } else {
        this.resultsDiv.html('');
        this.isSpinnerVisible = false;
      }

    }
    this.previousValue = this.searchField.val();
  }
  getResults(){
    $.getJSON('http://amazing-college.test/wp-json/wp/v2/posts?search=' + this.searchField.val(), posts =>{
      this.resultsDiv.html(`
        <h2 class="search-overlay__section-title">General information</h2>
        <ul class="link-list min-list">
          ${posts.map(item => `<li><a href="${item.link}">${item.title.rendered}</a>`)}
        </ul>
        `);
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
    this.isOverlayOpen = true;
  }

  closeOverlay(){
    this.searchOverlay.removeClass("search-overlay--active");
    $("body").removeClass("body-no-scroll");
    this.isOverlayOpen = false;
  }

}

var amazingsearch = new Search();
//export default Seacrh;
