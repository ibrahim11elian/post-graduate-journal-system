create table examination (
	id SERIAL PRIMARY KEY NOT NULL,
	outgoing_letter VARCHAR(50),
	outgoing_date VARCHAR(100),
	incoming_letter VARCHAR(50),
	incoming_date VARCHAR(100),
    result VARCHAR(50),
	research_id INT REFERENCES research(id)
);