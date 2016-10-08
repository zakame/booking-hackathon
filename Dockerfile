FROM tianon/mojo:latest

COPY ./drunkery /drunkery

WORKDIR /drunkery

RUN cpanm --installdeps .

EXPOSE 3000

ENTRYPOINT ["./script/drunkery", "daemon"]
