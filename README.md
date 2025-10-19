# ☕ Java Web Calculator

A fully functional calculator web application built with a Java Servlets backend and a dynamic, modern frontend. This project is a demonstration of full-stack development principles.

**[See the Live Demo Here!](https://YourUsername.github.io/java-web-calculator/)** 👈 *(We'll create this link in Part 3)*



## ✨ Features

* Standard arithmetic operations: addition, subtraction, multiplication, division.
* Handles decimal numbers.
* A clean, responsive user interface built with modern CSS.
* Clear and delete functionality.
* Stateful frontend that handles multi-step calculations (e.g., 10 + 5 * 2).

## 🛠️ Technologies Used

* **Backend:** Java, Jakarta Servlets
* **Build Tool:** Apache Maven
* **Server:** Apache Tomcat
* **Frontend:** HTML5, CSS3 (with CSS Grid), Vanilla JavaScript

## 🚀 How to Run Locally

To run this project on your own machine, follow these steps:

**Prerequisites:**
* Java Development Kit (JDK) 11 or newer
* Apache Maven
* Apache Tomcat 10.1 or newer
* Git

**Steps:**
1.  **Clone the repository:**
    ```bash
    git clone [https://github.com/YourUsername/java-web-calculator.git](https://github.com/YourUsername/java-web-calculator.git)
    ```
2.  **Navigate to the project directory:**
    ```bash
    cd java-web-calculator
    ```
3.  **Build the project with Maven:**
    This will compile the Java code and package it into a `.war` file.
    ```bash
    mvn clean package
    ```
4.  **Deploy to Tomcat:**
    * Find the generated file at `target/web-calculator.war`.
    * Copy this `.war` file into the `webapps` directory of your Apache Tomcat installation.
5.  **Start Tomcat and view the application:**
    * Run the `startup.bat` (Windows) or `startup.sh` (Mac/Linux) script in Tomcat's `bin` folder.
    * Open your web browser and go to: **[http://localhost:8080/web-calculator/](http://localhost:8080/web-calculator/)**
