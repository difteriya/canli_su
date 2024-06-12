-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Apr 08, 2024 at 09:24 AM
-- Server version: 10.4.24-MariaDB
-- PHP Version: 8.1.6

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `canlisu`
--

-- --------------------------------------------------------

--
-- Table structure for table `blog`
--

CREATE TABLE `blog` (
  `id` int(11) NOT NULL,
  `photo` varchar(150) NOT NULL,
  `active` tinyint(1) NOT NULL DEFAULT 1,
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp(),
  `updatedAt` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `blog`
--

INSERT INTO `blog` (`id`, `photo`, `active`, `createdAt`, `updatedAt`) VALUES
(1, '5U34aAVNR4qAzWVizv6s6.jpg', 1, '2022-10-02 10:50:39', '2022-10-02 11:11:43'),
(3, 'YQSUeGh1gRsbU97yfHhn9.jpg', 1, '2022-10-03 05:53:54', '2022-10-03 08:12:57');

-- --------------------------------------------------------

--
-- Table structure for table `blog_lang`
--

CREATE TABLE `blog_lang` (
  `id` int(11) NOT NULL,
  `rid` int(11) NOT NULL,
  `lang` varchar(10) NOT NULL,
  `alias` varchar(100) NOT NULL,
  `title` varchar(150) NOT NULL,
  `subtitle` varchar(500) NOT NULL,
  `body` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `blog_lang`
--

INSERT INTO `blog_lang` (`id`, `rid`, `lang`, `alias`, `title`, `subtitle`, `body`) VALUES
(1, 1, 'az', 'azz', 'Sağlıqlı təmiz su necə olmalıdır?', 'İçməli Suda fenolik maddələr, sianid ammonyak və nitratlar kimi müxtəlif maddələr olmamalıdır. Çünki kalsium, maqnezium, natrium, dəmir, nitrat kimi bir çox kimyəvi maddələr insan sağlamlığına mənfi təsir göstərə bilən maddələrdir.', '{\"blocks\":[{\"key\":\"foo\",\"text\":\"İçməli təmiz su necə olmalıdır?\",\"type\":\"header-three\",\"depth\":0,\"inlineStyleRanges\":[],\"entityRanges\":[],\"data\":{}},{\"key\":\"4avtb\",\"text\":\"Təmiz içməli su qoxusuz, rəngsiz, şəffaf və qoxusu xoş olur. Suda fenolik maddələr, sianid ammonyak və nitratlar kimi müxtəlif maddələr olmamalıdır. Çünki kalsium, maqnezium, natrium, dəmir, nitrat kimi bir çox kimyəvi maddələr insan sağlamlığına mənfi təsir göstərə bilən maddələrdir. Buna görə də suda olmamalıdır. Suda zərərli kimyəvi maddələr olmamalıdır Su insan sağlamlığı üçün faydalı bir mənbədir. Ona görə də içməli suyun tərkibində zərərli kimyəvi maddələr olmamalıdır. Çünki zərərli kimyəvi maddələr həm suyun keyfiyyətini pozan, həm də insan sağlamlığına ziyan vuran maddələrdir.\",\"type\":\"unstyled\",\"depth\":0,\"inlineStyleRanges\":[],\"entityRanges\":[],\"data\":{}},{\"key\":\"a55fg\",\"text\":\"İçməli suda acı bir dad olmamalıdır\",\"type\":\"header-three\",\"depth\":0,\"inlineStyleRanges\":[{\"offset\":0,\"length\":35,\"style\":\"BOLD\"}],\"entityRanges\":[],\"data\":{}},{\"key\":\"539q6\",\"text\":\"Bəzi suların dadı acı ola bilər. Ancaq normal şəraitdə heç bir sağlam suyun dadı olmamalıdır. Çünki, ümumiyyətlə, su dadsız bir maddədir. Lakin bəzi hallarda xarici maddələr suya daxil ola və suyun acı dadına səbəb ola bilər. Bu zaman həmin suyu içməmək tövsiyə olunur. Bunun əsas səbəbi suya acı dad verən maddələrin insan sağlamlığına mənfi təsir göstərməsi təhlükəsidir. Bu səbəbdən suyun dadı sizə acıdırsa, o suyu içməməyiniz məsləhətdir.\",\"type\":\"unstyled\",\"depth\":0,\"inlineStyleRanges\":[],\"entityRanges\":[],\"data\":{}},{\"key\":\"c83ji\",\"text\":\"İçməli Suyun tərkibində xəstəlik yaradan mikroorqanizmlər olmamalıdır\",\"type\":\"header-three\",\"depth\":0,\"inlineStyleRanges\":[{\"offset\":0,\"length\":69,\"style\":\"BOLD\"}],\"entityRanges\":[],\"data\":{}},{\"key\":\"8l95g\",\"text\":\"İçməli suyun tərkibində xəstəlik törədən mikroorqanizmlər olmamalıdır. Çünki sağlam su insan sağlamlığına zərər verən quruluşa malik olmamalıdır.\",\"type\":\"unstyled\",\"depth\":0,\"inlineStyleRanges\":[],\"entityRanges\":[],\"data\":{}},{\"key\":\"cjde9\",\"text\":\"İçməli Sudakı əhəng nisbətinə diqqət yetirin\",\"type\":\"header-three\",\"depth\":0,\"inlineStyleRanges\":[{\"offset\":0,\"length\":44,\"style\":\"BOLD\"}],\"entityRanges\":[],\"data\":{}},{\"key\":\"djhr1\",\"text\":\"Əhəng ümumilikdə insan sağlamlığına mənfi təsir göstərir. Bu səbəbdən sağlam su içmək istəyənlərin sudakı əhəng nisbətinə yaxşı baxması və müəyyən nisbətdən yuxarı təbaşirli su istehlak etməməsi tövsiyə edilir. Əks halda, öz sağlamlığına zərər verə bilər.\",\"type\":\"unstyled\",\"depth\":0,\"inlineStyleRanges\":[],\"entityRanges\":[],\"data\":{}},{\"key\":\"gb3s\",\"text\":\"\",\"type\":\"unstyled\",\"depth\":0,\"inlineStyleRanges\":[],\"entityRanges\":[],\"data\":{}},{\"key\":\"48qqk\",\"text\":\"Ümumiyyətlə, sağlam su şəffaf, rəngsiz, qoxusuz və çöküntüsüz olmalıdır. Bundan başqa tərkibində zəhərli maddələr olmayan, bakterioloji cəhətdən təmiz və kimyəvi cəhətdən zəngin minerallarla zəngin sularda sağlam sudur. Bu səbəbdən suyun necə sağlam olması sualına tək cavab vermək mümkün deyil. Bu səbəbdən sağlam suyun sizin üçün olması lazım olan bir neçə xüsusiyyəti sadaladıq.\",\"type\":\"unstyled\",\"depth\":0,\"inlineStyleRanges\":[],\"entityRanges\":[],\"data\":{}}],\"entityMap\":{}}'),
(2, 1, 'en', 'eee', 'Sağlıqlı təmiz su necə olmalıdır?', 'İçməli Suda fenolik maddələr, sianid ammonyak və nitratlar kimi müxtəlif maddələr olmamalıdır. Çünki kalsium, maqnezium, natrium, dəmir, nitrat kimi bir çox kimyəvi maddələr insan sağlamlığına mənfi təsir göstərə bilən maddələrdir.', '{\"blocks\":[{\"key\":\"foo\",\"text\":\"İçməli təmiz su necə olmalıdır?\",\"type\":\"header-three\",\"depth\":0,\"inlineStyleRanges\":[],\"entityRanges\":[],\"data\":{}},{\"key\":\"8lk2\",\"text\":\"Təmiz içməli su qoxusuz, rəngsiz, şəffaf və qoxusu xoş olur. Suda fenolik maddələr, sianid ammonyak və nitratlar kimi müxtəlif maddələr olmamalıdır. Çünki kalsium, maqnezium, natrium, dəmir, nitrat kimi bir çox kimyəvi maddələr insan sağlamlığına mənfi təsir göstərə bilən maddələrdir. Buna görə də suda olmamalıdır. Suda zərərli kimyəvi maddələr olmamalıdır Su insan sağlamlığı üçün faydalı bir mənbədir. Ona görə də içməli suyun tərkibində zərərli kimyəvi maddələr olmamalıdır. Çünki zərərli kimyəvi maddələr həm suyun keyfiyyətini pozan, həm də insan sağlamlığına ziyan vuran maddələrdir.\",\"type\":\"unstyled\",\"depth\":0,\"inlineStyleRanges\":[],\"entityRanges\":[],\"data\":{}},{\"key\":\"f5oak\",\"text\":\"İçməli suda acı bir dad olmamalıdır\",\"type\":\"header-three\",\"depth\":0,\"inlineStyleRanges\":[{\"offset\":0,\"length\":35,\"style\":\"BOLD\"}],\"entityRanges\":[],\"data\":{}},{\"key\":\"ga9l\",\"text\":\"Bəzi suların dadı acı ola bilər. Ancaq normal şəraitdə heç bir sağlam suyun dadı olmamalıdır. Çünki, ümumiyyətlə, su dadsız bir maddədir. Lakin bəzi hallarda xarici maddələr suya daxil ola və suyun acı dadına səbəb ola bilər. Bu zaman həmin suyu içməmək tövsiyə olunur. Bunun əsas səbəbi suya acı dad verən maddələrin insan sağlamlığına mənfi təsir göstərməsi təhlükəsidir. Bu səbəbdən suyun dadı sizə acıdırsa, o suyu içməməyiniz məsləhətdir.\",\"type\":\"unstyled\",\"depth\":0,\"inlineStyleRanges\":[],\"entityRanges\":[],\"data\":{}},{\"key\":\"7jma9\",\"text\":\"İçməli Suyun tərkibində xəstəlik yaradan mikroorqanizmlər olmamalıdır\",\"type\":\"header-three\",\"depth\":0,\"inlineStyleRanges\":[{\"offset\":0,\"length\":69,\"style\":\"BOLD\"}],\"entityRanges\":[],\"data\":{}},{\"key\":\"95i97\",\"text\":\"İçməli suyun tərkibində xəstəlik törədən mikroorqanizmlər olmamalıdır. Çünki sağlam su insan sağlamlığına zərər verən quruluşa malik olmamalıdır.\",\"type\":\"unstyled\",\"depth\":0,\"inlineStyleRanges\":[],\"entityRanges\":[],\"data\":{}},{\"key\":\"arhgi\",\"text\":\"İçməli Sudakı əhəng nisbətinə diqqət yetirin\",\"type\":\"header-three\",\"depth\":0,\"inlineStyleRanges\":[{\"offset\":0,\"length\":44,\"style\":\"BOLD\"}],\"entityRanges\":[],\"data\":{}},{\"key\":\"9scfr\",\"text\":\"Əhəng ümumilikdə insan sağlamlığına mənfi təsir göstərir. Bu səbəbdən sağlam su içmək istəyənlərin sudakı əhəng nisbətinə yaxşı baxması və müəyyən nisbətdən yuxarı təbaşirli su istehlak etməməsi tövsiyə edilir. Əks halda, öz sağlamlığına zərər verə bilər.\",\"type\":\"unstyled\",\"depth\":0,\"inlineStyleRanges\":[],\"entityRanges\":[],\"data\":{}},{\"key\":\"dhe0j\",\"text\":\"Ümumiyyətlə, sağlam su şəffaf, rəngsiz, qoxusuz və çöküntüsüz olmalıdır. Bundan başqa tərkibində zəhərli maddələr olmayan, bakterioloji cəhətdən təmiz və kimyəvi cəhətdən zəngin minerallarla zəngin sularda sağlam sudur. Bu səbəbdən suyun necə sağlam olması sualına tək cavab vermək mümkün deyil. Bu səbəbdən sağlam suyun sizin üçün olması lazım olan bir neçə xüsusiyyəti sadaladıq.\",\"type\":\"unstyled\",\"depth\":0,\"inlineStyleRanges\":[],\"entityRanges\":[],\"data\":{}}],\"entityMap\":{}}'),
(3, 1, 'ru', 'rrr', 'Sağlıqlı təmiz su necə olmalıdır?', 'İçməli Suda fenolik maddələr, sianid ammonyak və nitratlar kimi müxtəlif maddələr olmamalıdır. Çünki kalsium, maqnezium, natrium, dəmir, nitrat kimi bir çox kimyəvi maddələr insan sağlamlığına mənfi təsir göstərə bilən maddələrdir.', '{\"blocks\":[{\"key\":\"foo\",\"text\":\"İçməli təmiz su necə olmalıdır?\",\"type\":\"header-three\",\"depth\":0,\"inlineStyleRanges\":[],\"entityRanges\":[],\"data\":{}},{\"key\":\"4r1cd\",\"text\":\"Təmiz içməli su qoxusuz, rəngsiz, şəffaf və qoxusu xoş olur. Suda fenolik maddələr, sianid ammonyak və nitratlar kimi müxtəlif maddələr olmamalıdır. Çünki kalsium, maqnezium, natrium, dəmir, nitrat kimi bir çox kimyəvi maddələr insan sağlamlığına mənfi təsir göstərə bilən maddələrdir. Buna görə də suda olmamalıdır. Suda zərərli kimyəvi maddələr olmamalıdır Su insan sağlamlığı üçün faydalı bir mənbədir. Ona görə də içməli suyun tərkibində zərərli kimyəvi maddələr olmamalıdır. Çünki zərərli kimyəvi maddələr həm suyun keyfiyyətini pozan, həm də insan sağlamlığına ziyan vuran maddələrdir.\",\"type\":\"unstyled\",\"depth\":0,\"inlineStyleRanges\":[],\"entityRanges\":[],\"data\":{}},{\"key\":\"6t7oo\",\"text\":\"İçməli suda acı bir dad olmamalıdır\",\"type\":\"header-three\",\"depth\":0,\"inlineStyleRanges\":[{\"offset\":0,\"length\":35,\"style\":\"BOLD\"}],\"entityRanges\":[],\"data\":{}},{\"key\":\"dh1m1\",\"text\":\"Bəzi suların dadı acı ola bilər. Ancaq normal şəraitdə heç bir sağlam suyun dadı olmamalıdır. Çünki, ümumiyyətlə, su dadsız bir maddədir. Lakin bəzi hallarda xarici maddələr suya daxil ola və suyun acı dadına səbəb ola bilər. Bu zaman həmin suyu içməmək tövsiyə olunur. Bunun əsas səbəbi suya acı dad verən maddələrin insan sağlamlığına mənfi təsir göstərməsi təhlükəsidir. Bu səbəbdən suyun dadı sizə acıdırsa, o suyu içməməyiniz məsləhətdir.\",\"type\":\"unstyled\",\"depth\":0,\"inlineStyleRanges\":[],\"entityRanges\":[],\"data\":{}},{\"key\":\"7r7o5\",\"text\":\"İçməli Suyun tərkibində xəstəlik yaradan mikroorqanizmlər olmamalıdır\",\"type\":\"header-three\",\"depth\":0,\"inlineStyleRanges\":[{\"offset\":0,\"length\":69,\"style\":\"BOLD\"}],\"entityRanges\":[],\"data\":{}},{\"key\":\"ee8e8\",\"text\":\"İçməli suyun tərkibində xəstəlik törədən mikroorqanizmlər olmamalıdır. Çünki sağlam su insan sağlamlığına zərər verən quruluşa malik olmamalıdır.\",\"type\":\"unstyled\",\"depth\":0,\"inlineStyleRanges\":[],\"entityRanges\":[],\"data\":{}},{\"key\":\"3crrt\",\"text\":\"İçməli Sudakı əhəng nisbətinə diqqət yetirin\",\"type\":\"header-three\",\"depth\":0,\"inlineStyleRanges\":[{\"offset\":0,\"length\":44,\"style\":\"BOLD\"}],\"entityRanges\":[],\"data\":{}},{\"key\":\"fcn2c\",\"text\":\"Əhəng ümumilikdə insan sağlamlığına mənfi təsir göstərir. Bu səbəbdən sağlam su içmək istəyənlərin sudakı əhəng nisbətinə yaxşı baxması və müəyyən nisbətdən yuxarı təbaşirli su istehlak etməməsi tövsiyə edilir. Əks halda, öz sağlamlığına zərər verə bilər.\",\"type\":\"unstyled\",\"depth\":0,\"inlineStyleRanges\":[],\"entityRanges\":[],\"data\":{}},{\"key\":\"e13bo\",\"text\":\"Ümumiyyətlə, sağlam su şəffaf, rəngsiz, qoxusuz və çöküntüsüz olmalıdır. Bundan başqa tərkibində zəhərli maddələr olmayan, bakterioloji cəhətdən təmiz və kimyəvi cəhətdən zəngin minerallarla zəngin sularda sağlam sudur. Bu səbəbdən suyun necə sağlam olması sualına tək cavab vermək mümkün deyil. Bu səbəbdən sağlam suyun sizin üçün olması lazım olan bir neçə xüsusiyyəti sadaladıq.\",\"type\":\"unstyled\",\"depth\":0,\"inlineStyleRanges\":[],\"entityRanges\":[],\"data\":{}}],\"entityMap\":{}}'),
(4, 1, 'tr', 'tttt', 'Sağlıqlı təmiz su necə olmalıdır?', 'İçməli Suda fenolik maddələr, sianid ammonyak və nitratlar kimi müxtəlif maddələr olmamalıdır. Çünki kalsium, maqnezium, natrium, dəmir, nitrat kimi bir çox kimyəvi maddələr insan sağlamlığına mənfi təsir göstərə bilən maddələrdir.', '{\"blocks\":[{\"key\":\"foo\",\"text\":\"İçməli təmiz su necə olmalıdır?\",\"type\":\"header-three\",\"depth\":0,\"inlineStyleRanges\":[],\"entityRanges\":[],\"data\":{}},{\"key\":\"4ke1h\",\"text\":\"Təmiz içməli su qoxusuz, rəngsiz, şəffaf və qoxusu xoş olur. Suda fenolik maddələr, sianid ammonyak və nitratlar kimi müxtəlif maddələr olmamalıdır. Çünki kalsium, maqnezium, natrium, dəmir, nitrat kimi bir çox kimyəvi maddələr insan sağlamlığına mənfi təsir göstərə bilən maddələrdir. Buna görə də suda olmamalıdır. Suda zərərli kimyəvi maddələr olmamalıdır Su insan sağlamlığı üçün faydalı bir mənbədir. Ona görə də içməli suyun tərkibində zərərli kimyəvi maddələr olmamalıdır. Çünki zərərli kimyəvi maddələr həm suyun keyfiyyətini pozan, həm də insan sağlamlığına ziyan vuran maddələrdir.\",\"type\":\"unstyled\",\"depth\":0,\"inlineStyleRanges\":[],\"entityRanges\":[],\"data\":{}},{\"key\":\"2d07\",\"text\":\"İçməli suda acı bir dad olmamalıdır\",\"type\":\"header-three\",\"depth\":0,\"inlineStyleRanges\":[{\"offset\":0,\"length\":35,\"style\":\"BOLD\"}],\"entityRanges\":[],\"data\":{}},{\"key\":\"7mouk\",\"text\":\"Bəzi suların dadı acı ola bilər. Ancaq normal şəraitdə heç bir sağlam suyun dadı olmamalıdır. Çünki, ümumiyyətlə, su dadsız bir maddədir. Lakin bəzi hallarda xarici maddələr suya daxil ola və suyun acı dadına səbəb ola bilər. Bu zaman həmin suyu içməmək tövsiyə olunur. Bunun əsas səbəbi suya acı dad verən maddələrin insan sağlamlığına mənfi təsir göstərməsi təhlükəsidir. Bu səbəbdən suyun dadı sizə acıdırsa, o suyu içməməyiniz məsləhətdir.\",\"type\":\"unstyled\",\"depth\":0,\"inlineStyleRanges\":[],\"entityRanges\":[],\"data\":{}},{\"key\":\"eu7d3\",\"text\":\"İçməli Suyun tərkibində xəstəlik yaradan mikroorqanizmlər olmamalıdır\",\"type\":\"header-three\",\"depth\":0,\"inlineStyleRanges\":[{\"offset\":0,\"length\":69,\"style\":\"BOLD\"}],\"entityRanges\":[],\"data\":{}},{\"key\":\"a2a0g\",\"text\":\"İçməli suyun tərkibində xəstəlik törədən mikroorqanizmlər olmamalıdır. Çünki sağlam su insan sağlamlığına zərər verən quruluşa malik olmamalıdır.\",\"type\":\"unstyled\",\"depth\":0,\"inlineStyleRanges\":[],\"entityRanges\":[],\"data\":{}},{\"key\":\"rkfa\",\"text\":\"İçməli Sudakı əhəng nisbətinə diqqət yetirin\",\"type\":\"header-three\",\"depth\":0,\"inlineStyleRanges\":[{\"offset\":0,\"length\":44,\"style\":\"BOLD\"}],\"entityRanges\":[],\"data\":{}},{\"key\":\"fr4t6\",\"text\":\"Əhəng ümumilikdə insan sağlamlığına mənfi təsir göstərir. Bu səbəbdən sağlam su içmək istəyənlərin sudakı əhəng nisbətinə yaxşı baxması və müəyyən nisbətdən yuxarı təbaşirli su istehlak etməməsi tövsiyə edilir. Əks halda, öz sağlamlığına zərər verə bilər.\",\"type\":\"unstyled\",\"depth\":0,\"inlineStyleRanges\":[],\"entityRanges\":[],\"data\":{}},{\"key\":\"8ib5q\",\"text\":\"Ümumiyyətlə, sağlam su şəffaf, rəngsiz, qoxusuz və çöküntüsüz olmalıdır. Bundan başqa tərkibində zəhərli maddələr olmayan, bakterioloji cəhətdən təmiz və kimyəvi cəhətdən zəngin minerallarla zəngin sularda sağlam sudur. Bu səbəbdən suyun necə sağlam olması sualına tək cavab vermək mümkün deyil. Bu səbəbdən sağlam suyun sizin üçün olması lazım olan bir neçə xüsusiyyəti sadaladıq.\",\"type\":\"unstyled\",\"depth\":0,\"inlineStyleRanges\":[],\"entityRanges\":[],\"data\":{}}],\"entityMap\":{}}'),
(5, 1, 'ar', 'aaa', 'Sağlıqlı təmiz su necə olmalıdır?', 'İçməli Suda fenolik maddələr, sianid ammonyak və nitratlar kimi müxtəlif maddələr olmamalıdır. Çünki kalsium, maqnezium, natrium, dəmir, nitrat kimi bir çox kimyəvi maddələr insan sağlamlığına mənfi təsir göstərə bilən maddələrdir.', '{\"blocks\":[{\"key\":\"foo\",\"text\":\"İçməli təmiz su necə olmalıdır?\",\"type\":\"header-three\",\"depth\":0,\"inlineStyleRanges\":[],\"entityRanges\":[],\"data\":{}},{\"key\":\"7t29n\",\"text\":\"Təmiz içməli su qoxusuz, rəngsiz, şəffaf və qoxusu xoş olur. Suda fenolik maddələr, sianid ammonyak və nitratlar kimi müxtəlif maddələr olmamalıdır. Çünki kalsium, maqnezium, natrium, dəmir, nitrat kimi bir çox kimyəvi maddələr insan sağlamlığına mənfi təsir göstərə bilən maddələrdir. Buna görə də suda olmamalıdır. Suda zərərli kimyəvi maddələr olmamalıdır Su insan sağlamlığı üçün faydalı bir mənbədir. Ona görə də içməli suyun tərkibində zərərli kimyəvi maddələr olmamalıdır. Çünki zərərli kimyəvi maddələr həm suyun keyfiyyətini pozan, həm də insan sağlamlığına ziyan vuran maddələrdir.\",\"type\":\"unstyled\",\"depth\":0,\"inlineStyleRanges\":[],\"entityRanges\":[],\"data\":{}},{\"key\":\"baedc\",\"text\":\"İçməli suda acı bir dad olmamalıdır\",\"type\":\"header-three\",\"depth\":0,\"inlineStyleRanges\":[{\"offset\":0,\"length\":35,\"style\":\"BOLD\"}],\"entityRanges\":[],\"data\":{}},{\"key\":\"dmfji\",\"text\":\"Bəzi suların dadı acı ola bilər. Ancaq normal şəraitdə heç bir sağlam suyun dadı olmamalıdır. Çünki, ümumiyyətlə, su dadsız bir maddədir. Lakin bəzi hallarda xarici maddələr suya daxil ola və suyun acı dadına səbəb ola bilər. Bu zaman həmin suyu içməmək tövsiyə olunur. Bunun əsas səbəbi suya acı dad verən maddələrin insan sağlamlığına mənfi təsir göstərməsi təhlükəsidir. Bu səbəbdən suyun dadı sizə acıdırsa, o suyu içməməyiniz məsləhətdir.\",\"type\":\"unstyled\",\"depth\":0,\"inlineStyleRanges\":[],\"entityRanges\":[],\"data\":{}},{\"key\":\"115km\",\"text\":\"İçməli Suyun tərkibində xəstəlik yaradan mikroorqanizmlər olmamalıdır\",\"type\":\"header-three\",\"depth\":0,\"inlineStyleRanges\":[{\"offset\":0,\"length\":69,\"style\":\"BOLD\"}],\"entityRanges\":[],\"data\":{}},{\"key\":\"87vvp\",\"text\":\"İçməli suyun tərkibində xəstəlik törədən mikroorqanizmlər olmamalıdır. Çünki sağlam su insan sağlamlığına zərər verən quruluşa malik olmamalıdır.\",\"type\":\"unstyled\",\"depth\":0,\"inlineStyleRanges\":[],\"entityRanges\":[],\"data\":{}},{\"key\":\"3a7gr\",\"text\":\"İçməli Sudakı əhəng nisbətinə diqqət yetirin\",\"type\":\"header-three\",\"depth\":0,\"inlineStyleRanges\":[{\"offset\":0,\"length\":44,\"style\":\"BOLD\"}],\"entityRanges\":[],\"data\":{}},{\"key\":\"3kv3j\",\"text\":\"Əhəng ümumilikdə insan sağlamlığına mənfi təsir göstərir. Bu səbəbdən sağlam su içmək istəyənlərin sudakı əhəng nisbətinə yaxşı baxması və müəyyən nisbətdən yuxarı təbaşirli su istehlak etməməsi tövsiyə edilir. Əks halda, öz sağlamlığına zərər verə bilər.\",\"type\":\"unstyled\",\"depth\":0,\"inlineStyleRanges\":[],\"entityRanges\":[],\"data\":{}},{\"key\":\"aeeup\",\"text\":\"Ümumiyyətlə, sağlam su şəffaf, rəngsiz, qoxusuz və çöküntüsüz olmalıdır. Bundan başqa tərkibində zəhərli maddələr olmayan, bakterioloji cəhətdən təmiz və kimyəvi cəhətdən zəngin minerallarla zəngin sularda sağlam sudur. Bu səbəbdən suyun necə sağlam olması sualına tək cavab vermək mümkün deyil. Bu səbəbdən sağlam suyun sizin üçün olması lazım olan bir neçə xüsusiyyəti sadaladıq.\",\"type\":\"unstyled\",\"depth\":0,\"inlineStyleRanges\":[],\"entityRanges\":[],\"data\":{}}],\"entityMap\":{}}'),
(21, 3, 'az', 'su-sifarisi-zamani-nezere-alinmali-vacib-meqamlar', 'Su sifarişi zamanı nəzərə alınmalı vacib məqamlar', 'Depozitsiz su sifarişi və evlərə su çatdırılması Badamlı ilə daha sürətlidir. Su sifarişini edərkən suyun mineral tərkibinə, mənbəsinə baxmağınız tövsiyə olunur. ', '{\"blocks\":[{\"key\":\"foo\",\"text\":\"Su sifariş vermək və ya almaq asan görünsə də içmək üçün su sifarişi zamanı nəzərə alınmalı bəzi vacib məqamlar var. Çünki insan həyatı üçün vacib olan su sağlam olmalıdır.\",\"type\":\"unstyled\",\"depth\":0,\"inlineStyleRanges\":[{\"offset\":57,\"length\":12,\"style\":\"BOLD\"}],\"entityRanges\":[],\"data\":{}},{\"key\":\"5b9rf\",\"text\":\"İçməli su sifarişində nələrə diqqət edilməlidir?\",\"type\":\"header-two\",\"depth\":0,\"inlineStyleRanges\":[],\"entityRanges\":[],\"data\":{}},{\"key\":\"bph4e\",\"text\":\"•  İndi bir çoxumuz evdə bidon su sifariş verərək istifadə edirik. Su sifarişi verərkən qiymətdən çox suyun içindəki dəyərlər çox diqqətə alınmalıdır. Bunun üçün su seçiminiz minerallarla zəngin təbii qaynaqlı su olmalıdır. Sifariş verilən suyun etiketində lisenziya nömrəsi və tarixi aydın şəkildə göstərilməlidir.\\n• Sifariş verilən su bidonunun üzərində markanın loqosu qabardılmalıdır.\\n• Sifariş verilən suyun qablaşma və ya qapağın üzərində istehsal və son istifadə tarixi yerləşməlidir.\\n• Su şəffaf olmalıdır.\\n• Bidon hava almamalı və su sızdırmamalıdır.\",\"type\":\"unstyled\",\"depth\":0,\"inlineStyleRanges\":[{\"offset\":25,\"length\":17,\"style\":\"BOLD\"}],\"entityRanges\":[],\"data\":{}},{\"key\":\"7hhnp\",\"text\":\"Su çatdırılması\",\"type\":\"header-two\",\"depth\":0,\"inlineStyleRanges\":[],\"entityRanges\":[],\"data\":{}},{\"key\":\"7sqhr\",\"text\":\"Su sifarişinin gəlib ünvana çatması sadə bir proses kimi görünsə də, evlərə su çatdırılması uzun və zəhmətli bir prosesdən keçir. Odur ki, evə sifariş verilən hər marka su eyni diqqət və qayğı ilə istehsal edilib çatdırılmamış ola bilər. Bunun üçün su sifarişində  düzgün seçim hər şeydən önəmlidir. Düzgün suyun necə olması yuxarıda göstərilmişdir. \\nBadamlı olaraq bütün komandamızı qaynağından qapınıza mineralla zəngin sağlam suyu sizə çatdırması üçün səfərbər edirik.\",\"type\":\"unstyled\",\"depth\":0,\"inlineStyleRanges\":[{\"offset\":249,\"length\":15,\"style\":\"BOLD\"}],\"entityRanges\":[],\"data\":{}},{\"key\":\"8e5k3\",\"text\":\"Mineral su sifarişi\",\"type\":\"header-two\",\"depth\":0,\"inlineStyleRanges\":[],\"entityRanges\":[],\"data\":{}},{\"key\":\"c7rk2\",\"text\":\"Bu gün insanlar normal tərkibə malik sularla yanaşı mineral su sifarisi etməyə də kifayət qədər maraqlıdır. Çünki, Mineral su insan sağlamlağına və orqanizminə daha çox yaxşı təsir göstərir. Mineral su sifarişi zamanı suyun mineral tərkibinə, mənbəsinə baxmağınız tövsiyə olunur.\",\"type\":\"unstyled\",\"depth\":0,\"inlineStyleRanges\":[{\"offset\":60,\"length\":11,\"style\":\"BOLD\"},{\"offset\":191,\"length\":20,\"style\":\"ITALIC\"}],\"entityRanges\":[],\"data\":{}},{\"key\":\"eja1p\",\"text\":\"İçməli su sifarişi\",\"type\":\"header-two\",\"depth\":0,\"inlineStyleRanges\":[],\"entityRanges\":[],\"data\":{}},{\"key\":\"q6po\",\"text\":\"Bu gün içməli su sifarişində ən çox bidon sular sifariş edilir. Qazlı və qazsız olaraq Badamlının içməli sularından sifariş edərək təmiz, mineral sudan həzz alacaqsınız.\",\"type\":\"unstyled\",\"depth\":0,\"inlineStyleRanges\":[{\"offset\":7,\"length\":21,\"style\":\"BOLD\"}],\"entityRanges\":[],\"data\":{}},{\"key\":\"1fa4b\",\"text\":\"Evlərə su çatdırılması\",\"type\":\"header-two\",\"depth\":0,\"inlineStyleRanges\":[],\"entityRanges\":[],\"data\":{}},{\"key\":\"1f1la\",\"text\":\"Badamlı qaynağından birbaşa evlərə su çatdırılması həyata keçirir. Badamlı ilə mineralla zəngin suyun evə çatıdırlmasını gerçəkləşdirə bilərsiniz. Evlərə su çatdırılması zamanı sizə lotereya kuponu da təqdim olunacaq ki, bununla Badamlının 75 il kampaniyasında lotereyanın şanslı qalibi siz ola bilərsiniz. Əgər sifarişiniz ilk dəfədirsə, evə su çatdırılması zamanı pompa da sizə hədiyyə veriləcək. Qeyd edək ki, evlərə su çatdırılması ödənişsiz həyata keçirilir. Su sifarisi sizdən, çatdırmaq bizdən!\",\"type\":\"unstyled\",\"depth\":0,\"inlineStyleRanges\":[{\"offset\":147,\"length\":22,\"style\":\"BOLD\"}],\"entityRanges\":[],\"data\":{}},{\"key\":\"88mvr\",\"text\":\"Bidon su sifarişi\",\"type\":\"header-two\",\"depth\":0,\"inlineStyleRanges\":[],\"entityRanges\":[],\"data\":{}},{\"key\":\"co8hu\",\"text\":\"Badamlı ilə mineral su sifarişini həyata keçirmək həm rahat, həm sərfəli, həm də sürətlidir. Badamlıya məxsus qablaşdırılmış 5l, 10l, 15l, 19 litrlik bidonlarda bidon su sifarişini həyata keçirə bilərsiniz. Bidon suları Badamlı maşınları ilə ünvanına pulsuz çatdırılır və heç bir depozit tələb olunur. Badamlı 75 ili münasibətilə Naxçıvan və Sumqayıtda evlərə su çatdırılmasını 75 dəqiqəyə həyata keçirir.\\n Bakıda Su sifarişiBidon su sifarişiSu qiyməti( AZN)5 litr bidon su2.10 AZN10 litr bidon su3.65 AZN19 litr bidon su6.50 AZN15 litr şüşədə su15 AZN\\n\\nQeyd: Minimum sifariş məbləği 13 AZN olmalıdır.\",\"type\":\"unstyled\",\"depth\":0,\"inlineStyleRanges\":[{\"offset\":161,\"length\":17,\"style\":\"BOLD\"}],\"entityRanges\":[],\"data\":{}}],\"entityMap\":{}}'),
(22, 3, 'en', 'at', 'fffff', '', '{\"blocks\":[{\"key\":\"foo\",\"text\":\"\",\"type\":\"unstyled\",\"depth\":0,\"inlineStyleRanges\":[],\"entityRanges\":[],\"data\":{}}],\"entityMap\":{}}'),
(23, 3, 'ru', 't', '', '', '{\"blocks\":[{\"key\":\"foo\",\"text\":\"\",\"type\":\"unstyled\",\"depth\":0,\"inlineStyleRanges\":[],\"entityRanges\":[],\"data\":{}}],\"entityMap\":{}}'),
(24, 3, 'tr', 'aa', '', '', '{\"blocks\":[{\"key\":\"foo\",\"text\":\"\",\"type\":\"unstyled\",\"depth\":0,\"inlineStyleRanges\":[],\"entityRanges\":[],\"data\":{}}],\"entityMap\":{}}'),
(25, 3, 'ar', 'sd', '', '', '{\"blocks\":[{\"key\":\"foo\",\"text\":\"\",\"type\":\"unstyled\",\"depth\":0,\"inlineStyleRanges\":[],\"entityRanges\":[],\"data\":{}}],\"entityMap\":{}}');

-- --------------------------------------------------------

--
-- Table structure for table `category`
--

CREATE TABLE `category` (
  `id` int(11) NOT NULL,
  `position` tinyint(100) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `category`
--

INSERT INTO `category` (`id`, `position`) VALUES
(2, 0),
(4, 0),
(5, 0);

-- --------------------------------------------------------

--
-- Table structure for table `category_lang`
--

CREATE TABLE `category_lang` (
  `id` int(11) NOT NULL,
  `rid` int(11) NOT NULL,
  `lang` varchar(10) NOT NULL,
  `name` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `category_lang`
--

INSERT INTO `category_lang` (`id`, `rid`, `lang`, `name`) VALUES
(1, 2, 'az', 'Qazlı'),
(2, 2, 'en', 'Qazlı'),
(3, 2, 'tr', 'Qazlı'),
(4, 2, 'ar', 'Qazlı'),
(33, 4, 'az', 'Qazsız'),
(34, 4, 'en', 'Qazsız'),
(35, 4, 'tr', 'Qazsız'),
(36, 4, 'ar', 'Qazsız'),
(37, 5, 'az', 'Bidon'),
(38, 5, 'en', 'Bidon'),
(39, 5, 'tr', 'Bidon'),
(40, 5, 'ar', 'Bidon'),
(41, 2, 'ru', 'Qazlı');

-- --------------------------------------------------------

--
-- Table structure for table `composition`
--

CREATE TABLE `composition` (
  `id` int(11) NOT NULL,
  `position` tinyint(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `composition`
--

INSERT INTO `composition` (`id`, `position`) VALUES
(1, 0),
(2, 0),
(3, 0),
(4, 0),
(5, 0),
(6, 0);

-- --------------------------------------------------------

--
-- Table structure for table `composition_lang`
--

CREATE TABLE `composition_lang` (
  `id` int(11) NOT NULL,
  `rid` int(11) NOT NULL,
  `lang` varchar(10) NOT NULL,
  `e_name` varchar(100) NOT NULL,
  `e_symbol` varchar(10) NOT NULL,
  `e_value` varchar(100) NOT NULL,
  `description` varchar(255) DEFAULT NULL,
  `body` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `composition_lang`
--

INSERT INTO `composition_lang` (`id`, `rid`, `lang`, `e_name`, `e_symbol`, `e_value`, `description`, `body`) VALUES
(6, 1, 'az', 'Kalsium', 'Ca', '240 mq/l', 'Bədənimizdəki kalsiumun təxminən 99%-i sümüklərimizdə və dişlərimizdədir.', 'asdasd'),
(33, 2, 'az', 'Natrium', 'Na', '5,2 mq/l', 'Düzgün əzələ və sinir funksiyası üçün vacib bir komponentdir.', 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Blanditiis explicabo ipsum dolor sit amet, consectetur adipisicing elit. Blanditiis explicabo ipsum dolor sit amet, consectetur adipisicing elit. Blanditiis explicabo ipsum dolor sit amet, consectetur adipisicing elit. Blanditiis explicabo ipsum dolor sit amet, consectetur adipisicing elit. '),
(37, 3, 'az', 'Nitrat', 'NO3', '4,4 mq/l', 'Nitrat səviyyəsi 10 mq/l-dən aşağı olan su içmək sağlamlıq üçün əladır.', 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Blanditiis explicabo ipsum dolor sit amet, consectetur adipisicing elit. Blanditiis explicabo ipsum dolor sit amet, consectetur adipisicing elit. Blanditiis explicabo ipsum dolor sit amet, consectetur adipisicing elit. Blanditiis explicabo ipsum dolor sit amet, consectetur adipisicing elit. '),
(41, 4, 'az', 'Maqnezium', 'Mg', '42 mq/l', 'Maqnezium orqanizmin sağlam qalması üçün lazım olan qidadır.', 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Blanditiis explicabo perspiciatis sequi dolorum quod, reprehenderit non iusto aliquid incidunt quia ducimus eos aspernatur repellendus quaerat distinctio, esse labore corrupti nesciunt?'),
(45, 5, 'az', 'Sulfat', 'SO4', '400 mq/l', 'Sulfat hüceyrələrdə ən vacib makronutrientlərdən biridir.', 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Blanditiis explicabo perspiciatis sequi dolorum quod, reprehenderit non iusto aliquid incidunt quia ducimus eos aspernatur repellendus quaerat distinctio, esse labore corrupti nesciunt?'),
(49, 6, 'az', 'Bikarbonat', 'CHO3', '384 mq/l', 'Bikarbonat mədə yanmasını və turşu həzmsizliyini aradan qaldırmaq üçün istifadə edilən antasiddir.', 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Blanditiis explicabo perspiciatis sequi dolorum quod, reprehenderit non iusto aliquid incidunt quia ducimus eos aspernatur repellendus quaerat distinctio, esse labore corrupti nesciunt?'),
(58, 1, 'en', 'Kalsium', 'Ca', '240 mq/l', 'Bədənimizdəki kalsiumun təxminən 99%-i sümüklərimizdə və dişlərimizdədir.', 'asdasd'),
(59, 2, 'en', 'Natrium', 'Na', '5,2 mq/l', 'Düzgün əzələ və sinir funksiyası üçün vacib bir komponentdir.', 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Blanditiis explicabo ipsum dolor sit amet, consectetur adipisicing elit. Blanditiis explicabo ipsum dolor sit amet, consectetur adipisicing elit. Blanditiis explicabo ipsum dolor sit amet, consectetur adipisicing elit. Blanditiis explicabo ipsum dolor sit amet, consectetur adipisicing elit. '),
(60, 3, 'en', 'Nitrat', 'NO3', '4,4 mq/l', 'Nitrat səviyyəsi 10 mq/l-dən aşağı olan su içmək sağlamlıq üçün əladır.', 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Blanditiis explicabo ipsum dolor sit amet, consectetur adipisicing elit. Blanditiis explicabo ipsum dolor sit amet, consectetur adipisicing elit. Blanditiis explicabo ipsum dolor sit amet, consectetur adipisicing elit. Blanditiis explicabo ipsum dolor sit amet, consectetur adipisicing elit. '),
(61, 4, 'en', 'Maqnezium', 'Mg', '42 mq/l', 'Maqnezium orqanizmin sağlam qalması üçün lazım olan qidadır.', 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Blanditiis explicabo perspiciatis sequi dolorum quod, reprehenderit non iusto aliquid incidunt quia ducimus eos aspernatur repellendus quaerat distinctio, esse labore corrupti nesciunt?'),
(62, 5, 'en', 'Sulfat', 'SO4', '400 mq/l', 'Sulfat hüceyrələrdə ən vacib makronutrientlərdən biridir.', 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Blanditiis explicabo perspiciatis sequi dolorum quod, reprehenderit non iusto aliquid incidunt quia ducimus eos aspernatur repellendus quaerat distinctio, esse labore corrupti nesciunt?'),
(63, 6, 'en', 'Bikarbonat', 'CHO3', '384 mq/l', 'Bikarbonat mədə yanmasını və turşu həzmsizliyini aradan qaldırmaq üçün istifadə edilən antasiddir.', 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Blanditiis explicabo perspiciatis sequi dolorum quod, reprehenderit non iusto aliquid incidunt quia ducimus eos aspernatur repellendus quaerat distinctio, esse labore corrupti nesciunt?'),
(64, 1, 'ru', 'Kalsium', 'Ca', '240 mq/l', 'Bədənimizdəki kalsiumun təxminən 99%-i sümüklərimizdə və dişlərimizdədir.', 'asdasd'),
(65, 2, 'ru', 'Natrium', 'Na', '5,2 mq/l', 'Düzgün əzələ və sinir funksiyası üçün vacib bir komponentdir.', 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Blanditiis explicabo ipsum dolor sit amet, consectetur adipisicing elit. Blanditiis explicabo ipsum dolor sit amet, consectetur adipisicing elit. Blanditiis explicabo ipsum dolor sit amet, consectetur adipisicing elit. Blanditiis explicabo ipsum dolor sit amet, consectetur adipisicing elit. '),
(66, 3, 'ru', 'Nitrat', 'NO3', '4,4 mq/l', 'Nitrat səviyyəsi 10 mq/l-dən aşağı olan su içmək sağlamlıq üçün əladır.', 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Blanditiis explicabo ipsum dolor sit amet, consectetur adipisicing elit. Blanditiis explicabo ipsum dolor sit amet, consectetur adipisicing elit. Blanditiis explicabo ipsum dolor sit amet, consectetur adipisicing elit. Blanditiis explicabo ipsum dolor sit amet, consectetur adipisicing elit. '),
(67, 4, 'ru', 'Maqnezium', 'Mg', '42 mq/l', 'Maqnezium orqanizmin sağlam qalması üçün lazım olan qidadır.', 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Blanditiis explicabo perspiciatis sequi dolorum quod, reprehenderit non iusto aliquid incidunt quia ducimus eos aspernatur repellendus quaerat distinctio, esse labore corrupti nesciunt?'),
(68, 5, 'ru', 'Sulfat', 'SO4', '400 mq/l', 'Sulfat hüceyrələrdə ən vacib makronutrientlərdən biridir.', 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Blanditiis explicabo perspiciatis sequi dolorum quod, reprehenderit non iusto aliquid incidunt quia ducimus eos aspernatur repellendus quaerat distinctio, esse labore corrupti nesciunt?'),
(69, 6, 'ru', 'Bikarbonat', 'CHO3', '384 mq/l', 'Bikarbonat mədə yanmasını və turşu həzmsizliyini aradan qaldırmaq üçün istifadə edilən antasiddir.', 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Blanditiis explicabo perspiciatis sequi dolorum quod, reprehenderit non iusto aliquid incidunt quia ducimus eos aspernatur repellendus quaerat distinctio, esse labore corrupti nesciunt?'),
(70, 1, 'tr', 'Kalsium', 'Ca', '240 mq/l', 'Bədənimizdəki kalsiumun təxminən 99%-i sümüklərimizdə və dişlərimizdədir.', 'asdasd'),
(71, 2, 'tr', 'Natrium', 'Na', '5,2 mq/l', 'Düzgün əzələ və sinir funksiyası üçün vacib bir komponentdir.', 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Blanditiis explicabo ipsum dolor sit amet, consectetur adipisicing elit. Blanditiis explicabo ipsum dolor sit amet, consectetur adipisicing elit. Blanditiis explicabo ipsum dolor sit amet, consectetur adipisicing elit. Blanditiis explicabo ipsum dolor sit amet, consectetur adipisicing elit. '),
(72, 3, 'tr', 'Nitrat', 'NO3', '4,4 mq/l', 'Nitrat səviyyəsi 10 mq/l-dən aşağı olan su içmək sağlamlıq üçün əladır.', 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Blanditiis explicabo ipsum dolor sit amet, consectetur adipisicing elit. Blanditiis explicabo ipsum dolor sit amet, consectetur adipisicing elit. Blanditiis explicabo ipsum dolor sit amet, consectetur adipisicing elit. Blanditiis explicabo ipsum dolor sit amet, consectetur adipisicing elit. '),
(73, 4, 'tr', 'Maqnezium', 'Mg', '42 mq/l', 'Maqnezium orqanizmin sağlam qalması üçün lazım olan qidadır.', 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Blanditiis explicabo perspiciatis sequi dolorum quod, reprehenderit non iusto aliquid incidunt quia ducimus eos aspernatur repellendus quaerat distinctio, esse labore corrupti nesciunt?'),
(74, 5, 'tr', 'Sulfat', 'SO4', '400 mq/l', 'Sulfat hüceyrələrdə ən vacib makronutrientlərdən biridir.', 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Blanditiis explicabo perspiciatis sequi dolorum quod, reprehenderit non iusto aliquid incidunt quia ducimus eos aspernatur repellendus quaerat distinctio, esse labore corrupti nesciunt?'),
(75, 6, 'tr', 'Bikarbonat', 'CHO3', '384 mq/l', 'Bikarbonat mədə yanmasını və turşu həzmsizliyini aradan qaldırmaq üçün istifadə edilən antasiddir.', 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Blanditiis explicabo perspiciatis sequi dolorum quod, reprehenderit non iusto aliquid incidunt quia ducimus eos aspernatur repellendus quaerat distinctio, esse labore corrupti nesciunt?'),
(76, 1, 'ar', 'Kalsium', 'Ca', '240 mq/l', 'Bədənimizdəki kalsiumun təxminən 99%-i sümüklərimizdə və dişlərimizdədir.', 'asdasd'),
(77, 2, 'ar', 'Natrium', 'Na', '5,2 mq/l', 'Düzgün əzələ və sinir funksiyası üçün vacib bir komponentdir.', 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Blanditiis explicabo ipsum dolor sit amet, consectetur adipisicing elit. Blanditiis explicabo ipsum dolor sit amet, consectetur adipisicing elit. Blanditiis explicabo ipsum dolor sit amet, consectetur adipisicing elit. Blanditiis explicabo ipsum dolor sit amet, consectetur adipisicing elit. '),
(78, 3, 'ar', 'Nitrat', 'NO3', '4,4 mq/l', 'Nitrat səviyyəsi 10 mq/l-dən aşağı olan su içmək sağlamlıq üçün əladır.', 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Blanditiis explicabo ipsum dolor sit amet, consectetur adipisicing elit. Blanditiis explicabo ipsum dolor sit amet, consectetur adipisicing elit. Blanditiis explicabo ipsum dolor sit amet, consectetur adipisicing elit. Blanditiis explicabo ipsum dolor sit amet, consectetur adipisicing elit. '),
(79, 4, 'ar', 'Maqnezium', 'Mg', '42 mq/l', 'Maqnezium orqanizmin sağlam qalması üçün lazım olan qidadır.', 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Blanditiis explicabo perspiciatis sequi dolorum quod, reprehenderit non iusto aliquid incidunt quia ducimus eos aspernatur repellendus quaerat distinctio, esse labore corrupti nesciunt?'),
(80, 5, 'ar', 'Sulfat', 'SO4', '400 mq/l', 'Sulfat hüceyrələrdə ən vacib makronutrientlərdən biridir.', 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Blanditiis explicabo perspiciatis sequi dolorum quod, reprehenderit non iusto aliquid incidunt quia ducimus eos aspernatur repellendus quaerat distinctio, esse labore corrupti nesciunt?'),
(81, 6, 'ar', 'Bikarbonat', 'CHO3', '384 mq/l', 'Bikarbonat mədə yanmasını və turşu həzmsizliyini aradan qaldırmaq üçün istifadə edilən antasiddir.', 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Blanditiis explicabo perspiciatis sequi dolorum quod, reprehenderit non iusto aliquid incidunt quia ducimus eos aspernatur repellendus quaerat distinctio, esse labore corrupti nesciunt?');

-- --------------------------------------------------------

--
-- Table structure for table `language`
--

CREATE TABLE `language` (
  `id` int(11) NOT NULL,
  `alias` varchar(10) NOT NULL,
  `name` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `language`
--

INSERT INTO `language` (`id`, `alias`, `name`) VALUES
(1, 'az', 'Azərbaycanca'),
(2, 'en', 'English'),
(3, 'tr', 'Türkçe'),
(4, 'ar', 'عربي');

-- --------------------------------------------------------

--
-- Table structure for table `msg`
--

CREATE TABLE `msg` (
  `id` int(11) NOT NULL,
  `fullname` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `message` varchar(500) NOT NULL,
  `date_send` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `msg`
--

INSERT INTO `msg` (`id`, `fullname`, `email`, `message`, `date_send`) VALUES
(1, 'asdasd', 'mammad.dev@gmail.com', 'mammad.dev@gmail.comasddasdas', '2022-09-13 22:30:44'),
(2, 'asdasd', 'mamasda@gmail.com', 'asdasd', '2022-09-13 22:30:44'),
(3, 'asdasd', 'mamasda@gmail.com', 'asdasd', '2022-09-13 22:30:44'),
(4, 'asdasd', 'mamasda@gmail.com', 'asdasd', '2022-09-13 22:30:44'),
(5, 'asdasd', 'asdasd@gmail.com', 'dfsfsdf', '2022-09-13 22:30:44'),
(6, 'asdasd', 'asdasd@gmail.com', 'dfsfsdf', '2022-09-13 22:30:44'),
(7, 'asdasd', 'asdasd@gmail.com', 'dfsfsdf', '2022-09-13 22:30:44'),
(8, 'asdasd', 'asdasd@gmail.com', 'dfsfsdf', '2022-09-13 22:30:44'),
(9, 'asdasd', 'asdasd@gmail.com', 'dfsfsdf', '2022-09-13 22:30:44'),
(10, 'asdasd', 'asdasd@gmail.com', 'dfsfsdf', '2022-09-13 22:30:44'),
(11, 'asdasd', 'asdasd@gmail.com', 'dfsfsdf', '2022-09-13 22:30:44'),
(12, 'asdasd', 'asdasd@gmail.com', 'dfsfsdf', '2022-09-13 22:30:44'),
(13, 'asdasd', 'asdasd@gmail.com', 'dfsfsdf', '2022-09-13 22:30:44'),
(14, 'asdasd', 'asdasd@gmail.com', 'dfsfsdf', '2022-09-13 22:30:44'),
(15, 'asdasd', 'asdasd@gmail.com', 'dfsfsdf', '2022-09-13 22:30:44'),
(16, 'asdasd', 'asdasd@gmail.com', 'dfsfsdf', '2022-09-13 22:30:44'),
(17, 'asdasd', 'asdasd@gmail.com', 'dfsfsdf', '2022-09-13 22:30:44'),
(18, 'asdasd', 'asdasd@gmail.com', 'dfsfsdf', '2022-09-13 22:30:44'),
(19, 'asdasd', 'asdasd@gmail.com', 'dfsfsdf', '2022-09-13 22:30:44'),
(20, 'asdasd', 'asdasd@gmail.com', 'dfsfsdf', '2022-09-13 22:30:44'),
(21, 'asdasd', 'asdasd@gmail.com', 'dfsfsdf', '2022-09-13 22:30:44'),
(22, 'asdasd', 'asdasd@gmail.com', 'dfsfsdf', '2022-09-13 22:30:44'),
(23, 'asdasd', 'asdasd@gmail.com', 'dfsfsdf', '2022-09-13 22:30:44'),
(24, 'asdasd', 'asdasd@gmail.com', 'dfsfsdf', '2022-09-13 22:30:44'),
(25, 'asdasd', 'asdasd@gmail.com', 'dfsfsdf', '2022-09-13 22:30:44'),
(26, 'asdasd', 'asdasd@gmail.com', 'dfsfsdf', '2022-09-13 22:30:44'),
(27, 'asdasd', 'asdasd@gmail.com', 'dfsfsdf', '2022-09-13 22:30:44'),
(28, 'asdasd', 'asdasd@gmail.com', 'dfsfsdf', '2022-09-13 22:30:44'),
(29, 'asdasd', 'asdasd@gmail.com', 'dfsfsdf', '2022-09-13 22:30:44'),
(30, 'asdasd', 'asdasd@gmail.com', 'dfsfsdf', '2022-09-13 22:30:44'),
(31, 'asdasd', 'asdasd@gmail.com', 'dfsfsdf', '2022-09-13 22:30:44'),
(32, 'asdasd', 'asdasd@gmail.com', 'dfsfsdf', '2022-09-13 22:30:44'),
(33, 'asdasd', 'asdasd@gmail.com', 'dfsfsdf', '2022-09-13 22:30:44'),
(34, 'asdasd', 'asdasd@gmail.com', 'dfsfsdf', '2022-09-13 22:30:44'),
(35, 'asdasd', 'asdasd@gmail.com', 'dfsfsdf', '2022-09-13 22:30:44'),
(36, 'asdasd', 'asdasd@gmail.com', 'dfsfsdf', '2022-09-13 22:30:44'),
(37, 'asdasd', 'asdasd@gmail.com', 'dfsfsdf', '2022-09-13 22:30:44'),
(38, 'asdasd', 'asdasd@gmail.com', 'dfsfsdf', '2022-09-13 22:30:44'),
(39, 'asdasd', 'asdasd@gmail.com', 'dfsfsdf', '2022-09-13 22:30:44'),
(40, 'asdasd', 'asdasd@gmail.com', 'dfsfsdf', '2022-09-13 22:30:44'),
(41, 'asdasd', 'asdasd@gmail.com', 'dfsfsdf', '2022-09-13 22:30:44'),
(42, 'asdasd', 'asdasd@gmail.com', 'dfsfsdf', '2022-09-13 22:30:44'),
(43, 'asdasd', 'asdasd@gmail.com', 'dfsfsdf', '2022-09-13 22:30:44'),
(44, 'asdasd', 'asdasd@gmail.com', 'dfsfsdf', '2022-09-13 22:30:44'),
(45, 'asdasd', 'asdasd@gmail.com', 'dfsfsdf', '2022-09-13 22:30:44'),
(46, 'asdasd', 'asdasd@gmail.com', 'dfsfsdf', '2022-09-13 22:30:44'),
(47, 'asdasd', 'asdasd@gmail.com', 'dfsfsdf', '2022-09-13 22:30:44'),
(48, 'asdasd', 'asdasd@gmail.com', 'dfsfsdf', '2022-09-13 22:30:44'),
(49, 'asdasd', 'asdasd@gmail.com', 'dfsfsdf', '2022-09-13 22:30:44'),
(50, 'asdasd', 'asdasd@gmail.com', 'dfsfsdf', '2022-09-13 22:30:44'),
(51, 'asdasd', 'asdasd@gmail.com', 'dfsfsdf', '2022-09-13 22:30:44'),
(52, 'asdasd', 'asdasd@gmail.com', 'dfsfsdf', '2022-09-13 22:30:44'),
(53, 'asdasd', 'asdasd@gmail.com', 'dfsfsdf', '2022-09-13 22:30:44'),
(54, 'asdasd', 'asdasd@gmail.com', 'dfsfsdf', '2022-09-13 22:30:44'),
(55, 'asdasd', 'asdasd@gmail.com', 'dfsfsdf', '2022-09-13 22:30:44'),
(56, 'asdasd', 'asdasd@gmail.com', 'dfsfsdf', '2022-09-13 22:30:44'),
(57, 'asdasd', 'asdasd@gmail.com', 'dfsfsdf', '2022-09-13 22:30:44'),
(58, 'asdasd', 'asdasd@gmail.com', 'dfsfsdf', '2022-09-13 22:30:44'),
(59, 'asdasd', 'asdasd@gmail.com', 'dfsfsdf', '2022-09-13 22:30:44'),
(60, 'asdasd', 'asdasd@gmail.com', 'dfsfsdf', '2022-09-13 22:30:44'),
(61, 'asdasd', 'asdasd@gmail.com', 'dfsfsdf', '2022-09-13 22:30:44'),
(62, 'asdasd', 'asdasd@gmail.com', 'dfsfsdf', '2022-09-13 22:30:44'),
(63, 'asdasd', 'asdasd@gmail.com', 'dfsfsdf', '2022-09-13 22:30:44'),
(64, 'asdasd', 'asdasd@gmail.com', 'dfsfsdf', '2022-09-13 22:30:44'),
(65, 'asdasd', 'asdasd@gmail.com', 'dfsfsdf', '2022-09-13 22:30:44'),
(66, 'asdasd', 'asdasd@gmail.com', 'dfsfsdf', '2022-09-13 22:30:44'),
(67, 'asdasd', 'asdasd@gmail.com', 'dfsfsdf', '2022-09-13 22:30:44'),
(68, 'asdasd', 'asdasd@gmail.com', 'dfsfsdf', '2022-09-13 22:30:44'),
(69, 'asdasd', 'asdasd@gmail.com', 'dfsfsdf', '2022-09-13 22:30:44'),
(70, 'asdasd', 'asdasd@gmail.com', 'dfsfsdf', '2022-09-13 22:30:44'),
(71, 'asdasd', 'asdasd@gmail.com', 'dfsfsdf', '2022-09-13 22:30:44'),
(72, 'asdasd', 'asdasd@gmail.com', 'dfsfsdf', '2022-09-13 22:30:44'),
(73, 'asdasd', 'asdasd@gmail.com', 'dfsfsdf', '2022-09-13 22:30:44'),
(74, 'asdasd', 'asdasd@gmail.com', 'dfsfsdf', '2022-09-13 22:30:44'),
(75, 'asdasd', 'asdasd@gmail.com', 'dfsfsdf', '2022-09-13 22:30:44'),
(76, 'asdasd', 'asdasd@gmail.com', 'dfsfsdf', '2022-09-13 22:30:44'),
(77, 'asdasd', 'asdasd@gmail.com', 'dfsfsdf', '2022-09-13 22:30:44'),
(78, 'asdasd', 'asdasd@gmail.com', 'dfsfsdf', '2022-09-13 22:30:44'),
(79, 'asdasd', 'asdasd@gmail.com', 'dfsfsdf', '2022-09-13 22:30:44'),
(80, 'asdasd', 'asdasd@gmail.com', 'dfsfsdf', '2022-09-13 22:30:44'),
(81, 'asdasd', 'asdasd@gmail.com', 'dfsfsdf', '2022-09-13 22:30:44'),
(82, 'asdasd', 'asdasd@gmail.com', 'dfsfsdf', '2022-09-13 22:30:44'),
(83, 'asdasd', 'asdasd@gmail.com', 'dfsfsdf', '2022-09-13 22:30:44'),
(84, 'asdasd', 'asdasd@gmail.com', 'dfsfsdf', '2022-09-13 22:30:44'),
(85, 'asdasd', 'asdasd@gmail.com', 'dfsfsdf', '2022-09-13 22:30:44'),
(86, 'asdasd', 'asdasd@gmail.com', 'dfsfsdf', '2022-09-13 22:30:44'),
(87, 'asdasd', 'asdasd@gmail.com', 'dfsfsdf', '2022-09-13 22:30:44'),
(88, 'asdasd', 'asdasd@gmail.com', 'dfsfsdf', '2022-09-13 22:30:44'),
(89, 'asdasd', 'asdasd@gmail.com', 'dfsfsdf', '2022-09-13 22:30:44'),
(90, 'asdasd', 'asdasd@gmail.com', 'dfsfsdf', '2022-09-13 22:30:44'),
(91, 'asdasd', 'asdasd@gmail.com', 'dfsfsdf', '2022-09-13 22:30:44'),
(92, 'asdasd', 'asdasd@gmail.com', 'dfsfsdf', '2022-09-13 22:30:44'),
(93, 'asdasd', 'asdasd@gmail.com', 'dfsfsdf', '2022-09-13 22:30:44'),
(94, 'asdasd', 'asdasd@gmail.com', 'dfsfsdf', '2022-09-13 22:30:44'),
(95, 'asdasd', 'asdasd@gmail.com', 'dfsfsdf', '2022-09-13 22:30:44'),
(97, 'asdasd', 'asdasd@gmail.com', 'dfsfsdf', '2022-09-13 22:30:44'),
(98, 'asdasd', 'asdasd@gmail.com', 'dfsfsdf', '2022-09-13 22:30:44'),
(99, 'asdasd', 'asdasd@gmail.com', 'dfsfsdf', '2022-09-13 22:30:44'),
(100, 'asdasd', 'asdasd@gmail.com', 'dfsfsdf', '2022-09-13 22:30:44'),
(101, 'asdasd', 'asdasd@gmail.com', 'dfsfsdf', '2022-09-13 22:30:44'),
(102, 'asdasd', 'asdasd@gmail.com', 'dfsfsdf', '2022-09-13 22:30:44'),
(103, 'asdasd', 'asdasd@gmail.com', 'dfsfsdf', '2022-09-13 22:30:44'),
(104, 'asdasd', 'asdasd@gmail.com', 'dfsfsdf', '2022-09-13 22:30:44'),
(105, 'asdasd', 'asdasd@gmail.com', 'dfsfsdf', '2022-09-13 22:30:44'),
(106, 'asdasd', 'asdasd@gmail.com', 'dfsfsdf', '2022-09-13 22:30:44'),
(107, 'asdasd', 'asdasd@gmail.com', 'dfsfsdf', '2022-09-13 22:30:44'),
(108, 'asdasd', 'asdasd@gmail.com', 'dfsfsdf', '2022-09-13 22:30:44'),
(117, 'adsda', 'mamamd.dev@gmailk.com', 'asdadasd', '2022-09-13 22:30:44'),
(118, 'adsda', 'mamamd.dev@gmailk.com', 'asdadasd', '2022-09-13 22:30:44'),
(119, 'adsda', 'mamamd.dev@gmailk.com', 'asdadasd', '2022-09-13 22:30:44'),
(120, 'adsda', 'mamamd.dev@gmailk.com', 'asdadasd', '2022-09-13 22:30:44'),
(122, 'adsda', 'mamamd.dev@gmailk.com', 'asdadasd', '2022-09-13 22:30:44'),
(123, 'adsda', 'mamamd.dev@gmailk.com', 'asdadasd', '2022-09-13 22:30:44'),
(125, 'asdasda', 'sdads@gmail.com', 'asdasd', '2022-09-13 22:30:44'),
(136, 'cxvzczx', 'czxc@mail.ru', 'zxczx', '2022-10-16 14:51:34'),
(137, 'sadas', 'dasd@mail.ru', 'sdfsdf', '2022-10-16 14:51:41'),
(138, 'asdasd', 'asdasd@mail.ru', 'asdasd', '2022-10-16 14:51:50'),
(139, 'asdasd', 'asdas@mail.ru', 'asdasd', '2022-10-16 14:52:37'),
(140, 'asdasd', 'asdas@mail.ru', 'asdasd', '2022-10-16 14:54:32'),
(141, 'asdasd', 'asdas@mail.ru', 'asdasd', '2022-10-16 14:58:44'),
(142, 'asdas', 'dasdasd@mail.ru', 'asdasd', '2022-10-16 15:11:03'),
(143, 'asda', 'sdasda@mail.ru', 'asdasd', '2022-10-16 15:11:37');

-- --------------------------------------------------------

--
-- Table structure for table `orders`
--

CREATE TABLE `orders` (
  `id` int(11) NOT NULL,
  `delivery_date` timestamp NULL DEFAULT NULL,
  `delivery_note` varchar(500) DEFAULT NULL,
  `delivery_status` tinyint(10) NOT NULL DEFAULT 0,
  `payment_method` tinyint(10) NOT NULL DEFAULT 0,
  `payment_status` tinyint(10) NOT NULL DEFAULT 0,
  `first_name` varchar(100) NOT NULL,
  `last_name` varchar(100) NOT NULL,
  `country` varchar(10) NOT NULL,
  `city` varchar(100) NOT NULL,
  `address` varchar(255) NOT NULL,
  `phone` varchar(30) NOT NULL,
  `user_id` int(11) NOT NULL,
  `total` double NOT NULL DEFAULT 0,
  `status` tinyint(9) NOT NULL DEFAULT 0,
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp(),
  `updatedAt` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `orders`
--

INSERT INTO `orders` (`id`, `delivery_date`, `delivery_note`, `delivery_status`, `payment_method`, `payment_status`, `first_name`, `last_name`, `country`, `city`, `address`, `phone`, `user_id`, `total`, `status`, `createdAt`, `updatedAt`) VALUES
(33, '2022-11-01 20:00:00', 'dsadasd', 0, 1, 0, 'Mammad', 'Qurbanov', 'AZ', 'Sumqayit', 'dasd asd as d', '+994 (070) 599-6188', 18, 107.9, 0, '2022-10-28 06:21:38', '2022-10-30 06:24:54'),
(34, '2022-11-01 20:00:00', 'sad', 0, 1, 0, 'Mammad', 'Qurbanov', 'AZ', 'Sumqayit', 'dasd asd as d', '+994 (070) 599-6188', 18, 110.9, 0, '2022-10-29 06:23:59', '2022-10-30 06:25:05'),
(35, '2022-11-03 20:00:00', 'sdasd', 0, 1, 0, 'Mammad', 'Qurbanov', 'AZ', 'Sumqayit', 'dasd asd as d', '+994 (070) 599-6188', 18, 106.4, 0, '2022-10-30 06:24:15', '2022-10-30 06:24:15'),
(36, '2022-11-02 20:00:00', 'dfsdf', 3, 1, 1, 'Mammad', 'Qurbanov', 'AZ', 'Sumqayit', 'dasd asd as d', '+994 (070) 599-6188', 18, 70, 1, '2022-10-30 07:38:03', '2022-10-30 08:09:33');

-- --------------------------------------------------------

--
-- Table structure for table `orders_item`
--

CREATE TABLE `orders_item` (
  `id` int(11) NOT NULL,
  `product_id` int(11) NOT NULL,
  `price` double NOT NULL DEFAULT 0,
  `quantity` smallint(5) NOT NULL DEFAULT 1,
  `order_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `orders_item`
--

INSERT INTO `orders_item` (`id`, `product_id`, `price`, `quantity`, `order_id`) VALUES
(66, 11, 35, 3, 33),
(67, 12, 1.5, 1, 33),
(68, 13, 0.7, 2, 33),
(69, 11, 35, 3, 34),
(70, 12, 1.5, 3, 34),
(71, 13, 0.7, 2, 34),
(72, 11, 35, 3, 35),
(73, 13, 0.7, 2, 35),
(74, 11, 35, 2, 36);

-- --------------------------------------------------------

--
-- Table structure for table `order_activity`
--

CREATE TABLE `order_activity` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `order_id` int(11) NOT NULL,
  `type` tinyint(9) NOT NULL DEFAULT 0,
  `msg` varchar(500) DEFAULT NULL,
  `note` varchar(500) DEFAULT NULL,
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp(),
  `updatedAt` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `order_activity`
--

INSERT INTO `order_activity` (`id`, `user_id`, `order_id`, `type`, `msg`, `note`, `createdAt`, `updatedAt`) VALUES
(30, 18, 36, 0, 'status dəyişildi: Çatdırılma statusu → Çatdırıldı, Ödəniş statusu → Ödənildi, Sifariş statusu → Tamamlandı', NULL, '2022-10-30 08:09:33', '2022-10-30 08:09:33');

-- --------------------------------------------------------

--
-- Table structure for table `pages`
--

CREATE TABLE `pages` (
  `id` int(11) NOT NULL,
  `alias` varchar(250) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `pages`
--

INSERT INTO `pages` (`id`, `alias`) VALUES
(1, 'about');

-- --------------------------------------------------------

--
-- Table structure for table `pages_lang`
--

CREATE TABLE `pages_lang` (
  `id` int(11) NOT NULL,
  `rid` int(11) NOT NULL,
  `lang` varchar(10) NOT NULL,
  `title` varchar(255) NOT NULL,
  `body` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `pages_lang`
--

INSERT INTO `pages_lang` (`id`, `rid`, `lang`, `title`, `body`) VALUES
(1, 1, 'az', 'Haqqimizda', '{\"blocks\":[{\"key\":\"foo\",\"text\":\"Şirkət haqqında\",\"type\":\"header-three\",\"depth\":0,\"inlineStyleRanges\":[],\"entityRanges\":[],\"data\":{}},{\"key\":\"fb58u\",\"text\":\"”Sirab” mineral su yatağından sənaye məqsədilə istifadəyə XX əsrin 50-ci illərindən başlanmışdır. İlk dəfə olaraq yatağın su ehtiyatları hesablanmış və 1968-ci ildə Moskvanın Dövlət Ehtiyatlar Komissiyasında təsdiq edilmişdir.Aşkar olan mineral suların bazası əsasında 1968-ci ildə Azərbaycanda ən böyük mineral sudoldurma zavodu istifadəyə verilmişdir. Sovet İttifaqı dağıldıqdan bir müddət sonra Ümummilli dahi liderimiz Heydər Əliyev cənablarının Azərbaycan Respublikasında sahibkarlığa göstərdiyi qayğının nəticəsində 2003-cü ildə “Sirab” mineral sular zavodu Açıq Səhmdar Cəmiyyətinə çevrilmişdir. Babək “Sirab” ASC bir sıra Avropa,Rusiya və Türkiyə firmalari ilə əlaqə yaradaraq yeni müasir avadanlıqlar almışdır.\",\"type\":\"unstyled\",\"depth\":0,\"inlineStyleRanges\":[],\"entityRanges\":[],\"data\":{}},{\"key\":\"aiadv\",\"text\":\"İstehsal olan məhsullar haqqında:\",\"type\":\"header-three\",\"depth\":0,\"inlineStyleRanges\":[],\"entityRanges\":[],\"data\":{}},{\"key\":\"11i6\",\"text\":\"Hal hazırda “Sirab” mineal sular zavodunda 7 texnoloji xətt quraşdırılmış 4 sex fəaliyyət göstərir.Bu xətlərdə qazlaşdırılmış və qazlaşdırılmamış “Sirab” təbii mineral müalicəvi süfrə suyunun müxtəlif həcmli Pet və şüşə butulkalara doldurulması həyata keçirilir.Hal hazırda zavadumuzda 21 çeşiddə (0,5 lt, 1,0 lt, 1,5 lt həcmli Pet qazlı, 0,33 lt, 0,5 lt, 1,0 lt, 1,5 lt, 5,0 lt, 10 lt və 19 lt həcmli Pet qazsız , 0.2 lt , 0,33 lt , 0,5 lt həcmli şüşə qazlı butulka, 0,33lt ilə 0.5lt həcimli şüşə qazsız butulka və 0,33 lt , 0,75 lt şüşə qazli və qazsiz Premium sular) məhsul istehsal olunur.\",\"type\":\"unstyled\",\"depth\":0,\"inlineStyleRanges\":[],\"entityRanges\":[],\"data\":{}},{\"key\":\"b2p8e\",\"text\":\"Tərkibi haqqında:\",\"type\":\"header-three\",\"depth\":0,\"inlineStyleRanges\":[],\"entityRanges\":[],\"data\":{}},{\"key\":\"erlie\",\"text\":\"Sirab mineral sularının formalaşmasında yer qabığının dərinliklərində gedən proseslər əsas rol oynayır. Çoxlu sayda qazılmış kəşfiyyat quyuları mineral suların çat damar tipli olduğunu təsdiqləyir.Mineral suların kimyəvi tərkibini Na/Cl əmaslını və digər komponentləri öyrənməklə onların genezisi və evolyusiyası müəyyənləşdirilir .Ərazinin mineral sularında iştirak edən qazların 97,5-99,9 %-ni karbon qazı təşkil edir.Azot,oksigen və digər nadir qazlar cuzi miqdardadır.Qazlı sularin ümumi minerallığı- 1,5 -3,3 q/dm3, qazsız sularin ümumi mineralliği- 0,10 q/dm3 və PH göstəricisi isə 7,4 -dir.\",\"type\":\"unstyled\",\"depth\":0,\"inlineStyleRanges\":[],\"entityRanges\":[],\"data\":{}},{\"key\":\"44rj0\",\"text\":\"Lorem ipsum dolor sit amet consectetur adipisicing elit. Cupiditate delectus magnam veniam quam voluptates officia. Itaque fuga atque iure necessitatibus quibusdam debitis quis ad, vitae sapiente rerum aut voluptatibus voluptas.\",\"type\":\"unordered-list-item\",\"depth\":0,\"inlineStyleRanges\":[],\"entityRanges\":[],\"data\":{}},{\"key\":\"3mhdn\",\"text\":\"Lorem ipsum dolor sit amet consectetur adipisicing elit. Cupiditate\",\"type\":\"unordered-list-item\",\"depth\":0,\"inlineStyleRanges\":[],\"entityRanges\":[],\"data\":{}},{\"key\":\"8t3bn\",\"text\":\"\",\"type\":\"unstyled\",\"depth\":0,\"inlineStyleRanges\":[],\"entityRanges\":[],\"data\":{}}],\"entityMap\":{}}'),
(2, 1, 'en', 'About', '{\"blocks\":[{\"key\":\"foo\",\"text\":\"About the company\",\"type\":\"header-three\",\"depth\":0,\"inlineStyleRanges\":[],\"entityRanges\":[],\"data\":{}},{\"key\":\"edr6q\",\"text\":\"\\\"Sirab\\\" mineral water field has been used for industrial purposes since the 50s of the 20th century. For the first time, the water resources of the field were calculated and approved by the Moscow State Reserve Commission in 1968. On the basis of the discovered mineral water base, the largest mineral water plant in Azerbaijan was commissioned in 1968. Some time after the collapse of the Soviet Union, as a result of the care given to entrepreneurship in the Republic of Azerbaijan by our great national leader, Heydar Aliyev, in 2003, the \\\"Sirab\\\" mineral water plant became an Open Joint Stock Company. Babek \\\"Sirab\\\" OJSC established relations with a number of European, Russian and Turkish companies and bought new modern equipment.\",\"type\":\"unstyled\",\"depth\":0,\"inlineStyleRanges\":[],\"entityRanges\":[],\"data\":{}},{\"key\":\"f7nla\",\"text\":\"About manufactured products:\",\"type\":\"header-three\",\"depth\":0,\"inlineStyleRanges\":[],\"entityRanges\":[],\"data\":{}},{\"key\":\"acdqb\",\"text\":\"Currently, 4 workshops with 7 technological lines are operating at the \\\"Sirab\\\" mineral water plant. In these lines, carbonated and non-carbonated \\\"Sirab\\\" natural mineral healing table water is filled into Pet and glass bottles of various volumes. Currently, our plant has 21 varieties (0.5 l , 1.0 lt, 1.5 lt Pet with gas, 0.33 lt, 0.5 lt, 1.0 lt, 1.5 lt, 5.0 lt, 10 lt and 19 lt Pet without gas, 0.2 lt , 0.33 lt, 0.5 lt glass gas bottles, 0.33 lt to 0.5 lt glass still bottles and 0.33 lt, 0.75 lt glass premium waters) are produced.\",\"type\":\"unstyled\",\"depth\":0,\"inlineStyleRanges\":[],\"entityRanges\":[],\"data\":{}},{\"key\":\"c59nb\",\"text\":\"About the ingredients:\",\"type\":\"header-three\",\"depth\":0,\"inlineStyleRanges\":[],\"entityRanges\":[],\"data\":{}},{\"key\":\"39km4\",\"text\":\"The processes taking place in the depths of the earth\'s crust play a key role in the formation of Sirab mineral waters. A large number of excavated exploratory wells confirm that the mineral waters are of crack vein type. Their genesis and evolution are determined by studying the chemical composition of mineral waters, the Na/Cl ratio and other components. 97.5-99.9% of the gases in the mineral waters of the area are carbon dioxide. Nitrogen, oxygen and other rare gases are in small amounts. The total minerality of aerated water is 1.5-3.3 g/dm3, the total minerality of degassed water is 0.10 g/dm3, and the PH indicator is 7.4.\",\"type\":\"unstyled\",\"depth\":0,\"inlineStyleRanges\":[],\"entityRanges\":[],\"data\":{}},{\"key\":\"9ec26\",\"text\":\"Lorem ipsum dolor sit amet consectetur adipisicing elite. Cupiditate delectus magnam veniam quam voluptates officia. Itaque fuga atque iure necessitatibus quibusdam debitis quis ad, vitae sapiente rerum aut voluptatibus voluptas.\",\"type\":\"unordered-list-item\",\"depth\":0,\"inlineStyleRanges\":[],\"entityRanges\":[],\"data\":{}},{\"key\":\"aovca\",\"text\":\"Lorem ipsum dolor sit amet consectetur adipisicing elite. Cupiditate\",\"type\":\"unordered-list-item\",\"depth\":0,\"inlineStyleRanges\":[],\"entityRanges\":[],\"data\":{}}],\"entityMap\":{}}'),
(3, 1, 'tr', 'Haqqimizda', '{\"blocks\":[{\"key\":\"foo\",\"text\":\"Şirket hakkında\",\"type\":\"header-three\",\"depth\":0,\"inlineStyleRanges\":[],\"entityRanges\":[],\"data\":{}},{\"key\":\"9k2s2\",\"text\":\"\\\"Sirab\\\" maden suyu sahası, 20. yüzyılın 50\'li yıllarından beri endüstriyel amaçlarla kullanılmaktadır. İlk defa sahanın su kaynakları 1968 yılında Moskova Devlet Rezerv Komisyonu tarafından hesaplanmış ve onaylanmıştır. Keşfedilen maden suyu tabanına dayanarak, 1968 yılında Azerbaycan\'ın en büyük maden suyu tesisi işletmeye alınmıştır. Sovyetler Birliği\'nin dağılmasından bir süre sonra, büyük milli liderimiz Haydar Aliyev\'in Azerbaycan Cumhuriyeti\'nde girişimciliğe gösterdiği özen sonucunda, 2003 yılında \\\"Sirab\\\" maden suyu tesisi Açık Anonim Şirket haline geldi. Babek \\\"Sirab\\\" OJSC, bir dizi Avrupa, Rus ve Türk şirketi ile ilişkiler kurdu ve yeni modern ekipman satın aldı.\",\"type\":\"unstyled\",\"depth\":0,\"inlineStyleRanges\":[],\"entityRanges\":[],\"data\":{}},{\"key\":\"a4moa\",\"text\":\"Üretilen ürünler hakkında:\",\"type\":\"header-three\",\"depth\":0,\"inlineStyleRanges\":[],\"entityRanges\":[],\"data\":{}},{\"key\":\"b1nht\",\"text\":\"\\\"Sirab\\\" maden suyu tesisinde şu anda 7 teknolojik hatlı 4 atölye faaliyet göstermektedir.Bu hatlarda gazlı ve gazsız \\\"Sirab\\\" doğal mineralli şifalı sofra suyu çeşitli hacimlerdeki Pet ve cam şişelere doldurulmaktadır. bitkinin 21 çeşidi vardır (0.5 l , 1.0 lt, 1.5 lt Gazlı Pet, 0.33 lt, 0.5 lt, 1.0 lt, 1.5 lt, 5.0 lt, 10 lt ve 19 lt Gazsız Pet, 0.2 lt , 0.33 lt, 0.5 lt cam gaz şişeleri, 0,33 lt ila 0,5 lt cam damıtma şişeleri ve 0,33 lt, 0,75 lt cam premium sular) üretilmektedir.\",\"type\":\"unstyled\",\"depth\":0,\"inlineStyleRanges\":[],\"entityRanges\":[],\"data\":{}},{\"key\":\"aln5b\",\"text\":\"Malzemeler hakkında:\",\"type\":\"header-three\",\"depth\":0,\"inlineStyleRanges\":[],\"entityRanges\":[],\"data\":{}},{\"key\":\"7gd90\",\"text\":\"Sirab maden sularının oluşumunda yer kabuğunun derinliklerinde meydana gelen süreçler kilit rol oynamaktadır. Çok sayıda kazılmış arama kuyusu, maden sularının çatlak damar tipinde olduğunu doğrulamaktadır.Maden sularının kimyasal bileşimi, Na/Cl oranı ve diğer bileşenleri incelenerek oluşum ve evrimleri belirlenir. bölgenin maden suları karbondioksittir.Azot, oksijen ve diğer nadir gazlar az miktardadır.Havalandırmalı suyun toplam mineralliği 1.5-3.3 g/dm3, gazı alınmış suyun toplam mineralliği 0.10 g/dm3 ve PH göstergesi 7.4\'tür.\",\"type\":\"unstyled\",\"depth\":0,\"inlineStyleRanges\":[],\"entityRanges\":[],\"data\":{}}],\"entityMap\":{}}'),
(4, 1, 'ar', 'معلومات عنا', '{\"blocks\":[{\"key\":\"foo\",\"text\":\"\",\"type\":\"header-three\",\"depth\":0,\"inlineStyleRanges\":[],\"entityRanges\":[],\"data\":{}}],\"entityMap\":{}}'),
(50, 1, 'ru', 'asdasd', '{\"blocks\":[{\"key\":\"foo\",\"text\":\"Şirkət haqqında\",\"type\":\"header-three\",\"depth\":0,\"inlineStyleRanges\":[],\"entityRanges\":[],\"data\":{}},{\"key\":\"262ts\",\"text\":\"”Sirab” mineral su yatağından sənaye məqsədilə istifadəyə XX əsrin 50-ci illərindən başlanmışdır. İlk dəfə olaraq yatağın su ehtiyatları hesablanmış və 1968-ci ildə Moskvanın Dövlət Ehtiyatlar Komissiyasında təsdiq edilmişdir.Aşkar olan mineral suların bazası əsasında 1968-ci ildə Azərbaycanda ən böyük mineral sudoldurma zavodu istifadəyə verilmişdir. Sovet İttifaqı dağıldıqdan bir müddət sonra Ümummilli dahi liderimiz Heydər Əliyev cənablarının Azərbaycan Respublikasında sahibkarlığa göstərdiyi qayğının nəticəsində 2003-cü ildə “Sirab” mineral sular zavodu Açıq Səhmdar Cəmiyyətinə çevrilmişdir. Babək “Sirab” ASC bir sıra Avropa,Rusiya və Türkiyə firmalari ilə əlaqə yaradaraq yeni müasir avadanlıqlar almışdır.\",\"type\":\"unstyled\",\"depth\":0,\"inlineStyleRanges\":[],\"entityRanges\":[],\"data\":{}},{\"key\":\"aqtop\",\"text\":\"İstehsal olan məhsullar haqqında:\",\"type\":\"header-three\",\"depth\":0,\"inlineStyleRanges\":[],\"entityRanges\":[],\"data\":{}},{\"key\":\"dog0s\",\"text\":\"Hal hazırda “Sirab” mineal sular zavodunda 7 texnoloji xətt quraşdırılmış 4 sex fəaliyyət göstərir.Bu xətlərdə qazlaşdırılmış və qazlaşdırılmamış “Sirab” təbii mineral müalicəvi süfrə suyunun müxtəlif həcmli Pet və şüşə butulkalara doldurulması həyata keçirilir.Hal hazırda zavadumuzda 21 çeşiddə (0,5 lt, 1,0 lt, 1,5 lt həcmli Pet qazlı, 0,33 lt, 0,5 lt, 1,0 lt, 1,5 lt, 5,0 lt, 10 lt və 19 lt həcmli Pet qazsız , 0.2 lt , 0,33 lt , 0,5 lt həcmli şüşə qazlı butulka, 0,33lt ilə 0.5lt həcimli şüşə qazsız butulka və 0,33 lt , 0,75 lt şüşə qazli və qazsiz Premium sular) məhsul istehsal olunur.\",\"type\":\"unstyled\",\"depth\":0,\"inlineStyleRanges\":[],\"entityRanges\":[],\"data\":{}},{\"key\":\"10iqa\",\"text\":\"Tərkibi haqqında:\",\"type\":\"header-three\",\"depth\":0,\"inlineStyleRanges\":[],\"entityRanges\":[],\"data\":{}},{\"key\":\"5dou9\",\"text\":\"Sirab mineral sularının formalaşmasında yer qabığının dərinliklərində gedən proseslər əsas rol oynayır. Çoxlu sayda qazılmış kəşfiyyat quyuları mineral suların çat damar tipli olduğunu təsdiqləyir.Mineral suların kimyəvi tərkibini Na/Cl əmaslını və digər komponentləri öyrənməklə onların genezisi və evolyusiyası müəyyənləşdirilir .Ərazinin mineral sularında iştirak edən qazların 97,5-99,9 %-ni karbon qazı təşkil edir.Azot,oksigen və digər nadir qazlar cuzi miqdardadır.Qazlı sularin ümumi minerallığı- 1,5 -3,3 q/dm3, qazsız sularin ümumi mineralliği- 0,10 q/dm3 və PH göstəricisi isə 7,4 -dir.\",\"type\":\"unstyled\",\"depth\":0,\"inlineStyleRanges\":[],\"entityRanges\":[],\"data\":{}},{\"key\":\"6gvdq\",\"text\":\"Lorem ipsum dolor sit amet consectetur adipisicing elit. Cupiditate delectus magnam veniam quam voluptates officia. Itaque fuga atque iure necessitatibus quibusdam debitis quis ad, vitae sapiente rerum aut voluptatibus voluptas.\",\"type\":\"unordered-list-item\",\"depth\":0,\"inlineStyleRanges\":[],\"entityRanges\":[],\"data\":{}},{\"key\":\"f6otn\",\"text\":\"Lorem ipsum dolor sit amet consectetur adipisicing elit. Cupiditate\",\"type\":\"unordered-list-item\",\"depth\":0,\"inlineStyleRanges\":[],\"entityRanges\":[],\"data\":{}}],\"entityMap\":{}}');

-- --------------------------------------------------------

--
-- Table structure for table `products`
--

CREATE TABLE `products` (
  `id` int(11) NOT NULL,
  `category_id` int(11) NOT NULL,
  `price` double NOT NULL DEFAULT 0,
  `photo` varchar(255) DEFAULT NULL,
  `status` tinyint(10) NOT NULL DEFAULT 0,
  `position` tinyint(255) UNSIGNED NOT NULL DEFAULT 0,
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp(),
  `updatedAt` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `deletedAt` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `products`
--

INSERT INTO `products` (`id`, `category_id`, `price`, `photo`, `status`, `position`, `createdAt`, `updatedAt`, `deletedAt`) VALUES
(11, 5, 35, 'YwBxIw6KeG0p54fzL_kOB.png', 0, 3, '2022-10-13 14:01:40', '2022-10-31 22:40:48', NULL),
(12, 5, 1.5, '3VWF1fJkfMGMkg0RO6bR2.png', 0, 2, '2022-10-13 14:01:40', '2022-11-12 09:09:00', NULL),
(13, 4, 0.7, 'ehgAts3G7cABg_Fwsif6B.png', 0, 1, '2022-10-13 14:01:40', '2022-11-12 09:09:00', NULL),
(14, 5, 10.5, 'EpT_CeeZpSfiiziwttZHo.png', 0, 0, '2022-10-31 20:42:51', '2022-11-12 09:08:57', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `products_lang`
--

CREATE TABLE `products_lang` (
  `id` int(11) NOT NULL,
  `rid` int(11) NOT NULL,
  `lang` varchar(10) NOT NULL,
  `name` varchar(255) NOT NULL,
  `description` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `products_lang`
--

INSERT INTO `products_lang` (`id`, `rid`, `lang`, `name`, `description`) VALUES
(122, 11, 'az', 'Bir böyük şüşə mineral su', 'Naxçıvan şəhərinin 14.6 km şimal - şərqində, Sirab kəndi ərazisində, hündür dağların qoynuyda, Kəlbəağıl vadisində 1257.80 metr hündürlükdə bir bulaq qaynayır. Bu – qızıl ehtiyatları, daş-duz yataqları və bulaqları ilə zəngin Naxçıvan torpağının möcüzələrindən biri olan Sirab dır. Qədim Naxçıvan torpağının bu misilsiz sərvətlərindən insanlar neçə-neçə əsrlərdir ki istifadə edirlər.'),
(123, 11, 'en', '2342', '34234'),
(124, 11, 'tr', 'asddsdsd', 'asd'),
(125, 11, 'ar', 'asdas', 'dasda'),
(130, 12, 'az', 'Üç böyük şüşə mineral su', 'wqeqe'),
(131, 12, 'en', 'Üç böyük şüşə mineral su', 'wadasd'),
(132, 12, 'tr', 'Üç böyük şüşə mineral su', 'sdasd'),
(133, 12, 'ar', 'Üç böyük şüşə mineral su', 'sadasd'),
(134, 13, 'az', 'Kiçik şüşə mineral su', 'adasd asd'),
(135, 13, 'en', 'Kiçik şüşə mineral su', 'Kiçik şüşə mineral su'),
(136, 13, 'tr', 'Kiçik şüşə mineral su', 'Kiçik şüşə mineral su'),
(137, 13, 'ar', 'Kiçik şüşə mineral su', 'Kiçik şüşə mineral su'),
(153, 11, 'ru', 'Bir böyük şüşə mineral su', 'Naxçıvan şəhərinin 14.6 km şimal - şərqində, Sirab kəndi ərazisində, hündür dağların qoynuyda, Kəlbəağıl vadisində 1257.80 metr hündürlükdə bir bulaq qaynayır. Bu – qızıl ehtiyatları, daş-duz yataqları və bulaqları ilə zəngin Naxçıvan torpağının möcüzələrindən biri olan Sirab dır. Qədim Naxçıvan torpağının bu misilsiz sərvətlərindən insanlar neçə-neçə əsrlərdir ki istifadə edirlər.'),
(158, 12, 'ru', 'Üç böyük şüşə mineral su', 'sdasda'),
(163, 13, 'ru', 'Kiçik şüşə mineral su', 'sdds'),
(209, 14, 'az', 'Üç böyük şüşə mineral su', 'Üç böyük şüşə mineral su'),
(210, 14, 'en', 'Üç böyük şüşə mineral su', 'Üç böyük şüşə mineral su'),
(211, 14, 'ru', 'Üç böyük şüşə mineral su', 'Üç böyük şüşə mineral su'),
(212, 14, 'tr', 'Üç böyük şüşə mineral su', 'Üç böyük şüşə mineral su'),
(213, 14, 'ar', 'Üç böyük şüşə mineral su', 'Üç böyük şüşə mineral su');

-- --------------------------------------------------------

--
-- Table structure for table `shipping_address`
--

CREATE TABLE `shipping_address` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `country` varchar(9) NOT NULL,
  `city` varchar(255) NOT NULL,
  `address` varchar(500) NOT NULL,
  `first_name` varchar(100) NOT NULL,
  `last_name` varchar(100) NOT NULL,
  `phone` varchar(100) NOT NULL,
  `is_default` tinyint(9) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `shipping_address`
--

INSERT INTO `shipping_address` (`id`, `user_id`, `country`, `city`, `address`, `first_name`, `last_name`, `phone`, `is_default`) VALUES
(1, 1, 'AZ', 'Sumqayit', 'Yasamal r., H. Zərdabi küç. 92a', 'Mammad', 'Gurbanov', '+994 (546) 464-6464', 0),
(2, 2, 'AZ', 'Sumqayit', 'Yasamal r., H. Zərdabi küç. 92a', 'Mammad', 'Gurbanov', '+994 (546) 464-6464', 0),
(3, 3, 'AZ', 'Sumqayit', 'Yasamal r., H. Zərdabi küç. 92a', 'Mammad', 'Gurbanov', '+994 (546) 464-6464', 0),
(4, 4, 'AZ', 'Sumqayit', 'Yasamal r., H. Zərdabi küç. 92a', 'Mammad', 'Gurbanov', '+994 (546) 464-6464', 0),
(6, 2, 'AZ', 'baku', 'dss dasd asdasda ', 'Ehmed', 'Mustafayev', '+994 (324) 234-2342', 0),
(9, 5, 'AZ', 'Sumqayit', 'Yasamal r., H. Zərdabi küç. 92a', 'Mammad', 'Gurbanov', '+994 (546) 464-6464', 0),
(10, 7, 'AZ', 'Sumqayit', 'Yasamal r., H. Zərdabi küç. 92a', 'Mammad', 'Gurbanov', '+994 (546) 464-6464', 0),
(11, 8, 'AZ', 'Baku', 'Bakı şəhəri, Yasamal r., H. Zərdabi küç. 92a', 'Mammad', 'Qurbanov', '+994 (545) 454-5454', 0),
(12, 9, 'AZ', 'Baku', 'Bakı şəhəri, Yasamal r., H. Zərdabi küç. 92a', 'Mammad', 'Qurbanov', '+994 (545) 454-5454', 0),
(13, 10, 'AZ', 'Baku', 'Bakı şəhəri, Yasamal r., H. Zərdabi küç. 92a', 'Mammad', 'Qurbanov', '+994 (545) 454-5454', 0),
(14, 11, 'AZ', 'Baku', 'Bakı şəhəri, Yasamal r., H. Zərdabi küç. 92a', 'Mammad', 'Qurbanov', '+994 (545) 454-5454', 0),
(15, 12, 'AZ', 'Baku', 'Bakı şəhəri, Yasamal r., H. Zərdabi küç. 92a', 'Mammad', 'Qurbanov', '+994 (545) 454-5454', 0),
(16, 13, 'AZ', 'Baku', 'Bakı şəhəri, Yasamal r., H. Zərdabi küç. 92a', 'Mammad', 'Qurbanov', '+994 (545) 454-5454', 0),
(17, 14, 'AZ', 'Baku', 'Bakı şəhəri, Yasamal r., H. Zərdabi küç. 92a', 'Mammad', 'Qurbanov', '+994 (545) 454-5454', 0),
(18, 15, 'AZ', 'Baku', 'Bakı şəhəri, Yasamal r., H. Zərdabi küç. 92a', 'Mammad', 'Qurbanov', '+994 (545) 454-5454', 0),
(19, 16, 'AZ', 'Baku', 'Bakı şəhəri, Yasamal r., H. Zərdabi küç. 92a', 'Mammad', 'Qurbanov', '+994 (545) 454-5454', 0),
(20, 17, 'AZ', 'Baku', 'Bakı şəhəri, Yasamal r., H. Zərdabi küç. 92a', 'Mammad', 'Qurbanov', '+994 (545) 454-5454', 0),
(21, 18, 'AZ', 'Sumqayit', 'dasd asd as d', 'Mammad', 'Qurbanov', '+994 (070) 599-6188', 0);

-- --------------------------------------------------------

--
-- Table structure for table `slider`
--

CREATE TABLE `slider` (
  `id` int(11) NOT NULL,
  `position` tinyint(250) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `slider`
--

INSERT INTO `slider` (`id`, `position`) VALUES
(1, 0),
(3, 0);

-- --------------------------------------------------------

--
-- Table structure for table `slider_lang`
--

CREATE TABLE `slider_lang` (
  `id` int(11) NOT NULL,
  `rid` int(11) NOT NULL,
  `lang` varchar(10) NOT NULL,
  `photo` varchar(255) NOT NULL,
  `title` varchar(255) NOT NULL,
  `subtitle` varchar(500) DEFAULT NULL,
  `url` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `slider_lang`
--

INSERT INTO `slider_lang` (`id`, `rid`, `lang`, `photo`, `title`, `subtitle`, `url`) VALUES
(1, 1, 'az', 'yKm3kcztX9uQvsMPPY55t.jpg', 'Hayatın güzelliğini keşfedin', 'Sərin Su ailəsinə qoşulun, sifarişlərinizdən xal qazanmağa hazır olun və qazandığınız xallarla həyatınızı gözəlləşdirəcək hədiyyələri yaşayın!', 'about'),
(2, 1, 'en', 'JRY9COSm7L6VMBX-iN6b_.jpg', 'Discover the beauty of life', 'Join the Cool Water family, get ready to earn points on your orders and enjoy life-enhancing gifts with the branches you earn!', '/'),
(3, 1, 'tr', 'Vpqlr4elQKVD17aElbhKd.jpg', 'asdasd', 'Serin su ailesine katılın, siparişlerinizden puan kazanmaya hazır olun ve kazandığınız şubelerle hayatı güzelleştiren hediyelerin tadını çıkarın!', ''),
(4, 1, 'ar', 'txy4JaOt8UdxWZ7jm_QIL.jpg', 'اكتشف جمال الحياة', 'انضم إلى عائلة Cool Water ، واستعد لكسب نقاط من طلباتك واستمتع بالهدايا التي ستجعل حياتك أفضل بالنقاط التي تكسبها!', ''),
(25, 3, 'az', 'RfaUFus8ZtCXzXq-XTqMp.jpg', 'Evinizin və Ofisinizin Qapısına Çatdırılır', 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic, perspiciatis ducimus! Voluptate vero obcaecati asperiores nobis dolorem, ipsam distinctio consectetur reprehenderit pariatur labore quae.', '/'),
(26, 3, 'en', 'PwMAlYfLsNhgPY0BbIPnT.jpg', 'Delivered to your Home and Office Door', '', ''),
(27, 3, 'tr', 'B8Ryn1lj_Oqwy2j5_ORcz.jpg', 'Ev ve Ofis Kapınıza Teslim Edilir', '', ''),
(28, 3, 'ar', '4zPsa80LHplI2GgpW3Nuh.jpg', 'سلمت إلى باب منزلك والمكتب', 'انضم إلى عائلة Cool Water ، واستعد لكسب نقاط من طلباتك واستمتع بالهدايا التي ستجعل حياتك أفضل بالنقاط التي تكسبها!', ''),
(71, 1, 'ru', 'Yifmwasdv0WejN7UueM47.jpg', 'Hayatın güzelliğini keşfedin', 'Sərin Su ailəsinə qoşulun, sifarişlərinizdən xal qazanmağa hazır olun və qazandığınız xallarla həyatınızı gözəlləşdirəcək hədiyyələri yaşayın!', 'about'),
(77, 3, 'ru', 'IjJHrU3LJKXTMXuJNj5y1.jpg', 'Evinizin və Ofisinizin Qapısına Çatdırılır', 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic, perspiciatis ducimus! Voluptate vero obcaecati asperiores nobis dolorem, ipsam distinctio consectetur reprehenderit pariatur labore quae.', '/');

-- --------------------------------------------------------

--
-- Table structure for table `token`
--

CREATE TABLE `token` (
  `id` int(11) NOT NULL,
  `token` varchar(255) NOT NULL,
  `user_id` int(11) NOT NULL,
  `type` tinyint(9) NOT NULL,
  `blacklisted` tinyint(1) NOT NULL DEFAULT 0,
  `expires` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp(),
  `updatedAt` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `first_name` varchar(255) NOT NULL,
  `last_name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `is_admin` tinyint(9) NOT NULL DEFAULT 0,
  `status` tinyint(9) NOT NULL DEFAULT 0,
  `phone` varchar(255) NOT NULL,
  `country` varchar(9) NOT NULL,
  `gender` tinyint(4) NOT NULL DEFAULT 0,
  `dob` datetime DEFAULT NULL,
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp(),
  `updatedAt` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `deletedAt` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `first_name`, `last_name`, `email`, `password`, `is_admin`, `status`, `phone`, `country`, `gender`, `dob`, `createdAt`, `updatedAt`, `deletedAt`) VALUES
(1, 'Mammad', 'Gurbanov', 'mammad.dev2@gmail.com', '$2a$08$zjSOsEDEJrR33WtDqrax.O.EM9kCy2R2wN/LijsDGji5F.mMQ4OsK', 1, 1, '+994 (546) 464-6464', 'AZ', 0, NULL, '2022-09-16 23:52:53', '2022-10-11 16:06:22', NULL),
(5, 'Mammad', 'Gurbanov', 'mammad.dev12@gmail.com', '$2a$08$zjSOsEDEJrR33WtDqrax.O.EM9kCy2R2wN/LijsDGji5F.mMQ4OsK', 0, 0, '+994 (546) 464-6464', 'AZ', 0, NULL, '2022-09-20 22:28:11', '2022-09-22 04:44:16', NULL),
(7, 'Mammad', 'Gurbanov', 'mammad.dev11111@gmail.com', '$2a$08$ypQTO5UF5YYCHXQJNaMNZeqpHcyQ6BOclr8/.iSd0e00LMqWCO5Mi', 1, 1, '+994 (546) 464-6464', 'AZ', 0, NULL, '2022-09-22 04:44:57', '2022-10-17 00:21:20', NULL),
(8, 'Mammad', 'Qurbanov', 'mammad.dev33@gmail.com', '$2a$08$LWlMcObbRN5kii0DkMFqq.UzS3Yr32sP2vn6cYlP4X9ZFjJuAXdEW', 0, 0, '+994 (545) 454-5454', 'AZ', 0, NULL, '2022-10-08 13:02:04', '2022-10-08 13:02:04', NULL),
(9, 'Mammad', 'Qurbanov', 'mammad.dev454@gmail.com', '$2a$08$KLECj1BFNnI0bg6YWMcw2eauwowvL1ykTJloMJ5o6fExhekFmzGYW', 0, 0, '+994 (545) 454-5454', 'AZ', 0, NULL, '2022-10-11 15:40:27', '2022-10-11 15:40:27', NULL),
(10, 'Mammad', 'Qurbanov', 'mammad.dev434@gmail.com', '$2a$08$WXEQNbMXmr6lBoulg0llXebN8YHxOrT2rcxgSmB2AeohMy66T..qi', 0, 0, '+994 (545) 454-5454', 'AZ', 0, NULL, '2022-10-11 15:41:07', '2022-10-11 15:41:07', NULL),
(11, 'Mammad', 'Qurbanov', 'mammad.dev222@gmail.com', '$2a$08$zuK5qsuytYuq0Uwhtn8rN.To61gZMPJfhlL.PDBExC2Fcp7dsGxYq', 0, 0, '+994 (545) 454-5454', 'AZ', 0, NULL, '2022-10-11 15:41:50', '2022-10-11 15:41:50', NULL),
(12, 'Mammad', 'Qurbanov', 'mammad.dev21@gmail.com', '$2a$08$EKDbFMrqeZ6rCYAV5pEF.OM5Vyhpi80Rbi1mA7QvAE/zvCCKiTnxC', 0, 0, '+994 (545) 454-5454', 'AZ', 0, NULL, '2022-10-11 15:42:19', '2022-10-11 15:42:19', NULL),
(13, 'Mammad', 'Qurbanov', 'mammad.dev1111@gmail.com', '$2a$08$lJrzhcbeyA/4s1Q9oy8g7uSNM9x1OsUfNP7kW5rykbAQztUe0oSpa', 0, 0, '+994 (545) 454-5454', 'AZ', 0, NULL, '2022-10-11 15:49:03', '2022-10-11 15:49:03', NULL),
(16, 'Qurban', 'Qurbanov', 'qurbanov717@gmail.com', '$2a$08$hh3aQ6SwalxlkOvyTzLHoe0bR48BwJcIk1XhYp/TGGBvaI.JJ2AjC', 0, 1, '+994 (545) 454-5454', 'AZ', 0, NULL, '2022-10-11 16:17:50', '2022-10-13 14:39:32', NULL),
(17, 'Mammad', 'Qurbanov', 'mammad.dev@gmail.com', '$2a$08$ypQTO5UF5YYCHXQJNaMNZeqpHcyQ6BOclr8/.iSd0e00LMqWCO5Mi', 0, 1, '+994 (545) 454-5454', 'AZ', 0, NULL, '2022-10-17 00:21:22', '2022-10-18 15:21:40', NULL),
(18, 'Mammad', 'Qurbanov', 'mammad.dev.2@gmail.com', '$2a$08$zEn4ldEw.bxeynq4NnO48.8l7/As81rO44X8Ch68erWOZzmwL043a', 1, 1, '+994 (070) 599-6188', 'AZ', 0, NULL, '2022-10-30 06:05:48', '2022-10-30 06:06:05', NULL);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `blog`
--
ALTER TABLE `blog`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `blog_lang`
--
ALTER TABLE `blog_lang`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `uniqridlang` (`rid`,`lang`),
  ADD KEY `rid` (`rid`);

--
-- Indexes for table `category`
--
ALTER TABLE `category`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `category_lang`
--
ALTER TABLE `category_lang`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `unique_rid_lang_category` (`rid`,`lang`);

--
-- Indexes for table `composition`
--
ALTER TABLE `composition`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `composition_lang`
--
ALTER TABLE `composition_lang`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `comp_uniq` (`rid`,`lang`),
  ADD KEY `rid` (`rid`);

--
-- Indexes for table `language`
--
ALTER TABLE `language`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `msg`
--
ALTER TABLE `msg`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `orders`
--
ALTER TABLE `orders`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indexes for table `orders_item`
--
ALTER TABLE `orders_item`
  ADD PRIMARY KEY (`id`),
  ADD KEY `order_id` (`order_id`),
  ADD KEY `product_id` (`product_id`);

--
-- Indexes for table `order_activity`
--
ALTER TABLE `order_activity`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`),
  ADD KEY `order_id` (`order_id`);

--
-- Indexes for table `pages`
--
ALTER TABLE `pages`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `alias` (`alias`);

--
-- Indexes for table `pages_lang`
--
ALTER TABLE `pages_lang`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `uniq_pl` (`rid`,`lang`),
  ADD KEY `rid` (`rid`);

--
-- Indexes for table `products`
--
ALTER TABLE `products`
  ADD PRIMARY KEY (`id`),
  ADD KEY `category_id` (`category_id`);

--
-- Indexes for table `products_lang`
--
ALTER TABLE `products_lang`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `un_rid_lang` (`rid`,`lang`) USING BTREE,
  ADD KEY `rid` (`rid`);

--
-- Indexes for table `shipping_address`
--
ALTER TABLE `shipping_address`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indexes for table `slider`
--
ALTER TABLE `slider`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `slider_lang`
--
ALTER TABLE `slider_lang`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `slider_unique_key_rid_lang` (`rid`,`lang`),
  ADD KEY `rid` (`rid`);

--
-- Indexes for table `token`
--
ALTER TABLE `token`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `blog`
--
ALTER TABLE `blog`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `blog_lang`
--
ALTER TABLE `blog_lang`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=42;

--
-- AUTO_INCREMENT for table `category`
--
ALTER TABLE `category`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `category_lang`
--
ALTER TABLE `category_lang`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=43;

--
-- AUTO_INCREMENT for table `composition`
--
ALTER TABLE `composition`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `composition_lang`
--
ALTER TABLE `composition_lang`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=82;

--
-- AUTO_INCREMENT for table `language`
--
ALTER TABLE `language`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `msg`
--
ALTER TABLE `msg`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=150;

--
-- AUTO_INCREMENT for table `orders`
--
ALTER TABLE `orders`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=37;

--
-- AUTO_INCREMENT for table `orders_item`
--
ALTER TABLE `orders_item`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=75;

--
-- AUTO_INCREMENT for table `order_activity`
--
ALTER TABLE `order_activity`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=31;

--
-- AUTO_INCREMENT for table `pages`
--
ALTER TABLE `pages`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `pages_lang`
--
ALTER TABLE `pages_lang`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=78;

--
-- AUTO_INCREMENT for table `products`
--
ALTER TABLE `products`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT for table `products_lang`
--
ALTER TABLE `products_lang`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=214;

--
-- AUTO_INCREMENT for table `shipping_address`
--
ALTER TABLE `shipping_address`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=22;

--
-- AUTO_INCREMENT for table `slider`
--
ALTER TABLE `slider`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `slider_lang`
--
ALTER TABLE `slider_lang`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=94;

--
-- AUTO_INCREMENT for table `token`
--
ALTER TABLE `token`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `blog_lang`
--
ALTER TABLE `blog_lang`
  ADD CONSTRAINT `blog_lang_ibfk_1` FOREIGN KEY (`rid`) REFERENCES `blog` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `category_lang`
--
ALTER TABLE `category_lang`
  ADD CONSTRAINT `category_lang_ibfk_1` FOREIGN KEY (`rid`) REFERENCES `category` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `composition_lang`
--
ALTER TABLE `composition_lang`
  ADD CONSTRAINT `composition_lang_ibfk_1` FOREIGN KEY (`rid`) REFERENCES `composition` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `orders`
--
ALTER TABLE `orders`
  ADD CONSTRAINT `orders_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON UPDATE CASCADE;

--
-- Constraints for table `orders_item`
--
ALTER TABLE `orders_item`
  ADD CONSTRAINT `orders_item_ibfk_1` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`) ON UPDATE CASCADE,
  ADD CONSTRAINT `orders_item_ibfk_2` FOREIGN KEY (`order_id`) REFERENCES `orders` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `order_activity`
--
ALTER TABLE `order_activity`
  ADD CONSTRAINT `order_activity_ibfk_1` FOREIGN KEY (`order_id`) REFERENCES `orders` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `order_activity_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `pages_lang`
--
ALTER TABLE `pages_lang`
  ADD CONSTRAINT `pages_lang_ibfk_1` FOREIGN KEY (`rid`) REFERENCES `pages` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `products`
--
ALTER TABLE `products`
  ADD CONSTRAINT `products_ibfk_1` FOREIGN KEY (`category_id`) REFERENCES `category` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `products_lang`
--
ALTER TABLE `products_lang`
  ADD CONSTRAINT `products_lang_ibfk_1` FOREIGN KEY (`rid`) REFERENCES `products` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `slider_lang`
--
ALTER TABLE `slider_lang`
  ADD CONSTRAINT `slider_lang_ibfk_1` FOREIGN KEY (`rid`) REFERENCES `slider` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `token`
--
ALTER TABLE `token`
  ADD CONSTRAINT `token_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
