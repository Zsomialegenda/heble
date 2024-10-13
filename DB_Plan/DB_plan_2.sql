CREATE TABLE `users` (
  `id` int UNIQUE PRIMARY KEY,
  `username` varchar(255),
  `email` varchar(255),
  `created_at` timestamp
);

CREATE TABLE `exercises` (
  `id` int UNIQUE PRIMARY KEY,
  `name` varchar(255),
  `description` text,
  `created_at` timestamp
);

CREATE TABLE `user_exercise_tracking` (
  `id` int UNIQUE PRIMARY KEY,
  `user_id` int,
  `exercise_id` int,
  `is_completed` boolean,
  `completed_at` timestamp
);

CREATE TABLE `levels` (
  `id` int UNIQUE PRIMARY KEY,
  `user_id` int,
  `level` int,
  `experience_points` int,
  `next_level_at` int,
  `updated_at` timestamp
);

CREATE TABLE `level_progress` (
  `id` int UNIQUE PRIMARY KEY,
  `user_id` int,
  `level_reached` int,
  `xp_at_level` int,
  `date_reached` timestamp
);

CREATE TABLE `nutrition_info` (
  `id` int UNIQUE PRIMARY KEY,
  `title` varchar(255),
  `content` text,
  `unlock_level` int,
  `created_at` timestamp
);

CREATE TABLE `products` (
  `id` int UNIQUE PRIMARY KEY,
  `name` varchar(255),
  `description` text,
  `price` decimal,
  `sku` varchar(255),
  `created_at` timestamp
);

CREATE TABLE `discounts` (
  `id` int UNIQUE PRIMARY KEY,
  `name` varchar(255),
  `description` text,
  `discount_percent` decimal,
  `unlock_level` int,
  `created_at` timestamp
);

CREATE TABLE `product_discounts` (
  `id` int UNIQUE PRIMARY KEY,
  `product_id` int,
  `discount_id` int,
  `created_at` timestamp
);

CREATE TABLE `user_discounts` (
  `id` int UNIQUE PRIMARY KEY,
  `user_id` int,
  `discount_id` int,
  `is_unlocked` boolean,
  `unlocked_at` timestamp
);

ALTER TABLE `user_exercise_tracking` ADD FOREIGN KEY (`user_id`) REFERENCES `users` (`id`);

ALTER TABLE `user_exercise_tracking` ADD FOREIGN KEY (`exercise_id`) REFERENCES `exercises` (`id`);

ALTER TABLE `levels` ADD FOREIGN KEY (`user_id`) REFERENCES `users` (`id`);

ALTER TABLE `level_progress` ADD FOREIGN KEY (`user_id`) REFERENCES `users` (`id`);

ALTER TABLE `product_discounts` ADD FOREIGN KEY (`product_id`) REFERENCES `products` (`id`);

ALTER TABLE `product_discounts` ADD FOREIGN KEY (`discount_id`) REFERENCES `discounts` (`id`);

ALTER TABLE `user_discounts` ADD FOREIGN KEY (`user_id`) REFERENCES `users` (`id`);

ALTER TABLE `user_discounts` ADD FOREIGN KEY (`discount_id`) REFERENCES `discounts` (`id`);
