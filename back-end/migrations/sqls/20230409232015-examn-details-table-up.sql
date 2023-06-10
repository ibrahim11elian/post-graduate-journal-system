create table examn_details (
	id SERIAL PRIMARY KEY NOT NULL,
    judge_letter INT NOT NULL,
    letter_date DATE NOT NULL,
    result VARCHAR(50) NOT NULL,
	judge_id INT REFERENCES the_judge(id),
    sci_examination_id INT REFERENCES sci_examination(id)
);