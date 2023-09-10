create table research (
	id SERIAL PRIMARY KEY NOT NULL,
	research_title VARCHAR(300) NOT NULL,
	research_pdf VARCHAR(300) NOT NULL,
	research_summary VARCHAR(300),
	research_summary_ar VARCHAR(300),
	research_date VARCHAR(100) NOT NULL,
	researcher_id INT REFERENCES researcher(id) ON DELETE CASCADE
);