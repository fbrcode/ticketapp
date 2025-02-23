--
-- Init admin database user
--

COPY public.app_user (id, name, username, password, role, created_at, updated_at) FROM stdin;
1	Fabio	fabio	$2a$10$s4F0JA3Ms/MXH57.LX4TDuJVrnRVNXuLUl8gCqtdvPnnqr9WiUCGm	ADMIN	2025-02-23 11:09:13.211	2025-02-23 11:09:13.211
\.

