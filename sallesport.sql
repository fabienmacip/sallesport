-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1
-- Généré le : ven. 16 sep. 2022 à 12:23
-- Version du serveur : 10.4.20-MariaDB
-- Version de PHP : 8.0.9

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données : `sallesport`
--

-- --------------------------------------------------------

--
-- Structure de la table `grants`
--

CREATE TABLE `grants` (
  `id` int(11) NOT NULL,
  `membersread` int(1) NOT NULL,
  `memberswrite` int(11) NOT NULL,
  `membersadd` int(11) NOT NULL,
  `membersupdate` int(11) NOT NULL,
  `membersproductsadd` int(11) NOT NULL,
  `memberspaymentscheduleread` int(11) NOT NULL,
  `membersstatsread` int(1) NOT NULL,
  `memberssubscriptionread` int(11) NOT NULL,
  `paymentschedulesread` int(11) NOT NULL,
  `paymentscheduleswrite` int(11) NOT NULL,
  `paymentdayread` int(11) NOT NULL,
  `drinksell` int(11) NOT NULL,
  `foodsell` int(11) NOT NULL,
  `sendnewsletter` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Déchargement des données de la table `grants`
--

INSERT INTO `grants` (`id`, `membersread`, `memberswrite`, `membersadd`, `membersupdate`, `membersproductsadd`, `memberspaymentscheduleread`, `membersstatsread`, `memberssubscriptionread`, `paymentschedulesread`, `paymentscheduleswrite`, `paymentdayread`, `drinksell`, `foodsell`, `sendnewsletter`) VALUES
(1, 1, 1, 1, 1, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0),
(2, 0, 0, 1, 0, 1, 0, 1, 1, 0, 1, 0, 1, 0, 0),
(3, 1, 0, 0, 1, 0, 0, 0, 1, 0, 1, 1, 1, 1, 1),
(4, 0, 1, 1, 0, 0, 1, 0, 1, 0, 1, 1, 1, 0, 0),
(5, 1, 1, 1, 1, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0),
(6, 1, 0, 0, 0, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1),
(7, 1, 0, 1, 1, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0),
(8, 1, 1, 1, 1, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0),
(9, 1, 1, 1, 1, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0),
(10, 1, 1, 1, 1, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0),
(11, 1, 1, 1, 1, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0),
(13, 0, 1, 0, 1, 1, 0, 1, 1, 0, 0, 0, 1, 1, 0),
(14, 1, 1, 1, 1, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0),
(15, 0, 1, 0, 0, 0, 0, 1, 1, 0, 1, 1, 1, 0, 0),
(16, 1, 1, 1, 1, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0),
(17, 0, 1, 1, 1, 0, 0, 1, 0, 0, 1, 1, 1, 1, 1),
(18, 0, 0, 0, 0, 1, 0, 0, 1, 1, 0, 1, 1, 1, 1),
(19, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 1, 1, 1, 1),
(22, 1, 0, 0, 0, 0, 0, 0, 1, 0, 1, 1, 1, 1, 1),
(23, 1, 0, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1),
(24, 1, 0, 0, 0, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1),
(25, 1, 0, 1, 0, 1, 0, 1, 1, 0, 1, 0, 1, 0, 0),
(26, 0, 1, 0, 0, 1, 0, 1, 1, 0, 1, 0, 1, 0, 0),
(27, 1, 0, 1, 0, 1, 0, 1, 1, 0, 1, 0, 1, 0, 0),
(28, 1, 0, 1, 0, 1, 0, 1, 1, 0, 1, 0, 1, 0, 0),
(29, 1, 1, 0, 1, 0, 0, 0, 1, 0, 1, 1, 1, 1, 1),
(30, 0, 0, 1, 0, 1, 0, 1, 1, 0, 1, 0, 1, 0, 0),
(43, 0, 0, 1, 0, 1, 0, 1, 1, 0, 1, 0, 1, 0, 0),
(44, 0, 0, 1, 0, 1, 0, 1, 1, 0, 1, 0, 1, 0, 0),
(45, 0, 0, 1, 0, 1, 0, 1, 1, 0, 1, 0, 1, 0, 0);

-- --------------------------------------------------------

--
-- Structure de la table `mail`
--

CREATE TABLE `mail` (
  `id` int(11) NOT NULL,
  `titre` text DEFAULT NULL,
  `corps` text DEFAULT NULL,
  `lien` varchar(100) DEFAULT NULL,
  `lu` int(11) DEFAULT NULL,
  `partenaire` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Déchargement des données de la table `mail`
--

INSERT INTO `mail` (`id`, `titre`, `corps`, `lien`, `lu`, `partenaire`) VALUES
(1, 'Validation nouvelle structure', 'Bonjour\r\nveuillez cliquer ici pour valider la nouvelle structure', 'monlien', 1, 1),
(2, 'Modification droit', 'Bonjour\r\nnous vous informons qu\'un droit a été modifié concernant le partenaire M. DUPOND', '', 1, 1),
(4, 'le titre du message', 'Ceci est un mail de test', 'labas', 0, 1),
(5, 'le titre du message n°2 modifié', 'héhé, Ceci est un mail de test, avec &quot;partenaire&quot; kiki', 'encore labas aussi', 1, 2),
(6, 'Droit activé', 'Cher partenaire, nous vous informons que le droit &quot;Lire les membres&quot; a été activé concernant votre compte &quot;partenaire&quot;', '', 0, 2),
(7, 'Droit activé', 'Cher partenaire, nous vous informons que le droit &quot;Ajouter un membre&quot; a été désactivé concernant la structure gérée par M. Alibert située à l\'adresse suivante\nBat 3Fe 15 route de Seysses à TOULOUSE', '', 0, 1),
(8, 'Droit activé', 'Cher partenaire, nous vous informons que le droit &quot;Ajouter un membre&quot; a été désactivé concernant la structure gérée par M. Alibert située à l\'adresse suivante\nBat 3Fe 15 route de Seysses à TOULOUSE', '', 0, 1),
(9, 'Droit activé', 'Cher partenaire, nous vous informons que le droit &quot;Ajouter un produit à un membre&quot; a été activé concernant la structure gérée par M. Alibert située à l\'adresse suivante\nBat 3Fe 15 route de Seysses à TOULOUSE', '', 0, 1),
(10, 'Droit activé', 'Cher partenaire, nous vous informons que le droit &quot;Lire les membres&quot; a été désactivé concernant la structure gérée par M. Alibert située à l\'adresse suivante\nBat 3Fe 15 route de Seysses à TOULOUSE', '', 0, 1),
(11, 'Droit activé', 'Cher partenaire, nous vous informons que le droit &quot;Ecrire aux membres&quot; a été désactivé concernant la structure gérée par M. Alibert située à l\'adresse suivante\nBat 3Fe 15 route de Seysses à TOULOUSE', '', 0, 1),
(12, 'Droit activé', 'Cher partenaire, nous vous informons que le droit &amp;quot;Ajouter un produit à un membre&amp;quot; a été activé concernant la structure gérée par M. Alibert située à l\'adresse suivante\nBat 3Fe 15 route de Seysses à TOULOUSE', '', 1, 1),
(13, 'Droit activé', 'Cher partenaire, nous vous informons que le droit &amp;amp;quot;Vendre des boissons&amp;amp;quot; a été activé concernant la structure gérée par M. Alibert située à l\'adresse suivante\nBat 3Fe 15 route de Seysses à TOULOUSE', '', 1, 29),
(14, 'Droit activé', 'Cher partenaire, nous vous informons que le droit &amp;quot;Lire les échéances de virements&amp;quot; a été désactivé concernant la structure gérée par M. Alibert située à l\'adresse suivante\nBat 3Fe 15 route de Seysses à TOULOUSE', '', 1, 1),
(15, 'Structure créée, à activer.', 'Cher partenaire, nous vous informons que la structure gérée par Mme Gineste située à l\'adresse suivante\n2ème étage 3, rue des prés à PARIS a été créée. Pour l\'activer, merci de cliquer sur le bouton ci-dessous.', '20', 0, 29),
(16, 'Structure créée, à activer.', 'Cher partenaire, nous vous informons que la structure gérée par Mme Gineste située à l\'adresse suivante\n2ème étage 3, rue des prés à PARIS a été créée. Pour l\'activer, merci de cliquer sur le bouton ci-dessous.', 'cliquer ici pour activer', 0, 2),
(17, 'Droit activé', 'Cher partenaire, nous vous informons que le droit &quot;Ecrire aux membres&quot; a été activé concernant la structure gérée par Mme Gineste située à l\'adresse suivante\n2ème étage 45, avenue Jean Moulin à BEZIERS', '', 0, 2),
(18, 'Droit activé', 'Cher partenaire, nous vous informons que le droit &quot;Ecrire aux membres&quot; a été désactivé concernant la structure gérée par Mme Gineste située à l\'adresse suivante\n2ème étage 45, avenue Jean Moulin à BEZIERS', '', 0, 2),
(19, 'Droit activé', 'Cher partenaire, nous vous informons que le droit &quot;Ecrire aux membres&quot; a été désactivé concernant votre compte &quot;partenaire&quot;', '', 0, 14),
(20, 'Droit activé', 'Cher partenaire, nous vous informons que le droit &quot;Ecrire aux membres&quot; a été activé concernant votre compte &quot;partenaire&quot;', '', 0, 14),
(21, 'Droit activé', 'Cher partenaire, nous vous informons que le droit &quot;Lire les échéances de virements&quot; a été désactivé concernant la structure gérée par Mme fqsdmlfkj située à l\'adresse suivante\nRE test RE test à LKJMLKJ', '15', 1, 29),
(22, 'Droit activé', 'Cher partenaire, nous vous informons que le droit &quot;Ecrire aux membres&quot; a été désactivé concernant votre compte &quot;partenaire&quot;', '', 0, 2),
(23, 'Droit activé', 'Cher partenaire, nous vous informons que le droit &quot;Ecrire aux membres&quot; a été activé concernant la structure gérée par M. Kalou située à l\'adresse suivante\n2ème étage 3, rue des prés à PARIS', '', 0, 2),
(24, 'Droit activé', 'Cher partenaire, nous vous informons que le droit &quot;Lire les membres&quot; a été désactivé concernant la structure gérée par M. Kalou située à l\'adresse suivante\n2ème étage 3, rue des prés à PARIS', '', 0, 2),
(25, 'Droit activé', 'Cher partenaire, nous vous informons que le droit &amp;quot;Lire les membres&amp;quot; a été désactivé concernant votre compte &amp;quot;partenaire&amp;quot;', '', 1, 1),
(26, 'Structure créée, à activer.', 'Cher partenaire, nous vous informons que la structure gérée par M. Roesch située à l\'adresse suivante\nRDC Rue de Mont-Vernon à ST-MARTIN a été créée. Pour l\'activer, merci de cliquer sur le bouton ci-dessous.', 'cliquer ici pour activer', 1, 1),
(27, 'Structure créée, à activer.', 'Cher partenaire, nous vous informons que la structure gérée par Mme Gineste située à l\'adresse suivante\n2ème étage 3, rue des prés à PARIS a été créée. Pour l\'activer, merci de cliquer sur le bouton ci-dessous.', 'cliquer ici pour activer', 1, 1),
(28, 'Structure créée, à activer.', 'Cher partenaire, nous vous informons que la structure gérée par Mme Nath située à l\'adresse suivante\nBAT E4 678, route de Sint-Maarten à ST-Barthelemy a été créée. Pour l\'activer, merci de cliquer sur le bouton ci-dessous.', 'cliquer ici pour activer', 1, 1),
(29, 'Structure créée, à activer.', 'Cher partenaire, nous vous informons que la structure gérée par Mme Gineste située à l\'adresse suivante\nBELLA 3, rue des prés à PARIS a été créée. Pour l\'activer, merci de cliquer sur le bouton ci-dessous.', '31', 1, 1),
(30, 'Structure créée, à activer.', 'Cher partenaire, nous vous informons que la structure gérée par Mme Gineste située à l\'adresse suivante\nQUIIIIIIIIIIIIIIIIIIIIIIIIIIIIII 3, rue des prés à PARIS a été créée. Pour l\'activer, merci de cliquer sur le bouton ci-dessous.', '39', 1, 1),
(31, 'Structure créée, à activer. Gérée par M. Durond', 'Cher partenaire, nous vous informons que la structure gérée par M. Durond située à l\'adresse suivante\nLABAS ici à Lille a été créée. Pour l\'activer, merci de cliquer sur le bouton ci-dessous.', '40', 1, 1),
(32, 'Structure créée, à activer. Gérée par Mme Julia', 'Cher partenaire, nous vous informons que la structure gérée par Mme Julia située à l\'adresse suivante\nGRRRRRRRRRRRRrrrrrrrrr 15, rue du prout à MOULINEX a été créée. Pour l\'activer, merci de cliquer sur le bouton ci-dessous.', '', 1, 1),
(33, 'Droit activé', 'Cher partenaire, nous vous informons que le droit ECRIRE AUX MEMBRES a été activé concernant la structure gérée par M. coudroie située à l\'adresse suivante\nBAT D 1, rue du Vernon-Est à ST-BARTH', '', 0, 1),
(34, 'Droit activé', 'Cher partenaire, nous vous informons que le droit AJOUTER UN MEMBRE a été désactivé concernant la structure gérée par M. coudroie située à l\'adresse suivante\nBAT D 1, rue du Vernon-Est à ST-BARTH', '', 1, 1),
(35, 'Droit désactivé', 'Cher partenaire, nous vous informons que le droit LIRE LES MEMBRES a été désactivé concernant la structure gérée par Mme Gineste située à l\'adresse suivante\n2ème étage 3, rue des prés à PARIS', '', 0, 1),
(36, 'Droit activé', 'Cher partenaire, nous vous informons que le droit ECRIRE AUX MEMBRES a été activé concernant la structure gérée par Mme Gineste située à l\'adresse suivante\n2ème étage 3, rue des prés à PARIS', '', 0, 1),
(37, 'Droit désactivé', 'Cher partenaire, nous vous informons que le droit AJOUTER UN MEMBRE a été désactivé concernant la structure gérée par Mme Gineste située à l\'adresse suivante\n2ème étage 3, rue des prés à PARIS', '', 1, 1),
(38, 'Droit activé', 'Cher partenaire, nous vous informons que le droit VOIR LES STATISTIQUES DES MEMBRES a été activé concernant la structure gérée par M. coudroie située à l\'adresse suivante\nBAT D 1, rue du Vernon-Est à ST-BARTH', '', 0, 1),
(39, 'Droit activé', 'Cher partenaire, nous vous informons que le droit VENDRE DE LA NOURRITURE a été activé concernant la structure gérée par M. coudroie située à l\'adresse suivante\nBAT D 1, rue du Vernon-Est à ST-BARTH', '', 0, 1),
(40, 'Structure créée, à activer. Gérée par Mme Gineste', 'Cher partenaire, nous vous informons que la structure gérée par Mme Gineste située à l\'adresse suivante\nNUMBER 1 ici à PARIS a été créée. Pour l\'activer, merci de cliquer sur le bouton ci-dessous.', '42', 0, 1),
(41, 'Structure créée, à activer. Gérée par Mme fabrizia', 'Cher partenaire, nous vous informons que la structure gérée par Mme fabrizia située à l\'adresse suivante\nNUMBER 2 la à glissy a été créée. Pour l\'activer, merci de cliquer sur le bouton ci-dessous.', '', 1, 1),
(42, 'Structure créée, à activer. Gérée par Mme Durine', 'Cher partenaire, nous vous informons que la structure gérée par Mme Durine située à l\'adresse suivante\nNUMBER 3 Encore à Montpel a été créée. Pour l\'activer, merci de cliquer sur le bouton ci-dessous.', '', 1, 1);

-- --------------------------------------------------------

--
-- Structure de la table `partenaire`
--

CREATE TABLE `partenaire` (
  `id` int(11) NOT NULL,
  `nomfranchise` varchar(45) NOT NULL,
  `sexegerant` varchar(1) NOT NULL,
  `nomgerant` varchar(45) NOT NULL,
  `mail` varchar(45) NOT NULL,
  `password` varchar(45) NOT NULL,
  `grants` int(11) NOT NULL,
  `actif` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Déchargement des données de la table `partenaire`
--

INSERT INTO `partenaire` (`id`, `nomfranchise`, `sexegerant`, `nomgerant`, `mail`, `password`, `grants`, `actif`) VALUES
(1, 'SALLE SXM2', 'm', 'MARCEL', 'marcel@poste.net', 'qsdfqsdf', 2, 0),
(2, 'ELSE FITME BEZIERS 34500', 'm', 'GOMES', 'fabien.macip+gomes@gmail.com', 'mlkjmlkj', 3, 0),
(14, 'POMME', 'f', 'Pilou', 'pi@la.fr', 'qsdfqsdf', 4, 1),
(15, 'THE PARTNER grants 5', 'M', 'Durand', 'dudu@gmail_fr', 'qsdfqsdf', 5, 0),
(17, 'TEST', 'M', 'Durand', 'dudu@gmail_fr', 'qsdfqsdf', 6, 1),
(19, 'SPORT_CANAL', 'F', 'Canac', 'canac@la_fr', 'mlkjmlkj', 7, 1),
(24, 'TEST pour', 'M', 'Duduchin', 'dudu+654@gmail.fr', 'qsdfqsdf', 8, 1),
(25, 'RABOUGRI', 'm', 'Pinel', 'pinel@yahooo.fr', 'mlkjmlkj', 9, 1),
(26, 'TEST', 'M', 'Durand', 'dudu@gmail.fr', 'qsdfqsdf', 10, 1),
(27, 'TEST1111', 'M', 'Durand', 'dudu@gmail.fr', 'qsdfqsdf', 11, 1),
(29, 'MONTPELLIERe', 'M', 'Jacky', 'jack@lapost.net', 'mlkjmlkj', 12, 1);

-- --------------------------------------------------------

--
-- Structure de la table `structure`
--

CREATE TABLE `structure` (
  `id` int(11) NOT NULL,
  `adr1` varchar(60) NOT NULL,
  `adr2` varchar(60) NOT NULL,
  `cp` varchar(5) NOT NULL,
  `ville` varchar(45) NOT NULL,
  `mail` varchar(45) NOT NULL,
  `password` varchar(45) NOT NULL,
  `sexegerant` varchar(1) NOT NULL,
  `nomgerant` varchar(45) NOT NULL,
  `actif` int(11) NOT NULL,
  `partenaire` int(11) NOT NULL,
  `grants` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Déchargement des données de la table `structure`
--

INSERT INTO `structure` (`id`, `adr1`, `adr2`, `cp`, `ville`, `mail`, `password`, `sexegerant`, `nomgerant`, `actif`, `partenaire`, `grants`) VALUES
(1, '3 rue des prés', '', '34500', 'BEZIERS', 'fabien.macip+beziers1@gmail.com', 'mlkjmlkj', 'm', 'Papon', 0, 2, 0),
(2, 'BAT D', '1, rue du Vernon-Est', '97160', 'ST-BARTH', 'fabien.macip+coudroie@gmail.com', 'mlkjmlkj', 'm', 'coudroie', 0, 1, 13),
(3, '2ème étage', '45, avenue Jean Moulin', '34500', 'BEZIERS', 'fabien.macip+beziers2@gmail.com', 'mlkjmlkj', 'f', 'Gineste', 0, 2, 24),
(4, '15, rue du chenil', '4ème étage', '75015', 'PARIS CEDEX 03', 'marcel@poste.net', 'qsdfqsdf', 'm', 'MARCEL', 0, 14, 0),
(5, '15, rue du chenil', '4ème étage', '75015', 'PARIS CEDEX 03', 'marcel@poste.net', 'qsdfqsdf', 'm', 'MARCEL', 0, 14, 12),
(7, '2ème étage', '3, rue des prés', '75003', 'PARIS', 'gigi@yahoo.fr', 'mlkjmlkj', 'F', 'Gineste', 1, 29, 13),
(8, '2ème étage', '3, rue des prés', '75003', 'PARIS', 'gigi@yahoo.fr', 'mlkjmlkj', 'F', 'Gineste', 1, 15, 14),
(9, '2ème étage', '3, rue des prés', '75003', 'PARIS', 'gigi@yahoo.fr', 'mlkjmlkj', 'F', 'Gineste', 1, 14, 15),
(10, '2ème étage', '3, rue des prés', '75003', 'PARIS', 'gigi@yahoo.fr', 'mlkjmlkj', 'F', 'Gineste', 1, 29, 16),
(11, 'qsdf', '15 avenue de labas', '34000', 'Montpellier', 'mac@lk.fr', 'mlkjmlkj', 'f', 'Marceline', 0, 0, 16),
(12, '2ème étage', '3, rue des prés', '75003', 'PARIS', 'gigi@yahoo.fr', 'mlkjmlkj', 'M', 'Kalou', 1, 2, 17),
(13, 'test', 'tetst', '11000', 'test', 'tes@fsdf.fds', 'mlkjmlkj', 'f', 'test', 1, 0, 17),
(14, '2ème étage', '3, rue des prés', '75003', 'PARIS', 'gigi@yahoo.fr', 'mlkjmlkj', 'F', 'Gineste', 1, 29, 18),
(15, 'RE test', 'RE test', '34000', 'LKJMLKJ', 'moi@lui.fr', 'mlkjmlkj', 'f', 'fqsdmlfkj', 0, 29, 19),
(18, '2ème étage', '', '75003', 'VILLEJUIF', 'gigi@yahoo.fr', 'mlkjmlkj', 'M', 'Pas adresse 2', 1, 0, 19),
(19, '2ème étage', '3, rue des prés', '75003', 'PARIS', 'gigi@yahoo.fr', 'mlkjmlkj', 'F', 'Torres', 1, 2, 22),
(20, '2ème étage', '3, rue des prés', '75003', 'PARIS', 'gigi@yahoo.fr', 'mlkjmlkj', 'F', 'Gineste', 0, 29, 22),
(21, '2ème étage', '3, rue des prés', '75003', 'PARIS', 'gigi@yahoo.fr', 'mlkjmlkj', 'F', 'Gineste', 1, 0, 22),
(22, '2ème étageqsdf', '3, rue des prés', '75003', 'PARIS', 'gigi@yahoo.fr', 'mlkjmlkj', 'F', 'Gineste', 1, 17, 23),
(23, 'Haha', '', '11000', 'ICI', 'mag@lil.fr', 'mlkjmlkj', 'f', 'toi', 0, 17, 24),
(24, '2ème étage', '3, rue des prés', '75003', 'PARIS', 'gigi@yahoo.fr', 'mlkjmlkj', 'F', 'Gineste', 1, 1, 25),
(25, '2ème étage', '3, rue des prés', '75003', 'PARIS', 'gigi@yahoo.fr', 'mlkjmlkj', 'F', 'Gineste', 0, 1, 26),
(26, '2ème étage', '3, rue des prés', '75003', 'PARIS', 'gigi@yahoo.fr', 'mlkjmlkj', 'F', 'Gineste', 1, 1, 27),
(27, '2ème étage', '3, rue des prés', '75003', 'PARIS', 'gigi@yahoo.fr', 'mlkjmlkj', 'F', 'Gineste', 1, 1, 28),
(28, '2ème étage', '3, rue des prés', '75003', 'PARIS', 'gigi@yahoo.fr', 'mlkjmlkj', 'F', 'Gineste', 1, 2, 29),
(29, 'RDC', 'Rue de Mont-Vernon', '97150', 'ST-MARTIN', 'val@gmail.com', 'mlkjmlkj', 'm', 'Roesch', 1, 1, 30),
(42, 'NUMBER 1', 'ici', '75003', 'PARIS', 'gigi@yahoo.fr', 'mlkjmlkj', 'F', 'Gineste', 0, 1, 43),
(43, 'NUMBER 2', 'la', '34999', 'glissy', 'fa@fa.be', 'mlkjmlkj', 'f', 'fabrizia', 1, 1, 44),
(44, 'NUMBER 3', 'Encore', '34000', 'Montpel', 'dudu@la.fr', 'mlkjmlkj', 'f', 'Durine', 1, 1, 45);

-- --------------------------------------------------------

--
-- Structure de la table `user`
--

CREATE TABLE `user` (
  `id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `password` varchar(50) NOT NULL,
  `email` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Déchargement des données de la table `user`
--

INSERT INTO `user` (`id`, `name`, `password`, `email`) VALUES
(1, 'fabien', 'mlkjmlkj', 'fabien.macip@gmail.com'),
(3, 'Martine', 'QSDFQSDF', 'fabien.macip+martine@gmail.com'),
(6, 'Martin', 'qsdfqsdf', 'fabien.macip+martin@gmail.com'),
(9, 'coucou', 'mlkjmlkj', 'fa@fa.fr'),
(10, 'Durantou', 'mlkjmlkj', 'fabien.macip+durantou@gmail.com');

--
-- Index pour les tables déchargées
--

--
-- Index pour la table `grants`
--
ALTER TABLE `grants`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `mail`
--
ALTER TABLE `mail`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `partenaire`
--
ALTER TABLE `partenaire`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `structure`
--
ALTER TABLE `structure`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT pour les tables déchargées
--

--
-- AUTO_INCREMENT pour la table `grants`
--
ALTER TABLE `grants`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=46;

--
-- AUTO_INCREMENT pour la table `mail`
--
ALTER TABLE `mail`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=43;

--
-- AUTO_INCREMENT pour la table `partenaire`
--
ALTER TABLE `partenaire`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=30;

--
-- AUTO_INCREMENT pour la table `structure`
--
ALTER TABLE `structure`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=45;

--
-- AUTO_INCREMENT pour la table `user`
--
ALTER TABLE `user`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
