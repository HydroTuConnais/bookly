<div id="top">

<!-- HEADER STYLE: CLASSIC -->
<div align="center">


# Bookly - React + Express + JWT

<em>Ce projet est une application de gestion de projets et de documents inspirée de Notion. Elle utilise **React** pour le front-end, **Express** pour le back-end, et **JWT (JSON Web Tokens)** pour la gestion de l'authentification.</em>

<!-- BADGES -->
<img src="https://img.shields.io/github/last-commit/HydroTuConnais/bookly?style=flat&logo=git&logoColor=white&color=0080ff" alt="last-commit">
<img src="https://img.shields.io/github/languages/top/HydroTuConnais/bookly?style=flat&color=0080ff" alt="repo-top-language">
<img src="https://img.shields.io/github/languages/count/HydroTuConnais/bookly?style=flat&color=0080ff" alt="repo-language-count">

<em>Built with the tools and technologies:</em>

<img src="https://img.shields.io/badge/Express-000000.svg?style=flat&logo=Express&logoColor=white" alt="Express">
<img src="https://img.shields.io/badge/JSON-000000.svg?style=flat&logo=JSON&logoColor=white" alt="JSON">
<img src="https://img.shields.io/badge/Markdown-000000.svg?style=flat&logo=Markdown&logoColor=white" alt="Markdown">
<img src="https://img.shields.io/badge/Resend-000000.svg?style=flat&logo=Resend&logoColor=white" alt="Resend">
<img src="https://img.shields.io/badge/npm-CB3837.svg?style=flat&logo=npm&logoColor=white" alt="npm">
<img src="https://img.shields.io/badge/Autoprefixer-DD3735.svg?style=flat&logo=Autoprefixer&logoColor=white" alt="Autoprefixer">
<img src="https://img.shields.io/badge/PostCSS-DD3A0A.svg?style=flat&logo=PostCSS&logoColor=white" alt="PostCSS">
<img src="https://img.shields.io/badge/.ENV-ECD53F.svg?style=flat&logo=dotenv&logoColor=black" alt=".ENV">
<img src="https://img.shields.io/badge/JavaScript-F7DF1E.svg?style=flat&logo=JavaScript&logoColor=black" alt="JavaScript">
<img src="https://img.shields.io/badge/Nodemon-76D04B.svg?style=flat&logo=Nodemon&logoColor=white" alt="Nodemon">
<br>
<img src="https://img.shields.io/badge/GNU%20Bash-4EAA25.svg?style=flat&logo=GNU-Bash&logoColor=white" alt="GNU%20Bash">
<img src="https://img.shields.io/badge/React-61DAFB.svg?style=flat&logo=React&logoColor=black" alt="React">
<img src="https://img.shields.io/badge/Webpack-8DD6F9.svg?style=flat&logo=Webpack&logoColor=black" alt="Webpack">
<img src="https://img.shields.io/badge/Docker-2496ED.svg?style=flat&logo=Docker&logoColor=white" alt="Docker">
<img src="https://img.shields.io/badge/TypeScript-3178C6.svg?style=flat&logo=TypeScript&logoColor=white" alt="TypeScript">
<img src="https://img.shields.io/badge/tsnode-3178C6.svg?style=flat&logo=ts-node&logoColor=white" alt="tsnode">
<img src="https://img.shields.io/badge/Prisma-2D3748.svg?style=flat&logo=Prisma&logoColor=white" alt="Prisma">
<img src="https://img.shields.io/badge/Axios-5A29E4.svg?style=flat&logo=Axios&logoColor=white" alt="Axios">
<img src="https://img.shields.io/badge/React%20Query-FF4154.svg?style=flat&logo=React-Query&logoColor=white" alt="React%20Query">
<img src="https://img.shields.io/badge/YAML-CB171E.svg?style=flat&logo=YAML&logoColor=white" alt="YAML">

</div>
<br>

---

## Features

|      | Component       | Details                              |
| :--- | :-------------- | :----------------------------------- |
| ⚙️  | **Architecture**  | <ul><li>Microservices architecture</li><li>Backend: Node.js with Express</li><li>Frontend: React with TypeScript</li><li>Database: SQLite via Prisma</li></ul> |
| 🔩 | **Code Quality**  | <ul><li>TypeScript for type safety</li><li>ESLint for linting</li><li>Prettier for code formatting</li><li>Modular code structure</li></ul> |
| 📄 | **Documentation** | <ul><li>Comprehensive README</li><li>API documentation via Postman collections</li><li>Docker setup instructions in `docker-compose.yml`</li></ul> |
| 🔌 | **Integrations**  | <ul><li>Authentication with JWT</li><li>Database integration with Prisma</li><li>API calls using Axios</li><li>React Query for data fetching</li></ul> |
| 🧩 | **Modularity**    | <ul><li>Component-based architecture in React</li><li>Reusable components with Radix UI</li><li>Separation of concerns between frontend and backend</li></ul> |
| 🧪 | **Testing**       | <ul><li>Unit tests with Jest</li><li>React Testing Library for component tests</li><li>Integration tests for API endpoints</li></ul> |
| ⚡️  | **Performance**   | <ul><li>Optimized bundle size with Webpack</li><li>Lazy loading of components</li><li>Efficient state management with React Query</li></ul> |
| 🛡️ | **Security**      | <ul><li>Environment variables for sensitive data</li><li>Input validation with Yup</li><li>Secure JWT handling</li></ul> |
| 📦 | **Dependencies**  | <ul><li>Core dependencies: React, Express, Prisma</li><li>Development tools: ESLint, Prettier, Jest</li><li>Containerization: Docker, Docker Compose</li></ul> |
| 🚀 | **Scalability**   | <ul><li>Docker for containerization</li><li>Microservices allow independent scaling</li><li>Database can be switched to more scalable options (e.g., PostgreSQL)</li></ul> |

---

## 📂 Structure du projet

### Front-End
```
/src
  |-- /components    # Composants React (Login, Notes, etc.)
  |-- /pages         # Pages principales (Dashboard, Login)
  |-- /services      # Gestion des appels API
  |-- /utils         # Utilitaires (gestion des tokens, etc.)
  |-- App.js         # Entrée principale de l'application
```

### Back-End
```
/server
  |-- /routes        # Routes pour utilisateurs et notes
  |-- /controllers   # Logique des API (CRUD)
  |-- /models        # Modèles de la base de données
  |-- /middleware    # Middleware pour la gestion des requêtes et l'authentification
  |-- server.js      # Entrée principale du serveur Express
```

---

### Project Index

<details open>
	<summary><b><code>BOOKLY/</code></b></summary>
	<!-- __root__ Submodule -->
	<details>
		<summary><b>__root__</b></summary>
		<blockquote>
			<div class='directory-path' style='padding: 8px 0; color: #666;'>
				<code><b>⦿ __root__</b></code>
			<table style='width: 100%; border-collapse: collapse;'>
			<thead>
				<tr style='background-color: #f8f9fa;'>
					<th style='width: 30%; text-align: left; padding: 8px;'>File Name</th>
					<th style='text-align: left; padding: 8px;'>Summary</th>
				</tr>
			</thead>
				<tr style='border-bottom: 1px solid #eee;'>
					<td style='padding: 8px;'><b><a href='https://github.com/HydroTuConnais/bookly/blob/master/compose.dev.yaml'>compose.dev.yaml</a></b></td>
					<td style='padding: 8px;'>- Defines a Docker Compose configuration for a multi-service application, orchestrating a frontend built with React, a backend API, and a PostgreSQL database<br>- Facilitates seamless communication between services through a shared network, while managing environment variables for secure configurations<br>- Ensures that the application components are properly built, connected, and ready for deployment, enhancing the overall architecture of the project.</td>
				</tr>
				<tr style='border-bottom: 1px solid #eee;'>
					<td style='padding: 8px;'><b><a href='https://github.com/HydroTuConnais/bookly/blob/master/compose.yaml'>compose.yaml</a></b></td>
					<td style='padding: 8px;'>- Defines a Docker Compose configuration for a web application architecture comprising a frontend, backend, and PostgreSQL database<br>- Facilitates the orchestration of services, ensuring seamless communication and dependency management<br>- The setup allows for local development with environment variables for secure configurations, while enabling persistent data storage and health checks for the database, all within a dedicated network.</td>
				</tr>
				<tr style='border-bottom: 1px solid #eee;'>
					<td style='padding: 8px;'><b><a href='https://github.com/HydroTuConnais/bookly/blob/master/README.md'>README.md</a></b></td>
					<td style='padding: 8px;'>- Bookly-React + Express + JWT## SummaryBookly is a project management and document management application inspired by Notion, designed to streamline the organization of notes and user interactions<br>- The application leverages a React front-end to provide a user-friendly interface, allowing users to create, edit, and delete notes seamlessly<br>- On the back-end, Express serves as a robust API that facilitates secure user authentication and efficient data management through a structured database<br>- The integration of JSON Web Tokens (JWT) ensures secure authentication, enhancing user data protection<br>- Overall, Bookly aims to deliver an intuitive and responsive experience for users managing their projects and documents effectively.</td>
				</tr>
				<tr style='border-bottom: 1px solid #eee;'>
					<td style='padding: 8px;'><b><a href='https://github.com/HydroTuConnais/bookly/blob/master/docker-compose.yml'>docker-compose.yml</a></b></td>
					<td style='padding: 8px;'>- Defines the configuration for a Docker environment that facilitates the deployment of a backend service<br>- It establishes essential parameters such as database connectivity, networking, and volume management, ensuring seamless integration with a PostgreSQL database<br>- This setup supports efficient development and testing workflows by encapsulating the backend service within a containerized architecture, promoting consistency across different environments.</td>
				</tr>
			</table>
		</blockquote>
	</details>
	<!-- backend Submodule -->
	<details>
		<summary><b>backend</b></summary>
		<blockquote>
			<div class='directory-path' style='padding: 8px 0; color: #666;'>
				<code><b>⦿ backend</b></code>
			<table style='width: 100%; border-collapse: collapse;'>
			<thead>
				<tr style='background-color: #f8f9fa;'>
					<th style='width: 30%; text-align: left; padding: 8px;'>File Name</th>
					<th style='text-align: left; padding: 8px;'>Summary</th>
				</tr>
			</thead>
				<tr style='border-bottom: 1px solid #eee;'>
					<td style='padding: 8px;'><b><a href='https://github.com/HydroTuConnais/bookly/blob/master/backend/app.ts'>app.ts</a></b></td>
					<td style='padding: 8px;'>- Establishes the core server functionality for the backend of the application, integrating essential routing for documents, authentication, images, and recovery processes<br>- It configures middleware for JSON parsing and CORS, ensuring secure and flexible communication with the frontend<br>- Additionally, it sets up a cron job for scheduled tasks, facilitating automated processes within the application<br>- Overall, it serves as the backbone for handling API requests and responses.</td>
				</tr>
				<tr style='border-bottom: 1px solid #eee;'>
					<td style='padding: 8px;'><b><a href='https://github.com/HydroTuConnais/bookly/blob/master/backend/Dockerfile'>Dockerfile</a></b></td>
					<td style='padding: 8px;'>- Facilitates the deployment of the backend application in a production environment by creating a lightweight Docker container<br>- It sets up the necessary working directory, installs dependencies, and prepares the application for execution<br>- By exposing the appropriate port and executing the start command, it ensures seamless integration with other components of the codebase, enabling efficient interaction with the PostgreSQL database and overall application functionality.</td>
				</tr>
				<tr style='border-bottom: 1px solid #eee;'>
					<td style='padding: 8px;'><b><a href='https://github.com/HydroTuConnais/bookly/blob/master/backend/tsconfig.json'>tsconfig.json</a></b></td>
					<td style='padding: 8px;'>- Configuration settings define the TypeScript compilation process for the backend of the project<br>- By specifying options such as module type, ECMAScript target, and strict type checking, it ensures a robust development environment<br>- This setup facilitates the inclusion of TypeScript and JavaScript files, while optimizing the output for better debugging and module resolution, ultimately contributing to a maintainable and scalable codebase architecture.</td>
				</tr>
				<tr style='border-bottom: 1px solid #eee;'>
					<td style='padding: 8px;'><b><a href='https://github.com/HydroTuConnais/bookly/blob/master/backend/package.json'>package.json</a></b></td>
					<td style='padding: 8px;'>- Defines the configuration and dependencies for the backend of the project, facilitating the development and execution of a TypeScript-based application<br>- It manages essential packages for server functionality, including Express for routing, Prisma for database interactions, and Nodemon for development convenience<br>- This setup supports building, running, and maintaining a robust backend architecture, enabling seamless integration with front-end components and enhancing overall project efficiency.</td>
				</tr>
				<tr style='border-bottom: 1px solid #eee;'>
					<td style='padding: 8px;'><b><a href='https://github.com/HydroTuConnais/bookly/blob/master/backend/start.sh'>start.sh</a></b></td>
					<td style='padding: 8px;'>- Initiates the database migration process for the backend of the project<br>- By executing the necessary migrations, it ensures that the database schema is up-to-date and aligned with the current application requirements<br>- This step is crucial for maintaining data integrity and supporting the overall functionality of the application within the broader codebase architecture.</td>
				</tr>
			</table>
			<!-- prisma Submodule -->
			<details>
				<summary><b>prisma</b></summary>
				<blockquote>
					<div class='directory-path' style='padding: 8px 0; color: #666;'>
						<code><b>⦿ backend.prisma</b></code>
					<table style='width: 100%; border-collapse: collapse;'>
					<thead>
						<tr style='background-color: #f8f9fa;'>
							<th style='width: 30%; text-align: left; padding: 8px;'>File Name</th>
							<th style='text-align: left; padding: 8px;'>Summary</th>
						</tr>
					</thead>
						<tr style='border-bottom: 1px solid #eee;'>
							<td style='padding: 8px;'><b><a href='https://github.com/HydroTuConnais/bookly/blob/master/backend/prisma/schema.prisma'>schema.prisma</a></b></td>
							<td style='padding: 8px;'>- Defines the Prisma schema for a backend application, establishing the data models and relationships essential for user management and document handling<br>- It facilitates interactions with a PostgreSQL database, enabling efficient data storage and retrieval<br>- The schema supports user roles, document sharing, and image management, contributing to a scalable architecture that enhances query performance and supports serverless deployments.</td>
						</tr>
					</table>
				</blockquote>
			</details>
			<!-- src Submodule -->
			<details>
				<summary><b>src</b></summary>
				<blockquote>
					<div class='directory-path' style='padding: 8px 0; color: #666;'>
						<code><b>⦿ backend.src</b></code>
					<!-- utils Submodule -->
					<details>
						<summary><b>utils</b></summary>
						<blockquote>
							<div class='directory-path' style='padding: 8px 0; color: #666;'>
								<code><b>⦿ backend.src.utils</b></code>
							<table style='width: 100%; border-collapse: collapse;'>
							<thead>
								<tr style='background-color: #f8f9fa;'>
									<th style='width: 30%; text-align: left; padding: 8px;'>File Name</th>
									<th style='text-align: left; padding: 8px;'>Summary</th>
								</tr>
							</thead>
								<tr style='border-bottom: 1px solid #eee;'>
									<td style='padding: 8px;'><b><a href='https://github.com/HydroTuConnais/bookly/blob/master/backend/src/utils/Error.ts'>Error.ts</a></b></td>
									<td style='padding: 8px;'>- ErrorClass serves as a centralized utility for managing error handling within the backend architecture<br>- By encapsulating status codes and messages, it streamlines the process of generating consistent error responses across the application<br>- This enhances maintainability and clarity, ensuring that error information is uniformly structured, which ultimately improves the overall user experience and debugging efficiency.</td>
								</tr>
							</table>
						</blockquote>
					</details>
					<!-- lib Submodule -->
					<details>
						<summary><b>lib</b></summary>
						<blockquote>
							<div class='directory-path' style='padding: 8px 0; color: #666;'>
								<code><b>⦿ backend.src.lib</b></code>
							<table style='width: 100%; border-collapse: collapse;'>
							<thead>
								<tr style='background-color: #f8f9fa;'>
									<th style='width: 30%; text-align: left; padding: 8px;'>File Name</th>
									<th style='text-align: left; padding: 8px;'>Summary</th>
								</tr>
							</thead>
								<tr style='border-bottom: 1px solid #eee;'>
									<td style='padding: 8px;'><b><a href='https://github.com/HydroTuConnais/bookly/blob/master/backend/src/lib/cron.ts'>cron.ts</a></b></td>
									<td style='padding: 8px;'>- Automates the cleanup of outdated recovery email records in the database by executing a scheduled job every 10 minutes<br>- It identifies and removes entries that are older than 10 minutes, ensuring the database remains efficient and free of unnecessary data<br>- This functionality enhances the overall performance and reliability of the application by maintaining a clean state for recovery processes.</td>
								</tr>
								<tr style='border-bottom: 1px solid #eee;'>
									<td style='padding: 8px;'><b><a href='https://github.com/HydroTuConnais/bookly/blob/master/backend/src/lib/resend.ts'>resend.ts</a></b></td>
									<td style='padding: 8px;'>- Facilitates email change and password reset processes by sending confirmation emails to users<br>- It ensures that users receive notifications regarding their requests, enhancing security and user experience<br>- By incorporating dynamic content such as usernames and links, it provides personalized communication while tracking requests through IP and location data, thereby reinforcing the integrity of user account management within the overall project architecture.</td>
								</tr>
							</table>
						</blockquote>
					</details>
					<!-- repository Submodule -->
					<details>
						<summary><b>repository</b></summary>
						<blockquote>
							<div class='directory-path' style='padding: 8px 0; color: #666;'>
								<code><b>⦿ backend.src.repository</b></code>
							<table style='width: 100%; border-collapse: collapse;'>
							<thead>
								<tr style='background-color: #f8f9fa;'>
									<th style='width: 30%; text-align: left; padding: 8px;'>File Name</th>
									<th style='text-align: left; padding: 8px;'>Summary</th>
								</tr>
							</thead>
								<tr style='border-bottom: 1px solid #eee;'>
									<td style='padding: 8px;'><b><a href='https://github.com/HydroTuConnais/bookly/blob/master/backend/src/repository/ImageRepository.ts'>ImageRepository.ts</a></b></td>
									<td style='padding: 8px;'>- ImageRepository serves as a centralized module for managing image data within the backend architecture<br>- It facilitates the creation, updating, retrieval, and deletion of images, ensuring seamless interaction with the database<br>- Additionally, it provides functionality to find images by their unique identifiers and links them to associated documents, thereby enhancing the overall image management capabilities of the application.</td>
								</tr>
								<tr style='border-bottom: 1px solid #eee;'>
									<td style='padding: 8px;'><b><a href='https://github.com/HydroTuConnais/bookly/blob/master/backend/src/repository/RecoveryRepository.ts'>RecoveryRepository.ts</a></b></td>
									<td style='padding: 8px;'>- RecoveryRepository facilitates the management of user recovery processes within the application<br>- It enables the creation and retrieval of recovery emails and passwords, ensuring secure handling of user credentials<br>- Additionally, it provides functionality to delete recovery records, enhancing data integrity and user experience<br>- This repository plays a crucial role in the overall architecture by supporting user account recovery mechanisms efficiently.</td>
								</tr>
								<tr style='border-bottom: 1px solid #eee;'>
									<td style='padding: 8px;'><b><a href='https://github.com/HydroTuConnais/bookly/blob/master/backend/src/repository/AuthRepository.ts'>AuthRepository.ts</a></b></td>
									<td style='padding: 8px;'>- AuthRepository serves as a crucial component of the backend architecture, facilitating user management within the application<br>- It provides essential functionalities such as retrieving user details by email or ID, creating new users, checking for duplicate emails, and updating user information<br>- By leveraging Prisma for database interactions, it ensures efficient and reliable access to user data, supporting the overall authentication and authorization processes of the project.</td>
								</tr>
								<tr style='border-bottom: 1px solid #eee;'>
									<td style='padding: 8px;'><b><a href='https://github.com/HydroTuConnais/bookly/blob/master/backend/src/repository/DocumentRepository.ts'>DocumentRepository.ts</a></b></td>
									<td style='padding: 8px;'>- DocumentRepository serves as a centralized interface for managing document-related operations within the application<br>- It facilitates the retrieval, creation, updating, and deletion of documents, while also supporting features like document sharing, archiving, and favoriting<br>- By providing a structured approach to document management, it enhances user interaction with documents and ensures efficient data handling across the codebase.</td>
								</tr>
							</table>
						</blockquote>
					</details>
					<!-- routes Submodule -->
					<details>
						<summary><b>routes</b></summary>
						<blockquote>
							<div class='directory-path' style='padding: 8px 0; color: #666;'>
								<code><b>⦿ backend.src.routes</b></code>
							<table style='width: 100%; border-collapse: collapse;'>
							<thead>
								<tr style='background-color: #f8f9fa;'>
									<th style='width: 30%; text-align: left; padding: 8px;'>File Name</th>
									<th style='text-align: left; padding: 8px;'>Summary</th>
								</tr>
							</thead>
								<tr style='border-bottom: 1px solid #eee;'>
									<td style='padding: 8px;'><b><a href='https://github.com/HydroTuConnais/bookly/blob/master/backend/src/routes/RecoveryRoutes.ts'>RecoveryRoutes.ts</a></b></td>
									<td style='padding: 8px;'>- RecoveryRoutes facilitates user account recovery processes within the application<br>- It defines endpoints for sending recovery emails, verifying tokens, and resetting passwords, ensuring secure authentication through middleware<br>- By integrating with the RecoveryController, it streamlines user interactions related to account recovery, enhancing overall user experience and security in the codebase architecture.</td>
								</tr>
								<tr style='border-bottom: 1px solid #eee;'>
									<td style='padding: 8px;'><b><a href='https://github.com/HydroTuConnais/bookly/blob/master/backend/src/routes/AuthRoutes.ts'>AuthRoutes.ts</a></b></td>
									<td style='padding: 8px;'>- AuthRoutes facilitates user authentication and management within the application<br>- It defines endpoints for user registration, login, and profile management, ensuring secure access through authentication middleware<br>- By providing functionalities such as user retrieval and password updates, it plays a crucial role in maintaining user sessions and data integrity, thereby enhancing the overall user experience in the codebase architecture.</td>
								</tr>
								<tr style='border-bottom: 1px solid #eee;'>
									<td style='padding: 8px;'><b><a href='https://github.com/HydroTuConnais/bookly/blob/master/backend/src/routes/ImageRoutes.ts'>ImageRoutes.ts</a></b></td>
									<td style='padding: 8px;'>- ImageRoutes facilitates image management within the backend architecture by providing endpoints for uploading, retrieving, and deleting images<br>- It utilizes multer for handling file uploads, ensuring that only valid image files are processed and stored in a designated directory<br>- This routing module integrates seamlessly with the ImageController, enabling efficient image operations while maintaining a structured approach to file handling and storage.</td>
								</tr>
								<tr style='border-bottom: 1px solid #eee;'>
									<td style='padding: 8px;'><b><a href='https://github.com/HydroTuConnais/bookly/blob/master/backend/src/routes/DocumentRoutes.ts'>DocumentRoutes.ts</a></b></td>
									<td style='padding: 8px;'>- DocumentRoutes serves as a crucial component of the backend architecture, facilitating the management and retrieval of document-related data<br>- It defines various endpoints for operations such as creating, updating, archiving, and sharing documents, while ensuring user authentication<br>- This structure enhances the overall functionality of the application by providing a comprehensive interface for document interactions, thereby streamlining user experience and data management.</td>
								</tr>
							</table>
						</blockquote>
					</details>
					<!-- controllers Submodule -->
					<details>
						<summary><b>controllers</b></summary>
						<blockquote>
							<div class='directory-path' style='padding: 8px 0; color: #666;'>
								<code><b>⦿ backend.src.controllers</b></code>
							<table style='width: 100%; border-collapse: collapse;'>
							<thead>
								<tr style='background-color: #f8f9fa;'>
									<th style='width: 30%; text-align: left; padding: 8px;'>File Name</th>
									<th style='text-align: left; padding: 8px;'>Summary</th>
								</tr>
							</thead>
								<tr style='border-bottom: 1px solid #eee;'>
									<td style='padding: 8px;'><b><a href='https://github.com/HydroTuConnais/bookly/blob/master/backend/src/controllers/ImageController.ts'>ImageController.ts</a></b></td>
									<td style='padding: 8px;'>- ImageController facilitates image management within the application by providing endpoints for uploading, retrieving, and deleting images<br>- It interacts with the ImageService to handle image data and metadata, ensuring seamless integration with the overall backend architecture<br>- This controller enhances user experience by enabling efficient image storage and retrieval, while also managing error responses to maintain robust application functionality.</td>
								</tr>
								<tr style='border-bottom: 1px solid #eee;'>
									<td style='padding: 8px;'><b><a href='https://github.com/HydroTuConnais/bookly/blob/master/backend/src/controllers/AuthController.ts'>AuthController.ts</a></b></td>
									<td style='padding: 8px;'>- AuthController facilitates user authentication and management within the application<br>- It provides essential functionalities such as user registration, login, password verification, and user profile retrieval<br>- Additionally, it supports administrative actions like fetching all users and updating user details<br>- By leveraging JWT for secure token management, it ensures that user interactions are both authenticated and authorized, contributing to the overall security and integrity of the codebase architecture.</td>
								</tr>
								<tr style='border-bottom: 1px solid #eee;'>
									<td style='padding: 8px;'><b><a href='https://github.com/HydroTuConnais/bookly/blob/master/backend/src/controllers/DocumentController.ts'>DocumentController.ts</a></b></td>
									<td style='padding: 8px;'>- DocumentController manages document-related operations within the application, facilitating user interactions such as retrieving, creating, updating, and deleting documents<br>- It ensures secure access through user authentication and authorization, particularly for admin actions<br>- Additionally, it supports features like document sharing, archiving, and favoriting, thereby enhancing user experience and document management capabilities across the codebase.</td>
								</tr>
								<tr style='border-bottom: 1px solid #eee;'>
									<td style='padding: 8px;'><b><a href='https://github.com/HydroTuConnais/bookly/blob/master/backend/src/controllers/RecoveryController.ts'>RecoveryController.ts</a></b></td>
									<td style='padding: 8px;'>- RecoveryController facilitates user account recovery processes, including email and password changes<br>- It manages the sending of recovery emails, updates user information, and verifies tokens for secure operations<br>- By integrating with AuthService and RecoveryService, it ensures that users can efficiently recover their accounts while maintaining security and tracking request information, thereby enhancing the overall user experience within the application.</td>
								</tr>
							</table>
						</blockquote>
					</details>
					<!-- service Submodule -->
					<details>
						<summary><b>service</b></summary>
						<blockquote>
							<div class='directory-path' style='padding: 8px 0; color: #666;'>
								<code><b>⦿ backend.src.service</b></code>
							<table style='width: 100%; border-collapse: collapse;'>
							<thead>
								<tr style='background-color: #f8f9fa;'>
									<th style='width: 30%; text-align: left; padding: 8px;'>File Name</th>
									<th style='text-align: left; padding: 8px;'>Summary</th>
								</tr>
							</thead>
								<tr style='border-bottom: 1px solid #eee;'>
									<td style='padding: 8px;'><b><a href='https://github.com/HydroTuConnais/bookly/blob/master/backend/src/service/RecoveryService.ts'>RecoveryService.ts</a></b></td>
									<td style='padding: 8px;'>- RecoveryService facilitates the management of user recovery processes within the application<br>- It handles the registration of recovery emails and passwords, retrieves recovery identifiers based on previous emails, and allows for the deletion of recovery records<br>- By ensuring secure and efficient recovery operations, it plays a crucial role in enhancing user experience and maintaining account security across the codebase.</td>
								</tr>
								<tr style='border-bottom: 1px solid #eee;'>
									<td style='padding: 8px;'><b><a href='https://github.com/HydroTuConnais/bookly/blob/master/backend/src/service/AuthService.ts'>AuthService.ts</a></b></td>
									<td style='padding: 8px;'>- AuthService provides essential functionalities for user authentication and management within the backend architecture<br>- It facilitates user registration, login, and token verification while ensuring secure password handling through hashing<br>- Additionally, it supports user role checks and updates, enabling administrative oversight<br>- By integrating with the AuthRepository, it streamlines user data interactions, contributing to a robust and secure authentication system for the overall application.</td>
								</tr>
								<tr style='border-bottom: 1px solid #eee;'>
									<td style='padding: 8px;'><b><a href='https://github.com/HydroTuConnais/bookly/blob/master/backend/src/service/DocumentService.ts'>DocumentService.ts</a></b></td>
									<td style='padding: 8px;'>- DocumentService provides a comprehensive set of functionalities for managing documents within the application<br>- It facilitates operations such as retrieving, creating, updating, deleting, archiving, and restoring documents, while ensuring proper user authentication and authorization<br>- Additionally, it supports document sharing, favoriting, and searching, thereby enhancing user collaboration and document organization in the overall codebase architecture.</td>
								</tr>
								<tr style='border-bottom: 1px solid #eee;'>
									<td style='padding: 8px;'><b><a href='https://github.com/HydroTuConnais/bookly/blob/master/backend/src/service/ImageService.ts'>ImageService.ts</a></b></td>
									<td style='padding: 8px;'>- ImageService facilitates the management of image data within the application, enabling functionalities such as saving, updating, retrieving, and deleting images<br>- By interacting with the ImageRepository and DocumentRepository, it ensures that image metadata is accurately stored and maintained, while also handling file operations<br>- This service plays a crucial role in the overall architecture by providing a centralized interface for image-related operations, enhancing the applications media management capabilities.</td>
								</tr>
							</table>
						</blockquote>
					</details>
				</blockquote>
			</details>
			<!-- postman Submodule -->
			<details>
				<summary><b>postman</b></summary>
				<blockquote>
					<div class='directory-path' style='padding: 8px 0; color: #666;'>
						<code><b>⦿ backend.postman</b></code>
					<table style='width: 100%; border-collapse: collapse;'>
					<thead>
						<tr style='background-color: #f8f9fa;'>
							<th style='width: 30%; text-align: left; padding: 8px;'>File Name</th>
							<th style='text-align: left; padding: 8px;'>Summary</th>
						</tr>
					</thead>
						<tr style='border-bottom: 1px solid #eee;'>
							<td style='padding: 8px;'><b><a href='https://github.com/HydroTuConnais/bookly/blob/master/backend/postman/Document API.postman_collection.json'>Document API.postman_collection.json</a></b></td>
							<td style='padding: 8px;'>- Document API serves as a comprehensive collection of endpoints designed to manage document-related operations within the application<br>- It facilitates the creation, deletion, archiving, restoration, and retrieval of documents, enhancing user interaction with document management features<br>- By providing a structured interface for these functionalities, it streamlines the overall architecture of the backend, ensuring efficient data handling and user experience.</td>
						</tr>
						<tr style='border-bottom: 1px solid #eee;'>
							<td style='padding: 8px;'><b><a href='https://github.com/HydroTuConnais/bookly/blob/master/backend/postman/Auth.postman_collection.json'>Auth.postman_collection.json</a></b></td>
							<td style='padding: 8px;'>- Auth postman collection facilitates the testing and validation of authentication endpoints within the backend architecture<br>- It includes requests for user registration, login, and token verification, enabling developers to simulate and verify user interactions with the authentication system<br>- This collection serves as a crucial tool for ensuring the reliability and security of user authentication processes in the overall application framework.</td>
						</tr>
					</table>
				</blockquote>
			</details>
		</blockquote>
	</details>
	<!-- frontend Submodule -->
	<details>
		<summary><b>frontend</b></summary>
		<blockquote>
			<div class='directory-path' style='padding: 8px 0; color: #666;'>
				<code><b>⦿ frontend</b></code>
			<table style='width: 100%; border-collapse: collapse;'>
			<thead>
				<tr style='background-color: #f8f9fa;'>
					<th style='width: 30%; text-align: left; padding: 8px;'>File Name</th>
					<th style='text-align: left; padding: 8px;'>Summary</th>
				</tr>
			</thead>
				<tr style='border-bottom: 1px solid #eee;'>
					<td style='padding: 8px;'><b><a href='https://github.com/HydroTuConnais/bookly/blob/master/frontend/postcss.config.js'>postcss.config.js</a></b></td>
					<td style='padding: 8px;'>- Configures PostCSS to enhance the styling capabilities of the frontend by integrating Tailwind CSS for utility-first design and Autoprefixer for automatic vendor prefixing<br>- This setup streamlines the development process, ensuring consistent and responsive styling across various browsers, thereby contributing to a more efficient and maintainable codebase architecture.</td>
				</tr>
				<tr style='border-bottom: 1px solid #eee;'>
					<td style='padding: 8px;'><b><a href='https://github.com/HydroTuConnais/bookly/blob/master/frontend/tailwind.config.js'>tailwind.config.js</a></b></td>
					<td style='padding: 8px;'>- Configures Tailwind CSS for a frontend application, enabling a responsive and customizable design system<br>- It establishes dark mode support, defines content sources for styling, and extends the theme with a comprehensive color palette and animations<br>- This setup enhances the user interface by ensuring consistent styling across various components and pages, ultimately contributing to a cohesive and visually appealing user experience.</td>
				</tr>
				<tr style='border-bottom: 1px solid #eee;'>
					<td style='padding: 8px;'><b><a href='https://github.com/HydroTuConnais/bookly/blob/master/frontend/nginx.conf'>nginx.conf</a></b></td>
					<td style='padding: 8px;'>- Configures an Nginx server to handle HTTP and HTTPS traffic for the application hosted at maant.dipsw-ccicampus.dev<br>- It ensures secure connections by redirecting HTTP requests to HTTPS and serves static files from a specified directory<br>- Additionally, it facilitates API requests by proxying them to a backend service, enhancing the overall architectures efficiency and security.</td>
				</tr>
				<tr style='border-bottom: 1px solid #eee;'>
					<td style='padding: 8px;'><b><a href='https://github.com/HydroTuConnais/bookly/blob/master/frontend/Dockerfile'>Dockerfile</a></b></td>
					<td style='padding: 8px;'>- Facilitates the building and deployment of a frontend application using Node.js and Nginx<br>- It sets up a development environment, installs dependencies, compiles the application, and configures Nginx to serve the built assets<br>- Additionally, it incorporates SSL certificates for secure connections, ensuring a robust and secure user experience within the overall project architecture.</td>
				</tr>
				<tr style='border-bottom: 1px solid #eee;'>
					<td style='padding: 8px;'><b><a href='https://github.com/HydroTuConnais/bookly/blob/master/frontend/config-overrides.js'>config-overrides.js</a></b></td>
					<td style='padding: 8px;'>- Configures the Webpack setup for the frontend of the project by establishing path aliases for easier module resolution and integrating Babel for JavaScript transpilation<br>- Additionally, it customizes the development server settings to prevent automatic browser opening upon startup<br>- This enhances the development experience and streamlines the code organization within the overall architecture of the application.</td>
				</tr>
				<tr style='border-bottom: 1px solid #eee;'>
					<td style='padding: 8px;'><b><a href='https://github.com/HydroTuConnais/bookly/blob/master/frontend/tsconfig.json'>tsconfig.json</a></b></td>
					<td style='padding: 8px;'>- Configuration of TypeScript compiler options facilitates the development of a React-based frontend application<br>- It ensures strict type-checking, supports modern JavaScript features, and enables seamless integration of TypeScript with JavaScript files<br>- By defining module resolution and path aliases, it enhances code organization and maintainability, ultimately contributing to a robust and scalable architecture for the overall project.</td>
				</tr>
				<tr style='border-bottom: 1px solid #eee;'>
					<td style='padding: 8px;'><b><a href='https://github.com/HydroTuConnais/bookly/blob/master/frontend/components.json'>components.json</a></b></td>
					<td style='padding: 8px;'>- Defines the configuration for the frontend components of the project, establishing a structured approach to styling and component management<br>- It integrates Tailwind CSS for design consistency, sets up aliases for streamlined imports, and specifies the use of an icon library<br>- This foundational setup enhances the overall architecture by promoting modularity and maintainability across the codebase.</td>
				</tr>
				<tr style='border-bottom: 1px solid #eee;'>
					<td style='padding: 8px;'><b><a href='https://github.com/HydroTuConnais/bookly/blob/master/frontend/package.json'>package.json</a></b></td>
					<td style='padding: 8px;'>- Defines the configuration and dependencies for the Bookly React frontend application, facilitating the development and build processes<br>- It integrates various libraries for UI components, state management, form handling, and routing, ensuring a robust user experience<br>- Additionally, it sets up scripts for development, testing, and production builds, streamlining the workflow for developers working on the project.</td>
				</tr>
			</table>
			<!-- src Submodule -->
			<details>
				<summary><b>src</b></summary>
				<blockquote>
					<div class='directory-path' style='padding: 8px 0; color: #666;'>
						<code><b>⦿ frontend.src</b></code>
					<table style='width: 100%; border-collapse: collapse;'>
					<thead>
						<tr style='background-color: #f8f9fa;'>
							<th style='width: 30%; text-align: left; padding: 8px;'>File Name</th>
							<th style='text-align: left; padding: 8px;'>Summary</th>
						</tr>
					</thead>
						<tr style='border-bottom: 1px solid #eee;'>
							<td style='padding: 8px;'><b><a href='https://github.com/HydroTuConnais/bookly/blob/master/frontend/src/index.tsx'>index.tsx</a></b></td>
							<td style='padding: 8px;'>- Initializes the React application by rendering the main App component within a structured environment that supports routing and data fetching<br>- It sets up a QueryClient for managing server state and wraps the application in a Router for navigation, ensuring a seamless user experience<br>- This foundational setup is crucial for the overall architecture, enabling efficient data handling and routing capabilities throughout the application.</td>
						</tr>
						<tr style='border-bottom: 1px solid #eee;'>
							<td style='padding: 8px;'><b><a href='https://github.com/HydroTuConnais/bookly/blob/master/frontend/src/App.tsx'>App.tsx</a></b></td>
							<td style='padding: 8px;'>- Facilitates the core user interface of the application by establishing routing and context providers for various functionalities<br>- It integrates essential pages such as marketing, document management, and recovery, while ensuring a cohesive theme and user experience<br>- The architecture supports dynamic content rendering and state management, enhancing the overall interactivity and responsiveness of the frontend application.</td>
						</tr>
					</table>
					<!-- pages Submodule -->
					<details>
						<summary><b>pages</b></summary>
						<blockquote>
							<div class='directory-path' style='padding: 8px 0; color: #666;'>
								<code><b>⦿ frontend.src.pages</b></code>
							<table style='width: 100%; border-collapse: collapse;'>
							<thead>
								<tr style='background-color: #f8f9fa;'>
									<th style='width: 30%; text-align: left; padding: 8px;'>File Name</th>
									<th style='text-align: left; padding: 8px;'>Summary</th>
								</tr>
							</thead>
								<tr style='border-bottom: 1px solid #eee;'>
									<td style='padding: 8px;'><b><a href='https://github.com/HydroTuConnais/bookly/blob/master/frontend/src/pages/NotChange.tsx'>NotChange.tsx</a></b></td>
									<td style='padding: 8px;'>- Displays an error message when a user encounters issues while attempting to change their email or password<br>- Utilizing parameters from the URL, it provides specific feedback based on the type of error, enhancing user experience by guiding them on what went wrong<br>- The layout is designed to be visually appealing and responsive, ensuring clarity and support during error scenarios within the application.</td>
								</tr>
								<tr style='border-bottom: 1px solid #eee;'>
									<td style='padding: 8px;'><b><a href='https://github.com/HydroTuConnais/bookly/blob/master/frontend/src/pages/NotPublish.tsx'>NotPublish.tsx</a></b></td>
									<td style='padding: 8px;'>- NotPublishPage serves as a user-friendly interface for handling scenarios where a requested page is either unavailable or access is restricted<br>- It effectively communicates the issue to users through a visually appealing layout, combining informative text with illustrative imagery<br>- This component enhances the overall user experience by providing clear feedback and maintaining consistent design across the application.</td>
								</tr>
								<tr style='border-bottom: 1px solid #eee;'>
									<td style='padding: 8px;'><b><a href='https://github.com/HydroTuConnais/bookly/blob/master/frontend/src/pages/404.tsx'>404.tsx</a></b></td>
									<td style='padding: 8px;'>- Provides a user-friendly 404 error page that enhances the overall user experience by clearly communicating when a requested page is not found<br>- It offers a visually appealing layout with an option to navigate back to the home documents page, ensuring users can easily recover from navigation errors<br>- This component integrates seamlessly into the frontend architecture, contributing to a cohesive and responsive web application.</td>
								</tr>
							</table>
							<!-- main Submodule -->
							<details>
								<summary><b>main</b></summary>
								<blockquote>
									<div class='directory-path' style='padding: 8px 0; color: #666;'>
										<code><b>⦿ frontend.src.pages.main</b></code>
									<!-- components Submodule -->
									<details>
										<summary><b>components</b></summary>
										<blockquote>
											<div class='directory-path' style='padding: 8px 0; color: #666;'>
												<code><b>⦿ frontend.src.pages.main.components</b></code>
											<table style='width: 100%; border-collapse: collapse;'>
											<thead>
												<tr style='background-color: #f8f9fa;'>
													<th style='width: 30%; text-align: left; padding: 8px;'>File Name</th>
													<th style='text-align: left; padding: 8px;'>Summary</th>
												</tr>
											</thead>
												<tr style='border-bottom: 1px solid #eee;'>
													<td style='padding: 8px;'><b><a href='https://github.com/HydroTuConnais/bookly/blob/master/frontend/src/pages/main/components/trash-box.tsx'>trash-box.tsx</a></b></td>
													<td style='padding: 8px;'>- TrashBox component facilitates the management of archived documents within the application<br>- It allows users to search for specific documents, restore them back to active status, or permanently delete them<br>- By integrating with the document context and utilizing modals for confirmation, it enhances user interaction while maintaining a clean and organized interface for document retrieval and management.</td>
												</tr>
												<tr style='border-bottom: 1px solid #eee;'>
													<td style='padding: 8px;'><b><a href='https://github.com/HydroTuConnais/bookly/blob/master/frontend/src/pages/main/components/favorite-list.tsx'>favorite-list.tsx</a></b></td>
													<td style='padding: 8px;'>- Facilitates the display and interaction with a users favorite documents within the application<br>- It retrieves and manages the favorite documents based on the provided parent ID, allowing users to expand and view additional details<br>- The component enhances user navigation by enabling redirection to specific documents and dynamically updates the view as favorites change, contributing to a seamless user experience in the overall codebase architecture.</td>
												</tr>
												<tr style='border-bottom: 1px solid #eee;'>
													<td style='padding: 8px;'><b><a href='https://github.com/HydroTuConnais/bookly/blob/master/frontend/src/pages/main/components/animation.js'>animation.js</a></b></td>
													<td style='padding: 8px;'>- Animation functions enhance user experience by providing engaging visual transitions throughout the application<br>- Key features include a preloader animation that smoothly introduces the landing page, menu opening and closing animations that create a dynamic navigation experience, and various reusable animations for elements like text and shapes<br>- These animations contribute to a polished and interactive interface, aligning with the overall architectures focus on user engagement and aesthetic appeal.</td>
												</tr>
												<tr style='border-bottom: 1px solid #eee;'>
													<td style='padding: 8px;'><b><a href='https://github.com/HydroTuConnais/bookly/blob/master/frontend/src/pages/main/components/publish.tsx'>publish.tsx</a></b></td>
													<td style='padding: 8px;'>- Publish component facilitates the publishing and unpublishing of notes within the application<br>- It provides users with a user-friendly interface to manage the visibility of their notes, allowing them to share content easily via a generated URL<br>- Additionally, it incorporates feedback mechanisms to inform users of the publishing status and offers clipboard functionality for easy sharing<br>- This enhances the overall user experience in the content management workflow.</td>
												</tr>
												<tr style='border-bottom: 1px solid #eee;'>
													<td style='padding: 8px;'><b><a href='https://github.com/HydroTuConnais/bookly/blob/master/frontend/src/pages/main/components/user-item.tsx'>user-item.tsx</a></b></td>
													<td style='padding: 8px;'>- UserItem component enhances user interaction by displaying user information and providing a dropdown menu for actions<br>- It showcases the users avatar and name, while allowing easy access to logout functionality<br>- Integrated with authentication context, it ensures real-time updates of user data, contributing to a seamless user experience within the broader application architecture focused on user management and engagement.</td>
												</tr>
												<tr style='border-bottom: 1px solid #eee;'>
													<td style='padding: 8px;'><b><a href='https://github.com/HydroTuConnais/bookly/blob/master/frontend/src/pages/main/components/card-add.tsx'>card-add.tsx</a></b></td>
													<td style='padding: 8px;'>- CardAdd serves as a user interface component within the project, designed to facilitate the addition of new pages<br>- Its visually appealing layout, featuring a prominent + symbol and a subtle hover effect, enhances user engagement<br>- Positioned within the broader architecture, this component contributes to a seamless and interactive experience, encouraging users to expand their content effortlessly.</td>
												</tr>
												<tr style='border-bottom: 1px solid #eee;'>
													<td style='padding: 8px;'><b><a href='https://github.com/HydroTuConnais/bookly/blob/master/frontend/src/pages/main/components/navigation.tsx'>navigation.tsx</a></b></td>
													<td style='padding: 8px;'>- Navigation component facilitates user interaction within the application by providing a sidebar and a responsive navbar<br>- It enables document management features such as creating, favoriting, and accessing archived documents, while adapting to different screen sizes<br>- Additionally, it integrates user settings and search functionalities, enhancing the overall user experience and accessibility of the application’s core features.</td>
												</tr>
												<tr style='border-bottom: 1px solid #eee;'>
													<td style='padding: 8px;'><b><a href='https://github.com/HydroTuConnais/bookly/blob/master/frontend/src/pages/main/components/document-list.tsx'>document-list.tsx</a></b></td>
													<td style='padding: 8px;'>- Facilitates the display and interaction with a hierarchical list of documents within the application<br>- It retrieves documents based on a parent ID, allowing users to expand and navigate through nested document structures<br>- By integrating with context and query hooks, it ensures real-time updates and efficient data fetching, enhancing user experience in managing and accessing documents seamlessly.</td>
												</tr>
												<tr style='border-bottom: 1px solid #eee;'>
													<td style='padding: 8px;'><b><a href='https://github.com/HydroTuConnais/bookly/blob/master/frontend/src/pages/main/components/tooltip.tsx'>tooltip.tsx</a></b></td>
													<td style='padding: 8px;'>- Provides a Tooltip component designed to enhance user experience by displaying contextual information<br>- Positioned dynamically, it overlays text on the main content, ensuring visibility and accessibility<br>- This component integrates seamlessly into the broader frontend architecture, allowing developers to enrich interactive elements with informative tooltips, thereby improving usability and engagement within the application.</td>
												</tr>
												<tr style='border-bottom: 1px solid #eee;'>
													<td style='padding: 8px;'><b><a href='https://github.com/HydroTuConnais/bookly/blob/master/frontend/src/pages/main/components/cover.tsx'>cover.tsx</a></b></td>
													<td style='padding: 8px;'>- Cover component facilitates the display and management of a cover image within the application<br>- It allows users to reposition the image and delete it if necessary, enhancing the user experience by providing interactive controls<br>- Integrated with context hooks, it updates the document state and image offset dynamically, ensuring a seamless interaction with the overall codebase architecture focused on document management and image handling.</td>
												</tr>
												<tr style='border-bottom: 1px solid #eee;'>
													<td style='padding: 8px;'><b><a href='https://github.com/HydroTuConnais/bookly/blob/master/frontend/src/pages/main/components/navbar.tsx'>navbar.tsx</a></b></td>
													<td style='padding: 8px;'>- Facilitates the rendering of a responsive navigation bar within the application, integrating document management functionalities<br>- It retrieves and displays document details, handles loading states, and navigates users to a 404 page if documents are unavailable<br>- Additionally, it incorporates components for document publishing and menu options, enhancing user interaction while providing contextual information about archived documents.</td>
												</tr>
												<tr style='border-bottom: 1px solid #eee;'>
													<td style='padding: 8px;'><b><a href='https://github.com/HydroTuConnais/bookly/blob/master/frontend/src/pages/main/components/item.tsx'>item.tsx</a></b></td>
													<td style='padding: 8px;'>- Item component facilitates the display and interaction with documents within the application<br>- It allows users to create, archive, and favorite documents while providing a dropdown menu for additional actions<br>- The component enhances user experience by visually indicating document hierarchy and status, and it integrates seamlessly with authentication and theme contexts, ensuring a cohesive and responsive interface for managing documents.</td>
												</tr>
												<tr style='border-bottom: 1px solid #eee;'>
													<td style='padding: 8px;'><b><a href='https://github.com/HydroTuConnais/bookly/blob/master/frontend/src/pages/main/components/title.tsx'>title.tsx</a></b></td>
													<td style='padding: 8px;'>- Title component facilitates the editing and display of document titles within the application<br>- It allows users to switch between viewing and editing modes, updating the title in real-time while ensuring synchronization with the backend<br>- By leveraging React hooks and context, it enhances user interaction and maintains data consistency across the application, contributing to a seamless document management experience.</td>
												</tr>
												<tr style='border-bottom: 1px solid #eee;'>
													<td style='padding: 8px;'><b><a href='https://github.com/HydroTuConnais/bookly/blob/master/frontend/src/pages/main/components/card-document.tsx'>card-document.tsx</a></b></td>
													<td style='padding: 8px;'>- CardDocument serves as a visually engaging component within the projects frontend architecture, designed to display document-related information in a user-friendly format<br>- It showcases an image, relevant details about the document, and the current users avatar, enhancing the overall user experience<br>- By integrating user authentication context, it personalizes the display, indicating the document's status and ownership, thereby fostering interaction and clarity in the application.</td>
												</tr>
												<tr style='border-bottom: 1px solid #eee;'>
													<td style='padding: 8px;'><b><a href='https://github.com/HydroTuConnais/bookly/blob/master/frontend/src/pages/main/components/toolbar.tsx'>toolbar.tsx</a></b></td>
													<td style='padding: 8px;'>- Toolbar component facilitates user interaction with document titles in a dynamic and intuitive manner<br>- It allows users to edit titles, select icons, and add cover images, enhancing the overall document management experience<br>- By integrating with the applications context and query management, it ensures real-time updates and a seamless user interface, contributing significantly to the projects architecture focused on collaborative document editing.</td>
												</tr>
												<tr style='border-bottom: 1px solid #eee;'>
													<td style='padding: 8px;'><b><a href='https://github.com/HydroTuConnais/bookly/blob/master/frontend/src/pages/main/components/editor.tsx'>editor.tsx</a></b></td>
													<td style='padding: 8px;'>- Provides a rich text editing experience within the application, enabling users to create and modify content seamlessly<br>- By integrating the BlockNote editor, it allows for dynamic content management while supporting both light and dark themes<br>- The component captures changes in real-time, ensuring that updates are reflected immediately, thus enhancing user interaction and engagement with the content creation process.</td>
												</tr>
												<tr style='border-bottom: 1px solid #eee;'>
													<td style='padding: 8px;'><b><a href='https://github.com/HydroTuConnais/bookly/blob/master/frontend/src/pages/main/components/menu.tsx'>menu.tsx</a></b></td>
													<td style='padding: 8px;'>- Provides a user-friendly dropdown menu component for managing document actions within the application<br>- It enables users to archive documents seamlessly while displaying relevant user information<br>- The component enhances the overall user experience by integrating toast notifications for feedback and adapting to the current theme, ensuring a consistent and visually appealing interface across the application.</td>
												</tr>
												<tr style='border-bottom: 1px solid #eee;'>
													<td style='padding: 8px;'><b><a href='https://github.com/HydroTuConnais/bookly/blob/master/frontend/src/pages/main/components/banner.tsx'>banner.tsx</a></b></td>
													<td style='padding: 8px;'>- Banner component facilitates user interaction with documents that are in the trash<br>- It provides options to restore or permanently delete a document, enhancing user experience by allowing easy management of document states<br>- By integrating with context hooks for document operations and utilizing toast notifications for feedback, it ensures a seamless and responsive interface within the broader application architecture focused on document management.</td>
												</tr>
												<tr style='border-bottom: 1px solid #eee;'>
													<td style='padding: 8px;'><b><a href='https://github.com/HydroTuConnais/bookly/blob/master/frontend/src/pages/main/components/preloader.tsx'>preloader.tsx</a></b></td>
													<td style='padding: 8px;'>- Provides a visually engaging preloader component for the Bookly application, enhancing user experience during loading times<br>- By displaying a welcoming message, it sets a friendly tone for users as they navigate the platform<br>- This component integrates seamlessly within the frontend architecture, contributing to the overall aesthetic and functionality of the application while ensuring a smooth transition into the main content.</td>
												</tr>
											</table>
											<!-- icon Submodule -->
											<details>
												<summary><b>icon</b></summary>
												<blockquote>
													<div class='directory-path' style='padding: 8px 0; color: #666;'>
														<code><b>⦿ frontend.src.pages.main.components.icon</b></code>
													<table style='width: 100%; border-collapse: collapse;'>
													<thead>
														<tr style='background-color: #f8f9fa;'>
															<th style='width: 30%; text-align: left; padding: 8px;'>File Name</th>
															<th style='text-align: left; padding: 8px;'>Summary</th>
														</tr>
													</thead>
														<tr style='border-bottom: 1px solid #eee;'>
															<td style='padding: 8px;'><b><a href='https://github.com/HydroTuConnais/bookly/blob/master/frontend/src/pages/main/components/icon/file-icon.tsx'>file-icon.tsx</a></b></td>
															<td style='padding: 8px;'>- BookTextIcon serves as an interactive visual component within the frontend architecture, enhancing user engagement through animated SVG graphics<br>- By responding to mouse events, it provides a dynamic experience that draws attention to the icon, contributing to a polished and responsive user interface<br>- This component plays a crucial role in maintaining a cohesive design language across the application.</td>
														</tr>
														<tr style='border-bottom: 1px solid #eee;'>
															<td style='padding: 8px;'><b><a href='https://github.com/HydroTuConnais/bookly/blob/master/frontend/src/pages/main/components/icon/emoji.json'>emoji.json</a></b></td>
															<td style='padding: 8px;'>- Emoji Data JSON## SummaryThe <code>emoji.json</code> file serves as a centralized repository of emoji data for the frontend of the project<br>- It contains structured information about various emojis, including their visual representation, descriptions, categories, aliases, and relevant tags<br>- This data is essential for enhancing user interaction within the application, allowing users to easily access and utilize emojis in their communications or content creation.By providing a comprehensive list of emojis along with their attributes, this file supports features such as emoji selection, search functionality, and categorization, contributing to a more engaging and expressive user experience<br>- The integration of this emoji data into the broader codebase architecture ensures that the application can effectively leverage these visual elements, aligning with the overall goal of fostering user creativity and communication.</td>
														</tr>
													</table>
												</blockquote>
											</details>
										</blockquote>
									</details>
									<!-- (preview) Submodule -->
									<details>
										<summary><b>(preview)</b></summary>
										<blockquote>
											<div class='directory-path' style='padding: 8px 0; color: #666;'>
												<code><b>⦿ frontend.src.pages.main.(preview)</b></code>
											<table style='width: 100%; border-collapse: collapse;'>
											<thead>
												<tr style='background-color: #f8f9fa;'>
													<th style='width: 30%; text-align: left; padding: 8px;'>File Name</th>
													<th style='text-align: left; padding: 8px;'>Summary</th>
												</tr>
											</thead>
												<tr style='border-bottom: 1px solid #eee;'>
													<td style='padding: 8px;'><b><a href='https://github.com/HydroTuConnais/bookly/blob/master/frontend/src/pages/main/(preview)/page.tsx'>page.tsx</a></b></td>
													<td style='padding: 8px;'>- Facilitates the rendering of a preview page within the application, utilizing a layout component to maintain consistent design<br>- It dynamically retrieves a document ID from the URL parameters, allowing for the display of specific content related to that document<br>- This component plays a crucial role in enhancing user experience by providing a focused view of individual documents in the broader application architecture.</td>
												</tr>
												<tr style='border-bottom: 1px solid #eee;'>
													<td style='padding: 8px;'><b><a href='https://github.com/HydroTuConnais/bookly/blob/master/frontend/src/pages/main/(preview)/layout.tsx'>layout.tsx</a></b></td>
													<td style='padding: 8px;'>- Provides a layout component that manages user authentication and rendering of child components within the application<br>- It ensures that users are authenticated before accessing the main content, displaying a loading state during authentication checks<br>- By integrating with the authentication context, it enhances user experience and security, contributing to the overall architecture by maintaining a structured and protected interface for the application.</td>
												</tr>
											</table>
											<!-- [preview] Submodule -->
											<details>
												<summary><b>[preview]</b></summary>
												<blockquote>
													<div class='directory-path' style='padding: 8px 0; color: #666;'>
														<code><b>⦿ frontend.src.pages.main.(preview).[preview]</b></code>
													<table style='width: 100%; border-collapse: collapse;'>
													<thead>
														<tr style='background-color: #f8f9fa;'>
															<th style='width: 30%; text-align: left; padding: 8px;'>File Name</th>
															<th style='text-align: left; padding: 8px;'>Summary</th>
														</tr>
													</thead>
														<tr style='border-bottom: 1px solid #eee;'>
															<td style='padding: 8px;'><b><a href='https://github.com/HydroTuConnais/bookly/blob/master/frontend/src/pages/main/(preview)/[preview]/page.tsx'>page.tsx</a></b></td>
															<td style='padding: 8px;'>- PreviewPageId component facilitates the display of a document preview within the application<br>- It retrieves document data and image offsets, ensuring that only published documents are accessible<br>- The component integrates a toolbar and an editor for a seamless user experience, while also managing loading states and potential errors<br>- Overall, it enhances the document viewing process by providing essential functionalities and a polished interface.</td>
														</tr>
													</table>
												</blockquote>
											</details>
										</blockquote>
									</details>
									<!-- (document) Submodule -->
									<details>
										<summary><b>(document)</b></summary>
										<blockquote>
											<div class='directory-path' style='padding: 8px 0; color: #666;'>
												<code><b>⦿ frontend.src.pages.main.(document)</b></code>
											<table style='width: 100%; border-collapse: collapse;'>
											<thead>
												<tr style='background-color: #f8f9fa;'>
													<th style='width: 30%; text-align: left; padding: 8px;'>File Name</th>
													<th style='text-align: left; padding: 8px;'>Summary</th>
												</tr>
											</thead>
												<tr style='border-bottom: 1px solid #eee;'>
													<td style='padding: 8px;'><b><a href='https://github.com/HydroTuConnais/bookly/blob/master/frontend/src/pages/main/(document)/page.tsx'>page.tsx</a></b></td>
													<td style='padding: 8px;'>- DocumentsPage serves as a dynamic component within the frontend architecture, facilitating the display of either a specific document or a home view for documents based on the presence of a document ID<br>- It integrates user authentication and onboarding processes, ensuring that users receive appropriate guidance based on their onboarding status, thereby enhancing user experience and engagement within the application.</td>
												</tr>
												<tr style='border-bottom: 1px solid #eee;'>
													<td style='padding: 8px;'><b><a href='https://github.com/HydroTuConnais/bookly/blob/master/frontend/src/pages/main/(document)/layout.tsx'>layout.tsx</a></b></td>
													<td style='padding: 8px;'>- Provides a structured layout component for the main application interface, integrating essential features such as navigation, search functionality, and various modals for settings and document management<br>- It ensures a seamless user experience by managing authentication states and encapsulating multiple context providers, facilitating the interaction between different parts of the application while maintaining a cohesive design and functionality across the codebase.</td>
												</tr>
											</table>
											<!-- [home] Submodule -->
											<details>
												<summary><b>[home]</b></summary>
												<blockquote>
													<div class='directory-path' style='padding: 8px 0; color: #666;'>
														<code><b>⦿ frontend.src.pages.main.(document).[home]</b></code>
													<table style='width: 100%; border-collapse: collapse;'>
													<thead>
														<tr style='background-color: #f8f9fa;'>
															<th style='width: 30%; text-align: left; padding: 8px;'>File Name</th>
															<th style='text-align: left; padding: 8px;'>Summary</th>
														</tr>
													</thead>
														<tr style='border-bottom: 1px solid #eee;'>
															<td style='padding: 8px;'><b><a href='https://github.com/HydroTuConnais/bookly/blob/master/frontend/src/pages/main/(document)/[home]/page.tsx'>page.tsx</a></b></td>
															<td style='padding: 8px;'>- Facilitates the creation of new documents within the application, enhancing user interaction by allowing users to initiate document creation seamlessly<br>- It integrates user authentication and theme context to provide a personalized experience, while also managing navigation and displaying feedback through toast notifications<br>- This component serves as a welcoming interface for users, encouraging engagement with the document management features of the platform.</td>
														</tr>
													</table>
												</blockquote>
											</details>
											<!-- [documents] Submodule -->
											<details>
												<summary><b>[documents]</b></summary>
												<blockquote>
													<div class='directory-path' style='padding: 8px 0; color: #666;'>
														<code><b>⦿ frontend.src.pages.main.(document).[documents]</b></code>
													<table style='width: 100%; border-collapse: collapse;'>
													<thead>
														<tr style='background-color: #f8f9fa;'>
															<th style='width: 30%; text-align: left; padding: 8px;'>File Name</th>
															<th style='text-align: left; padding: 8px;'>Summary</th>
														</tr>
													</thead>
														<tr style='border-bottom: 1px solid #eee;'>
															<td style='padding: 8px;'><b><a href='https://github.com/HydroTuConnais/bookly/blob/master/frontend/src/pages/main/(document)/[documents]/page.tsx'>page.tsx</a></b></td>
															<td style='padding: 8px;'>- Facilitates the rendering and management of a document page within the application, enabling users to view, edit, and save document content seamlessly<br>- It integrates with various hooks and components to fetch document data, handle updates, and provide a responsive user interface<br>- Additionally, it ensures a smooth user experience by managing loading states and error handling while maintaining a consistent theme throughout the application.</td>
														</tr>
													</table>
												</blockquote>
											</details>
										</blockquote>
									</details>
								</blockquote>
							</details>
							<!-- recovery Submodule -->
							<details>
								<summary><b>recovery</b></summary>
								<blockquote>
									<div class='directory-path' style='padding: 8px 0; color: #666;'>
										<code><b>⦿ frontend.src.pages.recovery</b></code>
									<!-- (password) Submodule -->
									<details>
										<summary><b>(password)</b></summary>
										<blockquote>
											<div class='directory-path' style='padding: 8px 0; color: #666;'>
												<code><b>⦿ frontend.src.pages.recovery.(password)</b></code>
											<table style='width: 100%; border-collapse: collapse;'>
											<thead>
												<tr style='background-color: #f8f9fa;'>
													<th style='width: 30%; text-align: left; padding: 8px;'>File Name</th>
													<th style='text-align: left; padding: 8px;'>Summary</th>
												</tr>
											</thead>
												<tr style='border-bottom: 1px solid #eee;'>
													<td style='padding: 8px;'><b><a href='https://github.com/HydroTuConnais/bookly/blob/master/frontend/src/pages/recovery/(password)/page.tsx'>page.tsx</a></b></td>
													<td style='padding: 8px;'>- Facilitates the password recovery process by allowing users to confirm their new password after verifying their identity with a unique token<br>- It ensures that the current password is correct before enabling the user to set a new password, enhancing security<br>- This component integrates with the overall authentication architecture, providing a seamless user experience for password management within the application.</td>
												</tr>
											</table>
										</blockquote>
									</details>
									<!-- (email) Submodule -->
									<details>
										<summary><b>(email)</b></summary>
										<blockquote>
											<div class='directory-path' style='padding: 8px 0; color: #666;'>
												<code><b>⦿ frontend.src.pages.recovery.(email)</b></code>
											<table style='width: 100%; border-collapse: collapse;'>
											<thead>
												<tr style='background-color: #f8f9fa;'>
													<th style='width: 30%; text-align: left; padding: 8px;'>File Name</th>
													<th style='text-align: left; padding: 8px;'>Summary</th>
												</tr>
											</thead>
												<tr style='border-bottom: 1px solid #eee;'>
													<td style='padding: 8px;'><b><a href='https://github.com/HydroTuConnais/bookly/blob/master/frontend/src/pages/recovery/(email)/page.tsx'>page.tsx</a></b></td>
													<td style='padding: 8px;'>- Facilitates the confirmation of email recovery by validating user-provided tokens and IDs<br>- Upon successful verification, it displays a success message, allowing users to utilize their new email for future logins and notifications<br>- In case of errors or loading states, it appropriately navigates users to relevant pages, ensuring a seamless recovery experience within the broader application architecture.</td>
												</tr>
											</table>
										</blockquote>
									</details>
								</blockquote>
							</details>
							<!-- home Submodule -->
							<details>
								<summary><b>home</b></summary>
								<blockquote>
									<div class='directory-path' style='padding: 8px 0; color: #666;'>
										<code><b>⦿ frontend.src.pages.home</b></code>
									<table style='width: 100%; border-collapse: collapse;'>
									<thead>
										<tr style='background-color: #f8f9fa;'>
											<th style='width: 30%; text-align: left; padding: 8px;'>File Name</th>
											<th style='text-align: left; padding: 8px;'>Summary</th>
										</tr>
									</thead>
										<tr style='border-bottom: 1px solid #eee;'>
											<td style='padding: 8px;'><b><a href='https://github.com/HydroTuConnais/bookly/blob/master/frontend/src/pages/home/page.tsx'>page.tsx</a></b></td>
											<td style='padding: 8px;'>- Facilitates the rendering of the marketing page within the frontend application, integrating essential components such as the heading, preview, and footer<br>- It also manages user authentication by checking for a valid token and redirecting authenticated users to the documents page<br>- This page serves as a central hub for user engagement, enhancing the overall user experience in the application.</td>
										</tr>
										<tr style='border-bottom: 1px solid #eee;'>
											<td style='padding: 8px;'><b><a href='https://github.com/HydroTuConnais/bookly/blob/master/frontend/src/pages/home/layout.tsx'>layout.tsx</a></b></td>
											<td style='padding: 8px;'>- Provides a structured layout for the home page of the application, integrating essential components such as the navigation bar, login, and registration forms<br>- It establishes a context for managing popups and themes, ensuring a cohesive user experience<br>- The layout also incorporates a notification system, enhancing user interaction by delivering timely feedback within the overall architecture of the frontend application.</td>
										</tr>
									</table>
									<!-- components Submodule -->
									<details>
										<summary><b>components</b></summary>
										<blockquote>
											<div class='directory-path' style='padding: 8px 0; color: #666;'>
												<code><b>⦿ frontend.src.pages.home.components</b></code>
											<table style='width: 100%; border-collapse: collapse;'>
											<thead>
												<tr style='background-color: #f8f9fa;'>
													<th style='width: 30%; text-align: left; padding: 8px;'>File Name</th>
													<th style='text-align: left; padding: 8px;'>Summary</th>
												</tr>
											</thead>
												<tr style='border-bottom: 1px solid #eee;'>
													<td style='padding: 8px;'><b><a href='https://github.com/HydroTuConnais/bookly/blob/master/frontend/src/pages/home/components/Footer.tsx'>Footer.tsx</a></b></td>
													<td style='padding: 8px;'>- Footer component enhances the user interface by providing essential navigation links, including Privacy Policy and Terms & Conditions, while maintaining a consistent design across the application<br>- Positioned at the bottom of the page, it ensures accessibility and visibility, contributing to a user-friendly experience<br>- This component integrates seamlessly with the overall architecture, reinforcing the projects commitment to clarity and usability in its frontend design.</td>
												</tr>
												<tr style='border-bottom: 1px solid #eee;'>
													<td style='padding: 8px;'><b><a href='https://github.com/HydroTuConnais/bookly/blob/master/frontend/src/pages/home/components/Navbar.tsx'>Navbar.tsx</a></b></td>
													<td style='padding: 8px;'>- Navbar component enhances user navigation by providing a fixed top interface that includes branding, a login button, and a mode toggle for light and dark themes<br>- It dynamically adjusts its appearance based on scroll position, ensuring a consistent and engaging user experience<br>- This component plays a crucial role in the overall architecture by facilitating user interactions and maintaining visual coherence across the application.</td>
												</tr>
												<tr style='border-bottom: 1px solid #eee;'>
													<td style='padding: 8px;'><b><a href='https://github.com/HydroTuConnais/bookly/blob/master/frontend/src/pages/home/components/Login.tsx'>Login.tsx</a></b></td>
													<td style='padding: 8px;'>- Facilitates user authentication by providing a login interface within the application<br>- It allows users to enter their email and password, handle login attempts, and manage error messages<br>- Additionally, it offers options for password recovery and user registration through pop-up dialogs, enhancing the overall user experience and security of the application<br>- This component plays a crucial role in the user management aspect of the codebase architecture.</td>
												</tr>
												<tr style='border-bottom: 1px solid #eee;'>
													<td style='padding: 8px;'><b><a href='https://github.com/HydroTuConnais/bookly/blob/master/frontend/src/pages/home/components/Logo.tsx'>Logo.tsx</a></b></td>
													<td style='padding: 8px;'>- Renders a responsive logo component for the Bookly application, facilitating navigation to the homepage<br>- It adapts to light and dark themes by displaying different logo images based on the users preference<br>- Positioned within the home page structure, this component enhances the user interface and brand visibility, contributing to an engaging user experience across various devices.</td>
												</tr>
												<tr style='border-bottom: 1px solid #eee;'>
													<td style='padding: 8px;'><b><a href='https://github.com/HydroTuConnais/bookly/blob/master/frontend/src/pages/home/components/Preview.tsx'>Preview.tsx</a></b></td>
													<td style='padding: 8px;'>- Preview component enhances the user experience by displaying synchronized video content based on the current theme (light or dark)<br>- It facilitates user engagement through a prominent call-to-action button, while managing video playback and error handling seamlessly<br>- This component plays a crucial role in the overall architecture by integrating visual elements that align with the applications thematic design, ensuring a cohesive and interactive interface.</td>
												</tr>
												<tr style='border-bottom: 1px solid #eee;'>
													<td style='padding: 8px;'><b><a href='https://github.com/HydroTuConnais/bookly/blob/master/frontend/src/pages/home/components/Register.tsx'>Register.tsx</a></b></td>
													<td style='padding: 8px;'>- RegisterPage component facilitates user registration within the application, providing a user-friendly interface for inputting essential information such as email, username, and password<br>- It incorporates validation to ensure data integrity and handles user interactions, including error messaging and navigation to the login interface upon successful registration<br>- This component plays a crucial role in the overall user authentication flow of the project.</td>
												</tr>
												<tr style='border-bottom: 1px solid #eee;'>
													<td style='padding: 8px;'><b><a href='https://github.com/HydroTuConnais/bookly/blob/master/frontend/src/pages/home/components/Heading.tsx'>Heading.tsx</a></b></td>
													<td style='padding: 8px;'>- Consolidating ideas, documents, and projects in one place<br>- It encourages user engagement through a call-to-action button that opens a login popup, facilitating seamless access to the platform<br>- This component enhances the user experience by providing a visually appealing and informative entry point into the application.</td>
												</tr>
											</table>
										</blockquote>
									</details>
								</blockquote>
							</details>
						</blockquote>
					</details>
					<!-- hooks Submodule -->
					<details>
						<summary><b>hooks</b></summary>
						<blockquote>
							<div class='directory-path' style='padding: 8px 0; color: #666;'>
								<code><b>⦿ frontend.src.hooks</b></code>
							<table style='width: 100%; border-collapse: collapse;'>
							<thead>
								<tr style='background-color: #f8f9fa;'>
									<th style='width: 30%; text-align: left; padding: 8px;'>File Name</th>
									<th style='text-align: left; padding: 8px;'>Summary</th>
								</tr>
							</thead>
								<tr style='border-bottom: 1px solid #eee;'>
									<td style='padding: 8px;'><b><a href='https://github.com/HydroTuConnais/bookly/blob/master/frontend/src/hooks/use-cover-image.tsx'>use-cover-image.tsx</a></b></td>
									<td style='padding: 8px;'>- Facilitates the management of cover image states within the application by providing a context for opening, closing, and replacing cover images associated with specific documents<br>- It enables components to access and manipulate the visibility and identity of cover images seamlessly, enhancing user experience and interaction throughout the frontend architecture<br>- This context-driven approach promotes a clean and organized state management strategy.</td>
								</tr>
								<tr style='border-bottom: 1px solid #eee;'>
									<td style='padding: 8px;'><b><a href='https://github.com/HydroTuConnais/bookly/blob/master/frontend/src/hooks/use-boarding.tsx'>use-boarding.tsx</a></b></td>
									<td style='padding: 8px;'>- Facilitates a context-driven approach to manage the state of a boarding process within the application<br>- By providing a centralized store for the boarding status, it enables components to easily access and modify the visibility of the boarding interface<br>- This enhances user experience by allowing seamless interactions with the boarding feature throughout the application.</td>
								</tr>
								<tr style='border-bottom: 1px solid #eee;'>
									<td style='padding: 8px;'><b><a href='https://github.com/HydroTuConnais/bookly/blob/master/frontend/src/hooks/use-origin.tsx'>use-origin.tsx</a></b></td>
									<td style='padding: 8px;'>- Provides a custom React hook that retrieves the origin of the current window location, ensuring it only executes in a browser environment<br>- By managing the mounted state, it guarantees that the origin is returned only after the component has fully mounted<br>- This functionality is essential for components that rely on the current URL context, enhancing the overall user experience within the application.</td>
								</tr>
								<tr style='border-bottom: 1px solid #eee;'>
									<td style='padding: 8px;'><b><a href='https://github.com/HydroTuConnais/bookly/blob/master/frontend/src/hooks/usePromise.tsx'>usePromise.tsx</a></b></td>
									<td style='padding: 8px;'>- UsePromise serves as a custom React hook designed to simplify the handling of asynchronous operations within the application<br>- By managing the loading state, error handling, and data retrieval from promises, it enhances the user experience by providing a clear and efficient way to work with asynchronous data<br>- This hook integrates seamlessly into the broader architecture, promoting cleaner code and improved maintainability across the frontend components.</td>
								</tr>
								<tr style='border-bottom: 1px solid #eee;'>
									<td style='padding: 8px;'><b><a href='https://github.com/HydroTuConnais/bookly/blob/master/frontend/src/hooks/use-document-admin.tsx'>use-document-admin.tsx</a></b></td>
									<td style='padding: 8px;'>- Facilitates the management of document editing states within the application by providing a context for opening and closing document editing interfaces<br>- It enables components to access and manipulate the visibility of the document editor and the currently selected document, ensuring a cohesive user experience in the document administration workflow<br>- This enhances the overall architecture by promoting state management and context usage across the frontend.</td>
								</tr>
								<tr style='border-bottom: 1px solid #eee;'>
									<td style='padding: 8px;'><b><a href='https://github.com/HydroTuConnais/bookly/blob/master/frontend/src/hooks/use-options.tsx'>use-options.tsx</a></b></td>
									<td style='padding: 8px;'>- Provides a context for managing the visibility of a settings interface within the application<br>- It encapsulates the state and behavior related to opening and closing the settings, allowing components to easily access and manipulate this state<br>- By utilizing a context provider, it ensures that any child component can seamlessly interact with the settings state, promoting a cohesive user experience across the codebase.</td>
								</tr>
								<tr style='border-bottom: 1px solid #eee;'>
									<td style='padding: 8px;'><b><a href='https://github.com/HydroTuConnais/bookly/blob/master/frontend/src/hooks/use-panel.tsx'>use-panel.tsx</a></b></td>
									<td style='padding: 8px;'>- Facilitates the management of a panels open and closed states within the application<br>- By providing a context for the panels visibility and associated actions, it enables components to easily access and manipulate the panel's state<br>- This enhances the user experience by allowing seamless interactions with the panel across the frontend, ensuring consistent behavior throughout the application.</td>
								</tr>
								<tr style='border-bottom: 1px solid #eee;'>
									<td style='padding: 8px;'><b><a href='https://github.com/HydroTuConnais/bookly/blob/master/frontend/src/hooks/use-scroll-top.tsx'>use-scroll-top.tsx</a></b></td>
									<td style='padding: 8px;'>- Provides a custom React hook that tracks the users scroll position, determining whether it exceeds a specified threshold<br>- This functionality enhances user experience by enabling components to respond dynamically to scrolling behavior, such as displaying or hiding elements based on the scroll state<br>- It integrates seamlessly within the frontend architecture, contributing to a more interactive and responsive application.</td>
								</tr>
								<tr style='border-bottom: 1px solid #eee;'>
									<td style='padding: 8px;'><b><a href='https://github.com/HydroTuConnais/bookly/blob/master/frontend/src/hooks/use-search.tsx'>use-search.tsx</a></b></td>
									<td style='padding: 8px;'>- Provides a context and custom hook for managing the search functionality within the application<br>- It enables components to easily access and control the visibility of the search interface, facilitating a seamless user experience<br>- By encapsulating the state and behavior related to search, it promotes a clean architecture and enhances maintainability across the codebase.</td>
								</tr>
							</table>
						</blockquote>
					</details>
					<!-- lib Submodule -->
					<details>
						<summary><b>lib</b></summary>
						<blockquote>
							<div class='directory-path' style='padding: 8px 0; color: #666;'>
								<code><b>⦿ frontend.src.lib</b></code>
							<table style='width: 100%; border-collapse: collapse;'>
							<thead>
								<tr style='background-color: #f8f9fa;'>
									<th style='width: 30%; text-align: left; padding: 8px;'>File Name</th>
									<th style='text-align: left; padding: 8px;'>Summary</th>
								</tr>
							</thead>
								<tr style='border-bottom: 1px solid #eee;'>
									<td style='padding: 8px;'><b><a href='https://github.com/HydroTuConnais/bookly/blob/master/frontend/src/lib/utils.ts'>utils.ts</a></b></td>
									<td style='padding: 8px;'>- Provides a utility function that combines class names efficiently, enhancing the styling capabilities within the frontend architecture<br>- By leveraging the clsx and tailwind-merge libraries, it ensures that class names are merged and deduplicated, promoting cleaner and more maintainable code<br>- This functionality supports a consistent and dynamic approach to styling components throughout the application.</td>
								</tr>
							</table>
						</blockquote>
					</details>
					<!-- models Submodule -->
					<details>
						<summary><b>models</b></summary>
						<blockquote>
							<div class='directory-path' style='padding: 8px 0; color: #666;'>
								<code><b>⦿ frontend.src.models</b></code>
							<table style='width: 100%; border-collapse: collapse;'>
							<thead>
								<tr style='background-color: #f8f9fa;'>
									<th style='width: 30%; text-align: left; padding: 8px;'>File Name</th>
									<th style='text-align: left; padding: 8px;'>Summary</th>
								</tr>
							</thead>
								<tr style='border-bottom: 1px solid #eee;'>
									<td style='padding: 8px;'><b><a href='https://github.com/HydroTuConnais/bookly/blob/master/frontend/src/models/Users.ts'>Users.ts</a></b></td>
									<td style='padding: 8px;'>- Defines user-related data structures essential for managing user profiles within the application<br>- The UserProfileToken facilitates authentication by linking a user with their corresponding token, while the UserProfile captures key user information such as username and email<br>- Together, these models play a crucial role in the overall architecture by enabling secure user interactions and personalized experiences throughout the frontend.</td>
								</tr>
								<tr style='border-bottom: 1px solid #eee;'>
									<td style='padding: 8px;'><b><a href='https://github.com/HydroTuConnais/bookly/blob/master/frontend/src/models/Documents.ts'>Documents.ts</a></b></td>
									<td style='padding: 8px;'>- Defines a type for managing document profiles within the application, encapsulating essential attributes such as headers, body content, and parameters<br>- This structure facilitates consistent data handling across the frontend, ensuring that document-related operations are streamlined and maintainable<br>- By providing a clear schema, it enhances the overall architecture, promoting better integration and interaction with other components of the codebase.</td>
								</tr>
							</table>
						</blockquote>
					</details>
					<!-- components Submodule -->
					<details>
						<summary><b>components</b></summary>
						<blockquote>
							<div class='directory-path' style='padding: 8px 0; color: #666;'>
								<code><b>⦿ frontend.src.components</b></code>
							<table style='width: 100%; border-collapse: collapse;'>
							<thead>
								<tr style='background-color: #f8f9fa;'>
									<th style='width: 30%; text-align: left; padding: 8px;'>File Name</th>
									<th style='text-align: left; padding: 8px;'>Summary</th>
								</tr>
							</thead>
								<tr style='border-bottom: 1px solid #eee;'>
									<td style='padding: 8px;'><b><a href='https://github.com/HydroTuConnais/bookly/blob/master/frontend/src/components/ErrorHandler.tsx'>ErrorHandler.tsx</a></b></td>
									<td style='padding: 8px;'>- Error handling functionality enhances user experience by providing clear feedback on issues encountered during API interactions<br>- It captures various error scenarios, displaying relevant messages through toast notifications, and redirects users to the login page when authentication fails<br>- This component plays a crucial role in maintaining application stability and guiding users effectively within the overall architecture of the frontend application.</td>
								</tr>
								<tr style='border-bottom: 1px solid #eee;'>
									<td style='padding: 8px;'><b><a href='https://github.com/HydroTuConnais/bookly/blob/master/frontend/src/components/icon-picker.tsx'>icon-picker.tsx</a></b></td>
									<td style='padding: 8px;'>- IconPicker facilitates the selection of emojis within the application, enhancing user interaction by providing a visually appealing and organized interface<br>- It allows users to filter emojis by description, view them categorized, and select or randomize their choices<br>- This component integrates seamlessly into the broader frontend architecture, promoting a cohesive user experience while leveraging theming and popover functionalities.</td>
								</tr>
								<tr style='border-bottom: 1px solid #eee;'>
									<td style='padding: 8px;'><b><a href='https://github.com/HydroTuConnais/bookly/blob/master/frontend/src/components/mode-toggle.tsx'>mode-toggle.tsx</a></b></td>
									<td style='padding: 8px;'>- ModeToggle facilitates user interaction with theme preferences in the application, allowing seamless switching between light and dark modes<br>- By integrating with the theme context, it enhances the user experience by providing a visually appealing and accessible way to customize the interface<br>- This component plays a crucial role in the overall architecture by promoting user personalization and engagement within the frontend ecosystem.</td>
								</tr>
								<tr style='border-bottom: 1px solid #eee;'>
									<td style='padding: 8px;'><b><a href='https://github.com/HydroTuConnais/bookly/blob/master/frontend/src/components/single-image-dropzone.tsx'>single-image-dropzone.tsx</a></b></td>
									<td style='padding: 8px;'>- SingleImageDropzone facilitates the user-friendly upload of a single image file within the application<br>- It provides visual feedback for drag-and-drop interactions, displays error messages for invalid file types or sizes, and allows users to preview the selected image<br>- This component enhances the overall user experience by streamlining image uploads while ensuring adherence to specified file constraints.</td>
								</tr>
								<tr style='border-bottom: 1px solid #eee;'>
									<td style='padding: 8px;'><b><a href='https://github.com/HydroTuConnais/bookly/blob/master/frontend/src/components/search-command.tsx'>search-command.tsx</a></b></td>
									<td style='padding: 8px;'>- SearchCommand facilitates a dynamic document search experience within the application, allowing users to quickly find and navigate to their documents<br>- It integrates with authentication and document contexts to retrieve and display relevant results, while also providing keyboard shortcuts for ease of access<br>- This component enhances user interaction by presenting a responsive dialog that updates based on user input and selections.</td>
								</tr>
							</table>
							<!-- context Submodule -->
							<details>
								<summary><b>context</b></summary>
								<blockquote>
									<div class='directory-path' style='padding: 8px 0; color: #666;'>
										<code><b>⦿ frontend.src.components.context</b></code>
									<table style='width: 100%; border-collapse: collapse;'>
									<thead>
										<tr style='background-color: #f8f9fa;'>
											<th style='width: 30%; text-align: left; padding: 8px;'>File Name</th>
											<th style='text-align: left; padding: 8px;'>Summary</th>
										</tr>
									</thead>
										<tr style='border-bottom: 1px solid #eee;'>
											<td style='padding: 8px;'><b><a href='https://github.com/HydroTuConnais/bookly/blob/master/frontend/src/components/context/popup-context.tsx'>popup-context.tsx</a></b></td>
											<td style='padding: 8px;'>- Provides a context for managing popup states within the application<br>- It enables components to easily open and close popups while maintaining the current popup type<br>- By utilizing a centralized context, it streamlines the interaction with popups across the frontend, ensuring a consistent user experience and simplifying state management for popup-related functionalities throughout the codebase.</td>
										</tr>
										<tr style='border-bottom: 1px solid #eee;'>
											<td style='padding: 8px;'><b><a href='https://github.com/HydroTuConnais/bookly/blob/master/frontend/src/components/context/useAnimation.tsx'>useAnimation.tsx</a></b></td>
											<td style='padding: 8px;'>- Facilitates animation management within the application by providing a context for tracking the completion state of animations<br>- It initializes an animation sequence and updates the state accordingly, allowing components to react to animation status changes<br>- This enhances user experience by ensuring that animations are properly handled and synchronized across the frontend, contributing to a seamless interface.</td>
										</tr>
										<tr style='border-bottom: 1px solid #eee;'>
											<td style='padding: 8px;'><b><a href='https://github.com/HydroTuConnais/bookly/blob/master/frontend/src/components/context/useImage.tsx'>useImage.tsx</a></b></td>
											<td style='padding: 8px;'>- Image context management enables seamless image upload and removal functionalities within the application<br>- By leveraging authentication details, it ensures secure interactions with the image service<br>- This component provides a centralized context for managing image-related operations, enhancing the user experience by allowing easy integration of image handling features throughout the frontend architecture.</td>
										</tr>
										<tr style='border-bottom: 1px solid #eee;'>
											<td style='padding: 8px;'><b><a href='https://github.com/HydroTuConnais/bookly/blob/master/frontend/src/components/context/useTheme.tsx'>useTheme.tsx</a></b></td>
											<td style='padding: 8px;'>- Theme management functionality enhances the user experience by allowing dynamic switching between light and dark themes within the application<br>- It provides a context for theme state, enabling components to access and modify the current theme seamlessly<br>- Additionally, it ensures that user preferences are persisted in local storage and updates the favicon accordingly, contributing to a cohesive and visually appealing interface across the codebase.</td>
										</tr>
										<tr style='border-bottom: 1px solid #eee;'>
											<td style='padding: 8px;'><b><a href='https://github.com/HydroTuConnais/bookly/blob/master/frontend/src/components/context/useAuth.tsx'>useAuth.tsx</a></b></td>
											<td style='padding: 8px;'>- Provides an authentication context for managing user sessions within the application<br>- It facilitates user registration, login, and profile updates while maintaining authentication state and handling token management<br>- Additionally, it offers methods for password recovery and user retrieval, ensuring a seamless user experience across the frontend<br>- This context is integral to the overall architecture, enabling secure access and user management throughout the application.</td>
										</tr>
										<tr style='border-bottom: 1px solid #eee;'>
											<td style='padding: 8px;'><b><a href='https://github.com/HydroTuConnais/bookly/blob/master/frontend/src/components/context/useDocuments.tsx'>useDocuments.tsx</a></b></td>
											<td style='padding: 8px;'>- Document management functionality is provided through a context that facilitates the creation, retrieval, updating, and deletion of documents within the application<br>- It supports user-specific operations such as favoriting, archiving, and sharing documents, while also enabling search capabilities<br>- This context serves as a centralized state management solution, ensuring that document-related data is consistently accessible and manageable across the frontend components of the application.</td>
										</tr>
										<tr style='border-bottom: 1px solid #eee;'>
											<td style='padding: 8px;'><b><a href='https://github.com/HydroTuConnais/bookly/blob/master/frontend/src/components/context/themeContext.tsx'>themeContext.tsx</a></b></td>
											<td style='padding: 8px;'>- Theme management is facilitated through a context provider that allows components to access and modify the applications theme state<br>- By storing the users theme preference in local storage, it ensures a consistent experience across sessions<br>- This functionality enhances the overall user interface by enabling dynamic theme switching between light and dark modes, contributing to a more personalized and visually appealing application.</td>
										</tr>
									</table>
								</blockquote>
							</details>
							<!-- modals Submodule -->
							<details>
								<summary><b>modals</b></summary>
								<blockquote>
									<div class='directory-path' style='padding: 8px 0; color: #666;'>
										<code><b>⦿ frontend.src.components.modals</b></code>
									<table style='width: 100%; border-collapse: collapse;'>
									<thead>
										<tr style='background-color: #f8f9fa;'>
											<th style='width: 30%; text-align: left; padding: 8px;'>File Name</th>
											<th style='text-align: left; padding: 8px;'>Summary</th>
										</tr>
									</thead>
										<tr style='border-bottom: 1px solid #eee;'>
											<td style='padding: 8px;'><b><a href='https://github.com/HydroTuConnais/bookly/blob/master/frontend/src/components/modals/panel-admin.tsx'>panel-admin.tsx</a></b></td>
											<td style='padding: 8px;'>- View and Manage UsersAdministrators can access a list of users, sort them based on various criteria, and update their roles or information as needed.-<strong>Handle DocumentsThe component provides functionality to view and manage documents, ensuring that all necessary documentation is organized and up-to-date.-</strong>Search and FilterUsers can search for specific users or documents, making it easier to find relevant information quickly.## UsageThis component is designed to be integrated into the broader application architecture, where it interacts with various hooks and context providers to fetch and manipulate data<br>- It enhances the overall user experience by providing a responsive and intuitive interface for administrative tasks.By utilizing this modal, administrators can maintain control over user management and document organization, contributing to the overall efficiency and effectiveness of the application.</td>
										</tr>
										<tr style='border-bottom: 1px solid #eee;'>
											<td style='padding: 8px;'><b><a href='https://github.com/HydroTuConnais/bookly/blob/master/frontend/src/components/modals/confirm-modal.tsx'>confirm-modal.tsx</a></b></td>
											<td style='padding: 8px;'>- ConfirmModal serves as a user interface component that facilitates confirmation actions within the application<br>- By presenting a dialog that prompts users to confirm or cancel potentially destructive actions, such as deletions, it enhances user experience and prevents accidental data loss<br>- This component integrates seamlessly into the broader architecture, ensuring consistent interaction patterns across the frontend.</td>
										</tr>
										<tr style='border-bottom: 1px solid #eee;'>
											<td style='padding: 8px;'><b><a href='https://github.com/HydroTuConnais/bookly/blob/master/frontend/src/components/modals/boarding-modal.tsx'>boarding-modal.tsx</a></b></td>
											<td style='padding: 8px;'>- BoardingModal facilitates user profile configuration within the application, allowing users to upload an image and set a username<br>- It integrates with various hooks to manage state and user authentication, ensuring a seamless onboarding experience<br>- By providing a dialog interface, it enhances user interaction, enabling easy submission of profile details while maintaining a responsive design.</td>
										</tr>
										<tr style='border-bottom: 1px solid #eee;'>
											<td style='padding: 8px;'><b><a href='https://github.com/HydroTuConnais/bookly/blob/master/frontend/src/components/modals/document-admin-modal.tsx'>document-admin-modal.tsx</a></b></td>
											<td style='padding: 8px;'>- AdminEditDocumentModal facilitates the editing of documents within the application by providing a modal interface for administrators<br>- It integrates user authentication and document management functionalities, allowing for seamless updates and retrieval of document information<br>- The modal enhances user experience by overlaying a focused editing environment, ensuring that administrators can efficiently manage document content while maintaining a clear and organized workflow.</td>
										</tr>
										<tr style='border-bottom: 1px solid #eee;'>
											<td style='padding: 8px;'><b><a href='https://github.com/HydroTuConnais/bookly/blob/master/frontend/src/components/modals/settings-modal.tsx'>settings-modal.tsx</a></b></td>
											<td style='padding: 8px;'>- SettingsModal facilitates user account management and preferences within the application<br>- It provides an interface for users to update their personal information, change email and password, and manage account settings<br>- Additionally, it allows users to customize the appearance of the interface and includes a confirmation process for account deletion, enhancing user experience and security in the overall codebase architecture.</td>
										</tr>
										<tr style='border-bottom: 1px solid #eee;'>
											<td style='padding: 8px;'><b><a href='https://github.com/HydroTuConnais/bookly/blob/master/frontend/src/components/modals/password-change-modal.tsx'>password-change-modal.tsx</a></b></td>
											<td style='padding: 8px;'>- Facilitates a user-friendly modal for changing passwords within the application<br>- It prompts users to enter their current password, a new password, and a confirmation of the new password, ensuring validation at each step<br>- By integrating with authentication context, it verifies the current password and provides feedback on password strength and matching, enhancing the overall security and user experience in the application.</td>
										</tr>
										<tr style='border-bottom: 1px solid #eee;'>
											<td style='padding: 8px;'><b><a href='https://github.com/HydroTuConnais/bookly/blob/master/frontend/src/components/modals/cover-image-modal.tsx'>cover-image-modal.tsx</a></b></td>
											<td style='padding: 8px;'>- CoverImageModal facilitates the user experience for uploading and managing cover images within the application<br>- It provides a dialog interface that allows users to select an image, which is then uploaded and associated with a specific document<br>- By integrating with various hooks and context providers, it ensures seamless interaction with the applications state and document management, enhancing the overall functionality of the frontend architecture.</td>
										</tr>
										<tr style='border-bottom: 1px solid #eee;'>
											<td style='padding: 8px;'><b><a href='https://github.com/HydroTuConnais/bookly/blob/master/frontend/src/components/modals/mail-change-modal.tsx'>mail-change-modal.tsx</a></b></td>
											<td style='padding: 8px;'>- InputMailModal serves as a user interface component for prompting users to enter and confirm a new email address<br>- It enhances the overall user experience by providing a modal dialog that includes input validation and clear action buttons<br>- This component integrates seamlessly into the broader application architecture, facilitating email updates while maintaining a consistent design and interaction pattern across the frontend.</td>
										</tr>
									</table>
									<!-- input-modal Submodule -->
									<details>
										<summary><b>input-modal</b></summary>
										<blockquote>
											<div class='directory-path' style='padding: 8px 0; color: #666;'>
												<code><b>⦿ frontend.src.components.modals.input-modal</b></code>
											<table style='width: 100%; border-collapse: collapse;'>
											<thead>
												<tr style='background-color: #f8f9fa;'>
													<th style='width: 30%; text-align: left; padding: 8px;'>File Name</th>
													<th style='text-align: left; padding: 8px;'>Summary</th>
												</tr>
											</thead>
												<tr style='border-bottom: 1px solid #eee;'>
													<td style='padding: 8px;'><b><a href='https://github.com/HydroTuConnais/bookly/blob/master/frontend/src/components/modals/input-modal/input-name.tsx'>input-name.tsx</a></b></td>
													<td style='padding: 8px;'>- Facilitates user interaction for editing and updating a users name within the application<br>- By providing an input field that toggles between display and edit modes, it allows users to modify their profile name seamlessly<br>- Changes are captured and sent to the backend for updating, ensuring the user interface remains in sync with the underlying data, enhancing the overall user experience in the application.</td>
												</tr>
												<tr style='border-bottom: 1px solid #eee;'>
													<td style='padding: 8px;'><b><a href='https://github.com/HydroTuConnais/bookly/blob/master/frontend/src/components/modals/input-modal/input-email.tsx'>input-email.tsx</a></b></td>
													<td style='padding: 8px;'>- InputEmail component facilitates the editing of a users email address within a modal interface<br>- It allows users to toggle between viewing and editing their email, ensuring real-time validation and updates<br>- Upon entering a valid email, changes are saved and reflected in the user profile, enhancing user experience by providing immediate feedback and maintaining data integrity across the application.</td>
												</tr>
												<tr style='border-bottom: 1px solid #eee;'>
													<td style='padding: 8px;'><b><a href='https://github.com/HydroTuConnais/bookly/blob/master/frontend/src/components/modals/input-modal/input-title.tsx'>input-title.tsx</a></b></td>
													<td style='padding: 8px;'>- InputTitle component facilitates the editing of document titles within a modal interface<br>- It allows users to toggle between viewing and editing states, updating the title in real-time while ensuring changes are reflected in the application state<br>- By leveraging React hooks and context, it enhances user interaction and maintains synchronization with the document data, contributing to a seamless user experience in the overall project architecture.</td>
												</tr>
												<tr style='border-bottom: 1px solid #eee;'>
													<td style='padding: 8px;'><b><a href='https://github.com/HydroTuConnais/bookly/blob/master/frontend/src/components/modals/input-modal/action-document.tsx'>action-document.tsx</a></b></td>
													<td style='padding: 8px;'>- ActionDocument facilitates the management of document states within the application, allowing users to publish, unpublish, archive, and restore documents seamlessly<br>- It integrates with the context of document management and utilizes a popover interface for user interactions, ensuring a smooth experience<br>- By leveraging real-time updates and notifications, it enhances user engagement and maintains the integrity of document workflows across the codebase.</td>
												</tr>
											</table>
										</blockquote>
									</details>
								</blockquote>
							</details>
							<!-- ui Submodule -->
							<details>
								<summary><b>ui</b></summary>
								<blockquote>
									<div class='directory-path' style='padding: 8px 0; color: #666;'>
										<code><b>⦿ frontend.src.components.ui</b></code>
									<table style='width: 100%; border-collapse: collapse;'>
									<thead>
										<tr style='background-color: #f8f9fa;'>
											<th style='width: 30%; text-align: left; padding: 8px;'>File Name</th>
											<th style='text-align: left; padding: 8px;'>Summary</th>
										</tr>
									</thead>
										<tr style='border-bottom: 1px solid #eee;'>
											<td style='padding: 8px;'><b><a href='https://github.com/HydroTuConnais/bookly/blob/master/frontend/src/components/ui/input.tsx'>input.tsx</a></b></td>
											<td style='padding: 8px;'>- Input component serves as a customizable and reusable UI element within the frontend architecture, enhancing user interaction by providing a styled input field<br>- It integrates seamlessly with the overall design system, ensuring consistency in appearance and behavior across the application<br>- By leveraging Reacts forwardRef, it allows for flexible usage in various contexts, promoting efficient form handling and user experience.</td>
										</tr>
										<tr style='border-bottom: 1px solid #eee;'>
											<td style='padding: 8px;'><b><a href='https://github.com/HydroTuConnais/bookly/blob/master/frontend/src/components/ui/popover.tsx'>popover.tsx</a></b></td>
											<td style='padding: 8px;'>- Popover component enhances user interaction by providing a customizable overlay that displays additional information or options when triggered<br>- It integrates seamlessly into the UI, allowing for flexible positioning and styling<br>- This component is essential for creating intuitive interfaces, enabling users to access contextual content without cluttering the main view, thereby improving overall user experience within the application.</td>
										</tr>
										<tr style='border-bottom: 1px solid #eee;'>
											<td style='padding: 8px;'><b><a href='https://github.com/HydroTuConnais/bookly/blob/master/frontend/src/components/ui/button.tsx'>button.tsx</a></b></td>
											<td style='padding: 8px;'>- Provides a versatile button component designed for a React application, enabling consistent styling and behavior across various use cases<br>- It supports multiple visual variants and sizes, enhancing the user interface by allowing developers to easily implement buttons that align with the overall design system<br>- This component contributes to a cohesive user experience within the broader frontend architecture.</td>
										</tr>
										<tr style='border-bottom: 1px solid #eee;'>
											<td style='padding: 8px;'><b><a href='https://github.com/HydroTuConnais/bookly/blob/master/frontend/src/components/ui/dialog.tsx'>dialog.tsx</a></b></td>
											<td style='padding: 8px;'>- Provides a customizable dialog component for the user interface, enhancing user interaction by presenting modal content effectively<br>- It integrates various subcomponents such as headers, footers, titles, and descriptions, allowing for a structured and visually appealing presentation of information<br>- This component is essential for managing user prompts and confirmations within the broader application architecture, ensuring a seamless user experience.</td>
										</tr>
										<tr style='border-bottom: 1px solid #eee;'>
											<td style='padding: 8px;'><b><a href='https://github.com/HydroTuConnais/bookly/blob/master/frontend/src/components/ui/label.tsx'>label.tsx</a></b></td>
											<td style='padding: 8px;'>- Label component serves as a customizable UI element within the frontend architecture, enhancing form accessibility and usability<br>- By leveraging Radix UIs label primitives and a utility for class variance, it ensures consistent styling and behavior across various contexts<br>- This component integrates seamlessly into the broader application, promoting a cohesive design language while maintaining flexibility for developers.</td>
										</tr>
										<tr style='border-bottom: 1px solid #eee;'>
											<td style='padding: 8px;'><b><a href='https://github.com/HydroTuConnais/bookly/blob/master/frontend/src/components/ui/alert-dialog.tsx'>alert-dialog.tsx</a></b></td>
											<td style='padding: 8px;'>- Provides a customizable alert dialog component for user interactions within the frontend application<br>- It enhances user experience by presenting critical information and actions in a modal format, ensuring clarity and focus<br>- The component integrates seamlessly with the overall architecture, leveraging Radix UI for accessibility and styling utilities for consistent design across the application.</td>
										</tr>
										<tr style='border-bottom: 1px solid #eee;'>
											<td style='padding: 8px;'><b><a href='https://github.com/HydroTuConnais/bookly/blob/master/frontend/src/components/ui/dropdown-menu.tsx'>dropdown-menu.tsx</a></b></td>
											<td style='padding: 8px;'>- Dropdown menu components enhance user interaction by providing a flexible and accessible way to present options within the UI<br>- These components, built using Radix UI, allow for the creation of nested menus, checkable items, and radio selections, all styled for a cohesive look<br>- They contribute to the overall architecture by ensuring a consistent and intuitive navigation experience across the application.</td>
										</tr>
										<tr style='border-bottom: 1px solid #eee;'>
											<td style='padding: 8px;'><b><a href='https://github.com/HydroTuConnais/bookly/blob/master/frontend/src/components/ui/avatar.tsx'>avatar.tsx</a></b></td>
											<td style='padding: 8px;'>- Provides a customizable avatar component suite for user interfaces, enhancing the visual representation of user profiles<br>- It includes a main avatar container, an image display, and a fallback option for when the image is unavailable<br>- This component integrates seamlessly with the overall project architecture, promoting a consistent and user-friendly design across the frontend application.</td>
										</tr>
										<tr style='border-bottom: 1px solid #eee;'>
											<td style='padding: 8px;'><b><a href='https://github.com/HydroTuConnais/bookly/blob/master/frontend/src/components/ui/separator.tsx'>separator.tsx</a></b></td>
											<td style='padding: 8px;'>- Provides a customizable separator component that enhances the user interface by visually dividing content<br>- It supports both horizontal and vertical orientations, allowing for flexible design choices<br>- By integrating with Radix UIs separator primitives, it ensures accessibility and consistent styling, contributing to a cohesive and polished frontend experience within the overall project architecture.</td>
										</tr>
										<tr style='border-bottom: 1px solid #eee;'>
											<td style='padding: 8px;'><b><a href='https://github.com/HydroTuConnais/bookly/blob/master/frontend/src/components/ui/command.tsx'>command.tsx</a></b></td>
											<td style='padding: 8px;'>- Provides a set of React components for a command interface, enhancing user interaction within the application<br>- It includes elements such as dialogs, input fields, lists, and items, all styled for a cohesive user experience<br>- This architecture facilitates efficient command execution and navigation, contributing to a more intuitive and responsive frontend design.</td>
										</tr>
									</table>
								</blockquote>
							</details>
						</blockquote>
					</details>
					<!-- services Submodule -->
					<details>
						<summary><b>services</b></summary>
						<blockquote>
							<div class='directory-path' style='padding: 8px 0; color: #666;'>
								<code><b>⦿ frontend.src.services</b></code>
							<table style='width: 100%; border-collapse: collapse;'>
							<thead>
								<tr style='background-color: #f8f9fa;'>
									<th style='width: 30%; text-align: left; padding: 8px;'>File Name</th>
									<th style='text-align: left; padding: 8px;'>Summary</th>
								</tr>
							</thead>
								<tr style='border-bottom: 1px solid #eee;'>
									<td style='padding: 8px;'><b><a href='https://github.com/HydroTuConnais/bookly/blob/master/frontend/src/services/imageService.tsx'>imageService.tsx</a></b></td>
									<td style='padding: 8px;'>- ImageService facilitates the uploading and removal of images within the application, streamlining interactions with the backend API<br>- It manages file uploads by creating form data and handles deletions through specified document IDs<br>- Additionally, it ensures robust error handling and authorization through token management, contributing to a seamless user experience in managing image assets across the platform.</td>
								</tr>
								<tr style='border-bottom: 1px solid #eee;'>
									<td style='padding: 8px;'><b><a href='https://github.com/HydroTuConnais/bookly/blob/master/frontend/src/services/recoveryService.tsx'>recoveryService.tsx</a></b></td>
									<td style='padding: 8px;'>- RecoveryService facilitates user account recovery processes within the application by providing essential functionalities such as sending recovery emails, resetting passwords, and verifying recovery tokens<br>- It interacts with the backend API to ensure secure communication and error handling, thereby enhancing user experience during account recovery scenarios<br>- This service is integral to maintaining user access and security in the overall codebase architecture.</td>
								</tr>
								<tr style='border-bottom: 1px solid #eee;'>
									<td style='padding: 8px;'><b><a href='https://github.com/HydroTuConnais/bookly/blob/master/frontend/src/services/authService.tsx'>authService.tsx</a></b></td>
									<td style='padding: 8px;'>- AuthService provides essential functionalities for user authentication and management within the application<br>- It facilitates user login, registration, password verification, and profile updates while ensuring secure communication with the backend through token-based authorization<br>- Additionally, it allows for user data retrieval and validation, contributing to a seamless user experience and robust security framework in the overall codebase architecture.</td>
								</tr>
								<tr style='border-bottom: 1px solid #eee;'>
									<td style='padding: 8px;'><b><a href='https://github.com/HydroTuConnais/bookly/blob/master/frontend/src/services/documentsService.tsx'>documentsService.tsx</a></b></td>
									<td style='padding: 8px;'>- DocumentService provides a comprehensive set of functionalities for managing documents within the application<br>- It enables users to create, retrieve, update, delete, and share documents, as well as manage archived and favorite documents<br>- Additionally, it supports searching for documents and handling document icons and cover images<br>- This service acts as a crucial intermediary between the frontend and backend, ensuring seamless document operations and user interactions.</td>
								</tr>
							</table>
						</blockquote>
					</details>
				</blockquote>
			</details>
		</blockquote>
	</details>
</details>
                
---

## 🛠️ Technologies utilisées

### Front-End :
- React
- React Router
- Axios (pour les appels API)
- CSS (ou une librairie CSS comme Tailwind)

### Back-End :
- Node.js
- Express.js
- SQLite
- JWT (JSON Web Token) pour l'authentification
- Bcrypt pour le hachage des mots de passe

---

## 📦 Installation et exécution (FRONT)

### Prérequis :
- Node.js v16 ou supérieur
- SQLite
- Un éditeur de code (Visual Studio Code recommandé)

### Étapes :
1. Clonez le dépôt :
   ```bash
   git clone https://github.com/username/bookly.git bookly
   cd bookly
   ```

2. Installez les dépendances pour le front-end :
   ```bash
   cd client
   npm install
   ```

3. Installez les dépendances pour le back-end :
   ```bash
   cd ../server
   npm install
   ```

4. Configurez les variables d'environnement :
   Créez un fichier `.env` dans le dossier 

server

 avec les clés suivantes :
   ```
   SERVER_PORT=5000
   JWT_SECRET=votre_secret
   ```

5. Lancez le serveur back-end :
   ```bash
   cd server
   npm run dev
   ```

6. Lancez le front-end :
   ```bash
   cd client
   npm start
   ```

7. Ouvrez votre navigateur à l'adresse suivante :
   ```
   http://localhost:3000
   ```

---

## 📦 Installation et exécution (BACK)

### Prérequis :
- Node.js v16 ou supérieur
- Postgres
- Prisma CLI

### Étapes :
1. Installez les dépendances pour le back-end :
   ```bash
   cd server
   npm install
   ```
   
2. Configurez les variables d'environnement :
   Créez un fichier `.env` dans le dossier `server` avec les clés suivantes :
   ```
   SERVER_PORT=5000
   JWT_SECRET=votre_secret
   DATABASE_URL="postgresql://(username):(password)@localhost:5432/(database name)"
   ```

3. Modifiez le schéma Prisma (`prisma/schema.prisma`) pour définir vos modèles de données.

4. Migrate votre base de données :
   ```bash
   npx prisma migrate dev --name init
   ```

5. Mettre a jours votre base de données :
   ```bash
   npx prisma migrate dev --name
   ```

6. Lancez le serveur back-end :
   ```bash
   npm run dev
   ```

7. Pour visualiser la base de donnée simplement :
   ```bash
   npx prisma studio
   ```

---

## 🔒 Authentification JWT
- **Connexion** : Lorsqu'un utilisateur se connecte, un JWT est généré et envoyé au client. Ce token est stocké dans le localStorage.
- **Middleware de protection** : Les routes nécessitant une authentification sont protégées par un middleware qui vérifie le JWT dans le header `Authorization`.

---

## 📖 API Routes

| Method | Endpoint                    | Body                                                              | Header            | Response                                                                                                                                                        | Response Code        | Description                                          | Sécurisé |
|--------|-----------------------------|-------------------------------------------------------------------|-------------------|----------------------------------------------------------------------------------------------------------------------------------------------------------------|----------------------|------------------------------------------------------|----------|
| POST   | /auth/register              | { <br> &nbsp;&nbsp;email: String, <br> &nbsp;&nbsp;password: String <br> }                |                   | { <br> &nbsp;&nbsp;"id": String, <br> &nbsp;&nbsp;"email": String, <br> &nbsp;&nbsp;"name": String, <br> &nbsp;&nbsp;"password": String, <br> &nbsp;&nbsp;"createdAt": TimeStamp, <br> &nbsp;&nbsp;"updatedAt": TimeStamp <br> }         | &nbsp;&nbsp;&nbsp;&nbsp;<span style="color:green">201</span> Created          | Inscrire un utilisateur                             | ❌        |
| POST   | /auth/login                 | { <br> &nbsp;&nbsp;email: String, <br> &nbsp;&nbsp;password: String <br> }                |                   | { <br> &nbsp;&nbsp;"token": String <br> }                                                                                                                                   | &nbsp;&nbsp;&nbsp;&nbsp;<span style="color:green">200</span> OK               | Connecter un utilisateur                            | ❌        |
| GET    | /auth/check                 |                                                                   | Author: String     | { <br> &nbsp;&nbsp;"isAuthenticated": Bool <br> }                                                                                                                           | &nbsp;&nbsp;&nbsp;&nbsp;<span style="color:green">200</span> OK               | Check si le token est encore valide                 | ✅        |
| POST   | /documents                  | { <br> &nbsp;&nbsp;"title": String, <br> &nbsp;&nbsp;"content": String <br> }             | Author: String, <br> UserId: String | { <br> &nbsp;&nbsp;"success": Bool <br> }                                                                                                                                    | &nbsp;&nbsp;&nbsp;&nbsp;<span style="color:green">201</span> Created          | Créer un document                                   | ✅        |
| GET    | /documents                  |                                                                   | Author: String     | { <br> &nbsp;&nbsp;"documents": Array <br> }                                                                                                                                | &nbsp;&nbsp;&nbsp;&nbsp;<span style="color:green">200</span> OK               | Récupérer tous les documents                        | ✅        |
| GET    | /documents/:id/content      |                                                                   | Author: String     | { <br> &nbsp;&nbsp;"document": Object <br> }                                                                                                                                | &nbsp;&nbsp;&nbsp;&nbsp;<span style="color:green">200</span> OK               | Récupérer le contenu d'un document                  | ✅        |
| PUT    | /documents/:id/content      | { <br> &nbsp;&nbsp;"title": String, <br> &nbsp;&nbsp;"content": String <br> }             | Author: String, <br> UserId: String | { <br> &nbsp;&nbsp;"success": Bool <br> }                                                                                                                                    | &nbsp;&nbsp;&nbsp;&nbsp;<span style="color:green">202</span> Accepted         | Modifier le contenu ou le titre d’un document      | ✅        |
| DELETE | /documents/:id/content      |                                                                   | Author: String     | { <br> &nbsp;&nbsp;"success": Bool <br> }                                                                                                                                    | &nbsp;&nbsp;&nbsp;&nbsp;<span style="color:green">200</span> OK               | Supprimer un document                               | ✅        |
| GET    | /documents/sidebar          |                                                                   | Author: String     | { <br> &nbsp;&nbsp;"documents": Array <br> }                                                                                                                                | &nbsp;&nbsp;&nbsp;&nbsp;<span style="color:green">200</span> OK               | Récupérer les documents pour la barre latérale     | ✅        |
| GET    | /documents/trash            |                                                                   | Author: String     | { <br> &nbsp;&nbsp;"documents": Array <br> }                                                                                                                                | &nbsp;&nbsp;&nbsp;&nbsp;<span style="color:green">200</span> OK               | Récupérer les documents archivés                    | ✅        |
| POST   | /documents/:id/archive      |                                                                   | Author: String     | { <br> &nbsp;&nbsp;"success": Bool <br> }                                                                                                                                    | &nbsp;&nbsp;&nbsp;&nbsp;<span style="color:green">200</span> OK               | Archiver un document                                | ✅        |
| POST   | /documents/:id/restore      |                                                                   | Author: String     | { <br> &nbsp;&nbsp;"success": Bool <br> }                                                                                                                                    | &nbsp;&nbsp;&nbsp;&nbsp;<span style="color:green">200</span> OK               | Restaurer un document                               | ✅        |
| POST   | /documents/:id/favorite     |                                                                   | Author: String     | { <br> &nbsp;&nbsp;"success": Bool <br> }                                                                                                                                    | &nbsp;&nbsp;&nbsp;&nbsp;<span style="color:green">200</span> OK               | Ajouter un document aux favoris                     | ✅        |
| POST   | /documents/:id/unfavorite   |                                                                   | Author: String     | { <br> &nbsp;&nbsp;"success": Bool <br> }                                                                                                                                    | &nbsp;&nbsp;&nbsp;&nbsp;<span style="color:green">200</span> OK               | Retirer un document des favoris                     | ✅        |
| GET    | /documents/favorite         |                                                                   | Author: String     | { <br> &nbsp;&nbsp;"documents": Array <br> }                                                                                                                                | &nbsp;&nbsp;&nbsp;&nbsp;<span style="color:green">200</span> OK               | Récupérer les documents favoris                     | ✅        |
| GET    | /documents/favorite/count   |                                                                   | Author: String     | { <br> &nbsp;&nbsp;"count": Number <br> }                                                                                                                                   | &nbsp;&nbsp;&nbsp;&nbsp;<span style="color:green">200</span> OK               | Compter les documents favoris                       | ✅        |
| POST   | /documents/:id/shared       |                                                                   | Author: String     | { <br> &nbsp;&nbsp;"success": Bool <br> }                                                                                                                                    | &nbsp;&nbsp;&nbsp;&nbsp;<span style="color:green">200</span> OK               | Partager un document                                | ✅        |
| GET    | /documents/shared           |                                                                   | Author: String     | { <br> &nbsp;&nbsp;"documents": Array <br> }                                                                                                                                | &nbsp;&nbsp;&nbsp;&nbsp;<span style="color:green">200</span> OK               | Récupérer les documents partagés                    | ✅        |
| GET    | /documents/search           |                                                                   | Author: String     | { <br> &nbsp;&nbsp;"documents": Array <br> }                                                                                                                                | &nbsp;&nbsp;&nbsp;&nbsp;<span style="color:green">200</span> OK               | Rechercher des documents                            | ✅        |
| DELETE | /documents/:id/removeicon   |                                                                   | Author: String     | { <br> &nbsp;&nbsp;"success": Bool <br> }                                                                                                                                    | &nbsp;&nbsp;&nbsp;&nbsp;<span style="color:green">200</span> OK               | Supprimer l'icône d'un document                     | ✅        |
| GET    | /documents/:id/coveroffset  |                                                                   | Author: String     | { <br> &nbsp;&nbsp;"offset": Object <br> }                                                                                                                                  | &nbsp;&nbsp;&nbsp;&nbsp;<span style="color:green">200</span> OK               | Récupérer l'offset de la couverture d'un document   | ✅        |
| PUT    | /documents/:id/coveroffset  | { <br> &nbsp;&nbsp;"offset": Object <br> }                                                             | Author: String     | { <br> &nbsp;&nbsp;"success": Bool <br> }                                                                                                                                    | &nbsp;&nbsp;&nbsp;&nbsp;<span style="color:green">200</span> OK               | Mettre à jour l'offset de la couverture d'un document | ✅        |


<br>
<br>

## MCD Diagram

![MCD Diagram](https://lucid.app/publicSegments/view/0bc5ec68-4ea6-4086-b0db-4ecc48fda31a/image.png)

---


# Modèle Logique de Données (MLD)

---


### Table `User`
| Nom de colonne  | Type        | Contraintes               |
|------------------|-------------|---------------------------|
| `id`            | `UUID`      | PK, Généré par défaut     |
| `email`         | `String`    | Unique, Non NULL          |
| `name`          | `String`    | Optionnel                 |
| `password`      | `String`    | Non NULL                  |
| `createdAt`     | `DateTime`  | Défaut : `now()`          |
| `updatedAt`     | `DateTime`  | Mis à jour automatiquement |

#### Relations :
- **1:N** avec `Document` (via `documents`).
- **N:N** avec `Document` pour les documents partagés (via `sharedDocuments` et la relation nommée `"SharedDocuments"`).

---

### Table `Document`
| Nom de colonne       | Type        | Contraintes                |
|-----------------------|-------------|----------------------------|
| `id`                 | `UUID`      | PK, Généré par défaut      |
| `title`              | `String`    | Non NULL                   |
| `userId`             | `UUID`      | FK vers `User(id)`         |
| `isArchived`         | `Boolean`   | Défaut : `false`           |
| `parentDocumentId`   | `UUID`      | FK vers `Document(id)` (relation récursive) |
| `content`            | `String`    | Optionnel                  |
| `coverImage`         | `String`    | Optionnel                  |
| `icon`               | `String`    | Optionnel                  |
| `isPublished`        | `Boolean`   | Défaut : `false`           |
| `urlPublished`       | `String`    | Unique, Optionnel          |
| `createdAt`          | `DateTime`  | Défaut : `now()`           |
| `updatedAt`          | `DateTime`  | Mis à jour automatiquement |

#### Relations :
- **N:1** avec `User` (via `ownerUser`).
- **N:N** avec `User` pour les documents partagés (via `sharedUsers` et la relation nommée `"SharedDocuments"`).
- **1:N** avec elle-même pour les documents enfants (via `parentDocument` et `children`).

#### Index :
- `idx_documents_by_user` : sur `userId`.
- `idx_documents_by_user_parent` : sur `userId, parentDocumentId`.

---

## Relations entre Tables

- **User** (1) ↔ (N) **Document** : Un utilisateur peut posséder plusieurs documents.
- **User** (N) ↔ (N) **Document** (via `sharedDocuments`) : Les documents peuvent être partagés entre plusieurs utilisateurs.
- **Document** (1) ↔ (N) **Document** : Relation parent-enfant pour structurer les documents.

---

### Looping MLD

#### **User**
```plaintext
-----------------------------------------------
|                    User                     |
-----------------------------------------------
| id              : UUID (PK)                |
| email           : String (Unique)          |
| name            : String (Nullable)        |
| password        : String                   |
| role            : String (Default: "USER") |
| imageProfile    : String (Nullable)        |
| createdAt       : DateTime (Default: now)  |
| updatedAt       : DateTime (Auto-update)   |
| boardingStatus  : Boolean (Default: false) |
-----------------------------------------------
| FK: - documents (1:N -> Document.userId)   |
|     - sharedDocuments (N:M -> Document)    |
-----------------------------------------------

-----------------------------------------------
|                  Document                   |
-----------------------------------------------
| id               : UUID (PK)               |
| title            : String                  |
| userId           : UUID (FK -> User.id)    |
| isArchived       : Boolean (Default: false)|
| archivedId       : UUID (Nullable)         |
| isFavorite       : Boolean (Default: false)|
| parentDocumentId : UUID (Nullable)         |
| content          : String (Nullable)       |
| coverImage       : String (Nullable)       |
| offsety          : Float (Nullable)        |
| icon             : String (Nullable)       |
| isPublished      : Boolean (Default: false)|
| urlPublished     : String (Unique, Nullable)|
| createdAt        : DateTime (Default: now) |
| updatedAt        : DateTime (Auto-update)  |
-----------------------------------------------
| FK: - ownerUser (N:1 -> User)              |
|     - sharedUsers (N:M -> User)            |
|     - parentDocument (1:N Self-relation)   |
-----------------------------------------------
| Index: idx_documents_by_user               |
|        idx_documents_by_user_parent        |
-----------------------------------------------

-----------------------------------------------
|                   Image                     |
-----------------------------------------------
| id         : UUID (PK)                     |
| url        : String (Unique)               |
| filename   : String                        |
| filepath   : String                        |
| uploadedAt : DateTime (Default: now)       |
-----------------------------------------------

-----------------------------------------------
|                   Recover                   |
-----------------------------------------------
| id        : UUID (PK)                      |
| emailPrev : String                         |
| email     : String (Nullable)              |
| token     : String                         |
| createdAt : DateTime (Default: now)        |
-----------------------------------------------

```

## 🤝 Contribution

Les contributions sont les bienvenues !  
Créez une branche, proposez vos modifications via une **Pull Request** et nous serons heureux de les examiner. 😊

---

## 🧑‍💻 Auteur

- **Martig Antonin**

---

**Merci d'avoir exploré ce projet !** 🌟
