# Changelog

All notable changes to the Medical Marketplace Backend will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.0.0] - 2025-05-20

### Added

- Initial release of the Medical Marketplace Backend API
- Created core modules for the application:
  - Clinics module with CRUD operations
  - Doctors module with CRUD operations
  - Medical Services module with CRUD operations
  - Patients module with CRUD operations
  - Patient Medical Services module with CRUD operations
- Implemented RESTful API endpoints for all entities
- Added Data Transfer Objects (DTOs) for input validation
- Created TypeScript interfaces for all entities
- Added Swagger/OpenAPI documentation
- Implemented CORS support for frontend integration
- Added Postman collection for API testing
- Created comprehensive README.md with API documentation

### Technical Details

- Built with NestJS framework
- Implemented modular architecture with separation of concerns
- Used TypeScript for type safety
- Implemented in-memory data storage (to be replaced with database in future versions)
- Added validation using class-validator
- Configured proper error handling for API responses

## [0.2.0] - 2025-04-15

### Added

- Patient Medical Services module
- Relationship between patients and medical services
- Status tracking for patient medical services
- Notes field for patient medical services

### Changed

- Updated Patients module to include medical history
- Enhanced Doctors module with availability information
- Improved Medical Services module with more detailed information

## [0.1.0] - 2025-03-01

### Added

- Initial project setup with NestJS
- Basic CRUD operations for products
- Project structure and configuration
- Development environment setup
