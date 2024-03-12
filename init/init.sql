CREATE DATABASE IF NOT EXISTS `identity_database`;
CREATE DATABASE IF NOT EXISTS `identity_shadow_database`;
CREATE DATABASE IF NOT EXISTS `pricing_database`;
CREATE DATABASE IF NOT EXISTS `pricing_shadow_database`;
CREATE DATABASE IF NOT EXISTS `insurance_testing_database`;
CREATE DATABASE IF NOT EXISTS `insurance_testing_shadow_database`;

GRANT ALL PRIVILEGES ON *.* TO 'rlino'@'%';
