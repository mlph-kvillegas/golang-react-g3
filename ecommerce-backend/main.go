package main

import (
	"github.com/ecommerce/ecommerce-backend/controller"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
	_ "github.com/go-sql-driver/mysql"

	"github.com/ecommerce/ecommerce-backend/util"
)

func main() {

	util.SetupDatabase()

	const getAllActiveUrl string = "/getAllActive"
	const getOneUrl string = "/getOne/:id"
	const deleteOneUrl string = "/deleteOne/:id"
	const updateOneUrl string = "/updateOne/:id"

	router := gin.Default()
	router.Use(cors.New(cors.Config{
		AllowOrigins: []string{"*"},
		AllowMethods: []string{"GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"},
		AllowHeaders: []string{"Authorization", "Content-Type", "Content-Range", "Content-Disposition", "Content-Description", "Origin", "X-Requested-With"},
	}))

	api := router.Group("/")
	{
		api.POST("/register", controller.Register)
		api.POST("/login", controller.Login)
	}

	userAPI := router.Group("/user")
	{
		userAPI.GET(getAllActiveUrl, controller.GetAllUser)
		userAPI.GET(getOneUrl, controller.GetOneUser)
		userAPI.DELETE(deleteOneUrl, controller.DeleteUser)
		userAPI.PUT(updateOneUrl, controller.UpdateUser)
		userAPI.POST("/createUser", controller.CreateUser)
	}

	serviceTypeAPI := router.Group("/service_type")
	{
		serviceTypeAPI.POST("/createServiceType", controller.CreateServiceType)
		serviceTypeAPI.GET(getAllActiveUrl, controller.GetAllServiceType)
		serviceTypeAPI.GET(getOneUrl, controller.GetOneServiceType)
		serviceTypeAPI.PUT(updateOneUrl, controller.UpdateServiceType)
		serviceTypeAPI.DELETE(deleteOneUrl, controller.DeleteServiceType)
	}

	serviceAPI := router.Group("/service")
	{
		serviceAPI.POST("/createService", controller.CreateService)
		serviceAPI.GET(getAllActiveUrl, controller.GetAllService)
		serviceAPI.GET(getOneUrl, controller.GetOneService)
		serviceAPI.PUT(updateOneUrl, controller.UpdateService)
		serviceAPI.DELETE(deleteOneUrl, controller.DeleteService)
	}

	router.Run(":9000")

}
