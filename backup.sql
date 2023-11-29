--
-- PostgreSQL database dump
--

-- Dumped from database version 16.0
-- Dumped by pg_dump version 16.1 (Debian 16.1-1.pgdg120+1)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: options; Type: TABLE; Schema: public; Owner: koyeb-adm
--

CREATE TABLE public.options (
    id bigint NOT NULL,
    name text,
    parent_id bigint
);


ALTER TABLE public.options OWNER TO "koyeb-adm";

--
-- Name: options_id_seq; Type: SEQUENCE; Schema: public; Owner: koyeb-adm
--

CREATE SEQUENCE public.options_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.options_id_seq OWNER TO "koyeb-adm";

--
-- Name: options_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: koyeb-adm
--

ALTER SEQUENCE public.options_id_seq OWNED BY public.options.id;


--
-- Name: sectors; Type: TABLE; Schema: public; Owner: koyeb-adm
--

CREATE TABLE public.sectors (
    id bigint NOT NULL,
    name text,
    terms boolean
);


ALTER TABLE public.sectors OWNER TO "koyeb-adm";

--
-- Name: sectors_id_seq; Type: SEQUENCE; Schema: public; Owner: koyeb-adm
--

CREATE SEQUENCE public.sectors_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.sectors_id_seq OWNER TO "koyeb-adm";

--
-- Name: sectors_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: koyeb-adm
--

ALTER SEQUENCE public.sectors_id_seq OWNED BY public.sectors.id;


--
-- Name: user_options; Type: TABLE; Schema: public; Owner: koyeb-adm
--

CREATE TABLE public.user_options (
    sector_id bigint NOT NULL,
    option_id bigint NOT NULL
);


ALTER TABLE public.user_options OWNER TO "koyeb-adm";

--
-- Name: users; Type: TABLE; Schema: public; Owner: koyeb-adm
--

CREATE TABLE public.users (
    id bigint NOT NULL,
    username text,
    password text,
    token text,
    sector_id bigint
);


ALTER TABLE public.users OWNER TO "koyeb-adm";

--
-- Name: users_id_seq; Type: SEQUENCE; Schema: public; Owner: koyeb-adm
--

CREATE SEQUENCE public.users_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.users_id_seq OWNER TO "koyeb-adm";

--
-- Name: users_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: koyeb-adm
--

ALTER SEQUENCE public.users_id_seq OWNED BY public.users.id;


--
-- Name: options id; Type: DEFAULT; Schema: public; Owner: koyeb-adm
--

ALTER TABLE ONLY public.options ALTER COLUMN id SET DEFAULT nextval('public.options_id_seq'::regclass);


--
-- Name: sectors id; Type: DEFAULT; Schema: public; Owner: koyeb-adm
--

ALTER TABLE ONLY public.sectors ALTER COLUMN id SET DEFAULT nextval('public.sectors_id_seq'::regclass);


--
-- Name: users id; Type: DEFAULT; Schema: public; Owner: koyeb-adm
--

ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.users_id_seq'::regclass);


--
-- Data for Name: options; Type: TABLE DATA; Schema: public; Owner: koyeb-adm
--

COPY public.options (id, name, parent_id) FROM stdin;
1	Manufacturing	\N
2	Construction materials	1
3	Electronics and Optics	1
4	Food and Beverage	1
5	Bakery & confectionery products	4
6	Beverages	4
7	Fish & fish products	4
8	Meat & meat products	4
9	Milk & dairy products	4
10	Other	4
11	Sweets & snack food	4
12	Furniture	1
13	Bathroom/sauna	12
14	Bedroom	12
15	Children’s room	12
16	Kitchen	12
17	Living room	12
18	Office	12
19	Other (Furniture)	12
20	Outdoor	12
21	Project furniture	12
22	Machinery	1
23	Machinery components	22
24	Machinery equipment/tools	22
25	Manufacture of machinery	22
26	Maritime	22
27	Aluminium and steel workboats	26
28	Boat/Yacht building	26
29	Ship repair and conversion	26
30	Metal structures	22
31	Other	22
32	Repair and maintenance service	22
33	Metalworking	1
34	Construction of metal structures	33
35	Houses and buildings	33
36	Metal products	33
37	Metal works	33
38	CNC-machining	37
39	Forgings, Fasteners	37
40	Gas, Plasma, Laser cutting	37
41	MIG, TIG, Aluminum welding	37
42	Plastic and Rubber	1
43	Packaging	42
44	Plastic goods	42
45	Plastic processing technology	42
46	Blowing	45
47	Moulding	45
48	Plastics welding and processing	45
49	Plastic profiles	42
50	Printing	1
51	Advertising	50
52	Book/Periodicals printing	50
53	Labelling and packaging printing	50
54	Textile and Clothing	1
55	Clothing	54
56	Textile	54
57	Wood	1
58	Other (Wood)	57
59	Wooden building materials	57
60	Wooden houses	57
61	Other	\N
62	Creative industries	61
63	Energy technology	61
64	Environment	61
65	Service	\N
66	Business services	65
67	Engineering	65
68	Information Technology and Telecommunications	65
69	Data processing, Web portals, E-marketing	68
70	Programming, Consultancy	68
71	Software, Hardware	68
72	Telecommunications	68
73	Tourism	65
74	Translation services	65
75	Transport and Logistics	65
76	Air	75
77	Rail	75
78	Road	75
79	Water	75
\.


--
-- Data for Name: sectors; Type: TABLE DATA; Schema: public; Owner: koyeb-adm
--

COPY public.sectors (id, name, terms) FROM stdin;
1	Aminu	t
2	Aminu Rabiu	t
3	Aminu	t
4	Aminu	t
5	Aminu	t
6	Aminu	t
7	Aminu	t
8	Aminu	t
9	Aminu	t
10	Aminu	t
11	Aminu	t
12	Aminu	t
13	Aminu	t
14	Aminu	t
15	Aminu	t
16	Aminu	t
17	Aminu	t
18	Aminu	t
19	Aminu	t
20	Aminu	t
21	Aminu	t
22	Aminu	t
\.


--
-- Data for Name: user_options; Type: TABLE DATA; Schema: public; Owner: koyeb-adm
--

COPY public.user_options (sector_id, option_id) FROM stdin;
1	2
1	29
1	51
2	2
2	51
3	2
3	29
3	51
4	2
4	9
4	29
4	51
4	8
5	2
5	8
5	9
5	29
5	51
6	2
7	2
8	2
9	2
9	7
9	9
10	2
10	7
10	9
11	2
11	7
11	9
12	2
12	7
12	9
12	5
13	2
13	5
13	7
13	9
13	3
14	7
14	9
15	7
15	9
15	10
15	11
15	8
16	7
16	8
16	9
16	11
17	7
17	8
17	9
17	11
18	7
18	8
18	9
19	6
19	7
19	8
19	9
19	10
19	11
20	6
20	8
20	9
20	11
21	6
21	9
21	11
22	6
22	9
22	11
22	2
\.


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: koyeb-adm
--

COPY public.users (id, username, password, token, sector_id) FROM stdin;
2	Dune	$2a$14$H7taEx9..a4nkNS0D9hfnumFmFTvg3OMHdQpVLXNiNwl.4IMw5D7G	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJVc2VybmFtZSI6IkR1bmUiLCJVc2VyX2lkIjoiMiIsImV4cCI6MTcwMTMyMzIxOX0.tF7AJUmKz8evb83L8WIzxbqc61oVxDGwQInW92pRuh4	\N
1	Aminu	$2a$14$xeqKqF5UMp/6LwGc0OPjzuyJlRP71wEtLTGfzQN7BUTNdcPb.F3j6	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJVc2VybmFtZSI6IkFtaW51IiwiVXNlcl9pZCI6IjEiLCJleHAiOjE3MDEzMjM4MjV9.Nn2JklNEJJY9TBoanR-iHhws5yr84gXNP7UdQ6SAIJo	22
\.


--
-- Name: options_id_seq; Type: SEQUENCE SET; Schema: public; Owner: koyeb-adm
--

SELECT pg_catalog.setval('public.options_id_seq', 1, false);


--
-- Name: sectors_id_seq; Type: SEQUENCE SET; Schema: public; Owner: koyeb-adm
--

SELECT pg_catalog.setval('public.sectors_id_seq', 22, true);


--
-- Name: users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: koyeb-adm
--

SELECT pg_catalog.setval('public.users_id_seq', 2, true);


--
-- Name: options options_pkey; Type: CONSTRAINT; Schema: public; Owner: koyeb-adm
--

ALTER TABLE ONLY public.options
    ADD CONSTRAINT options_pkey PRIMARY KEY (id);


--
-- Name: sectors sectors_pkey; Type: CONSTRAINT; Schema: public; Owner: koyeb-adm
--

ALTER TABLE ONLY public.sectors
    ADD CONSTRAINT sectors_pkey PRIMARY KEY (id);


--
-- Name: user_options user_options_pkey; Type: CONSTRAINT; Schema: public; Owner: koyeb-adm
--

ALTER TABLE ONLY public.user_options
    ADD CONSTRAINT user_options_pkey PRIMARY KEY (sector_id, option_id);


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: koyeb-adm
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- Name: users users_username_key; Type: CONSTRAINT; Schema: public; Owner: koyeb-adm
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_username_key UNIQUE (username);


--
-- Name: idx_options_parent_id; Type: INDEX; Schema: public; Owner: koyeb-adm
--

CREATE INDEX idx_options_parent_id ON public.options USING btree (parent_id);


--
-- Name: idx_users_sector_id; Type: INDEX; Schema: public; Owner: koyeb-adm
--

CREATE INDEX idx_users_sector_id ON public.users USING btree (sector_id);


--
-- Name: options fk_options_sub_options; Type: FK CONSTRAINT; Schema: public; Owner: koyeb-adm
--

ALTER TABLE ONLY public.options
    ADD CONSTRAINT fk_options_sub_options FOREIGN KEY (parent_id) REFERENCES public.options(id);


--
-- Name: user_options fk_user_options_option; Type: FK CONSTRAINT; Schema: public; Owner: koyeb-adm
--

ALTER TABLE ONLY public.user_options
    ADD CONSTRAINT fk_user_options_option FOREIGN KEY (option_id) REFERENCES public.options(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: user_options fk_user_options_sector; Type: FK CONSTRAINT; Schema: public; Owner: koyeb-adm
--

ALTER TABLE ONLY public.user_options
    ADD CONSTRAINT fk_user_options_sector FOREIGN KEY (sector_id) REFERENCES public.sectors(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: users fk_users_sector; Type: FK CONSTRAINT; Schema: public; Owner: koyeb-adm
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT fk_users_sector FOREIGN KEY (sector_id) REFERENCES public.sectors(id);


--
-- PostgreSQL database dump complete
--

