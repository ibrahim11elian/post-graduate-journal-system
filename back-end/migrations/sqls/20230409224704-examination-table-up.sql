create table examination (
	id SERIAL PRIMARY KEY NOT NULL,
	outgoing_letter VARCHAR(50),
	outgoing_date DATE,
	incoming_letter VARCHAR(50),
	incoming_date DATE,
    result VARCHAR(50),
	research_id INT REFERENCES research(id)
);