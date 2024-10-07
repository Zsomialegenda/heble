CREATE TABLE `user` (
  `id` integer UNIQUE PRIMARY KEY,
  `username` varchar(255),
  `password` varchar(255),
  `eMail` varchar(255),
  `firstName` text,
  `lastName` text,
  `telephone` integer,
  `created_at` timestamp,
  `modified_at` timestamp
);

CREATE TABLE `userAddress` (
  `id` integer UNIQUE PRIMARY KEY,
  `user_ID` integer,
  `address1` varchar(255),
  `address2` varchar(255),
  `city` varchar(255),
  `postalCode` varchar(255),
  `country` varchar(255),
  `telephone` integer
);

CREATE TABLE `userPayment` (
  `id` integer UNIQUE PRIMARY KEY,
  `user_ID` integer,
  `paymentType` varchar(255),
  `provider` varchar(255),
  `accountNO` integer,
  `expiry` date
);

CREATE TABLE `gameAccount` (
  `user_ID` integer UNIQUE PRIMARY KEY,
  `level` integer AUTO_INCREMENT,
  `XP` integer
);

CREATE TABLE `adminType` (
  `id` integer UNIQUE PRIMARY KEY,
  `adminType` varchar(255),
  `permissions` varchar(255),
  `created_at` timestamp,
  `modified_at` timestamp
);

CREATE TABLE `adminUser` (
  `id` integer UNIQUE PRIMARY KEY,
  `username` varchar(255),
  `password` varchar(255),
  `firstName` varchar(255),
  `lastName` varchar(255),
  `typeId` integer,
  `lastLogin` timestamp,
  `created_at` timestamp,
  `modified_at` timestamp
);

CREATE TABLE `product` (
  `id` integer UNIQUE PRIMARY KEY,
  `name` varchar(255),
  `desc` text,
  `SKU` varchar(255),
  `category_ID` integer,
  `inventory_ID` integer,
  `price` decimal,
  `discountId` int,
  `created_at` timestamp,
  `modified_at` timestamp,
  `deleted_at` timestamp
);

CREATE TABLE `product_Category` (
  `id` integer UNIQUE PRIMARY KEY,
  `name` varchar(255),
  `desc` text,
  `created_at` timestamp,
  `modified_at` timestamp,
  `deleted_at` timestamp
);

CREATE TABLE `product_Inventory` (
  `id` integer UNIQUE PRIMARY KEY,
  `quantity` integer,
  `created_at` timestamp,
  `modified_at` timestamp,
  `deleted_at` timestamp
);

CREATE TABLE `discount` (
  `id` integer UNIQUE PRIMARY KEY,
  `name` varchar(255),
  `desc` text,
  `discountPercent` decimal,
  `active` boolean,
  `created_at` timestamp,
  `modified_at` timestamp,
  `deleted_at` timestamp
);

CREATE TABLE `cart_Item` (
  `id` integer UNIQUE PRIMARY KEY,
  `sessionId` integer,
  `productId` integer,
  `quantity` integer,
  `created_at` timestamp,
  `modified_at` timestamp
);

CREATE TABLE `shopping_Session` (
  `id` integer UNIQUE PRIMARY KEY,
  `user_ID` varchar(255),
  `total` decimal,
  `created_at` timestamp,
  `modified_at` timestamp
);

CREATE TABLE `order_Items` (
  `id` integer UNIQUE PRIMARY KEY,
  `order_ID` integer,
  `product_ID` integer,
  `quantity` integer,
  `created_at` timestamp,
  `modified_at` timestamp
);

CREATE TABLE `order_Details` (
  `id` integer UNIQUE PRIMARY KEY,
  `user_ID` integer,
  `total` decimal,
  `payment_ID` integer,
  `created_at` timestamp,
  `modified_at` timestamp
);

CREATE TABLE `payment_Details` (
  `id` integer UNIQUE PRIMARY KEY,
  `order_ID` integer,
  `amount` integer,
  `provider` varchar(255),
  `status` varchar(255),
  `created_at` timestamp,
  `modified_at` timestamp
);

ALTER TABLE `user` ADD FOREIGN KEY (`id`) REFERENCES `gameAccount` (`user_ID`);

ALTER TABLE `user` ADD FOREIGN KEY (`id`) REFERENCES `userPayment` (`user_ID`);

ALTER TABLE `user` ADD FOREIGN KEY (`id`) REFERENCES `userAddress` (`user_ID`);

ALTER TABLE `adminType` ADD FOREIGN KEY (`id`) REFERENCES `adminUser` (`typeId`);

ALTER TABLE `product` ADD FOREIGN KEY (`category_ID`) REFERENCES `product_Category` (`id`);

ALTER TABLE `product` ADD FOREIGN KEY (`inventory_ID`) REFERENCES `product_Inventory` (`id`);

ALTER TABLE `product` ADD FOREIGN KEY (`discountId`) REFERENCES `discount` (`id`);

ALTER TABLE `product` ADD FOREIGN KEY (`id`) REFERENCES `cart_Item` (`productId`);

ALTER TABLE `shopping_Session` ADD FOREIGN KEY (`id`) REFERENCES `cart_Item` (`sessionId`);

ALTER TABLE `user` ADD FOREIGN KEY (`id`) REFERENCES `shopping_Session` (`user_ID`);

ALTER TABLE `product` ADD FOREIGN KEY (`id`) REFERENCES `order_Items` (`product_ID`);

ALTER TABLE `order_Items` ADD FOREIGN KEY (`order_ID`) REFERENCES `order_Details` (`id`);

ALTER TABLE `order_Details` ADD FOREIGN KEY (`payment_ID`) REFERENCES `payment_Details` (`id`);
