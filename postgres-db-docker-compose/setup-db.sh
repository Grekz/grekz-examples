#!/bin/bash
set -e
psql -v ON_ERROR_STOP=1 --username "$POSTGRES_USER" --dbname "$POSTGRES_DB" <<-EOSQL
	CREATE USER grekz;
  CREATE DATABASE example_db_dev;
  CREATE DATABASE example_db_test;
	GRANT ALL PRIVILEGES ON DATABASE example_db_dev TO grekz;
	GRANT ALL PRIVILEGES ON DATABASE example_db_test TO grekz;
	CREATE EXTENSION IF NOT EXISTS "pgcrypto";
EOSQL