CREATE OR REPLACE FUNCTION remove_spaces(str text)
RETURNS text AS
$$
BEGIN
  RETURN REPLACE(str, ' ', '');
END;
$$
LANGUAGE plpgsql;
