-- MySQL dump 10.13  Distrib 8.0.34, for Win64 (x86_64)
--
-- Host: localhost    Database: rescmeal
-- ------------------------------------------------------
-- Server version	8.0.34

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `business`
--

DROP TABLE IF EXISTS `business`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `business` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  `type` varchar(50) DEFAULT NULL,
  `address` varchar(150) DEFAULT NULL,
  `image` varchar(100) DEFAULT NULL,
  `phone` varchar(20) DEFAULT NULL,
  `schedule` varchar(100) DEFAULT NULL,
  `cvu` varchar(22) DEFAULT NULL,
  `address_lat` float DEFAULT NULL,
  `address_long` float DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `cvu` (`cvu`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `business`
--

LOCK TABLES `business` WRITE;
/*!40000 ALTER TABLE `business` DISABLE KEYS */;
INSERT INTO `business` VALUES (1,'El Buen Sabor','Restaurante','Rio Negro 488','sabor.jpg','1122334455','08:00-22:00','1234567890123456789012',-38.9516,-68.0591),(2,'La Delicia','Panader├¡a','Diagonal 9 De Julio 50','delicia.jpg','5566778899','06:00-18:00','9876543210987654321098',-38.9517,-68.0592),(3,'El Mexicano','Taquer├¡a','Diagonal 9 De Julio 70','mexicano.jpg','2233445566','11:00-23:00','1122334455667788990011',-38.9518,-68.0593);
/*!40000 ALTER TABLE `business` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `carrier`
--

DROP TABLE IF EXISTS `carrier`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `carrier` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(50) DEFAULT NULL,
  `last_name` varchar(50) DEFAULT NULL,
  `vehicle_type` varchar(30) DEFAULT NULL,
  `phone` varchar(15) DEFAULT NULL,
  `birthdate` date DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `carrier`
--

LOCK TABLES `carrier` WRITE;
/*!40000 ALTER TABLE `carrier` DISABLE KEYS */;
INSERT INTO `carrier` VALUES (1,'Carlos','Lopez','Motocicleta','1231231234','1980-09-15'),(2,'Ana','Martinez','Bicicleta','9879879876','1993-09-20');
/*!40000 ALTER TABLE `carrier` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `client`
--

DROP TABLE IF EXISTS `client`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `client` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(50) NOT NULL,
  `last_name` varchar(50) DEFAULT NULL,
  `phone` varchar(20) DEFAULT NULL,
  `balance` decimal(10,2) DEFAULT NULL,
  `birthdate` date DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `client`
--

LOCK TABLES `client` WRITE;
/*!40000 ALTER TABLE `client` DISABLE KEYS */;
INSERT INTO `client` VALUES (1,'Juan','Perez','1234567890',100.50,'1990-01-01'),(2,'Maria','Gomez','0987654321',200.75,'1985-05-15');
/*!40000 ALTER TABLE `client` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `comment`
--

DROP TABLE IF EXISTS `comment`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `comment` (
  `id` int NOT NULL AUTO_INCREMENT,
  `client_id` int DEFAULT NULL,
  `carrier_id` int DEFAULT NULL,
  `description` text,
  PRIMARY KEY (`id`),
  KEY `client_id` (`client_id`),
  KEY `carrier_id` (`carrier_id`),
  CONSTRAINT `comment_ibfk_1` FOREIGN KEY (`client_id`) REFERENCES `client` (`id`),
  CONSTRAINT `comment_ibfk_2` FOREIGN KEY (`carrier_id`) REFERENCES `carrier` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `comment`
--

LOCK TABLES `comment` WRITE;
/*!40000 ALTER TABLE `comment` DISABLE KEYS */;
/*!40000 ALTER TABLE `comment` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `delivery`
--

DROP TABLE IF EXISTS `delivery`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `delivery` (
  `id` int NOT NULL AUTO_INCREMENT,
  `purchase_id` int DEFAULT NULL,
  `carrier_id` int DEFAULT NULL,
  `address` varchar(150) DEFAULT NULL,
  `delivery_time` time DEFAULT NULL,
  `arrival_time` time DEFAULT NULL,
  `waiting_time` time DEFAULT NULL,
  `delivery_state` varchar(30) DEFAULT NULL,
  `tip` decimal(10,2) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `purchase_id` (`purchase_id`),
  KEY `carrier_id` (`carrier_id`),
  CONSTRAINT `delivery_ibfk_1` FOREIGN KEY (`purchase_id`) REFERENCES `purchase` (`id`),
  CONSTRAINT `delivery_ibfk_2` FOREIGN KEY (`carrier_id`) REFERENCES `carrier` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `delivery`
--

LOCK TABLES `delivery` WRITE;
/*!40000 ALTER TABLE `delivery` DISABLE KEYS */;
/*!40000 ALTER TABLE `delivery` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `food`
--

DROP TABLE IF EXISTS `food`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `food` (
  `id` int NOT NULL AUTO_INCREMENT,
  `business_id` int DEFAULT NULL,
  `name` varchar(100) DEFAULT NULL,
  `category` varchar(50) DEFAULT NULL,
  `price` decimal(10,2) DEFAULT NULL,
  `image` varchar(50) DEFAULT NULL,
  `description` text,
  `quantity` int DEFAULT NULL,
  `expiration_date` date DEFAULT NULL,
  `production_date` date DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `business_id` (`business_id`),
  CONSTRAINT `food_ibfk_1` FOREIGN KEY (`business_id`) REFERENCES `business` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `food`
--

LOCK TABLES `food` WRITE;
/*!40000 ALTER TABLE `food` DISABLE KEYS */;
INSERT INTO `food` VALUES (1,1,'Sopa de Tomate','Sopa',35.00,'1-Sopa de Tomate.jpeg','Sopa casera de tomate con albahaca.',15,'2024-10-21','2024-10-09'),(2,1,'Hamburguesa de Pollo','Hamburguesa',70.00,'1-Hamburguesa de Pollo.jpeg','Hamburguesa con pechuga de pollo, lechuga y tomate',10,'2024-08-17','2024-05-13'),(3,1,'Tarta de Manzana','Postre',45.00,'1-Tarta de Manzana.jpeg','Tarta de manzana con base crujiente',8,'2024-01-04','2023-12-24'),(4,2,'Croissant','Panader├¡a',15.00,'2-Croissant.jpeg','Croissant hojaldrado y mantecoso',25,'2024-12-02','2024-10-11'),(5,2,'Bagel de Avena','Panader├¡a',18.00,'2-Bagel de Avena.jpeg','Bagel integral con avena',20,'2024-02-01','2023-12-31'),(6,2,'Brownie de Chocolate','Postre',30.00,'2-Brownie de Chocolate.jpeg','Brownie de chocolate con nueces',12,'2024-10-31','2024-10-11'),(7,3,'Taco de Pollo','Tacos',40.00,'3-Taco de Pollo.jpeg','Taco relleno de pollo, aguacate y salsa',30,'2024-05-05','2024-04-27'),(8,3,'Quesadilla de Queso','Quesadillas',35.00,'3-Quesadilla de Queso.jpeg','Quesadilla con mezcla de quesos derretidos',25,'2024-05-13','2024-04-22'),(9,3,'Nachos','Entradas',25.00,'3-Nachos.jpeg','Nachos con salsa de queso y jalape├▒os',40,'2024-01-30','2023-12-31');
/*!40000 ALTER TABLE `food` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `purchase`
--

DROP TABLE IF EXISTS `purchase`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `purchase` (
  `id` int NOT NULL AUTO_INCREMENT,
  `client_id` int DEFAULT NULL,
  `payment_method` varchar(20) DEFAULT NULL,
  `total_cost` decimal(10,2) DEFAULT NULL,
  `pickup` tinyint(1) DEFAULT NULL,
  `creation_date` date DEFAULT NULL,
  `address` varchar(50) NOT NULL,
  `address_lat` float(9,6) NOT NULL,
  `address_long` float(9,6) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `client_id` (`client_id`),
  CONSTRAINT `purchase_ibfk_1` FOREIGN KEY (`client_id`) REFERENCES `client` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `purchase`
--

LOCK TABLES `purchase` WRITE;
/*!40000 ALTER TABLE `purchase` DISABLE KEYS */;
INSERT INTO `purchase` VALUES (1,1,'Tarjeta',140.00,1,'2024-10-20','El Buen Sabor',-38.951599,-68.059097),(2,2,'Efectivo',35.00,0,'2024-10-21','La Delicia',-38.951698,-68.059196),(3,1,'Tarjeta',100.00,1,'2024-10-22','El Mexicano',-38.951801,-68.059303),(4,2,'Efectivo',60.00,0,'2024-10-23','El Buen Sabor',-38.951599,-68.059097),(5,1,'Transferencia',75.00,1,'2024-10-24','La Delicia',-38.951698,-68.059196),(6,2,'Tarjeta',90.00,0,'2024-10-25','El Mexicano',-38.951801,-68.059303),(7,1,'Tarjeta',150.00,1,'2024-10-01','El Buen Sabor',-38.951599,-68.059097),(8,2,'Efectivo',120.00,0,'2024-10-02','El Buen Sabor',-38.951698,-68.059196),(9,1,'Tarjeta',180.00,1,'2024-10-03','La Delicia',-38.951801,-68.059303),(10,2,'Transferencia',90.00,1,'2024-10-04','El Buen Sabor',-38.951599,-68.059097),(11,1,'Tarjeta',200.00,0,'2024-10-05','La Delicia',-38.951698,-68.059196),(12,2,'Efectivo',130.00,0,'2024-10-06','El Mexicano',-38.951801,-68.059303);
/*!40000 ALTER TABLE `purchase` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `purchased_item`
--

DROP TABLE IF EXISTS `purchased_item`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `purchased_item` (
  `id` int NOT NULL AUTO_INCREMENT,
  `purchase_id` int DEFAULT NULL,
  `business_id` int DEFAULT NULL,
  `food_id` int DEFAULT NULL,
  `quantity` int DEFAULT NULL,
  `price` decimal(10,2) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `purchase_id` (`purchase_id`),
  KEY `business_id` (`business_id`),
  KEY `food_id` (`food_id`),
  CONSTRAINT `purchased_item_ibfk_1` FOREIGN KEY (`purchase_id`) REFERENCES `purchase` (`id`),
  CONSTRAINT `purchased_item_ibfk_2` FOREIGN KEY (`business_id`) REFERENCES `business` (`id`),
  CONSTRAINT `purchased_item_ibfk_3` FOREIGN KEY (`food_id`) REFERENCES `food` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `purchased_item`
--

LOCK TABLES `purchased_item` WRITE;
/*!40000 ALTER TABLE `purchased_item` DISABLE KEYS */;
INSERT INTO `purchased_item` VALUES (1,1,1,1,2,35.00),(2,1,1,2,1,70.00),(3,1,1,3,1,35.00),(4,2,2,4,1,15.00),(5,2,2,5,1,18.00),(6,3,3,7,2,40.00),(7,3,3,8,1,35.00),(8,3,3,9,1,25.00),(9,4,1,1,1,35.00),(10,4,1,3,1,45.00),(11,5,2,4,2,15.00),(12,5,2,6,1,30.00),(13,6,3,7,2,40.00),(14,6,3,8,2,35.00),(15,6,3,9,1,25.00);
/*!40000 ALTER TABLE `purchased_item` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `review`
--

DROP TABLE IF EXISTS `review`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `review` (
  `id` int NOT NULL AUTO_INCREMENT,
  `business_id` int DEFAULT NULL,
  `client_id` int DEFAULT NULL,
  `review_date` date DEFAULT NULL,
  `mark` int DEFAULT NULL,
  `description` text,
  PRIMARY KEY (`id`),
  KEY `business_id` (`business_id`),
  KEY `client_id` (`client_id`),
  CONSTRAINT `review_ibfk_1` FOREIGN KEY (`business_id`) REFERENCES `business` (`id`),
  CONSTRAINT `review_ibfk_2` FOREIGN KEY (`client_id`) REFERENCES `client` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `review`
--

LOCK TABLES `review` WRITE;
/*!40000 ALTER TABLE `review` DISABLE KEYS */;
/*!40000 ALTER TABLE `review` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `role`
--

DROP TABLE IF EXISTS `role`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `role` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `role`
--

LOCK TABLES `role` WRITE;
/*!40000 ALTER TABLE `role` DISABLE KEYS */;
INSERT INTO `role` VALUES (1,'ROLE_CLIENT'),(2,'ROLE_BUSINESS'),(3,'ROLE_CARRIER'),(4,'ROLE_ADMIN');
/*!40000 ALTER TABLE `role` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user` (
  `id` int NOT NULL AUTO_INCREMENT,
  `client_id` int DEFAULT NULL,
  `business_id` int DEFAULT NULL,
  `carrier_id` int DEFAULT NULL,
  `username` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`),
  KEY `client_id` (`client_id`),
  KEY `business_id` (`business_id`),
  KEY `carrier_id` (`carrier_id`),
  CONSTRAINT `user_ibfk_1` FOREIGN KEY (`client_id`) REFERENCES `client` (`id`),
  CONSTRAINT `user_ibfk_2` FOREIGN KEY (`business_id`) REFERENCES `business` (`id`),
  CONSTRAINT `user_ibfk_3` FOREIGN KEY (`carrier_id`) REFERENCES `carrier` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (1,NULL,NULL,NULL,'Admin','admin@email.com','$2a$10$Wu81ayKJNIRNwHqqj4rvw.Glsx2hzw1Ae6DGfcpe3hushJcVMd2De'),(2,1,NULL,NULL,'Juan900101','juan.perez@example.com','$2a$10$5yYxhg/ZRfIfZLI2vIg4ceL6cd3Jj0cC/MYCIeK47yMCLSunUY0ja'),(3,2,NULL,NULL,'Maria850515','maria.gomez@example.com','$2a$10$KP3rS569jADjeUbg1joqwurvnDtK7WJ2rcoMwJylXglHzWcC1vcP.'),(4,NULL,1,NULL,'ElBuenSabor','contacto@sabor.com','$2a$10$WTJpsCKcSV3PlaA.kzKTUeItxdGPEHCVvJCC7uwA0tui..vkwhrGy'),(5,NULL,2,NULL,'LaDelicia','contacto@delicia.com','$2a$10$vS71FWA8lrwj418T1NEAV.GkWOoxs7a0YJask045UQEGFKlX99xJ.'),(6,NULL,3,NULL,'ElMexicano','contacto@mexicano.com','$2a$10$FnJax93F9tu749snri8hJObHrOvG/DE4jHCuz9leqTB8.8EyEdQfK'),(7,NULL,NULL,1,'Carlos800915','carlos@delivery.com','$2a$10$41J6UALCnk/ZMk3OYfezQ.wBigxr8PVct7g76SX1vNPrGSwkqdbHS'),(8,NULL,NULL,2,'Ana930920','ana@delivery.com','$2a$10$WqaeVCoELBnsZWe5ZMHQZ.98b5K/1oDwgxLbR6ECpJDo.qE2hMVZu');
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_role`
--

DROP TABLE IF EXISTS `user_role`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user_role` (
  `user_id` int DEFAULT NULL,
  `role_id` int DEFAULT NULL,
  KEY `user_id` (`user_id`),
  KEY `role_id` (`role_id`),
  CONSTRAINT `user_role_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`),
  CONSTRAINT `user_role_ibfk_2` FOREIGN KEY (`role_id`) REFERENCES `role` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_role`
--

LOCK TABLES `user_role` WRITE;
/*!40000 ALTER TABLE `user_role` DISABLE KEYS */;
INSERT INTO `user_role` VALUES (1,4),(2,1),(3,1),(4,2),(5,2),(6,2),(7,3),(8,3);
/*!40000 ALTER TABLE `user_role` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-11-22 20:39:02
