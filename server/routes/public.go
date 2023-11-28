package routes

import (
	"sectors-sync/controllers"
	"sectors-sync/database"

	"github.com/gin-gonic/gin"
)

func Public(incomingRoute *gin.Engine) {
	h := &controllers.Handler{
		DB: database.DB,
	}

	v1 := incomingRoute.Group("api/v1/")
	{
		v1.POST("/signup", h.Signup())
		v1.POST("/signin", h.Signin())
		v1.GET("/options", h.GetAllOptions())
	}
}
