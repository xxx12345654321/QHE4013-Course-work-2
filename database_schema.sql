-- create data 
CREATE DATABASE IF NOT EXISTS car_sales_db;
USE car_sales_db;

-- seller
CREATE TABLE IF NOT EXISTS sellers (
    seller_id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL, 
    email VARCHAR(100),
    phone VARCHAR(20),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- car
CREATE TABLE IF NOT EXISTS cars (
    car_id INT AUTO_INCREMENT PRIMARY KEY,
    seller_id INT NOT NULL,
    make VARCHAR(50) NOT NULL,      
    model VARCHAR(50) NOT NULL,     
    year INT NOT NULL,              
    price DECIMAL(10,2) NOT NULL,   
    description TEXT,               
    image_path VARCHAR(255),        
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (seller_id) REFERENCES sellers(seller_id) ON DELETE CASCADE
);