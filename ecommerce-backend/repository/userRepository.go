package repository

import (
	"fmt"

	"github.com/ecommerce/ecommerce-backend/entity"
	"github.com/ecommerce/ecommerce-backend/util"
)

// UserRegister - register user to db
func UserRegister(user entity.User) string {
	db := util.DbConnect()
	message := ""

	result, err := db.Exec(`INSERT INTO USER(first_name, last_name, email, username, password, address,  contact_number, bio, is_archived, type)
		VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`, user.FirstName, user.LastName, user.Email, user.UserName, user.Password, user.Address, "", "", 0, user.Type)

	if err != nil {
		message = err.Error()
		panic(err)
	} else {
		message = "user create success"
		fmt.Println(result)
	}

	defer db.Close()
	return message
}

// UserUpdate = update existing user
func UserUpdate(id int, user entity.User) string {
	db := util.DbConnect()
	message := ""

	result, err := db.Exec(`UPDATE USER set first_name = ?, last_name = ?, email = ?, 
							username = ?, address = ?, contact_number = ?, bio = ?, type = ? where id = ?`,
		user.FirstName, user.LastName, user.Email, user.UserName,
		user.Address, user.ContactNumber, user.Bio, user.Type, id)

	if err != nil {
		message = err.Error()
		panic(err)
	} else {
		message = "user update success"
		fmt.Println(result)
	}

	defer db.Close()
	return message
}

// UserDelete - delete user
func UserDelete(userID int) string {
	db := util.DbConnect()
	message := ""

	result, err := db.Exec(`DELETE FROM USER where id = ?`, userID)

	if err != nil {
		message = err.Error()
		panic(err)
	} else {
		message = "user delete success"
		fmt.Println(result)
	}

	defer db.Close()
	return message
}

// Login - find user from db
func Login(username, password string) (string, entity.User) {
	db := util.DbConnect()
	message := ""

	var userEntity entity.User
	err := db.QueryRow(`SELECT id, first_name, last_name, username, address, type from USER WHERE username=? AND password=?`,
		username, password).Scan(&userEntity.ID, &userEntity.FirstName, &userEntity.LastName, &userEntity.UserName, &userEntity.Address, &userEntity.Type)

	if err != nil {
		message = err.Error()
	}

	if userEntity != (entity.User{}) {

		message = "success"
		fmt.Print(userEntity)
		// userEntity.ID = user

	} else {
		fmt.Println("Username/password does not exist")
		message = "username/password invalid"
	}

	defer db.Close()
	return message, userEntity
}

// UserSave - saves user to database
func UserSave(user entity.User) {
	db := util.DbConnect()

	result, err := db.Exec(`INSERT INTO USER(first_name, last_name, email, username, password, address, contact_number, bio, is_archived, type)
		VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`, user.FirstName, user.LastName, user.Email, user.UserName, user.Password, user.Address, user.ContactNumber, user.Bio, 0, user.Type)

	if err != nil {
		panic(err)
	} else {
		fmt.Println(result)
	}

	defer db.Close()
}

// UserGetAll - get all service type in database
func UserGetAll() (users []entity.User, err error) {
	db := util.DbConnect()

	result, err := db.Query(`SELECT id, first_name, last_name,
		email, username, address, contact_number, bio, type
		FROM user WHERE NOT is_archived`)

	if err != nil {
		return
	}

	for result.Next() {
		var user entity.User
		result.Scan(&user.ID, &user.FirstName, &user.LastName, &user.Email, &user.UserName, &user.Address, &user.ContactNumber, &user.Bio, &user.Type)
		users = append(users, user)
	}

	defer result.Close()
	defer db.Close()
	return
}

// UserGetOne - get one user
func UserGetOne(id int) (user entity.User, err error) {

	db := util.DbConnect()

	result := db.QueryRow(`SELECT id, first_name, last_name,
	email, username, address, contact_number, bio, type 
	FROM user WHERE NOT is_archived AND id=?`, id)
	err = result.Scan(&user.ID, &user.FirstName, &user.LastName, &user.Email, &user.UserName, &user.Address, &user.ContactNumber, &user.Bio, &user.Type)

	if err != nil {
		return
	}

	defer db.Close()
	return
}

// GetAllServiceProviders - get all users with service provider type
func GetAllServiceProviders() (users []entity.User, err error) {
	db := util.DbConnect()

	result, err := db.Query(`SELECT id, first_name, last_name, email, username, address, contact_number, bio, type
		FROM user WHERE NOT is_archived AND type = 'SERVICE_PROVIDER'`)

	if err != nil {
		return
	}

	for result.Next() {
		var user entity.User
		result.Scan(&user.ID, &user.FirstName, &user.LastName, &user.Email,
			&user.UserName, &user.Address, &user.ContactNumber, &user.Bio, &user.Type)
		users = append(users, user)
	}

	defer result.Close()
	defer db.Close()
	return
}
