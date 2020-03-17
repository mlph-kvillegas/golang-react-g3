package entity

// ServiceType enity
type ServiceType struct {
	ID          uint32 `db:"id"`
	ServiceName string `db:"service_name"`
	ServiceKey  string `db:"service_type"`
	IsArchived  bool   `db:"is_archived"`
}
