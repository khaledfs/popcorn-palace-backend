# Popcorn Palace Backend - Instructions

## Prerequisites

- **Node.js** (v18 or higher recommended)
- **npm** (comes with Node.js)
- **PostgreSQL** database running locally or via Docker
- Environment variables configured (see Setup)

## Setup

### 1. Install Dependencies

```bash
npm install
```

### 2. Configure Environment Variables

Create a `.env` file in the root directory with the following:

```env
DATABASE_URL=postgres://username:password@localhost:5432/popcorn_palace_db
NODE_ENV=development
```

**For PostgreSQL via Docker Compose:**

```bash
docker-compose up -d
```

This will start a PostgreSQL container. Update `DATABASE_URL` if using Docker.

### 3. Database Setup

TypeORM will automatically synchronize the database schema on startup (controlled by `synchronize: true` in `app.module.ts`). No manual migrations needed for development.

## Running the Project

### Development Mode (with hot reload)

```bash
npm run start:dev
```

The server will start on `http://localhost:3000` and automatically reload when you modify files.

### Production Mode

```bash
npm run build
npm run start:prod
```

### Debug Mode

```bash
npm run start:debug
```

Starts the server with debugging enabled. Connect your debugger to port 9229.

## Building

### Build for Production

```bash
npm run build
```

Output will be in the `dist/` directory. This directory is gitignored and regenerated on each build.

## Testing

### Run All Tests

```bash
npm test
```

### Run Tests in Watch Mode

```bash
npm run test:watch
```

Reruns tests automatically when you modify test files.

### Run Tests with Coverage Report

```bash
npm run test:cov
```

Coverage report will be generated in the `coverage/` directory.

### Debug Tests

```bash
npm run test:debug
```

## Code Quality

### Lint Code

```bash
npm run lint
```

Automatically fixes linting issues in `src/` and `test/` directories using ESLint.

### Format Code

```bash
npm run format
```

Formats all TypeScript files using Prettier according to `.prettierrc` rules.

## Project Structure

```
src/
├── main.ts                 # Application entry point
├── app.module.ts           # Root module
├── app.controller.ts       # Root controller
├── app.service.ts          # Root service
├── movies/                 # Movies module
│   ├── movie.entity.ts     # Movie database entity
│   ├── controller.ts       # Movies API endpoints
│   └── service.ts          # Movies business logic
├── showtimes/              # Showtimes module
│   ├── showtime.entity.ts  # Showtime database entity
│   ├── controller.ts       # Showtimes API endpoints
│   └── service.ts          # Showtimes business logic
└── bookings/               # Bookings module
    ├── booking.entity.ts   # Booking database entity
    ├── controller.ts       # Bookings API endpoints
    └── service.ts          # Bookings business logic

test/
├── app.e2e-spec.ts         # End-to-end tests
├── jest-e2e.json           # Jest E2E configuration
└── dotenv.e2e.ts           # Environment setup for E2E tests
```

## API Endpoints

### Movies

- `GET /movies` - Get all movies
- `POST /movies` - Create a new movie
- `GET /movies/:id` - Get a specific movie
- `PUT /movies/:id` - Update a movie
- `DELETE /movies/:id` - Delete a movie

### Showtimes

- `GET /showtimes/:id` - Get a showtime
- `POST /showtimes` - Create a new showtime
- `POST /showtimes/update/:id` - Update a showtime
- `DELETE /showtimes/:id` - Delete a showtime

### Bookings

- `POST /bookings` - Create a new booking

## Troubleshooting

### Database Connection Issues

- Ensure PostgreSQL is running: `docker-compose ps`
- Verify `DATABASE_URL` in `.env` is correct
- Check database credentials and network access

### Module Not Found Errors

```bash
rm -rf node_modules dist
npm install
npm run build
```

### Port Already in Use

Change the port in `src/main.ts`:

```typescript
await app.listen(3001) // Use a different port
```

### TypeScript Compilation Errors

Clear cache and rebuild:

```bash
npm run build
```

## Additional Commands

- `npm run lint` - Check code for linting issues
- `npm run format` - Auto-format code with Prettier
- `npm test` - Run unit tests
- `npm run test:e2e` - Run end-to-end tests
- `npm run test:cov` - Generate test coverage report

## Development Workflow

1. Start the dev server: `npm run start:dev`
2. Open `http://localhost:3000` in your browser
3. Edit files in `src/` — changes auto-reload
4. Run tests during development: `npm run test:watch`
5. Check code quality: `npm run lint`
6. Format code: `npm run format`

## Deployment

1. Build the project: `npm run build`
2. Set production environment variables
3. Run production server: `npm run start:prod`

Or use Docker:

```bash
docker build -t popcorn-palace .
docker run -e DATABASE_URL=<your-db-url> popcorn-palace
```

---

For more information, refer to the [NestJS documentation](https://docs.nestjs.com).
