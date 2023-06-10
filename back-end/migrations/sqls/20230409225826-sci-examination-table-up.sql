create table sci_examination (
	id SERIAL PRIMARY KEY NOT NULL,
	research_id INT REFERENCES research(id)
);