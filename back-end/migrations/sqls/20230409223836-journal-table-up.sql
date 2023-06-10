create table journal (
	id SERIAL PRIMARY KEY NOT NULL,
	journal_edition INT NOT NULL,
	edition_date DATE NOT NULL,
	research_id INT REFERENCES research(id)
);