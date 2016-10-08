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
  $r->post('/search_by_city')->to('search#by_city');
  $r->post('/search_by_endpoint')->to('search#by_endpoint');
  # $r->post('/search_by_beer')->to('search#by_beer');

  # allow CORS from any origin for now (dangerous!)
  $self->hook(after_dispatch => sub {
    my $c = shift;
    $c->res->headers->header('Access-Control-Allow-Origin' => $c->req->headers->origin);
  });
}

1;
