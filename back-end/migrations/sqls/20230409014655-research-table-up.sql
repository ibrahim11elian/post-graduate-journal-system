create table research (
	id SERIAL PRIMARY KEY NOT NULL,
	research_title VARCHAR(200) NOT NULL,
	research_pdf VARCHAR(200) NOT NULL,
	research_summary VARCHAR(200) NOT NULL,
	research_date DATE NOT NULL,
	researcher_id INT REFERENCES researcher(id)
);