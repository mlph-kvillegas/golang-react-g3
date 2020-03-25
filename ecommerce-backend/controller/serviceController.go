package controller

import (
	"net/http"
	"strconv"

	"github.com/ecommerce/ecommerce-backend/entity"
	"github.com/ecommerce/ecommerce-backend/repository"
	"github.com/gin-gonic/gin"
)

// CreateService - create service
func CreateService(c *gin.Context) {
	var service entity.Service

	c.BindJSON(&service)

	repository.ServiceSave(service)
}

// UpdateService - update service
func UpdateService(c *gin.Context) {
	var service entity.Service

	id := c.Param("id")
	ID, err := strconv.Atoi(id)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"err": err,
		})
	}

	c.BindJSON(&service)
	repository.ServiceUpdate(ID, service)
}

// GetAllService - get all service
func GetAllService(c *gin.Context) {
	services, err := repository.ServiceGetAll()

	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"err": err,
		})
	}

	c.JSON(http.StatusOK, gin.H{
		"result": services,
		"count":  len(services),
	})
}

// GetOneService - get one service
func GetOneService(c *gin.Context) {
	id := c.Param("id")

	ID, err := strconv.Atoi(id)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"err": err,
		})
	}

	service, err := repository.ServiceGetOne(ID)

	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"err": err,
		})
	}

	c.JSON(http.StatusOK, gin.H{
		"result": service,
	})
}

// DeleteService - delete service
func DeleteService(c *gin.Context) {
	id := c.Param("id")
	ID, err := strconv.Atoi(id)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"err": err,
		})
	}

	repository.ServiceDelete(ID)
}
