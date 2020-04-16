CREATE TABLE `messages` (
    `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
    `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
    `user_id` varchar(30) NOT NULL DEFAULT '',
    `message` tinytext NOT NULL,
    PRIMARY KEY (`id`),
    KEY `created_at` (`created_at`),
    KEY `user_id` (`user_id`)
    ) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf32;