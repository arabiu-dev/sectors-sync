package database

import (
	"log"
	"os"

	"sectors-sync/models"
	"sectors-sync/seeds"

	"github.com/joho/godotenv"
	"gorm.io/driver/mysql"
	"gorm.io/gorm"
)

func Init() *gorm.DB {
	// Replace 'mysql' with your MySQL driver details
	godotenv.Load(".env")
	db, err := gorm.Open(mysql.Open(os.Getenv("DB_URL")), &gorm.Config{})

	if err != nil {
		log.Fatalln(err)
	}

	db.AutoMigrate(&models.User{}, &models.Option{}, &models.Sector{})

	// Check if options data is already present
	var count int64
	db.Model(&models.Option{}).Count(&count)

	// If no options data is present, seed the database
	if count == 0 {
		seeds.MigrateOptions(db)
	}

	return db
}

var DB *gorm.DB = Init()
