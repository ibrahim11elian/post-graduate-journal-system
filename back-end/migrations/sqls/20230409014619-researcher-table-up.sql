create table researcher (
	id SERIAL PRIMARY KEY NOT NULL,
	researcher_name VARCHAR(200) NOT NULL,
	rank VARCHAR(50) NOT NULL,
	workplace VARCHAR(100) NOT NULL,
	email VARCHAR(50) NOT NULL,
	phone VARCHAR(50) NOT NULL,
	cv VARCHAR(300)
);
