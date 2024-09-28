# Remote Code Execution

# DEMO
https://daily-code-pi.vercel.app

## Overview
Remote Code Execution is a full-stack web application developed using Next.js, Firebase, and the Judge0 API. It allows users to write and practice code in different programming languages while solving various coding problems. The application requires user authentication to submit solutions, and it stores the status of each problem in Firestore for easy tracking.

## Features
- Code Writing and Execution: Write and execute code in multiple programming languages.
- Problem Solving: Access a variety of coding problems and submit solutions.
- Test Case Checking: Automatically check submitted solutions against predefined test cases.
- User Status Tracking: Store and retrieve the status of solved problems in Firestore based on user authentication.
- Secure Authentication: Use Firebase Authentication for a secure login and registration process.
- Error Handling: Display meaningful error messages for coding mistakes or execution issues.
- Complexity Analysis: Analyze and display approximate time and space complexity for submitted solutions to help users understand the efficiency of their code using Gemeni API.


## Technologies Used
- Frontend: Next.js, Tailwind CSS
- Authentication: Firebase
- Code Execution: Judge0 API for executing code in a secure environment
- Database: Firestore for storing user data and problem-solving status
- Complexity: Gemeni API for analyze time and space complexity

## Getting Started
### Prerequisites
- Node.js installed on your local machine
- Firebase project set up for authentication and Firestore
- Access to Judge0 API (public API or self-hosted)

### Installation
1. Clone the repository: 
   ```bash
   git clone https://github.com/Ripunjay42/remote-code-execution.git

2. Navigate to the project directory(client):

   ```bash
   cd remote-code-execution
   ```

3. Install dependencies:

   ```bash
   npm install
   ```

## Set up environment variables: 
  ### Create a .env.local file in the root directory and add your Firebase configuration details and Judge0 API URL:
  - NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
  - NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_auth_domain
  - NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
  - NEXT_PUBLIC_JUDGE0_API_URL=https://api.judge0.com
  - NEXT_PUBLIC_JUDGE0_API_KEY=your_api_key
  - NEXT_PUBLIC_GEMENI_API_KEY=your_api_key


## Usage

1. Start the development server:

   ```bash
   npm run dev
   ```

2. Open your browser and navigate to `http://localhost:3000` to access the application.
  -Sign up or log in using your Firebase account to start solving problems and executing code!
