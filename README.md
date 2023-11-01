Back-end forum application created with the NestJs framework (opinionated framework).

Docker was used to create the Postgree database and the Prisma ORM was used to manipulate the database.

Dependency inversion was also used to allow application layers to be independent (use case layer, controller layer, domain layer)

In the application, JWT was used for user authentication, zod was used to validate data arriving on http routes, guards was used to place restrictions on routes (e.g. only being able to access a route if you are logged in), it was used domain events to send notifications

Instructions for using the application:

- use the 'npm run start:dev' command to run the application in watch mode
- use a program like insomnia to make requests to http://localhost:port/route

Unit and e2e tests were also created, to run them use the commands: npm run test / npm run test:e2e
