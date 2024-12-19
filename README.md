# NgOrgChartV17

It is an Angular 17 application to manage and display hierarchical employee reporting information in an organization. The application provides an intuitive graphical interface, grid/table-based views, and robust functionality to manage employee relationships.

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 17.3.11.

# Application Documentation

## Overview

This document provides a comprehensive list of important features and functionalities implemented in the Angular application, along with their brief descriptions and key details.

---

## **0. Clarity Design System**

- **UI Design**: Clarity Design System has been used as component library to brings together UX guidelines, an HTML/CSS framework, and Angular components.
- Clarity provides assets that help designers get started. Use these assets in a process that aligns with the Clarity Design System.

---

## **1. State Management with NgRx**

- **NgRx Store**: Implemented for managing the application’s state.
- **Features**:
  - CRUD operations for `Employee` entities.
  - Integration with `localStorage` to persist state.
- **Actions**:
  - `addEmployee`: Adds a new employee.
  - `updateEmployee`: Updates an existing employee by its ID.
  - `deleteEmployee`: Deletes an employee and reassigns reportees to the deleted employee’s manager.
  - `searchEmployeeByName`: Searches for an employee by name and retrieves their ID.
- **Reducers**:
  - Handles CRUD operations, ensuring immutability and consistency.
- **Selectors**:
  - Fetch all employees.
  - Retrieve search results and error messages.

---

## **2. Component-Based Architecture**

- Modular and reusable components designed for scalability and maintainability.
- Key Components:
  - **Employee Grid Component**: Displays a list of employees with options to edit, delete, or search.
  - **Employee Form Component**: Handles adding and updating employee details.
  - **Employee Chart Component**: Visualizes hierarchical reporting relationships using D3.js and d3-org-chart.

---

## **3. Routing and Navigation**

- **Dynamic Routing**: Implemented for viewing individual employee details.
- **Bookmarking Support**: Allows users to bookmark specific employee views.

---

## **4. D3.js Integration for Hierarchical Visualization**

- Created an interactive employee tree view using D3.js and d3-org-chart.
- **Features**:
  - Displays hierarchical reporting relationships.
  - Nodes and links are dynamically updated based on the data.
  - Customizable styling and animations.

---

## **5. Alert Notifications**

- Implemented a reusable Angular alert service for notifications.
- **Features**:
  - Dynamic message types: `success`, `danger`, `info`, `warning`.

---

## **6. Form Management**

- **Reactive Forms**:
  - Used for employee creation and editing.
  - Includes validation for fields like email, phone number, and name.

---

## **7. Service Layer**

- Centralized services for application-wide functionalities:
  - **EmployeeService**: state updates for CRUD operations.
  - **NotificationService**: Manages alert notification triggers.

---

## **8. LocalStorage Integration**

- Persisted employee data in `localStorage` to ensure data is not lost on page refresh.
- **Features**:
  - Initial state is loaded from `localStorage`.
  - Updates to the state automatically reflect in `localStorage`.

---

## **9. Netlify Deployment**

- Deployed the application on Netlify for easy access and demonstration.
- **Highlights**:
  - Configured build settings for Angular.

---

## **10. Error Handling and Debugging**

- **Global Error Handler**:
  - Catches unexpected errors and displays user-friendly messages.
  - Logs errors for debugging purposes.
- **Validation Error Messages**:
  - Provides clear feedback for form input errors.

---

## **11. Modular Folder Structure**

- Organized codebase for scalability and maintainability:
  - `core/`: Models, services, and shared utilities.(Not required in this project)
  - `features/`: Feature-specific modules and components.
  - `store/`: NgRx state management files (actions, reducers, selectors, effects).
  - `shared/`: Shared components (Header, Nav, Chart, etc.) and directives.

---

## **12. Testing (In-progress)**

- **Unit Testing**:
  - Used Jasmine and Karma for testing components and services.
- **E2E Testing**:
  - Placeholder for Cypress or Protractor integration.

---

## Future Enhancements

1. Implement advanced search with filtering and sorting capabilities.
2. Add authentication and role-based access control.
3. Integrate a backend API for real-time data management.
4. Enhance the D3.js tree view with expand/collapse functionality.

---
