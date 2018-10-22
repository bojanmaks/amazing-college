<?php
require get_theme_file_path('/inc/search-route.php');

function university_custom_rest(){
  register_rest_field('post', 'authorName', [
    'get_callback' => function(){return get_the_author();}
  ]);
}

add_action('rest_api_init', 'university_custom_rest');

function pageBanner($args = NULL)
{
  if(!$args['title'])  $args['title'] = get_the_title();
  if(!$args['subtitle']) $args['subtitle'] = get_field('page_banner_subtitle');
  if(!$args['photo']){
    if(get_field('page_banner_background_image')){
      $args['photo'] = get_field('page_banner_background_image')['sizes']['pageBanner'];
    } else {
      $args['photo'] = get_theme_file_uri('/images/ocean.jpg');
    }
  }

  ?>
  <div class="page-banner">
    <div class="page-banner__bg-image" style="background-image: url(<?php echo $args['photo'] ?>);"></div>
    <div class="page-banner__content container container--narrow">
      <h1 class="page-banner__title"><?php echo $args['title']; ?></h1>
      <div class="page-banner__intro">
        <p><?php echo $args['subtitle'] ?></p>
      </div>
    </div>
  </div>
  <?php
}

function university_files()
{
  wp_enqueue_script('googleMap', '//maps.googleapis.com/maps/api/js?key=', NULL, '1.0', true);
  wp_enqueue_script('cust-script', get_theme_file_uri('/js/scripts-bundled.js'), ['jquery'], microtime(), true);
  wp_enqueue_script('search', get_theme_file_uri('/js/modules/Search.js'), NULL, microtime(), true);
  wp_enqueue_style('cusom-font', '//fonts.googleapis.com/css?family=Roboto+Condensed:300,300i,400,400i,700,700i|Roboto:100,300,400,400i,700,700i');
  wp_enqueue_style('font-awesome', '//maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css');
  wp_enqueue_style('university_main_styles', get_stylesheet_uri(), NULL, microtime());
  wp_localize_script('main-university-js', 'universityData', [
    'root_url' => get_site_url()
  ]);
}

add_action('wp_enqueue_scripts', 'university_files');

function university_features()
{

  add_theme_support('title-tag');
  add_theme_support('post-thumbnails');
  add_image_size('professorLandscape', 400, 260, true);
  add_image_size('professorPortrait', 480, 650, true);
  add_image_size('pageBanner', 1500, 350, true);


}

add_action('after_theme_support', 'university_features');

function university_post_types()
{
  register_post_type('event', [
    'supports' => ['title', 'editor', 'excerpt'],
    'rewrite' => ['slug' => 'events'],
    'has_archive' => true,
    'public' => true,
    'labels' => [
      'name' => 'Events',
      'add_new_item' => 'Add new event',
      'edit_item' => 'Edit event'
    ]
  ]);

  register_post_type('program', [
    'supports' => ['title', 'editor'],
    'rewrite' => ['slug' => 'programs'],
    'has_archive' => true,
    'public' => true,
    'labels' => [
      'name' => 'Programs',
      'add_new_item' => 'Add new program',
      'edit_item' => 'Edit program'
    ]
  ]);

  register_post_type('professor', [
    'show_in_rest' => true,
    'supports' => ['title', 'editor', 'thumbnail'],
    'public' => true,
    'labels' => [
      'name' => 'Professors',
      'add_new_item' => 'Add new professor',
      'edit_item' => 'Edit professor'
    ]
  ]);

  register_post_type('campus', [
    'supports' => ['title', 'editor', 'excerpt'],
    'rewrite' => ['slug' => 'campuses'],
    'has_archive' => true,
    'public' => true,
    'labels' => [
      'name' => 'Campuses',
      'add_new_item' => 'Add new campus',
      'edit_item' => 'Edit campus'
    ]
  ]);

}

add_action('init', 'university_post_types');

function university_adjust_queries($query)
{
  if(!is_admin() && is_post_type_archive('program') && $query->is_main_query()){
      $query->set('orderby', 'title');
      $query->set('order', 'ASC');
      $query->set('posts_per_page', -1);
  }

  if(!is_admin() && is_post_type_archive('event') && $query->is_main_query()){
    $today = date('Ymd');
    $query->set('meta_key', 'event_date');
    $query->set('orderby', 'meta_value_num');
    $query->set('order', 'ASC');
    $query->set('meta_query', [
      [
        'key' => 'event_date',
        'compare' => '>=',
        'value' => $today,
        'type' => 'numeric'
      ]
    ]);



  }
}

add_action('pre_get_posts', 'university_adjust_queries');

// function universityMapKey($api)
// {
//   $api['key'] = '';
//   return $api;
// }
//
// add_action('acf/fields/google_map/api', 'universityMapKey');
