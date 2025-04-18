-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: Mar 07, 2025 at 10:15 PM
-- Server version: 10.11.11-MariaDB-cll-lve
-- PHP Version: 8.3.15

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `eneg1777_ebrutalism`
--

-- --------------------------------------------------------

--
-- Table structure for table `blogs`
--

CREATE TABLE `blogs` (
  `id` int(11) NOT NULL,
  `name` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL,
  `thumbnail` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci DEFAULT NULL,
  `description` text CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci DEFAULT NULL,
  `created_at` timestamp NOT NULL,
  `updated_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00' ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Dumping data for table `blogs`
--

INSERT INTO `blogs` (`id`, `name`, `thumbnail`, `description`, `created_at`, `updated_at`) VALUES
(2, 'Huaweiâ€™s New Laptops May Run Linux, not HarmonyOS Next', '/api/uploadblogs/blog-thumbnail-67cb084d2ef26.webp', '<p><strong>Is Huawei planning to ship Linux on its upcoming MateBook laptops instead of HarmonyOS NEXT? A fresh leak out of China this week suggests so.</strong></p><p><br></p><p>Huawei is no stranger to selling laptops with Linux. Various models in its MateBook 13, 14, 15, and MateBook X Pro lines have been sold in both Windows and Linux configurations, with the latter typically exclusive to China and reloaded with Debian-based&nbsp;<em>Deepin</em>.</p><p><br></p><p>Theâ€”<a href=\"https://en.wikipedia.org/wiki/Criticism_of_Huawei\" rel=\"noopener noreferrer\" target=\"_blank\" style=\"color: var(--color-blue-05);\">somewhat contentious</a>â€”company has&nbsp;<a href=\"https://www.heise.de/en/news/Huawei-s-HarmonyOS-Next-to-defy-Windows-and-Linux-9945284.html\" rel=\"noopener noreferrer\" target=\"_blank\" style=\"color: var(--color-blue-05);\">previously said</a>&nbsp;all PCs released in 2025 would run the newer home-grown, closed-source&nbsp;<em>HarmonyOS NEXT</em>&nbsp;(viewed as an effort to wean reliance off of western-led tech companies, solidify control, and bring down costs).</p><p><br></p><p><em>HarmonyOS Next</em>&nbsp;is interesting as it drops all Android components and runs its own custom micro-kernel that Huawei claims is 3x more efficient than Linux.</p><p><br></p><p>Yet a new leak from Weibo user&nbsp;<em>UncleKanshan</em>â€”a seemingly credible source on Huawei plansâ€”says 5 updated laptops are in the offing<em>&nbsp;running Linux</em>&nbsp;instead:</p>', '2025-03-07 03:39:13', '2025-03-07 14:53:01'),
(3, 'Linux App Release Roundup (Feb 2025)', '/api/uploadblogs/blog-thumbnail-6235.webp', '<p><strong>February proved a bumper month for Linux software updates, seeing big release of productivity suites LibreOffice and ONLYOFFICE and, plus a crop of smaller app updates which didnâ€™t merit a full-length article on this blog.</strong></p><p><br></p><p>Rather than skip over those updates entirely, I thought Iâ€™d resurrect my&nbsp;<em>Linux Release Roundup</em>&nbsp;thread<a href=\"https://www.omgubuntu.co.uk/2025/02/linux-app-release-roundup-feb-2025#3652add0-90f9-4d8b-a7c1-bf58ab0ca0cb\" rel=\"noopener noreferrer\" target=\"_blank\" style=\"color: var(--color-blue-05);\">1</a>&nbsp;to curate a monthly (perhaps twice-monthly, if thereâ€™s a lot) run-through of smaller software updates I think would still be of most interest to regular readers.</p><p><br></p><p>For those of us on fixed-release Linux distribution like Ubuntu, such updates may fix a finicky flaw, improve integration, or add a niche but coveted feature that is worth upgrading over.</p><p><br></p><p>Like before, the aim of these recaps is simply to group together recent software (and occasional distro) updates that I wouldnâ€™t typically dedicate a full blog post to.</p><p><br></p><p>But why&nbsp;<em>donâ€™t</em>&nbsp;I cover them individually?</p><p><br></p><p>Well, search engines donâ€™t take kindly to blogs that put out a lot of short, to-the-point posts (unless theyâ€™re a partner publisher in&nbsp;<em>Google News</em>), so I canâ€™t fire out regular &lt;200 words posts without hurting my rankings (which Iâ€™d love to not care about but real world, innit).</p><p><br></p><p>Equally, I donâ€™t want to waste your time. Making you read a 750 word blog post padded to the hilt with filler text and a hooky headline to disguise the fact that the â€œmeatâ€ of the </p><p><br></p>', '2025-03-07 03:25:20', '0000-00-00 00:00:00'),
(4, 'Pinta 3.0 Beta Released with New GTK4/Libadwaita UI', '/api/uploadblogs/blog-thumbnail-9133.webp', '<p><strong>A new beta release of open source graphics editing app&nbsp;<em>Pinta</em>&nbsp;is available for testing.</strong></p><p><br></p><p>Pinta 3.0 (beta) gives fans of this cross-platform raster image editor, which is directly inspired by the iconic&nbsp;<em>Paint.NET</em>&nbsp;Windows app, an early opportunity to try out the changes it brings â€” and thereâ€™s a fair few!</p><p>The most impactful change in Pinta 3.0 is the most obvious one: itâ€™s revamped UI.</p><p><br></p><p>Newly ported to GTK4 and libadwaita, Pinta 3.0 swaps a traditional window frame and text-based menu bar for a button-based header bar.</p><p><br></p><p>Long-time users may might themselves taking a bit of time to adjust to the new layout, but itâ€™s logically ordered and, from a poke around, doesnâ€™t appear to have lost any options in the switch â€“ though some new ones have been added (more in a moâ€™).</p><p><br></p><p>The GTK4 port does change how the&nbsp;<em>File &gt; New Screenshot</em>&nbsp;option works. On Linux, it uses the XDG screenshot portal (which in Ubuntu is the GNOME Shell screenshot overlay), while macOS users see the native screenshot overlay.</p>', '2025-03-07 03:39:59', '2025-03-07 03:39:59'),
(5, 'Linux Mastodon App Tuba Adds Post Scheduling, Drafts + More', '/api/uploadblogs/blog-thumbnail-8474.webp', '<p><strong>A new version of&nbsp;<em>Tuba</em>, the open-source Mastodon</strong><a href=\"https://www.omgubuntu.co.uk/2024/12/linux-mastodon-client-tuba-update-drafts#f604dac3-0a7f-4377-a2d8-3b3364892d12\" rel=\"noopener noreferrer\" target=\"_blank\" style=\"color: var(--color-blue-05);\">1</a><strong>&nbsp;client for Linux desktops, is out â€“ and itâ€™s a whopper!</strong></p><p><br></p><p><em>Tuba</em>&nbsp;0.9.0 delivers a wide array of new features, enhancements, and general finesse touching nearly every aspect of the clientâ€™s top-tier Fediverse experience.</p><p><br></p><p>Chief among the highlights for is the addition of&nbsp;<strong>support for scheduled and draft posts</strong>.</p><p><br></p><p><a href=\"https://149366088.v2.pressablecdn.com/wp-content/uploads/2024/12/tuba-schedule-drafts.jpg\" rel=\"noopener noreferrer\" target=\"_blank\" style=\"color: var(--color-blue-05);\"><img src=\"https://149366088.v2.pressablecdn.com/wp-content/uploads/2024/12/tuba-schedule-drafts-840x441.jpg\" alt=\"Tuba mastodon client for Linux showing draft post and schedule post options\" height=\"441\" width=\"840\"></a></p><p><br></p><p>Drafts and post scheduling available in&nbsp;<em>Tuba</em>&nbsp;0.9.0</p><p>Posts can be scheduled from the composer, and a list of scheduled (not yet shared) posts can be accessed from a new sidebar entry, where scheduled posts and be edited/amended.</p><p><br></p><p>With no official draft posts API to use,&nbsp;<em>Tuba</em>&nbsp;instead uses scheduled posts for drafts, set far into the future (a workaround used by the official Mastodon Android app). The upside to this: â€œdraftsâ€ are stored on your Mastodon server so accessible </p><p>from web/other Mastodon apps.</p><p><br></p><p><a href=\"https://149366088.v2.pressablecdn.com/wp-content/uploads/2024/12/tuba-focal-point.jpg\" rel=\"noopener noreferrer\" target=\"_blank\" style=\"color: var(--color-blue-05);\"><img src=\"https://149366088.v2.pressablecdn.com/wp-content/uploads/2024/12/tuba-focal-point-840x441.jpg\" alt=\"Tuba fediverse client setting focal point for image attachment \" height=\"441\" width=\"840\"></a></p><p><br></p><p>Set image focal point (so if a preview crops it, that stays central)</p><p><br></p><p>Mastodon lets users<strong>&nbsp;set a focus point for image attachments</strong>, so&nbsp;<em>Tuba</em>&nbsp;0.9 updates its media picker preview box to support it. Click the icon in the top-right of the preview to open the focal point picker, then drop the dot on the desired area.</p>', '2025-03-07 04:23:21', '0000-00-00 00:00:00');

-- --------------------------------------------------------

--
-- Table structure for table `projects`
--

CREATE TABLE `projects` (
  `id` int(11) NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `thumbnail` varchar(255) DEFAULT NULL,
  `description` text DEFAULT NULL,
  `year` varchar(10) DEFAULT NULL,
  `client` varchar(255) DEFAULT NULL,
  `screenshots` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_general_ci;

--
-- Dumping data for table `projects`
--

INSERT INTO `projects` (`id`, `name`, `thumbnail`, `description`, `year`, `client`, `screenshots`) VALUES
(50, 'KSI SSO', '/api/uploads/project-67c92c6120bda.webp', '<p><strong>KSI â€“ SSO (Single Sign-On)</strong> adalah fitur autentikasi yang dirancang untuk meningkatkan kenyamanan dan efisiensi pengguna dalam mengakses berbagai aplikasi dalam satu ekosistem. Dengan teknologi ini, pengguna hanya perlu melakukan login satu kali menggunakan layanan Google, tanpa perlu mengulang proses login setiap kali berpindah aplikasi dalam sistem yang terintegrasi.</p><p><br></p><p>Fitur ini dikembangkan untuk mengatasi tantangan autentikasi yang sering dihadapi oleh pengguna, seperti keharusan mengingat banyak kredensial atau mengulang login di setiap aplikasi yang digunakan. Dengan implementasi SSO, akses ke berbagai layanan menjadi lebih cepat, aman, dan seamless, memberikan pengalaman pengguna yang lebih baik.</p><p><br></p><p>Selain meningkatkan kemudahan akses, KSI â€“ SSO juga memperkuat keamanan sistem dengan mengandalkan autentikasi berbasis OAuth 2.0 dan standar keamanan yang ketat dari Google. Proses ini memastikan bahwa hanya pengguna yang memiliki kredensial valid yang dapat mengakses ekosistem aplikasi terkait, sehingga mengurangi risiko pencurian akun atau kebocoran data.</p><p><br></p><p>Secara teknis, KSI â€“ SSO mengintegrasikan mekanisme autentikasi Google dengan sistem manajemen sesi yang memungkinkan pengguna tetap masuk tanpa harus memasukkan ulang kredensial mereka. Hal ini tidak hanya menghemat waktu, tetapi juga meningkatkan produktivitas, terutama dalam lingkungan kerja yang mengandalkan banyak aplikasi berbasis web.</p><p><br></p><p>Dengan adanya KSI â€“ SSO, pengguna mendapatkan pengalaman login yang lebih mulus, sementara pengembang dan administrator sistem dapat mengelola akses pengguna dengan lebih efisien dan terpusat. Solusi ini cocok untuk diterapkan pada berbagai jenis organisasi, mulai dari perusahaan, institusi pendidikan, hingga platform digital yang memiliki ekosistem aplikasi yang luas.</p><p><br></p><ul><li>mantap</li><li>sehat</li><li>sedap</li></ul>', '2025', 'PT Krakatau Steel (Persero)', '[\"uploads/screenshot-67c92c617322e.webp\",\"uploads/screenshot-67c92c61733ce.webp\"]'),
(51, 'PKC - CCE', '/api/uploads/project-67c92d05d35f7.webp', '<p><strong style=\"color: rgb(104, 104, 118);\">PKC â€“ CCE&nbsp;</strong><span style=\"color: rgb(104, 104, 118);\">merupakan aplikasi berbasis web yang digunakan oleh PT Pupuk Kujang Cikampek untuk sarana peningkatan kepuasan pelanggan dalam pelayanan pemuatan produk non subsidi secara digital</span></p>', '2022', 'PT Pupuk Kujang Cikampek', '[\"uploads/screenshot-67c92d0748325.webp\",\"uploads/screenshot-67c92d0748453.webp\",\"uploads/screenshot-67c92d0748520.webp\"]'),
(52, '__dadss__', '/api/uploads/project-67cb080441ef4.webp', '<p>___adad___</p>', '2025', '___asdasd___', '[\"uploads/screenshot-67caa09d9148a.webp\",\"uploads/screenshot-67caa09d915d4.webp\"]');

-- --------------------------------------------------------

--
-- Table structure for table `teams`
--

CREATE TABLE `teams` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `photo` varchar(255) DEFAULT NULL,
  `role` varchar(255) DEFAULT NULL,
  `email` varchar(250) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_general_ci;

--
-- Dumping data for table `teams`
--

INSERT INTO `teams` (`id`, `name`, `photo`, `role`, `email`) VALUES
(15, 'Aditya Tanjung', '/api/uploadteams/team-member-7115.webp', 'CEO', 'aditya.tanjung@energeek.co.id'),
(16, 'Zulmi Adi Rizky', '/api/uploadteams/team-member-5233.webp', 'VP Operations', 'zulmi.ar@energeek.co.id'),
(17, 'Rohmat Hanif Basuki', '/api/uploadteams/team-member-4417.webp', 'Assistant VP Mobile App Development', 'hanif@energeek.co.id'),
(18, 'Joko Susilo', '/api/uploadteams/team-member-8174.webp', 'Assistant VP Web Development', 'joko.susilo@energeek.co.id'),
(19, 'Nurul Aida Fitriani', '/api/uploadteams/team-member-67c9406a54033.webp', 'Staff Finance & Administration', 'accounting@energeek.co.id');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `username` varchar(50) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password_hash` varchar(255) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `role` enum('superadmin','admin') DEFAULT 'admin'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `username`, `email`, `password_hash`, `created_at`, `updated_at`, `role`) VALUES
(6, 'admin', 'adad@adada.com', '$2y$10$YgHSxaNdfm7Q4s/WKacby.PErLMrrc7CZptoyiWazae2d7suUUAka', '2025-03-04 13:48:41', '2025-03-04 13:48:41', 'admin'),
(7, 'una', 'una', '$2y$10$Ce8vrs0Y5yPjT0hY1woAueh74VTT7kmDxM3TNmmcReaf9m0xboGfS', '2025-03-05 15:06:20', '2025-03-05 15:06:20', 'admin');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `blogs`
--
ALTER TABLE `blogs`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `projects`
--
ALTER TABLE `projects`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `teams`
--
ALTER TABLE `teams`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `blogs`
--
ALTER TABLE `blogs`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `projects`
--
ALTER TABLE `projects`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=53;

--
-- AUTO_INCREMENT for table `teams`
--
ALTER TABLE `teams`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=20;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
