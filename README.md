# AWS Cognito + React Router v7 + CSS in JS using Linaria + SpringBoot + Java

## Technologies used
###  AWS Cognito as the identity provider.
- Cognito client is created using the AWS console choosing SPA / React as the application.
### React Router 7 (with SSR) for as the frontend framework.  
- Frontend project is created at `src/main/webapp` using vite react router v7 template.
- Axios interceptor is configured to use the jwt token from the localStorage
- Axios is configured to work correctly in server mode and client mode using correct API base URL
- Cognito OIDC related configurations are loaded from the backend using a public endpoint at the server-side rendering. This enables the frontend only depends on the back end API base URL.
### Springboot application as the backend to keep a secure API server.
- Springboot application uses Java 17 / Maven
- Integrated Swagger UI for API documentation. Can be accessed at `http://localhost:8080/swagger-ui/index.html`
- Integrated Spring Security with JWT token authentication.

## How to run
First create a Cognito user pool and client in the AWS console. Choose Single Page Application as the client type.
### Backend
- Rename `src/main/resources/application-dev.properties.example` to `src/main/resources/application-dev.properties` and fill the required fields.
- Run the Springboot application using the IDE or execute `mvnw spring-boot:run` in the root of the project. It will be available at `http://localhost:8080`
### Frontend
- Wait until backend is ready.
- Go to `src/main/webapp` and run `npm install` to install the dependencies.
- Run `npm run dev` to start the frontend server. It will be available at `http://localhost:5173`

## How the example look like
- Swagger UI is available at `http://localhost:8080/swagger-ui/index.html`   
![swagger-page.png](src%2Fmain%2Fwebapp%2Freadme-images%2Fswagger-page.png)

- Before authentication, the page looks like this.
![before-auth.png](src%2Fmain%2Fwebapp%2Freadme-images%2Fbefore-auth.png)

- After authentication, frontend fetches example data from a protected API endpoint and shows in the page.   
![after-auth.png](src%2Fmain%2Fwebapp%2Freadme-images%2Fafter-auth.png)

## Any questions?
- Feel free to raise an issue
