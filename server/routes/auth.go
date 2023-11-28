package routes

import (
	"sectors-sync/controllers"
	"sectors-sync/database"
	"sectors-sync/middleware"

	"github.com/gin-gonic/gin"
)

func Auth(incomingRoute *gin.Engine) {
	h := &controllers.Handler{
		DB: database.DB,
	}

	v1 := incomingRoute.Group("api/v1/auth/")
	{
		v1.Use(middleware.Authenticate())
		v1.POST("/add_sector", h.UpdateUserSector())
		v1.GET("/sector", h.GetUserSector())
	}
}
