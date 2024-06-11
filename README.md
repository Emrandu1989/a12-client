# Machine World

Machine World is an employee management system designed to monitor the workload of employees, keep records of salaries, contracts, and more. This web application allows employees to post updates on their workflow, while HR Executives can monitor employee workflows and handle payments.

## Live Site

[Machine World Live Site](https://machine-world.netlify.app)

## Admin Credentials

- **Admin Email**: admin111@gmail.com
- **Admin Password**: admin4321

## Features

1. **Responsive Design**: The website is fully responsive and optimized for mobile, tablet, and desktop views.
2. **User Authentication**: Email and password-based authentication with role-based access control (Employee, HR, Admin).
3. **Social Login**: Support for Google authentication for employee roles.
4. **Private Routes**: Access to private routes persists even after page reloads.
5. **CRUD Operations**: Employees can post their work updates, and HR can manage employee data and payments.
6. **Payment History**: Employees can view their payment history, and HR can make salary payments.
7. **Admin Control**: Admin can view all employees, promote employees to HR, and adjust salaries.
8. **Real-time Data**: Work records and payment histories are updated in real-time without page reloads.
9. **Notifications**: Sweet alerts for all CRUD operations and authentication actions.
10. **Environment Variables**: Firebase and MongoDB credentials are securely managed using environment variables.

## Pages

### Home Page
- **Banner/Slider**: Displays the success of the company.
- **Services**: Lists the services provided by the company.
- **Testimonials**: A slider showcasing appreciation from different clients.
- **Additional Sections**: Relevant sections to enhance user experience.
- **Navbar and Footer**: Available across all pages.

### Authentication
- **Register**: Email/password registration with role selection (Employee, HR).
- **Login**: Email/password login with error handling.
- **Social Login**: Google authentication.

### Dashboard
- **Employee Dashboard**: 
  - **Work Sheet**: Form to submit work updates and a table displaying submitted work.
  - **Payment History**: Table displaying the history of salary payments.
- **HR Dashboard**: 
  - **Employee List**: Table displaying all employees with options to verify, pay, and view details.
  - **Progress**: Table displaying work records of employees with filtering options.
- **Admin Dashboard**: 
  - **All Employee List**: Table displaying all verified employees with options to promote to HR, fire, and adjust salaries.

## Packages Used

- **React**: A JavaScript library for building user interfaces.
- **Tailwind CSS**: A utility-first CSS framework for rapid UI development.
- **MongoDB**: A NoSQL database for storing user and work data.
- **Express**: A web application framework for Node.js.
- **CORS**: A middleware for enabling Cross-Origin Resource Sharing.
- **Firebase**: A platform for authentication and backend services.
- **SweetAlert2**: A library for beautiful, responsive alerts.
- **DaisyUI**: A plugin for Tailwind CSS that provides pre-designed UI components.
- **TanStack Query**: For data fetching and state management.
- **Stripe**: A payment processing library.
- **React Router DOM**: For handling routing in React applications.
- **Axios**: A promise-based HTTP client for making API requests.
- **Recharts**: A charting library for visualizing data.
- **Framer Motion**: A library for animations.
- **localForage**: For offline storage.
- **Firebase Authentication**: For handling user authentication.
- **React DatePicker**: A date picker component for React.
- **React Icons**: Icon library for React applications.
