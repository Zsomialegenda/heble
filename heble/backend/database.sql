SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";
--
-- Adatbázis: `heble`
--

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `achievements`
--

CREATE TABLE `achievements` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `description` text DEFAULT NULL,
  `pushUpsRequired` int(11) DEFAULT 0,
  `pullUpsRequired` int(11) DEFAULT 0,
  `sitUpsRequired` int(11) DEFAULT 0,
  `squatsRequired` int(11) DEFAULT 0,
  `runningRequired` int(11) DEFAULT 0,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- A tábla adatainak kiíratása `achievements`
--

INSERT INTO `achievements` (`id`, `name`, `description`, `pushUpsRequired`, `pullUpsRequired`, `sitUpsRequired`, `squatsRequired`, `runningRequired`, `createdAt`, `updatedAt`) VALUES
(1, 'Fekvőtámasz mester', 'Végezzen összesen 50 fekvőtámaszt!', 50, 0, 0, 0, 0, '2025-03-21 18:53:36', '2025-03-21 18:53:36'),
(2, 'Húzódzkodás profi', 'Végezzen összesen 20 Húzódzkodást!', 0, 20, 0, 0, 0, '2025-03-21 18:53:36', '2025-03-21 18:53:36'),
(3, 'Guggolás specialista', 'Végezzen összesen 100 guggolást!', 0, 0, 0, 100, 0, '2025-03-21 18:53:36', '2025-03-21 18:53:36'),
(4, 'Újonc futó', 'Fusson összesen 5 kilométert!', 0, 0, 0, 0, 5, '2025-03-21 18:53:36', '2025-03-21 18:53:36'),
(5, 'Sokoldalú sportoló', 'Végezzen el 20 fekvőtámaszt, 10 Húzódzkodást, 30 guggolást és fusson 1 kilométert!', 20, 10, 0, 30, 1, '2025-03-21 18:53:36', '2025-03-21 18:53:36'),
(6, 'Haladó sportoló', 'Érjen el összesen 100 fekvőtámaszt, 50 Húzódzkodást, 150 guggolást és fusson 10 kilométert!', 100, 50, 0, 150, 10, '2025-03-21 18:53:36', '2025-03-21 18:53:36'),
(7, 'Marathon futó', 'Fusson összesen 42 kilométert!', 0, 0, 0, 0, 42, '2025-03-21 18:53:36', '2025-03-21 18:53:36'),
(8, 'asd', 'asd', 1, 1, 0, 1, 1, '2025-03-21 20:23:40', '2025-03-21 20:23:40');

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `deletedorbannedusers`
--

CREATE TABLE `deletedorbannedusers` (
  `id` int(11) NOT NULL,
  `userId` int(11) NOT NULL,
  `firstName` varchar(255) NOT NULL,
  `lastName` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `reason` enum('deleted','banned') NOT NULL,
  `deletedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `exercises`
--

CREATE TABLE `exercises` (
  `id` int(11) NOT NULL,
  `userId` int(11) NOT NULL,
  `pushUps` int(11) DEFAULT 0,
  `pullUps` int(11) DEFAULT 0,
  `sitUps` int(11) DEFAULT 0,
  `squats` int(11) DEFAULT 0,
  `running` float DEFAULT 0 COMMENT 'Running distance in kilometers',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- A tábla adatainak kiíratása `exercises`
--

INSERT INTO `exercises` (`id`, `userId`, `pushUps`, `pullUps`, `sitUps`, `squats`, `running`, `createdAt`, `updatedAt`) VALUES
(1, 1, 168, 44, 161, 447, 21.9121, '2025-03-21 18:53:36', '2025-03-21 18:53:36'),
(3, 3, 183, 17, 18, 142, 26.4368, '2025-03-21 18:53:36', '2025-03-21 18:53:36'),
(4, 4, 23, 97, 101, 474, 38.69, '2025-03-21 18:53:36', '2025-03-21 18:53:36'),
(5, 5, 191, 64, 109, 262, 30.5147, '2025-03-21 18:53:36', '2025-03-21 18:53:36'),
(6, 6, 159, 87, 116, 416, 41.2505, '2025-03-21 18:53:37', '2025-03-21 18:53:37'),
(7, 7, 52, 78, 53, 271, 24.9656, '2025-03-21 18:53:37', '2025-03-21 18:53:37'),
(8, 8, 127, 21, 21, 70, 45.131, '2025-03-21 18:53:37', '2025-03-21 18:53:37'),
(9, 9, 5, 51, 243, 329, 11.2465, '2025-03-21 18:53:37', '2025-03-21 18:53:37'),
(10, 10, 19, 34, 87, 76, 19.6279, '2025-03-21 18:53:37', '2025-03-21 18:53:37'),
(11, 11, 20, 46, 209, 370, 43.946, '2025-03-21 18:53:37', '2025-03-21 18:53:37'),
(12, 12, 180, 180, 180, 165, 165, '2025-03-21 19:06:05', '2025-03-21 19:07:33'),
(13, 13, 55, 55, 55, 55, 55, '2025-03-21 20:22:07', '2025-03-21 20:22:33');

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `tokens`
--

CREATE TABLE `tokens` (
  `id` int(11) NOT NULL,
  `userId` int(11) NOT NULL,
  `token` varchar(255) NOT NULL,
  `loginAt` datetime NOT NULL,
  `expiresAt` datetime NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- A tábla adatainak kiíratása `tokens`
--

INSERT INTO `tokens` (`id`, `userId`, `token`, `loginAt`, `expiresAt`, `createdAt`, `updatedAt`) VALUES
(10, 13, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEzLCJlbWFpbCI6ImFzZEBnbWFpbC5jb20iLCJpc0FkbWluIjpmYWxzZSwibG9naW5BdCI6IjIwMjUtMDMtMjJUMTI6MTI6NDQuOTUyWiIsImlhdCI6MTc0MjY0NTU2NCwiZXhwIjoxNzQyNjc0MzY0fQ.kg9W3k3jGOHNH0uaU5vR19c7J9Sro2ccMGH3o3L_EzE', '2025-03-22 12:12:44', '2025-03-22 20:12:44', '2025-03-22 12:12:44', '2025-03-22 12:12:44');

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `userachievements`
--

CREATE TABLE `userachievements` (
  `id` int(11) NOT NULL,
  `userId` int(11) NOT NULL,
  `achievementId` int(11) NOT NULL,
  `earnedAt` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- A tábla adatainak kiíratása `userachievements`
--

INSERT INTO `userachievements` (`id`, `userId`, `achievementId`, `earnedAt`) VALUES
(1, 1, 1, '2025-03-21 18:53:36'),
(3, 1, 2, '2025-03-21 18:53:36'),
(5, 3, 1, '2025-03-21 18:53:36'),
(7, 1, 3, '2025-03-21 18:53:36'),
(8, 3, 3, '2025-03-21 18:53:36'),
(10, 1, 4, '2025-03-21 18:53:36'),
(11, 4, 2, '2025-03-21 18:53:36'),
(13, 3, 4, '2025-03-21 18:53:37'),
(14, 1, 5, '2025-03-21 18:53:37'),
(15, 4, 3, '2025-03-21 18:53:37'),
(16, 5, 1, '2025-03-21 18:53:37'),
(18, 3, 5, '2025-03-21 18:53:37'),
(19, 4, 4, '2025-03-21 18:53:37'),
(20, 5, 2, '2025-03-21 18:53:37'),
(22, 6, 1, '2025-03-21 18:53:37'),
(23, 4, 5, '2025-03-21 18:53:37'),
(24, 5, 3, '2025-03-21 18:53:37'),
(25, 6, 2, '2025-03-21 18:53:37'),
(26, 7, 1, '2025-03-21 18:53:37'),
(27, 5, 4, '2025-03-21 18:53:37'),
(28, 6, 3, '2025-03-21 18:53:37'),
(29, 8, 1, '2025-03-21 18:53:37'),
(30, 7, 2, '2025-03-21 18:53:37'),
(31, 5, 5, '2025-03-21 18:53:37'),
(32, 6, 4, '2025-03-21 18:53:37'),
(33, 9, 2, '2025-03-21 18:53:37'),
(34, 8, 2, '2025-03-21 18:53:37'),
(35, 7, 3, '2025-03-21 18:53:37'),
(36, 5, 6, '2025-03-21 18:53:37'),
(37, 6, 5, '2025-03-21 18:53:37'),
(38, 10, 2, '2025-03-21 18:53:37'),
(39, 9, 3, '2025-03-21 18:53:37'),
(40, 7, 4, '2025-03-21 18:53:37'),
(41, 8, 4, '2025-03-21 18:53:37'),
(42, 6, 6, '2025-03-21 18:53:37'),
(43, 10, 4, '2025-03-21 18:53:37'),
(44, 9, 4, '2025-03-21 18:53:37'),
(45, 7, 5, '2025-03-21 18:53:37'),
(46, 8, 5, '2025-03-21 18:53:37'),
(47, 11, 2, '2025-03-21 18:53:37'),
(48, 8, 7, '2025-03-21 18:53:37'),
(49, 11, 3, '2025-03-21 18:53:37'),
(50, 11, 4, '2025-03-21 18:53:37'),
(51, 11, 5, '2025-03-21 18:53:37'),
(52, 11, 7, '2025-03-21 18:53:37'),
(53, 12, 2, '2025-03-21 19:07:24'),
(54, 12, 4, '2025-03-21 19:07:24'),
(55, 12, 5, '2025-03-21 19:07:25'),
(56, 12, 1, '2025-03-21 19:07:26'),
(57, 12, 7, '2025-03-21 19:07:26'),
(58, 12, 3, '2025-03-21 19:07:29'),
(59, 12, 6, '2025-03-21 19:07:32'),
(60, 13, 1, '2025-03-21 20:22:33'),
(61, 13, 2, '2025-03-21 20:22:33'),
(62, 13, 4, '2025-03-21 20:22:33'),
(63, 13, 5, '2025-03-21 20:22:33'),
(64, 13, 7, '2025-03-21 20:22:33');

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `userexperience`
--

CREATE TABLE `userexperience` (
  `id` int(11) NOT NULL,
  `userId` int(11) NOT NULL,
  `level` int(11) NOT NULL DEFAULT 1,
  `xp` int(11) NOT NULL DEFAULT 0,
  `xpToNextLevel` int(11) NOT NULL DEFAULT 100,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- A tábla adatainak kiíratása `userexperience`
--

INSERT INTO `userexperience` (`id`, `userId`, `level`, `xp`, `xpToNextLevel`, `createdAt`, `updatedAt`) VALUES
(1, 1, 7, 46, 840, '2025-03-21 18:53:36', '2025-03-21 18:53:36'),
(3, 3, 6, 417, 121, '2025-03-21 18:53:36', '2025-03-21 18:53:36'),
(4, 4, 5, 339, 756, '2025-03-21 18:53:36', '2025-03-21 18:53:36'),
(5, 5, 5, 28, 275, '2025-03-21 18:53:37', '2025-03-21 18:53:37'),
(6, 6, 8, 90, 793, '2025-03-21 18:53:37', '2025-03-21 18:53:37'),
(7, 7, 6, 138, 577, '2025-03-21 18:53:37', '2025-03-21 18:53:37'),
(8, 8, 10, 203, 711, '2025-03-21 18:53:37', '2025-03-21 18:53:37'),
(9, 9, 8, 471, 383, '2025-03-21 18:53:37', '2025-03-21 18:53:37'),
(10, 10, 6, 347, 892, '2025-03-21 18:53:37', '2025-03-21 18:53:37'),
(11, 11, 10, 297, 861, '2025-03-21 18:53:37', '2025-03-21 18:53:37'),
(12, 12, 15, 1803, 3896, '2025-03-21 19:06:05', '2025-03-21 19:07:33'),
(13, 13, 11, 445, 1365, '2025-03-21 20:22:07', '2025-03-21 20:22:33');

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `firstName` varchar(255) NOT NULL,
  `lastName` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `secureAnswer` varchar(255) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- A tábla adatainak kiíratása `users`
--

INSERT INTO `users` (`id`, `firstName`, `lastName`, `email`, `password`, `secureAnswer`, `createdAt`, `updatedAt`) VALUES
(1, 'Admin', 'User', 'admin', '$2b$10$LUDg49OsVuVrWGOzxzxf4OqAwj8zX5EzwRp4q50Dquxyb3Zdg8tka', 'heble', '2025-03-21 18:53:36', '2025-03-21 18:53:36'),
(3, 'Vicenta', 'Wisoky', 'Rosalee25@hotmail.com', '$2b$10$p/RzEceTgptJ5lPNm22OiOjQK6uNwsAdUipcCLkhWeXnhJhAcK/r2', 'heble', '2025-03-21 18:53:36', '2025-03-21 18:53:36'),
(4, 'Kayden', 'Morar', 'Broderick13@gmail.com', '$2b$10$CKdTE3sAcJInHyaJ8X76fenivFSGFNYiRhOyfxinCpoT/vOjN4RVm', 'heble', '2025-03-21 18:53:36', '2025-03-21 18:53:36'),
(5, 'Jamil', 'Koch', 'Alexis26@yahoo.com', '$2b$10$6jPwtLVPZlIht/9VaJpuCOw/sLdVaT4nEo/uXo/qgUFaNc3ZI4t3q', 'heble', '2025-03-21 18:53:36', '2025-03-21 18:53:36'),
(6, 'Claire', 'Toy', 'Howard84@yahoo.com', '$2b$10$U22cQQPQ.JcJpdLBDJ6RSO4dQdPiroGH3REsOhlygg2Y0N1CqJ2FG', 'heble', '2025-03-21 18:53:36', '2025-03-21 18:53:36'),
(7, 'Laurine', 'Kertzmann', 'Idella82@hotmail.com', '$2b$10$/eNCBCeRMlvQoAAoKjEVi.n5/L0vnjVT1UQbhWoxL6fnr17zXSbhm', 'heble', '2025-03-21 18:53:36', '2025-03-21 18:53:36'),
(8, 'Kira', 'Rowe', 'Lurline.Koepp56@gmail.com', '$2b$10$5t34xIP/u25lB.7PUGP9v.qmMysEIi2Ohi7x1MNcRD9rVKiu.eJyq', 'heble', '2025-03-21 18:53:36', '2025-03-21 18:53:36'),
(9, 'Sharon', 'Franey', 'Kathleen37@yahoo.com', '$2b$10$ethm8MU.ofaF0FsvvgxFnelFqnHxikPi2.TaI1HiIcr0FVNrxkCv2', 'heble', '2025-03-21 18:53:36', '2025-03-21 18:53:36'),
(10, 'Madison', 'Turcotte', 'Jonathan_Kshlerin12@hotmail.com', '$2b$10$y2Sn/EcNg1FkORyIA3HABO/xVaEUyefMApTs5eOr5P8nmkpSwtyIq', 'heble', '2025-03-21 18:53:36', '2025-03-21 18:53:36'),
(11, 'Jeremie', 'Murray', 'Arnaldo.Klein21@yahoo.com', '$2b$10$92jK.NCl2xECMrKQf4R1dO7b/WXN.gkguCedtilBnVLejEs6rfVuK', 'heble', '2025-03-21 18:53:36', '2025-03-21 18:53:36'),
(12, 'asd', 'asd', 'asd@example.com', '$2a$10$GkFm4jAYPrUgDK/8SHegBOhuIlPvEpM6jVJ8WAdgYHVrQDkJilLDa', '$2a$10$TDhMt10EEXCWyLytZLAAN.lCnJa7XoLJJe5NvGYBkw4qZQ2JDzJ4y', '2025-03-21 19:06:05', '2025-03-21 19:06:05'),
(13, 'asd', 'asd', 'asd@gmail.com', '$2a$10$8nioqmRJamQAK4ooSILyduZYA2xVtxUT/Ey5xhast.EpTjufCvkk.', '$2a$10$MrTnCMK4tNhCd03Us3T3UebnsT04itn39EomraEMkNki4VRyCzb/m', '2025-03-21 20:22:07', '2025-03-21 20:22:07');

--
-- Indexek a kiírt táblákhoz
--

--
-- A tábla indexei `achievements`
--
ALTER TABLE `achievements`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `name` (`name`);

--
-- A tábla indexei `deletedorbannedusers`
--
ALTER TABLE `deletedorbannedusers`
  ADD PRIMARY KEY (`id`),
  ADD KEY `userId` (`userId`);

--
-- A tábla indexei `exercises`
--
ALTER TABLE `exercises`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `userId` (`userId`);

--
-- A tábla indexei `tokens`
--
ALTER TABLE `tokens`
  ADD PRIMARY KEY (`id`),
  ADD KEY `userId` (`userId`);

--
-- A tábla indexei `userachievements`
--
ALTER TABLE `userachievements`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `UserAchievements_achievementId_userId_unique` (`userId`,`achievementId`),
  ADD KEY `achievementId` (`achievementId`);

--
-- A tábla indexei `userexperience`
--
ALTER TABLE `userexperience`
  ADD PRIMARY KEY (`id`),
  ADD KEY `userId` (`userId`);

--
-- A tábla indexei `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- A kiírt táblák AUTO_INCREMENT értéke
--

--
-- AUTO_INCREMENT a táblához `achievements`
--
ALTER TABLE `achievements`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT a táblához `deletedorbannedusers`
--
ALTER TABLE `deletedorbannedusers`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT a táblához `exercises`
--
ALTER TABLE `exercises`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT a táblához `tokens`
--
ALTER TABLE `tokens`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT a táblához `userachievements`
--
ALTER TABLE `userachievements`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=65;

--
-- AUTO_INCREMENT a táblához `userexperience`
--
ALTER TABLE `userexperience`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT a táblához `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- Megkötések a kiírt táblákhoz
--

--
-- Megkötések a táblához `deletedorbannedusers`
--
ALTER TABLE `deletedorbannedusers`
  ADD CONSTRAINT `deletedorbannedusers_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON DELETE CASCADE;

--
-- Megkötések a táblához `exercises`
--
ALTER TABLE `exercises`
  ADD CONSTRAINT `exercises_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Megkötések a táblához `tokens`
--
ALTER TABLE `tokens`
  ADD CONSTRAINT `tokens_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Megkötések a táblához `userachievements`
--
ALTER TABLE `userachievements`
  ADD CONSTRAINT `userachievements_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `userachievements_ibfk_2` FOREIGN KEY (`achievementId`) REFERENCES `achievements` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Megkötések a táblához `userexperience`
--
ALTER TABLE `userexperience`
  ADD CONSTRAINT `userexperience_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;
