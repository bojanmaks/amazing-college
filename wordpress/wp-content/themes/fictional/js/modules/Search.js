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
    $.getJSON(universityData.root_url + '/wp-json/university/v1/search?term=' + this.searchField.val() , (results) => {
      this.resultsDiv.html(`
          <div class="row">
            <div class="one-third">
              <h2 class="search-overlay__section-title">General Information</h2>
              ${results.generalInfo.length ? '<ul class="link-list min-list">' : '<p>No information matches</p>'}
                ${results.generalInfo.map(item => `<li><a href="${item.permalink}">${item.title}</a>${item.postType == 'post' ? ` by ${item.authorName}` : ''}</li>`).join('')}
              ${results.generalInfo ? '</ul>' : ''}
            </div>
            <div class="one-third">
              <h2 class="search-overlay__section-title">Programs</h2>
              ${results.programs.length ? '<ul class="link-list min-list">' : '<p>No information matches</p>'}
                ${results.programs.map(item => `<li><a href="${item.permalink}">${item.title}</a></li>`).join('')}
              ${results.programs ? '</ul>' : ''}

              <h2 class="search-overlay__section-title">Professors</h2>
              ${results.professors.length ? '<ul class="professor-cards">' : '<p>No information matches</p>'}
                ${results.professors.map(item => `
                  <li class="professor-card__list-item"><a class="professor-card" href='${item.permalink}'>
                    <img src="${item.image}" alt="" class="professor-card__image">
                    <span class="professor-card__name">${item.title}</span>
                  </a></li>
                  `).join('')}
              ${results.professors ? '</ul>' : ''}
            </div>
            <div class="one-third">
              <h2 class="search-overlay__section-title">Campuses</h2>
              ${results.campuses.length ? '<ul class="link-list min-list">' : '<p>No information matches</p>'}
                ${results.campuses.map(item => `<li><a href="${item.permalink}">${item.title}</a></li>`).join('')}
              ${results.campuses ? '</ul>' : ''}

              <h2 class="search-overlay__section-title">Events</h2>
              ${results.events.length ? '' : '<p>No information matches</p>'}
                ${results.events.map(item => `
                  <div class="event-summary">
                    <a class="event-summary__date t-center" href="${item.permalink}">
                      <span class="event-summary__month">${item.month}</span>
                      <span class="event-summary__day">${item.day}</span>
                    </a>
                    <div class="event-summary__content">
                      <h5 class="event-summary__title headline headline--tiny"><a href="${item.permalink}">${item.title}</a></h5>
                      <p>${item.description}<a href="${item.permalink}" class="nu gray">Learn more</a></p>
                    </div>
                  </div>

                  `).join('')}

            </div>
          </div>
      `);
      this.isSpinnerVisible = false;
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
