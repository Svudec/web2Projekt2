drop table if exists grades;
create table grades
(
	id int
		constraint grades_pk
			primary key,
	owner_id int,
	owner_name varchar,
	grade int,
	grade_name varchar
);

drop table if exists users;
create table users
(
	id int
		constraint users_pk
			primary key,
	name varchar,
	address varchar,
	phone varchar
);

insert into users values
	(1, 'Ivan Ivić', 'Unska 3, Zagreb', '091234567'),
	(2, 'Luka Lukić', 'Zelinska 6, Zagreb', '095234567'),
	(3, 'Ivana Ivanda', 'Plitvička 8, Zagreb', '098234567'),
	(4, 'Leona Leonić', 'Vukovarska 105, Zagreb', '092234567');

insert into grades values
    (1, 1, 'Ivan Ivić', 3, 'Dobar'),
    (2, 1, 'Ivan Ivić', 4, 'Vrlo dobar'),
    (3, 2, 'Luka Lukić', 1, 'Nedovoljan'),
    (4, 3, 'Ivana Ivanda', 5, 'Odličan'),
    (5, 4, 'Leona Leonić', 2, 'Dovoljan');