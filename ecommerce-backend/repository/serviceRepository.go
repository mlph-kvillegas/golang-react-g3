package repository

import (
	"fmt"

	"github.com/ecommerce/ecommerce-backend/entity"
	"github.com/ecommerce/ecommerce-backend/util"
)

// BookService - book a service
func BookService(bookservice entity.BookedService) {
	db := util.DbConnect()

	result, err := db.Exec(`INSERT INTO BOOKED_SERVICE(user_id, service_id, status)
		VALUES (?, ?, ?)`, bookservice.UserID, bookservice.ServiceID, 0)

	if err != nil {
		panic(err)
	} else {
		fmt.Println(result)
	}

	defer db.Close()
}

// ServiceSave - saves service to database
func ServiceSave(service entity.Service) {
	db := util.DbConnect()

	result, err := db.Exec(`INSERT INTO SERVICE(user_id, service_type_id, is_archived, contact_number, price, image, description, total_reviewer, total_rating)
		VALUES (?, ?, ?, ?, ?, ?, ?, ?, ? )`, service.UserID, service.ServiceTypeID, 0, service.ContactNumber,
		service.Price, service.Image, service.Description, 0, 0)

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
		service.description,
		service.total_rating,
		service.total_reviewer
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
			&service.Price, &service.Image, &service.Description, &service.TotalRating, &service.TotalReviewer)
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
		service.description,
		service.total_rating,
		service.total_reviewer
		FROM service
		JOIN user ON user.ID = service.user_id
		JOIN service_type ON service_type.id = service.service_type_id
		WHERE service.is_archived = false AND service.id=?
	`, id)
	err = result.Scan(&service.ID, &service.UserID, &service.ServiceTypeID, &service.UserName, &service.ServiceName, &service.ContactNumber,
		&service.Price, &service.Image, &service.Description, &service.TotalRating, &service.TotalReviewer)

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

// GetAllBookService - get all bookedService
func GetAllBookService() (bookedServices []entity.BookedService, err error) {
	db := util.DbConnect()

	result, err := db.Query(`
		SELECT booked_service.id as id, booked_service.user_id as user_id, booked_service.service_id as service_id,
		booked_service.status,
		CONCAT(user.first_name, ' ', user.last_name) as customer,
		service_type.service_name as service     
		FROM booked_service
		JOIN user ON user.ID = booked_service.user_id
		JOIN service ON service.ID = booked_service.service_id
		JOIN service_type ON service_type.ID = service.service_type_id;
	`)

	if err != nil {
		return
	}

	for result.Next() {
		var bookedService entity.BookedService
		result.Scan(&bookedService.ID, &bookedService.UserID, &bookedService.ServiceID,
			&bookedService.Status, &bookedService.Customer, &bookedService.Service)
		bookedServices = append(bookedServices, bookedService)
	}

	defer result.Close()
	defer db.Close()
	return
}
