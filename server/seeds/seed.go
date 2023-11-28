package seeds

import (
	"sectors-sync/models"

	"gorm.io/gorm"
)

var options = []models.Option{
	{ID: 1, Name: "Manufacturing"},
	{ID: 2, Name: "Construction materials", ParentID: pointer(1)},
	{ID: 3, Name: "Electronics and Optics", ParentID: pointer(1)},
	{ID: 4, Name: "Food and Beverage", ParentID: pointer(1)},
	{ID: 5, Name: "Bakery & confectionery products", ParentID: pointer(4)},
	{ID: 6, Name: "Beverages", ParentID: pointer(4)},
	{ID: 7, Name: "Fish & fish products", ParentID: pointer(4)},
	{ID: 8, Name: "Meat & meat products", ParentID: pointer(4)},
	{ID: 9, Name: "Milk & dairy products", ParentID: pointer(4)},
	{ID: 10, Name: "Other", ParentID: pointer(4)},
	{ID: 11, Name: "Sweets & snack food", ParentID: pointer(4)},
	{ID: 12, Name: "Furniture", ParentID: pointer(1)},
	{ID: 13, Name: "Bathroom/sauna", ParentID: pointer(12)},
	{ID: 14, Name: "Bedroom", ParentID: pointer(12)},
	{ID: 15, Name: "Children’s room", ParentID: pointer(12)},
	{ID: 16, Name: "Kitchen", ParentID: pointer(12)},
	{ID: 17, Name: "Living room", ParentID: pointer(12)},
	{ID: 18, Name: "Office", ParentID: pointer(12)},
	{ID: 19, Name: "Other (Furniture)", ParentID: pointer(12)},
	{ID: 20, Name: "Outdoor", ParentID: pointer(12)},
	{ID: 21, Name: "Project furniture", ParentID: pointer(12)},
	{ID: 22, Name: "Machinery", ParentID: pointer(1)},
	{ID: 23, Name: "Machinery components", ParentID: pointer(22)},
	{ID: 24, Name: "Machinery equipment/tools", ParentID: pointer(22)},
	{ID: 25, Name: "Manufacture of machinery", ParentID: pointer(22)},
	{ID: 26, Name: "Maritime", ParentID: pointer(22)},
	{ID: 27, Name: "Aluminium and steel workboats", ParentID: pointer(26)},
	{ID: 28, Name: "Boat/Yacht building", ParentID: pointer(26)},
	{ID: 29, Name: "Ship repair and conversion", ParentID: pointer(26)},
	{ID: 30, Name: "Metal structures", ParentID: pointer(22)},
	{ID: 31, Name: "Other", ParentID: pointer(22)},
	{ID: 32, Name: "Repair and maintenance service", ParentID: pointer(22)},
	{ID: 33, Name: "Metalworking", ParentID: pointer(1)},
	{ID: 34, Name: "Construction of metal structures", ParentID: pointer(33)},
	{ID: 35, Name: "Houses and buildings", ParentID: pointer(33)},
	{ID: 36, Name: "Metal products", ParentID: pointer(33)},
	{ID: 37, Name: "Metal works", ParentID: pointer(33)},
	{ID: 38, Name: "CNC-machining", ParentID: pointer(37)},
	{ID: 39, Name: "Forgings, Fasteners", ParentID: pointer(37)},
	{ID: 40, Name: "Gas, Plasma, Laser cutting", ParentID: pointer(37)},
	{ID: 41, Name: "MIG, TIG, Aluminum welding", ParentID: pointer(37)},
	{ID: 42, Name: "Plastic and Rubber", ParentID: pointer(1)},
	{ID: 43, Name: "Packaging", ParentID: pointer(42)},
	{ID: 44, Name: "Plastic goods", ParentID: pointer(42)},
	{ID: 45, Name: "Plastic processing technology", ParentID: pointer(42)},
	{ID: 46, Name: "Blowing", ParentID: pointer(45)},
	{ID: 47, Name: "Moulding", ParentID: pointer(45)},
	{ID: 48, Name: "Plastics welding and processing", ParentID: pointer(45)},
	{ID: 49, Name: "Plastic profiles", ParentID: pointer(42)},
	{ID: 50, Name: "Printing", ParentID: pointer(1)},
	{ID: 51, Name: "Advertising", ParentID: pointer(50)},
	{ID: 52, Name: "Book/Periodicals printing", ParentID: pointer(50)},
	{ID: 53, Name: "Labelling and packaging printing", ParentID: pointer(50)},
	{ID: 54, Name: "Textile and Clothing", ParentID: pointer(1)},
	{ID: 55, Name: "Clothing", ParentID: pointer(54)},
	{ID: 56, Name: "Textile", ParentID: pointer(54)},
	{ID: 57, Name: "Wood", ParentID: pointer(1)},
	{ID: 58, Name: "Other (Wood)", ParentID: pointer(57)},
	{ID: 59, Name: "Wooden building materials", ParentID: pointer(57)},
	{ID: 60, Name: "Wooden houses", ParentID: pointer(57)},
	{ID: 61, Name: "Other"},
	{ID: 62, Name: "Creative industries", ParentID: pointer(61)},
	{ID: 63, Name: "Energy technology", ParentID: pointer(61)},
	{ID: 64, Name: "Environment", ParentID: pointer(61)},
	{ID: 65, Name: "Service"},
	{ID: 66, Name: "Business services", ParentID: pointer(65)},
	{ID: 67, Name: "Engineering", ParentID: pointer(65)},
	{ID: 68, Name: "Information Technology and Telecommunications", ParentID: pointer(65)},
	{ID: 69, Name: "Data processing, Web portals, E-marketing", ParentID: pointer(68)},
	{ID: 70, Name: "Programming, Consultancy", ParentID: pointer(68)},
	{ID: 71, Name: "Software, Hardware", ParentID: pointer(68)},
	{ID: 72, Name: "Telecommunications", ParentID: pointer(68)},
	{ID: 73, Name: "Tourism", ParentID: pointer(65)},
	{ID: 74, Name: "Translation services", ParentID: pointer(65)},
	{ID: 75, Name: "Transport and Logistics", ParentID: pointer(65)},
	{ID: 76, Name: "Air", ParentID: pointer(75)},
	{ID: 77, Name: "Rail", ParentID: pointer(75)},
	{ID: 78, Name: "Road", ParentID: pointer(75)},
	{ID: 79, Name: "Water", ParentID: pointer(75)},
}

func pointer(i uint) *uint {
	return &i
}

func MigrateOptions(db *gorm.DB) error {

	if err := db.AutoMigrate(&models.Option{}); err != nil {
		return err
	}

	for _, opt := range options {
		if err := db.Create(&opt).Error; err != nil {
			return err
		}
	}

	return nil
}
