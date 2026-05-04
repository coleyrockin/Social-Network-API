# Roadmap

## Phase 1: Public Repository Readiness

Status: complete in this pass.

- Clean dependency metadata and lockfile.
- Remove tracked dependency artifacts from Git.
- Add `.env.example`.
- Add working `npm start`, `npm test`, and `npm run check` scripts.
- Rewrite README for public readers.
- Add security and codebase audit docs.

## Phase 2: Test Coverage

Priority: high.

- Add integration tests for user CRUD.
- Add integration tests for thought CRUD.
- Add tests for friend and reaction mutation edge cases.
- Use a disposable MongoDB database for test isolation.
- Add CI for tests, syntax checks, and dependency audit.

## Phase 3: Production Safety

Priority: high if this API will be deployed publicly.

- Add authentication.
- Add ownership checks for users, thoughts, and reactions.
- Add request rate limiting.
- Add request schema validation.
- Add structured logging without sensitive values.
- Document secure MongoDB deployment requirements.

## Phase 4: API Quality

Priority: medium.

- Add pagination to list endpoints.
- Add OpenAPI documentation.
- Normalize response bodies and status codes.
- Add seed data for local demos.
- Add examples for curl, Insomnia, or Postman.

## Phase 5: Deployment

Priority: optional until production safety is done.

- Add deployment docs.
- Add health check route.
- Add Dockerfile or platform-specific deployment config.
- Add environment-specific logging and process management.
