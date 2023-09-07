create table journal (
	id SERIAL PRIMARY KEY NOT NULL,
	journal_edition INT NOT NULL,
	edition_date VARCHAR(100) NOT NULL,
	research_id INT REFERENCES research(id)
);