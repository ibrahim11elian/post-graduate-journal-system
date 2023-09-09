CREATE OR REPLACE FUNCTION add_double_ampersand(text)
RETURNS text AS $$
DECLARE
  input_text text;
  result_text text := '';
  words text[];
BEGIN
  input_text := $1;
  words := string_to_array(input_text, ' ');

  FOR i IN 1..array_length(words, 1) LOOP
    result_text := result_text || words[i];
    IF i < array_length(words, 1) THEN
      result_text := result_text || ' & ';
    END IF;
  END LOOP;

  RETURN result_text;
END;
$$ LANGUAGE plpgsql;
