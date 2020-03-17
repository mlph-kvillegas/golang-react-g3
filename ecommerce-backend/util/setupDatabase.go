package util

import "database/sql"

// SetupDatabase - create schema and tables
func SetupDatabase() {

	name := "ecommerce"

	// check connection
	db, err := sql.Open("mysql", "root:root@tcp(127.0.0.1:3308)/")
	if err != nil {
		panic(err)
	}
	defer db.Close()

	// create database if it does not exists
	_, err = db.Exec("CREATE DATABASE IF NOT EXISTS " + name)
	if err != nil {
		panic(err)
	}
	db.Close()

	// use the created database
	db, err = sql.Open("mysql", "root:root@tcp(127.0.0.1:3308)/"+name)
	if err != nil {
		panic(err)
	}

	_, err = db.Exec(`
		CREATE TABLE IF NOT EXISTS USER (
			id int NOT NULL AUTO_INCREMENT,
			first_name VARCHAR(255),
			last_name VARCHAR(255),
			email VARCHAR(255) UNIQUE,
			username VARCHAR(255),
			password VARCHAR(255),
			address VARCHAR(255),
			contact_number VARCHAR(255),
			bio VARCHAR(255),
			is_archived TINYINT(1),
			type VARCHAR(255),
			PRIMARY KEY (id)
		)
	`)
	if err != nil {
		panic(err)
	}

	_, err = db.Exec(`
		CREATE TABLE IF NOT EXISTS SERVICE_TYPE (
			id int NOT NULL AUTO_INCREMENT,
			service_name VARCHAR(255),
			service_key VARCHAR(255) UNIQUE,
			is_archived TINYINT(1),
			PRIMARY KEY (id)
		)
	`)
	if err != nil {
		panic(err)
	}

	_, err = db.Exec(`
		CREATE TABLE IF NOT EXISTS SERVICE (
			id int NOT NULL AUTO_INCREMENT,
			user_id int,
			service_type_id int,
			is_archived TINYINT(1),
			contact_number VARCHAR(255),
			price VARCHAR(255),
			description VARCHAR(255),
			CONSTRAINT fk_user
			FOREIGN KEY (user_id)
				REFERENCES user(id),
			CONSTRAINT fk_service_type
			FOREIGN KEY (service_type_id)
				REFERENCES service_type(id),
			PRIMARY KEY (id)
		)
	`)

	if err != nil {
		panic(err)
	}

	_, err = db.Exec(`
		INSERT IGNORE INTO USER(first_name, last_name, email, username, password, address, is_archived, contact_number, bio, type)
		VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`, "Mang Jose", "Administrator", "mang@jose.com", "mangjose", "password123",
		"Rooftop", 0, "", "", "ADMIN")

	if err != nil {
		panic(err)
	}

	defer db.Close()
}
