import $ from 'jquery';

class Search {
  // 1.Describe and create/initialize the object
  constructor(){
    this.openButton = $(".js-search-trigger");
    this.closeButton = $(".search-overlay__close");
    this.searchOverlay = $(".search-overlay");
    this.events();
  }

  // 2. Events
  events(){
    this.openButton.on("click", this.openOverlay.bind(this));
    this.closeButton.on("click", this.closeOverlay.bind(this));
  }

  // 3. Methods(function,action...)
  openOverlay(){
    this.searchOverlay.addClass("search-overlay--active");
  }

  closeOverlay(){
    this.searchOverlay.removeClass("search-overlay--active");
  }

}

var amazingsearch = new Search();
//export default Seacrh;
