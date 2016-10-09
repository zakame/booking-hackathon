package Drunkery::Search::ByEndpoint;
use Mojo::Base 'Mojolicious::Controller';
use Drunkery::Search;

sub run {
    my $self = shift;

    # empty city array
    my @cities = ();

    my $lat = $self->param('lat') || $self->req->json->{lat};
    my $lng = $self->param('lng') || $self->req->json->{lng};

    my ( @breweries, @hotels );
    my $k   = $self->stash->{config}->{brewerydb_key};
    my $url = Mojo::URL->new(
        $self->stash->{config}->{brewerydb_search_geo_point} );
    $url->query( key => $k, lat => $lat, lng => $lng );
    my $brew_ish = $self->ua->get($url)->res->json;
    my $city_ish;
    if ( $brew_ish->{data} ) {
        @breweries = @{ $brew_ish->{data} };
        @breweries = @breweries[0..9] if @breweries > 10;
        $city_ish  = $brew_ish->{data}[0]{localtity};
    }

    my ( $u, $p )
        = @{ $self->stash->{config} }{qw(booking_username booking_password)};

# work around Booking not giving us city_ids when searching by location marker
    if ($city_ish) {
        $url
            = Mojo::URL->new(
            $self->stash->{config}->{booking_autocomplete} );
        $url->userinfo("$u:$p");
        $url->query(
            text         => $city_ish,
            languagecode => 'en',
            rows         => 1,
        );
        $city_ish = $self->ua->get($url)->res->json->[0];
    }

    $url = Mojo::URL->new( $self->stash->{config}->{booking_getHotels} );
    $url->userinfo("$u:$p");
    $url->query(
        city_ids      => $city_ish->{dest_id},
        languagecodes => 'en',
        rows          => 10,
    );
    my $hotels_ish = $self->ua->get($url)->res->json;
    @hotels = @$hotels_ish;

    $self->render( json => [ [], \@breweries, \@hotels ] );
}

1;
