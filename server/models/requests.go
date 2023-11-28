package models

type UserRequestBody struct {
	Username string `gorm:"unique" json:"username" validate:"required"`
	Password string `json:"password" validate:"required,min=6"`
}

type SectorRequestBody struct {
	Name    string `json:"name" binding:"required"`
	Terms   bool   `json:"terms" binding:"required"`
	Options []uint `json:"options"`
}
