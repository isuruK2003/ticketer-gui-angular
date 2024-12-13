# Real-Time Event Ticketing System

## Project Overview

This project is a real-time event ticketing system implementing the Producer-Consumer pattern. The system simulates multiple ticket vendors (producers) releasing tickets and customers (consumers) purchasing them concurrently. It uses advanced multithreading and synchronization techniques to ensure data integrity and smooth operation.

## Key Features:

- **Real-Time Ticket Management**: Vendors add tickets to a shared pool, and customers retrieve tickets concurrently.
- **WebSocket Updates**: Real-time broadcasting of system status.
- **Configurable Parameters**: User-defined simulation settings for vendors, customers, and ticket release/purchase rates.
- **Robust Logging**: Comprehensive logs for system activities.

## Technology Stack:

- **Frontend**: Angular 18
- **Backend**: Java Spring Boot 3.4.0
- **Database**: PostgreSQL running on Docker
- **WebSockets**: For real-time status broadcasting
- **Logging**: Implemented in the backend for tracking activities

## Getting Started

### Prerequisites

Ensure the following software is installed on your system:
- **Java 21+**
- **Node.js v20.13.1+ and npm**
- **Docker 4.36.0**
- **Angular 18 (and CLI)**
- **PostgreSQL**

### Installation

#### Backend:
1. Clone the backend repository:
   ```bash
   git clone git@github.com:isuruK2003/ticketer-server.git 
   cd ticketer-server
   ```
2. Create a `compose.yml` file in "ticketing-server" directory
   Include your details in following format:
   ```bash
   services:
   postgres:
   	image: 'postgres:latest'
   	environment:
   		- 'POSTGRES_DB=ticketing-system'
   		- 'POSTGRES_PASSWORD=<YOUR POSTGRES PASSWORD>'
   		- 'POSTGRES_USER=<YOUR POSTGRES USERNAME>'
   ports:
	- '5432:5432' # Mapping 5432 to local 5432 on local machine
   ```
3. Start the backend:
   ```bash
   ./mvnw spring-boot:run
   ```

#### Frontend:
1. Clone the frontend repository:
   ```bash
   git clone git@github.com:isuruK2003/ticketer-gui-angular.git 
   cd ticketer-gui-final
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Run the Angular application:
   ```bash
   ng serve
   ```

## Brief API Documentation

Additional endpoints are detailed in the provided API documentation, or please visit [PostMan Documentation](https://documenter.getpostman.com/view/33030564/2sAYHwKQxL) for full details.

## Logging

The backend includes a logging module that records system activities, errors, and simulation events. Logs are stored in a configurable file for monitoring and debugging purposes.

## Testing

- Use Postman or similar tools to test API endpoints.
- Verify WebSocket connections with browser developer tools.
- Test concurrent scenarios by starting multiple vendor and consumer threads.

## License

MIT License is used. This project is a submission for a University Coursework, therefore please follow the proper academic rules and regulations when reusing this again.

## Repositories

- **Backend**: [ticketer-server](https://github.com/isuruK2003/ticketer-server)
- **Frontend**: [ticketer-gui-angular](https://github.com/isuruK2003/ticketer-gui-angular)

## Acknowledgments

This project was developed as part of a coursework assignment to implement a real-time ticketing system using advanced Producer-Consumer techniques. It provided hands-on experience with multi-threading, synchronization, and full-stack development.

## Contact

Please reach me out via GitHub or email for additional information.

