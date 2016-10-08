package Drunkery::Search;
use Mojo::Base 'Mojolicious::Controller';
use Mojo::URL;

sub by_city {
    my $self = shift;
    my $text = $self->param('text') || $self->req->json->{text};

    # resolve the city via Booking's API
    my ( $u, $p )
        = @{ $self->stash->{config} }{qw(booking_username booking_password)};
    my $url
        = Mojo::URL->new( $self->stash->{config}->{booking_autocomplete} );
    $url->userinfo("$u:$p");
    $url->query(
        text         => $text,
        languagecode => 'en',
        rows         => 1,
    );
    my $city_ish = $self->ua->get($url)->res->json;

    # limit to the first result for now
    my @cities = ( grep { $_->{dest_type} eq 'city' } @$city_ish )[0];

    # resolve hotels & breweries found in each city via BreweryDB
    my ( @breweries, @hotels );
    for my $city (@cities) {
        my $k = $self->stash->{config}->{brewerydb_key};
        $url = Mojo::URL->new(
            $self->stash->{config}->{brewerydb_search_geo_point} );
        $url->query(
            key => $k,
            lat => $city->{latitude},
            lng => $city->{longitude},
        );
        my $brew_ish = $self->ua->get($url)->res->json;
        @breweries = @{ $brew_ish->{data} } if $brew_ish->{data};

        $url = Mojo::URL->new( $self->stash->{config}->{booking_getHotels} );
        $url->userinfo("$u:$p");
        $url->query(
            city_ids      => $city->{dest_id},
            languagecodes => 'en',
            rows          => 10,
        );
        my $hotels_ish = $self->ua->get($url)->res->json;
        @hotels = @$hotels_ish;
    }

    # emit as JSON (for JS app to render beautifully)
    $self->render( json => [ \@cities, \@breweries, \@hotels ] );
}

1;
