CREATE INDEX idx_research_title ON research USING btree(research_title);
CREATE INDEX idx_research_title_fts ON research USING gin(to_tsvector('arabic', research_title));