package Drunkery::Search::ByCity;
use Mojo::Base 'Mojolicious::Controller';
use Drunkery::Search;

sub run {
    my $self = shift;
    my $text = $self->param('text') || $self->req->json->{text};

    my $rad = $self->param('rad') || $self->req->json->{radius};

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
    my $city_ish = Drunkery::Search::fetch($url);

    # limit to the 30 cities for now
    my @cities = grep { $_->{dest_type} eq 'city' } @$city_ish;
    @cities = @cities[ 0 .. 29 ] if @cities > 30;

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
        $url->query->merge( radius => $rad, unit => 'km' ) if $rad;
        my $brew_ish = Drunkery::Search::fetch($url);
        @breweries = @{ $brew_ish->{data} } if $brew_ish->{data};

        # limit to 30 breweries for now
        @breweries = @breweries[ 0 .. 29 ] if @breweries > 30;

        $url = Mojo::URL->new( $self->stash->{config}->{booking_getHotels} );
        $url->userinfo("$u:$p");
        $url->query(
            city_ids      => $city->{dest_id},
            languagecodes => 'en',
            rows          => 30,
        );
        $url->query->merge( radius => $rad ) if $rad;
        my $hotels_ish = Drunkery::Search::fetch($url);
        @hotels = @$hotels_ish;
    }

    # emit as JSON (for JS app to render beautifully)
    $self->render( json => [ \@cities, \@breweries, \@hotels ] );
}

1;
