package Drunkery;
use Mojo::Base 'Mojolicious';

# This method will run once at server start
sub startup {
  my $self = shift;

  # Documentation browser under "/perldoc"
  $self->plugin('PODRenderer');

  # App config
  $self->plugin('Config', file => 'drunkery.conf');

  # Router
  my $r = $self->routes;

  # Normal route to controller
  # $r->get('/')->to('example#welcome');

  $r->get('/')->to('index#index');
  $r->post('/search_by_city')->to('Search::ByCity#run');
  $r->post('/search_by_endpoint')->to('Search::ByEndpoint#run');
  # $r->post('/search_by_beer')->to('search#by_beer');
}

1;
