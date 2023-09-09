create table sci_examination (
	id SERIAL PRIMARY KEY NOT NULL,
	final_copy VARCHAR(300),
	research_id INT REFERENCES research(id) ON DELETE CASCADE
);