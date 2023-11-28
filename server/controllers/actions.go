package controllers

import (
	"fmt"
	"net/http"

	"sectors-sync/helpers"
	"sectors-sync/models"

	"github.com/gin-gonic/gin"
	"github.com/go-playground/validator/v10"
	"gorm.io/gorm"
)

var validate = validator.New()

type Handler struct {
	DB *gorm.DB
}

func (h Handler) Signup() gin.HandlerFunc {
	return func(ctx *gin.Context) {
		body := models.UserRequestBody{}

		if err := ctx.BindJSON(&body); err != nil {
			ctx.AbortWithError(http.StatusBadRequest, err)
			return
		}

		validationErr := validate.Struct((body))
		if validationErr != nil {
			ctx.JSON(http.StatusBadRequest, gin.H{"error": validationErr.Error()})
			return
		}

		var user models.User
		var count int64
		if h.DB.Model(&user).Where("username = ?", body.Username).
			Count(&count); count > 0 {
			ctx.JSON(409, gin.H{"error": "Username already exists"})
			return
		}

		user.Username = body.Username
		user.Password = helpers.HashPassword(body.Password)
		if result := h.DB.Create(&user); result.Error != nil {
			ctx.JSON(http.StatusConflict,
				gin.H{"error": "User creation was not successfull"})
			return
		}

		token, _ := helpers.GenerateToken(user.Username, fmt.Sprintf("%v", user.ID))
		helpers.UpdateAllTokens(token, user.ID)

		ctx.Header("token", token)
		ctx.JSON(http.StatusCreated, &user)
	}
}

func (h Handler) Signin() gin.HandlerFunc {
	return func(ctx *gin.Context) {
		body := models.UserRequestBody{}

		if err := ctx.BindJSON(&body); err != nil {
			ctx.AbortWithError(http.StatusBadRequest, err)
			return
		}

		var user models.User
		if result := h.DB.
			Where("username = ?", body.Username).
			First(&user); result.Error != nil {
			ctx.JSON(http.StatusNotFound, gin.H{"error": "Username or password is incorrect"})
			return
		}

		passwordIsValid, msg := helpers.VerifyPassword(body.Password, user.Password)
		if !passwordIsValid {
			ctx.JSON(http.StatusInternalServerError, gin.H{"error": msg})
			return
		}

		token, _ := helpers.GenerateToken(user.Username, fmt.Sprintf("%v", user.ID))
		helpers.UpdateAllTokens(token, user.ID)

		if result := h.DB.
			Where("username = ?", body.Username).First(&user); result.Error != nil {
			ctx.AbortWithError(http.StatusInternalServerError, result.Error)
			return
		}

		ctx.Header("token", token)
		ctx.JSON(http.StatusOK, &user)
	}
}

func (h Handler) GetAllOptions() gin.HandlerFunc {
	return func(ctx *gin.Context) {
		var options []models.Option

		// Assuming a simple query to get all options
		if result := h.DB.Find(&options); result.Error != nil {
			ctx.AbortWithError(http.StatusNotFound, result.Error)
			return
		}

		ctx.JSON(http.StatusOK, options)
	}
}

func (h Handler) UpdateUserSector() gin.HandlerFunc {
	return func(ctx *gin.Context) {
		var sectorRequest models.SectorRequestBody

		if err := ctx.BindJSON(&sectorRequest); err != nil {
			ctx.AbortWithError(http.StatusBadRequest, err)
			return
		}

		// Assuming you have a username in the context, you can retrieve the user
		var user models.User
		if result := h.DB.Preload("Sector.Options"). // Adjust based on your model structure
								Where("username = ?", ctx.GetString("username")).
								First(&user); result.Error != nil {
			ctx.JSON(http.StatusInternalServerError, gin.H{"error": "Something went wrong"})
			return
		}

		// Create a new Sector based on the request
		sector := models.Sector{
			Name:    sectorRequest.Name,
			Terms:   sectorRequest.Terms,
			Options: []models.Option{}, // Initialize with an empty slice
		}

		// Attach existing options to the sector based on the request
		for _, optionID := range sectorRequest.Options {
			var existingOption models.Option
			if result := h.DB.First(&existingOption, optionID); result.Error != nil {
				ctx.JSON(http.StatusBadRequest, gin.H{"error": "Invalid option ID"})
				return
			}
			sector.Options = append(sector.Options, existingOption)
		}

		// Assign the new sector to the user
		user.Sector = sector

		// Save the changes
		if err := h.DB.Save(&user).Error; err != nil {
			ctx.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to save sector"})
			return
		}

		ctx.Status(http.StatusCreated)
	}
}

func (h Handler) GetUserSector() gin.HandlerFunc {
	return func(ctx *gin.Context) {
		var user models.User
		username := ctx.GetString("username")

		if err := h.DB.Preload("Sector.Options"). // Adjust based on your model structure
								Where("username = ?", username).
								First(&user).Error; err != nil {
			ctx.JSON(http.StatusInternalServerError, gin.H{"error": "Something went wrong"})
			return
		}

		ctx.JSON(http.StatusOK, user.Sector)
	}
}
