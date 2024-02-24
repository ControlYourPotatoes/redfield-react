CREATE DATABASE IF NOT EXISTS H_Redfield_db;
CREATE USER IF NOT EXISTS 'H_Redfield'@'localhost' IDENTIFIED BY 'H_Redfield_pwd';
GRANT ALL PRIVILEGES ON `H_Redfield_db`.* TO 'H_Redfield'@'localhost';
GRANT SELECT ON `performance_schema`.* TO 'H_Redfield'@'localhost';
FLUSH PRIVILEGES;