CREATE TABLE IF NOT EXISTS subscribers (
  `id_subscribers` BIGINT PRIMARY KEY auto_increment,
  `reg_date` DATETIME DEFAULT CURRENT_TIMESTAMP,
  `email` VARCHAR(255) NOT NULL
);
