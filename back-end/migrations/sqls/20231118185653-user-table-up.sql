create table user_table (
	id SERIAL PRIMARY KEY NOT NULL,
    user_name VARCHAR(100),
    pass_hash VARCHAR(100)
);