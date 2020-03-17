package controller

import (
	"net/http"
	"strconv"

	"github.com/ecommerce/ecommerce-backend/entity"
	"github.com/ecommerce/ecommerce-backend/repository"
	"github.com/gin-gonic/gin"
)

// CreateServiceType - create service type
func CreateServiceType(c *gin.Context) {
	var serviceType entity.ServiceType

	c.BindJSON(&serviceType)
	repository.ServiceTypeSave(serviceType)
}

// GetAllServiceType - get all service type
func GetAllServiceType(c *gin.Context) {

	serviceTypes, err := repository.ServiceTypeGetAll()

	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"err": err,
		})
	}

	c.JSON(http.StatusOK, gin.H{
		"result": serviceTypes,
		"count":  len(serviceTypes),
	})

}

// GetOneServiceType - get one service type
func GetOneServiceType(c *gin.Context) {

	id := c.Param("id")

	ID, err := strconv.Atoi(id)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"err": err,
		})
	}

	serviceType, err := repository.ServiceTypeGetOne(ID)

	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"err": err,
		})
	}

	c.JSON(http.StatusOK, gin.H{
		"result": serviceType,
	})

}

// UpdateServiceType - update service type
func UpdateServiceType(c *gin.Context) {
	var serviceType entity.ServiceType

	id := c.Param("id")
	ID, err := strconv.Atoi(id)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"err": err,
		})
	}

	c.BindJSON(&serviceType)
	repository.ServiceTypeUpdate(ID, serviceType)
}

// DeleteServiceType - delete service type
func DeleteServiceType(c *gin.Context) {

	id := c.Param("id")
	ID, err := strconv.Atoi(id)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"err": err,
		})
	}

	repository.ServiceTypeDelete(ID)
}
