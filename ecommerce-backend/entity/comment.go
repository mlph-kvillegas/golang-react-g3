package entity

// Comment entity
type Comment struct {
	ID        uint32 `db:"id"`
	ServiceID uint32 `db:"service_id"`
	Comment   string `db:"comment"`
}
