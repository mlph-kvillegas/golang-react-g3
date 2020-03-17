package entity

// User enity
type User struct {
	ID            uint32 `db:"id"`
	FirstName     string `db:"first_name"`
	LastName      string `db:"last_name"`
	Email         string `db:"email"`
	UserName      string `db:"username"`
	Password      string `db:"password"`
	Address       string `db:"address"`
	ContactNumber string `db:"contact_number"`
	Bio           string `db:"bio"`
	IsArchived    bool   `db:"is_archived"`
	Type          string `db:"type"`
}
