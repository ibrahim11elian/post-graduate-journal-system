create table examn_details (
	id SERIAL PRIMARY KEY NOT NULL,
    judge_letter VARCHAR(50),
    letter_date DATE,
    edit_letter VARCHAR(50),
    edit_date DATE,
    result VARCHAR(50),
	judge_id INT REFERENCES the_judge(id),
    sci_examination_id INT REFERENCES sci_examination(id)
);