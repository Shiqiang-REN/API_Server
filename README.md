# React Dashboard and Eshop website APIs

This project comprises a comprehensive APIs server built using Node.js with the Express framework and MongoDB with Mongoose for data storage. The primary purpose of this APIs server is to support two GitHub projects: a React_Dashboard and React_EShop. The architecture follows the principles of RESTful design, ensuring scalability, maintainability, and ease of integration.

**Technologies Used:**

- Node.js
- Express framework
- MongoDB with Mongoose

## 1 - Category

    GET       /categories
    POST      /categories
    PUT       /categories
    DELETE    /categories

## 2 - Products
    GET       /products
    POST      /products
    PUT       /products
    DELETE    /products
    GET       /products/search
    GET       /products/:productId
    PUT       /products/status/:productId

## 3 - Management
    POST      /adminUsers/login
    GET       /adminUsers
    POST      /adminUsers
    PUT       /adminUsers
    DELETE    /adminUsers

    GET       /manage/users
    POST      /manage/users
    PUT       /manage/users
    DELETE    /manage/users
    
    GET       /manage/roles
    POST      /manage/roles
    PUT       /manage/roles
    DELETE    /manage/roles