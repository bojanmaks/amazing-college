<?php get_header();

  pageBanner([
    'title' => 'All events',
    'subtitle' => 'See whats going on in the world'
  ]);
 ?>



  <div class="container container--narrow page-section">
    <?php
    while(have_posts()) {
      the_post();
      get_template_part('template-parts/event');
     }
     echo paginate_links(); ?>
    <hr class="section-break">
    <p>Looking for a recap of past events ? Check <a href="<?php echo site_url('/past-events') ?>">the passed events archive.</a></p>
  </div>
  <?php
get_footer();
   ?>
