create table examination (
	id SERIAL PRIMARY KEY NOT NULL,
	outgoing_letter INT NOT NULL,
	incoming_letter INT NOT NULL,
    result VARCHAR(50) NOT NULL,
	research_id INT REFERENCES research(id)
);