-- create database db;
SELECT 'CREATE DATABASE db' WHERE NOT EXISTS (SELECT FROM pg_database WHERE datname = 'db')\gexec
