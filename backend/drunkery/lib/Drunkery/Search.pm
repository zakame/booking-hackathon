package Drunkery::Search;
use strict;
use warnings;
use Memoize;
use Mojo::UserAgent;

sub fetch {
    Mojo::UserAgent->new->get(shift)->res->json;
}

sub normalize_url {
    my $url = shift;
    return $url->to_string;
}

memoize('fetch', NORMALIZER => 'normalize_url');

1;
