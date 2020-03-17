package repository

import (
	"fmt"

	"github.com/ecommerce/ecommerce-backend/entity"
	"github.com/ecommerce/ecommerce-backend/util"
)

// ServiceTypeSave - saves service type in database
func ServiceTypeSave(serviceType entity.ServiceType) {
	db := util.DbConnect()

	result, err := db.Exec(`INSERT INTO SERVICE_TYPE(service_name, service_key, is_archived)
		VALUES (?, ?, ?)`, serviceType.ServiceName, serviceType.ServiceKey, 0)

	if err != nil {
		panic(err)
	} else {
		fmt.Println(result)
	}

	defer db.Close()
}

// ServiceTypeGetAll - get all service type in database
func ServiceTypeGetAll() (serviceTypes []entity.ServiceType, err error) {
	db := util.DbConnect()

	result, err := db.Query(`SELECT id, service_name, service_key FROM service_type WHERE NOT is_archived`)

	if err != nil {
		return
	}

	for result.Next() {
		var serviceType entity.ServiceType
		result.Scan(&serviceType.ID, &serviceType.ServiceName, &serviceType.ServiceKey)
		serviceTypes = append(serviceTypes, serviceType)
	}

	defer result.Close()
	defer db.Close()
	return
}

// ServiceTypeGetOne - get one service type
func ServiceTypeGetOne(id int) (serviceType entity.ServiceType, err error) {
	db := util.DbConnect()

	result := db.QueryRow(`SELECT id, service_name, service_key FROM service_type WHERE NOT is_archived AND id=?`, id)
	err = result.Scan(&serviceType.ID, &serviceType.ServiceName, &serviceType.ServiceKey)

	if err != nil {
		return
	}

	defer db.Close()
	return
}

// ServiceTypeUpdate = update service type in database
func ServiceTypeUpdate(id int, serviceType entity.ServiceType) {
	db := util.DbConnect()

	result, err := db.Exec(`UPDATE SERVICE_TYPE SET
		service_name=?,
		service_key=?
		WHERE id=?`, serviceType.ServiceName, serviceType.ServiceKey, id)

	if err != nil {
		panic(err)
	} else {
		fmt.Println(result)
	}

	defer db.Close()
}

// ServiceTypeDelete = delete service type in database
func ServiceTypeDelete(id int) {
	db := util.DbConnect()

	result, err := db.Exec(`UPDATE SERVICE_TYPE SET
		is_archived = true
		WHERE id=?`, id)

	if err != nil {
		panic(err)
	} else {
		fmt.Println(result)
	}

	defer db.Close()
}
