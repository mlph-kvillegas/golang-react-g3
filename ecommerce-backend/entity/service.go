package entity

// Service enity
type Service struct {
	ID            uint32 `db:"id"`
	UserID        uint32 `db:"user_id"`
	ServiceTypeID uint32 `db:"service_type_id"`
	IsArchived    bool   `db:"is_archived"`
	ContactNumber string `db:"contact_number"`
	Price         string `db:"price"`
	Description   string `db:"description"`
	UserName      string `db:"user_name"`
	ServiceName   string `db:"service_name"`
}
