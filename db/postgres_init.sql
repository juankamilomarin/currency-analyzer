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

INSERT INTO public.exchange_rate (day, origin, target, rate) VALUES ('2020-11-09', 'CAD', 'GBP', 0.5824798712221414);
INSERT INTO public.exchange_rate (day, origin, target, rate) VALUES ('2020-11-09', 'CAD', 'EUR', 0.6441223833109305);
INSERT INTO public.exchange_rate (day, origin, target, rate) VALUES ('2020-11-09', 'CAD', 'CAD', 1);
INSERT INTO public.exchange_rate (day, origin, target, rate) VALUES ('2020-11-09', 'CAD', 'USD', 0.7645732689454234);
INSERT INTO public.exchange_rate (day, origin, target, rate) VALUES ('2020-11-09', 'EUR', 'GBP', 0.9042999999907888);
INSERT INTO public.exchange_rate (day, origin, target, rate) VALUES ('2020-11-09', 'EUR', 'EUR', 1);
INSERT INTO public.exchange_rate (day, origin, target, rate) VALUES ('2020-11-09', 'EUR', 'CAD', 1.552499999859934);
INSERT INTO public.exchange_rate (day, origin, target, rate) VALUES ('2020-11-09', 'EUR', 'USD', 1.1869999999306793);
INSERT INTO public.exchange_rate (day, origin, target, rate) VALUES ('2020-11-09', 'GBP', 'GBP', 1);
INSERT INTO public.exchange_rate (day, origin, target, rate) VALUES ('2020-11-09', 'GBP', 'EUR', 1.1058277120537277);
INSERT INTO public.exchange_rate (day, origin, target, rate) VALUES ('2020-11-09', 'GBP', 'CAD', 1.7167975228085235);
INSERT INTO public.exchange_rate (day, origin, target, rate) VALUES ('2020-11-09', 'GBP', 'USD', 1.312617494131118);
INSERT INTO public.exchange_rate (day, origin, target, rate) VALUES ('2020-11-09', 'USD', 'GBP', 0.7618365628);
INSERT INTO public.exchange_rate (day, origin, target, rate) VALUES ('2020-11-09', 'USD', 'EUR', 0.8424599832);
INSERT INTO public.exchange_rate (day, origin, target, rate) VALUES ('2020-11-09', 'USD', 'CAD', 1.3079191238);
INSERT INTO public.exchange_rate (day, origin, target, rate) VALUES ('2020-11-09', 'USD', 'USD', 1);
INSERT INTO public.exchange_rate (day, origin, target, rate) VALUES ('2020-11-10', 'CAD', 'GBP', 0.5824798712221414);
INSERT INTO public.exchange_rate (day, origin, target, rate) VALUES ('2020-11-10', 'CAD', 'EUR', 0.6441223833109305);
INSERT INTO public.exchange_rate (day, origin, target, rate) VALUES ('2020-11-10', 'CAD', 'CAD', 1);
INSERT INTO public.exchange_rate (day, origin, target, rate) VALUES ('2020-11-10', 'CAD', 'USD', 0.7645732689454234);
INSERT INTO public.exchange_rate (day, origin, target, rate) VALUES ('2020-11-10', 'EUR', 'GBP', 0.9042999999907888);
INSERT INTO public.exchange_rate (day, origin, target, rate) VALUES ('2020-11-10', 'EUR', 'EUR', 1);
INSERT INTO public.exchange_rate (day, origin, target, rate) VALUES ('2020-11-10', 'EUR', 'CAD', 1.552499999859934);
INSERT INTO public.exchange_rate (day, origin, target, rate) VALUES ('2020-11-10', 'EUR', 'USD', 1.1869999999306793);
INSERT INTO public.exchange_rate (day, origin, target, rate) VALUES ('2020-11-10', 'GBP', 'GBP', 1);
INSERT INTO public.exchange_rate (day, origin, target, rate) VALUES ('2020-11-10', 'GBP', 'EUR', 1.1058277120537277);
INSERT INTO public.exchange_rate (day, origin, target, rate) VALUES ('2020-11-10', 'GBP', 'CAD', 1.7167975228085235);
INSERT INTO public.exchange_rate (day, origin, target, rate) VALUES ('2020-11-10', 'GBP', 'USD', 1.312617494131118);
INSERT INTO public.exchange_rate (day, origin, target, rate) VALUES ('2020-11-10', 'USD', 'GBP', 0.7618365628);
INSERT INTO public.exchange_rate (day, origin, target, rate) VALUES ('2020-11-10', 'USD', 'EUR', 0.8424599832);
INSERT INTO public.exchange_rate (day, origin, target, rate) VALUES ('2020-11-10', 'USD', 'CAD', 1.234445533);
INSERT INTO public.exchange_rate (day, origin, target, rate) VALUES ('2020-11-10', 'USD', 'USD', 1);
INSERT INTO public.exchange_rate (day, origin, target, rate) VALUES ('2020-11-12', 'CAD', 'GBP', 0.5824798712221414);
INSERT INTO public.exchange_rate (day, origin, target, rate) VALUES ('2020-11-12', 'CAD', 'EUR', 0.6441223833109305);
INSERT INTO public.exchange_rate (day, origin, target, rate) VALUES ('2020-11-12', 'CAD', 'CAD', 1);
INSERT INTO public.exchange_rate (day, origin, target, rate) VALUES ('2020-11-12', 'CAD', 'USD', 0.7645732689454234);
INSERT INTO public.exchange_rate (day, origin, target, rate) VALUES ('2020-11-12', 'EUR', 'GBP', 0.9042999999907888);
INSERT INTO public.exchange_rate (day, origin, target, rate) VALUES ('2020-11-12', 'EUR', 'EUR', 1);
INSERT INTO public.exchange_rate (day, origin, target, rate) VALUES ('2020-11-12', 'EUR', 'CAD', 1.552499999859934);
INSERT INTO public.exchange_rate (day, origin, target, rate) VALUES ('2020-11-12', 'EUR', 'USD', 1.1869999999306793);
INSERT INTO public.exchange_rate (day, origin, target, rate) VALUES ('2020-11-12', 'GBP', 'GBP', 1);
INSERT INTO public.exchange_rate (day, origin, target, rate) VALUES ('2020-11-12', 'GBP', 'EUR', 1.1058277120537277);
INSERT INTO public.exchange_rate (day, origin, target, rate) VALUES ('2020-11-12', 'GBP', 'CAD', 1.7167975228085235);
INSERT INTO public.exchange_rate (day, origin, target, rate) VALUES ('2020-11-12', 'GBP', 'USD', 1.312617494131118);
INSERT INTO public.exchange_rate (day, origin, target, rate) VALUES ('2020-11-12', 'USD', 'GBP', 0.7769688585);
INSERT INTO public.exchange_rate (day, origin, target, rate) VALUES ('2020-11-12', 'USD', 'EUR', 0.8434455555);
INSERT INTO public.exchange_rate (day, origin, target, rate) VALUES ('2020-11-12', 'USD', 'CAD', 1.1234566544);
INSERT INTO public.exchange_rate (day, origin, target, rate) VALUES ('2020-11-12', 'USD', 'USD', 1);