# Pdf-Portal
The PDF Management &amp; Collaboration System is a web application designed to simplify the management and collaboration of PDF files.


## Prerequisites
Before you begin, make sure you have the following installed on your local machine:

* Java Development Kit (JDK) 8 or above
* Node.js and npm (Node Package Manager)
* MySQL Database

  
## Installation
### Backend (Spring Boot)
* Clone the project repository from your source control system or create a new Spring Boot project.
* Open the project in your preferred Java IDE.
* Configure the database connection in the application.properties file. Specify the MySQL database credentials, such as URL, username, and password.
```cmd
spring.datasource.url=jdbc:mysql://localhost:3306/pdfportals
spring.datasource.username=db_username
spring.datasource.password=db_password
```

### Frontend (ReactJS)
```cmd
npm install
npm start
```

## Run the Backend
4. Open another terminal window and navigate to the server directory. Run the following commands:
```cmd
mvn clean install
mvn spring-boot:run
```


## Usage
1. Open a web browser and navigate to http://localhost:3000/.
2. Register a new account or log in with an existing account.
