package controller

import (
	"fmt"
	"net/http"
	"strconv"

	"github.com/ecommerce/ecommerce-backend/entity"
	"github.com/ecommerce/ecommerce-backend/repository"
	"github.com/gin-gonic/gin"
)

const resultConstant string = "result"

// Register - save user to database
func Register(c *gin.Context) {
	var user entity.User

	c.BindJSON(&user)
	fmt.Println(user)
	message := repository.UserRegister(user)
	c.String(http.StatusOK, message)
}

// Login - login user
func Login(c *gin.Context) {

	var user entity.User

	c.BindJSON(&user)
	fmt.Println(user)
	username := user.UserName
	password := user.Password

	message, user := repository.Login(username, password)

	c.JSON(http.StatusOK, gin.H{
		resultConstant: user,
		"message":      message,
	})
}

// UpdateUser - user update
func UpdateUser(c *gin.Context) {
	var user entity.User

	id := c.Param("id")
	ID, err := strconv.Atoi(id)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"err": err,
		})
	}

	c.BindJSON(&user)
	message := repository.UserUpdate(ID, user)
	c.String(http.StatusOK, message)
}

// DeleteUser - user delete
func DeleteUser(c *gin.Context) {
	id := c.Param("id")
	ID, err := strconv.Atoi(id)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"err": err,
		})
	}

	message := repository.UserDelete(ID)
	c.String(http.StatusOK, message)
}

// GetAllUser - get all user
func GetAllUser(c *gin.Context) {

	users, err := repository.UserGetAll()

	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"err": err,
		})
	}

	c.JSON(http.StatusOK, gin.H{
		resultConstant: users,
		"count":        len(users),
	})

}

// GetOneUser - get one user
func GetOneUser(c *gin.Context) {

	id := c.Param("id")

	ID, err := strconv.Atoi(id)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"err": err,
		})
	}

	user, err := repository.UserGetOne(ID)

	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"err": err,
		})
	}

	c.JSON(http.StatusOK, gin.H{
		resultConstant: user,
	})
}

// CreateUser - create user
func CreateUser(c *gin.Context) {
	var user entity.User

	c.BindJSON(&user)
	repository.UserSave(user)
}
