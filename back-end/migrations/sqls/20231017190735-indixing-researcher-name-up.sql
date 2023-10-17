CREATE INDEX idx_researcher_name ON researcher USING btree(researcher_name);
CREATE INDEX idx_researcher_name_fts ON researcher USING gin(to_tsvector('arabic', researcher_name));