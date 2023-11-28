package models

type User struct {
	ID       uint   `gorm:"primaryKey" json:"id" sql:"auto_increment"`
	Username string `gorm:"unique" json:"username" validate:"required"`
	Password string `json:"password" validate:"required,min=6"`
	Token    string `json:"token"`
	SectorID *uint  `json:"sectorId" gorm:"index"`
	Sector   Sector `json:"sector"`
}

type Sector struct {
	ID      uint     `json:"id" gorm:"primaryKey"`
	Name    string   `json:"name"`
	Terms   bool     `json:"terms"`
	Options []Option `json:"options" gorm:"many2many:user_options;constraint:OnUpdate:CASCADE,OnDelete:CASCADE;"`
}

type Option struct {
	ID         uint     `json:"id" gorm:"primaryKey"`
	Name       string   `json:"name"`
	ParentID   *uint    `json:"parentId" gorm:"index"`
	SubOptions []Option `json:"subOptions" gorm:"foreignKey:ParentID"`
}
