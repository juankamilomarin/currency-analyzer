create table exchange_rate
(
    day date not null,
    origin varchar(3) not null,
    target varchar(3) not null,
    rate double precision default 0,
    constraint exchange_rate_pk
        unique (day, origin, target)
);

alter table exchange_rate
    owner to postgres;

create unique index exchange_rate_id_uindex
    on exchange_rate (day, origin, target);

create index exchange_rate_id_origin_index
	on exchange_rate (day, origin);