package entity

// BookedService entity
type BookedService struct {
	ID        uint32 `db:"id"`
	UserID    uint32 `db:"user_id"`
	ServiceID uint32 `db:"service_id"`
	Status    bool   `db:"status"`
	Customer  string `db:"customer"`
	Service   string `db:"service"`
}
