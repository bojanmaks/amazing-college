<?php
function university_post_types()
{
  register_post_type('event', [
    'public' => true,
    'labels' => [
      'name' => 'Events'
    ]
  ]);
}

add_action('init', 'university_post_types');
