package util

import "database/sql"

// DbConnect - connect to database
func DbConnect() (db *sql.DB) {
	db, err := sql.Open("mysql", "root:root@tcp(127.0.0.1:3308)/ecommerce")
	if err != nil {
		panic(err)
	}
	return db
}
