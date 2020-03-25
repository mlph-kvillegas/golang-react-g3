package repository

import (
	"fmt"

	"github.com/ecommerce/ecommerce-backend/entity"
	"github.com/ecommerce/ecommerce-backend/util"
)

// ServiceSave - saves service to database
func ServiceSave(service entity.Service) {
	db := util.DbConnect()

	result, err := db.Exec(`INSERT INTO SERVICE(user_id, service_type_id, is_archived, contact_number, price, image, description)
		VALUES (?, ?, ?, ?, ?, ?, ?)`, service.UserID, service.ServiceTypeID, 0, service.ContactNumber,
		service.Price, service.Image, service.Description)

	if err != nil {
		panic(err)
	} else {
		fmt.Println(result)
	}

	defer db.Close()
}

// ServiceGetAll - get all service from database
func ServiceGetAll() (services []entity.Service, err error) {
	db := util.DbConnect()

	result, err := db.Query(`
		SELECT service.id as id, service.user_id as user_id, service.service_type_id as service_type_id,
		CONCAT(user.first_name, ' ', user.last_name) as user_name, 
		service_type.service_name as service_name,
		service.contact_number, service.price, 
		service.image as image,
		service.description
		FROM service
		JOIN user ON user.ID = service.user_id
		JOIN service_type ON service_type.id = service.service_type_id
		WHERE service.is_archived = false
	`)

	if err != nil {
		return
	}

	for result.Next() {
		var service entity.Service
		result.Scan(&service.ID, &service.UserID, &service.ServiceTypeID, &service.UserName, &service.ServiceName, &service.ContactNumber,
			&service.Price, &service.Image, &service.Description)
		services = append(services, service)
	}

	defer result.Close()
	defer db.Close()
	return
}

// ServiceGetOne - get one service from database
func ServiceGetOne(id int) (service entity.Service, err error) {
	db := util.DbConnect()

	result := db.QueryRow(`
		SELECT service.id as id, service.user_id as user_id, service.service_type_id as service_type_id,
		CONCAT(user.first_name, ' ', user.last_name) as user_name, 
		service_type.service_name as service_name,
		service.contact_number, service.price,
		service.image as image,
		service.description
		FROM service
		JOIN user ON user.ID = service.user_id
		JOIN service_type ON service_type.id = service.service_type_id
		WHERE service.is_archived = false AND service.id=?
	`, id)
	err = result.Scan(&service.ID, &service.UserID, &service.ServiceTypeID, &service.UserName, &service.ServiceName, &service.ContactNumber,
		&service.Price, &service.Image, &service.Description)

	if err != nil {
		return
	}

	defer db.Close()
	return
}

// ServiceUpdate - update service in database
func ServiceUpdate(id int, service entity.Service) {
	db := util.DbConnect()

	result, err := db.Exec(`UPDATE SERVICE SET
		user_id=?,
		service_type_id=?, contact_number=?, price=?, description=?, image=?
		WHERE id=?`, service.UserID, service.ServiceTypeID, service.ContactNumber, service.Price,
		service.Description, service.Image, id)

	if err != nil {
		panic(err)
	} else {
		fmt.Println(result)
	}

	defer db.Close()
}

// ServiceDelete - delete service in database
func ServiceDelete(id int) {
	db := util.DbConnect()

	result, err := db.Exec(`UPDATE SERVICE SET
		is_archived = true
		WHERE id=?`, id)

	if err != nil {
		panic(err)
	} else {
		fmt.Println(result)
	}

	defer db.Close()
}
