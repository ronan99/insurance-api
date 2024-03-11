CREATE DATABASE IF NOT EXISTS `identity_database`;
CREATE DATABASE IF NOT EXISTS `identity_shadow_database`;
CREATE DATABASE IF NOT EXISTS `insurance_db`;
CREATE DATABASE IF NOT EXISTS `insurance_shadow_database`;

GRANT ALL PRIVILEGES ON *.* TO 'rlino'@'%';
