FROM tianon/mojo:latest

COPY ./hahm /drunkery

WORKDIR /drunkery

RUN cpanm --installdeps .

EXPOSE 3000

ENTRYPOINT ["./script/hahm", "daemon"]
