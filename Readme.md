# Express TypeScript Template

A minimal, opinionated starter template for building REST APIs with Express 5, TypeScript, and modern Node.js tooling. It comes with structured logging, request correlation IDs, centralized error handling, and Zod-based request validation already wired up so you can start writing routes on day one.

## Features

- **Express 5** with native `async/await` route handlers
- **TypeScript** (`nodenext` module resolution, strict type-checking)
- **Versioned API routing** (`/api/v1`, `/api/v2`)
- **Structured JSON logging** via [Winston](https://github.com/winstonjs/winston), with daily-rotating log files (`winston-daily-rotate-file`)
- **Request correlation IDs** using `AsyncLocalStorage`, automatically attached to every log line and response header
- **Centralized error handling** with typed `AppError` subclasses (`BadRequestError`, `NotFoundError`, `UnauthorizedError`, etc.)
- **Schema validation** for request bodies and query params using [Zod](https://zod.dev/)
- Hot-reload development server via `tsx watch`

## Tech Stack

| Category    | Tool                                |
| ----------- | ----------------------------------- |
| Runtime     | Node.js                             |
| Language    | TypeScript                          |
| Framework   | Express 5                           |
| Validation  | Zod                                 |
| Logging     | Winston + winston-daily-rotate-file |
| Dev tooling | tsx, nodemon                        |
| IDs         | uuid                                |

## Project Structure

```
src/
├── config/
│   ├── index.ts              # App/server configuration (e.g. port)
│   └── logger.ts             # Winston logger setup
├── controllers/
│   └── ping.controller.ts    # Example controller
├── middlewares/
│   ├── correlation.middleware.ts  # Attaches a correlation ID to each request
│   └── error.middleware.ts        # Centralized error handler
├── routes/
│   ├── v1/
│   │   ├── index.routes.ts   # v1 router
│   │   └── ping.routes.ts    # /api/v1/ping
│   └── v2/
│       └── index.routes.ts   # v2 router (empty, ready for new routes)
├── utils/
│   ├── errors/
│   │   └── app.error.ts      # Typed application error classes
│   └── helpers/
│       └── request.helper.ts # AsyncLocalStorage helpers (correlation ID)
├── validators/
│   └── index.ts              # Zod-based body/query validation middlewares
└── server.ts                 # App entry point
```

## Prerequisites

- Node.js (LTS recommended)
- npm

## Getting Started

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd express-typescript-template
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Configure environment variables**

   Create a `.env` file in the project root (or edit the existing one):

   ```env
   PORT=3000
   ```

4. **Run the development server**

   ```bash
   npm run dev
   ```

   The server restarts automatically on file changes and runs directly from TypeScript source via `tsx watch`.

5. **Build for production**

   ```bash
   npm run build
   ```

   Compiles TypeScript from `src/` into `dist/` according to `tsconfig.json`.

6. **Run the production build**

   ```bash
   npm start
   ```

   Runs the compiled output from `dist/server.js`.

## Available Scripts

| Script          | Description                                |
| --------------- | ------------------------------------------ |
| `npm run dev`   | Start the app in watch mode using `tsx`    |
| `npm run build` | Compile TypeScript to `dist/`              |
| `npm start`     | Run the compiled app from `dist/server.js` |
| `npm test`      | Not yet configured                         |

## API Reference

All routes are versioned and mounted under `/api/<version>`.

### `GET /api/v1/ping`

Example health-check style endpoint.

**Success response** — `200 OK`

```json
{
  "message": "pong",
  "success": true
}
```

## Error Handling

Errors are represented as typed classes implementing the `AppError` interface (`src/utils/errors/app.error.ts`), each carrying a `statusCode`:

| Error class            | Status Code |
| ---------------------- | ----------- |
| `BadRequestError`      | 400         |
| `ValidationError`      | 400         |
| `UnauthorizedError`    | 401         |
| `ForbiddenError`       | 403         |
| `NotFoundError`        | 404         |
| `ConflictError`        | 409         |
| `TooManyRequestsError` | 429         |
| `InternalServerError`  | 500         |

Throw any of these from a controller and the `genericErrorHandler` middleware (`src/middlewares/error.middleware.ts`) will translate it into a consistent JSON error response.

## Request Validation

Use the helpers in `src/validators/index.ts` to validate incoming requests against a Zod schema:

```ts
import {
  validateRequestBody,
  validateQueryParams,
} from "./validators/index.js";
import { z } from "zod";

const createUserSchema = z.object({
  name: z.string(),
  email: z.email(),
});

router.post("/users", validateRequestBody(createUserSchema), createUser);
```

Invalid requests short-circuit with a `400` response containing flattened Zod error details.

## Logging & Correlation IDs

Every incoming request is assigned a unique correlation ID (`attachCorrelationIdMiddleware`), which is:

- Returned to the client in the `c-correlation-id` response header
- Automatically included in every log line emitted during that request's lifecycle, via `AsyncLocalStorage`

Logs are written as JSON to the console and to daily-rotating files under `logs/` (kept for 14 days, rotated at 20MB).

## License

ISC
