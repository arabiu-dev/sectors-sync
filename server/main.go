package main

import (
	"os"

	"sectors-sync/middleware"
	"sectors-sync/routes"

	"github.com/gin-gonic/gin"
	"github.com/joho/godotenv"
)

func main() {
	gin.SetMode(gin.ReleaseMode)
	godotenv.Load(".env")

	router := gin.Default()
	router.Use(gin.Logger())
	router.Use(middleware.Cors())

	routes.Public(router)
	routes.Auth(router)

	router.GET("/", func(c *gin.Context) {
		c.JSON(200, gin.H{"message": "Welcome to the frenzy api documentation"})
	})

	router.Run(":" + os.Getenv("PORT"))
}
