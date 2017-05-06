-- phpMyAdmin SQL Dump
-- version 4.7.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Time： 2017 年 05 月 06 日 03:57
-- Server version: 5.7.18
-- PHP version： 5.5.36

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database： `BookstoresChain`
--

-- --------------------------------------------------------

--
-- Data table structure `Books`
--

CREATE TABLE `Books` (
  `id` int(255) NOT NULL,
  `Name` varchar(255) NOT NULL,
  `Author` varchar(255) NOT NULL,
  `Translator` varchar(255) DEFAULT NULL,
  `Publishing` int(255) NOT NULL,
  `PublishingDate` date NOT NULL,
  `Language` int(255) NOT NULL,
  `Type` int(255) NOT NULL,
  `ISBN` varchar(255) NOT NULL,
  `Image` varchar(255) NOT NULL,
  `Price` int(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Data table structure `Bookstores`
--

CREATE TABLE `Bookstores` (
  `id` int(255) NOT NULL,
  `Name` varchar(255) NOT NULL,
  `Password` varchar(255) NOT NULL,
  `Phone` varchar(255) NOT NULL,
  `Address` varchar(255) NOT NULL,
  `Region` int(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Data table structure `Inventory`
--

CREATE TABLE `Inventory` (
  `id` int(255) NOT NULL,
  `Bookstore` int(255) NOT NULL,
  `Book` int(255) NOT NULL,
  `Count` int(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Data table structure `Languages`
--

CREATE TABLE `Languages` (
  `id` int(255) NOT NULL,
  `Language` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Data table structure `Publishing`
--

CREATE TABLE `Publishing` (
  `id` int(11) NOT NULL,
  `Name` varchar(255) NOT NULL,
  `Phone` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Data table structure `Region`
--

CREATE TABLE `Region` (
  `id` int(255) NOT NULL,
  `Region` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Data table structure `Transaction`
--

CREATE TABLE `Transaction` (
  `id` int(11) NOT NULL,
  `Bookstore` int(11) NOT NULL,
  `Book` int(11) NOT NULL,
  `Count` int(11) NOT NULL,
  `Time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Data table structure `Transfer`
--

CREATE TABLE `Transfer` (
  `id` int(255) NOT NULL,
  `Book` int(255) NOT NULL,
  `Request` int(255) NOT NULL,
  `Response` int(255) NOT NULL,
  `Count` int(255) NOT NULL,
  `Accept` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Data table structure `Types`
--

CREATE TABLE `Types` (
  `id` int(255) NOT NULL,
  `Type` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Data table Index
--

--
-- Data table index `Books`
--
ALTER TABLE `Books`
  ADD PRIMARY KEY (`id`),
  ADD KEY `Language` (`Language`),
  ADD KEY `Publishing` (`Publishing`),
  ADD KEY `Type` (`Type`);

--
-- Data table index `Bookstores`
--
ALTER TABLE `Bookstores`
  ADD PRIMARY KEY (`id`),
  ADD KEY `Region` (`Region`);

--
-- Data table index `Inventory`
--
ALTER TABLE `Inventory`
  ADD PRIMARY KEY (`id`),
  ADD KEY `Bookstore` (`Bookstore`),
  ADD KEY `Book` (`Book`);

--
-- Data table index `Languages`
--
ALTER TABLE `Languages`
  ADD PRIMARY KEY (`id`);

--
-- Data table index `Publishing`
--
ALTER TABLE `Publishing`
  ADD PRIMARY KEY (`id`);

--
-- Data table index `Region`
--
ALTER TABLE `Region`
  ADD PRIMARY KEY (`id`);

--
-- Data table index `Transaction`
--
ALTER TABLE `Transaction`
  ADD PRIMARY KEY (`id`),
  ADD KEY `Bookstore` (`Bookstore`),
  ADD KEY `Book` (`Book`);

--
-- Data table index `Transfer`
--
ALTER TABLE `Transfer`
  ADD PRIMARY KEY (`id`),
  ADD KEY `Book` (`Book`),
  ADD KEY `Request` (`Request`),
  ADD KEY `Response` (`Response`);

--
-- Data table index `Types`
--
ALTER TABLE `Types`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT
--

--
-- AUTO_INCREMENT `Books`
--
ALTER TABLE `Books`
  MODIFY `id` int(255) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;
--
-- AUTO_INCREMENT `Bookstores`
--
ALTER TABLE `Bookstores`
  MODIFY `id` int(255) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;
--
-- AUTO_INCREMENT `Inventory`
--
ALTER TABLE `Inventory`
  MODIFY `id` int(255) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=28;
--
-- AUTO_INCREMENT `Languages`
--
ALTER TABLE `Languages`
  MODIFY `id` int(255) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;
--
-- AUTO_INCREMENT `Publishing`
--
ALTER TABLE `Publishing`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;
--
-- AUTO_INCREMENT `Region`
--
ALTER TABLE `Region`
  MODIFY `id` int(255) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;
--
-- AUTO_INCREMENT `Transaction`
--
ALTER TABLE `Transaction`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;
--
-- AUTO_INCREMENT `Transfer`
--
ALTER TABLE `Transfer`
  MODIFY `id` int(255) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=20;
--
-- AUTO_INCREMENT `Types`
--
ALTER TABLE `Types`
  MODIFY `id` int(255) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=22;
--
-- Constraint
--

--
-- Constraints `Books`
--
ALTER TABLE `Books`
  ADD CONSTRAINT `books_ibfk_1` FOREIGN KEY (`Language`) REFERENCES `Languages` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `books_ibfk_2` FOREIGN KEY (`Publishing`) REFERENCES `Publishing` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `books_ibfk_3` FOREIGN KEY (`Type`) REFERENCES `Types` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints `Bookstores`
--
ALTER TABLE `Bookstores`
  ADD CONSTRAINT `bookstores_ibfk_1` FOREIGN KEY (`Region`) REFERENCES `region` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints `Inventory`
--
ALTER TABLE `Inventory`
  ADD CONSTRAINT `inventory_ibfk_1` FOREIGN KEY (`Bookstore`) REFERENCES `Bookstores` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `inventory_ibfk_2` FOREIGN KEY (`Book`) REFERENCES `Books` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints `Transaction`
--
ALTER TABLE `Transaction`
  ADD CONSTRAINT `transaction_ibfk_1` FOREIGN KEY (`Bookstore`) REFERENCES `Bookstores` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `transaction_ibfk_2` FOREIGN KEY (`Book`) REFERENCES `Books` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints `Transfer`
--
ALTER TABLE `Transfer`
  ADD CONSTRAINT `transfer_ibfk_1` FOREIGN KEY (`Book`) REFERENCES `Books` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `transfer_ibfk_2` FOREIGN KEY (`Request`) REFERENCES `Bookstores` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `transfer_ibfk_3` FOREIGN KEY (`Response`) REFERENCES `Bookstores` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
