# Mang Jose

An e-commerse system built using Go and React JS.

## Getting Started

### Prerequisite

The following should be available in your machine:
- Go v.1.13 or higher
- Node v.8.10 or higher
- npm v.5.6 or higher
- MySQL
- VS Code (recommended editor)

### Project Setup

1. Clone the project repository `https://github.com/mlph-kvillegas/golang-react-g3.git`.

2. Open the project on VS Code or any source-code editor.

#### Backend Setup

1. Update database connection on `dbConnect.go` and `setupDatabase.go` based on your MySQL settings.

```
<username>:<password>@tcp(<hostname>:<port>)
```

2. Inside the `ecommerce-backend` directory, run this command:

```
go run main.go
```

3. Successful run and setup should show something like:

```
[GIN-debug] Listening and serving HTTP on :9000
```

#### Frontend Setup
1. Inside the `ecommerce-frontend` directory, install the necessary packages.

```
npm install
```

2. Run the frontend using:

```
npm start
```

This should open a new tab on your browser and loads the project's login page.