create table examn_details (
	id SERIAL PRIMARY KEY NOT NULL,
    judge_letter VARCHAR(50),
    letter_date VARCHAR(100),
    edit_letter VARCHAR(50),
    edit_date VARCHAR(100),
    result VARCHAR(50),
	judge_id INT REFERENCES the_judge(id),
    sci_examination_id INT REFERENCES sci_examination(id)
);