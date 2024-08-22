
DO $$ DECLARE
    r RECORD;
BEGIN
    -- iterate through all table names
    FOR r IN (SELECT tablename FROM pg_tables WHERE schemaname = current_schema()) LOOP
        -- execute the drop table command
        EXECUTE 'DROP TABLE IF EXISTS ' || quote_ident(r.tablename) || ' CASCADE';
    END LOOP;
END $$;
