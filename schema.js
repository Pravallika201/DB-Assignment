const mysql = require('mysql2');

// Create a connection to the database
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'pravallika_201',
  password: 'pravalu201',
  database: 'MYSQL'
});

// Connect to the database
connection.connect((err) => {
  if (err) throw err;
  console.log('Connected to MySQL database');
});

// Define the schema
const createSchema = () => {
  const createProductCategoryTable = `
    CREATE TABLE IF NOT EXISTS Product_Category (
      id INT PRIMARY KEY AUTO_INCREMENT,
      name VARCHAR(255) NOT NULL,
      description TEXT,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      modified_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
      deleted_at TIMESTAMP
    )
  `;

  const createProductTable = `
    CREATE TABLE IF NOT EXISTS Product (
      id INT PRIMARY KEY AUTO_INCREMENT,
      name VARCHAR(255) NOT NULL,
      description TEXT,
      sku VARCHAR(50),
      category_id INT,
      inventory_id INT,
      price DECIMAL(10, 2) NOT NULL,
      discount_id INT,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      modified_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
      deleted_at TIMESTAMP,
      FOREIGN KEY (category_id) REFERENCES Product_Category(id)
    )
  `;

  // Execute queries to create tables
  connection.query(createProductCategoryTable, (err, results, fields) => {
    if (err) throw err;
    console.log('Product_Category table created successfully');
  });

  connection.query(createProductTable, (err, results, fields) => {
    if (err) throw err;
    console.log('Product table created successfully');
  });
};

// Call the function to create the schema
createSchema();

// Close the connection after creating the schema
connection.end();
