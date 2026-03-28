CREATE TABLE `bankSettings` (
	`id` int AUTO_INCREMENT NOT NULL,
	`bankName` varchar(255) NOT NULL,
	`accountNumber` varchar(64) NOT NULL,
	`accountHolder` varchar(255) NOT NULL,
	`qrCodeUrl` text,
	`isActive` int NOT NULL DEFAULT 1,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `bankSettings_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `orders` (
	`id` int AUTO_INCREMENT NOT NULL,
	`userId` int NOT NULL,
	`productName` text NOT NULL,
	`productDescription` text,
	`quantity` int NOT NULL DEFAULT 1,
	`price` int NOT NULL,
	`totalAmount` int NOT NULL,
	`status` enum('pending','paid','processing','shipped','delivered','cancelled') NOT NULL DEFAULT 'pending',
	`paymentMethod` varchar(64) DEFAULT 'bank_transfer',
	`notes` text,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `orders_id` PRIMARY KEY(`id`)
);
