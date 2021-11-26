create table grades
(
	id int
		constraint users_pk
			primary key,
	owner_id int,
	owner_name varchar,
	grade int
);

insert into grades values
    (1, 1, 'Ivan Ivić', 3),
    (2, 1, 'Ivan Ivić', 4),
    (3, 2, 'Luka Lukić', 1),
    (4, 3, 'Ivana Ivanda', 5),
    (5, 4, 'Leona Leonić', 2);