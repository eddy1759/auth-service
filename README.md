![Tests](https://img.shields.io/github/actions/workflow/status/YOUR_USERNAME/auth-service/ci.yml?branch=main&style=flat-square&label=tests)
![Reliability](https://img.shields.io/uptimerobot/ratio/YOUR_SERVICE_ID?style=flat-square&label=SLA)
![License](https://img.shields.io/github/license/YOUR_USERNAME/auth-service?style=flat-square)

# Authentication & Authorization Service

Central microservice for managing user identity, sessions, JWT, and tenant-level permissions (RBAC).

**[CRITICAL]** This is a Tier-0 service. An outage in this service will result in a **total platform-wide lockout** for all users. Changes must be backward-compatible and deployed with extreme caution.

-   **Owner:** `@identity-platform`
-   **Tech Stack:** NestJS, TypeScript, PostgreSQL, Redis
-   **Deployment:** `production` (Canary deployments via GitHub Actions)

---

## Running Locally

1.  Clone the repository:
    ```bash
    git clone [https://github.com/eddy1759/auth-service.git](https://github.com/eddy1759/auth-service.git)
    cd auth-service
    ```

2.  Install dependencies:
    ```bash
    pnpm install
    ```

3.  Set up your environment:
    ```bash
    cp .env.example .env
    ```
    (Fill in `DATABASE_URL`, `REDIS_URL`, `JWT_SECRET`, `JWT_REFRESH_SECRET`, etc.)

4.  Run migrations:
    ```bash
    pnpm db:migrate
    ```

5.  Start the development server:
    ```bash
    pnpm start:dev
    ```

The service will be available at `http://localhost:3002`.

---

## Core Responsibilities

-   User registration, login, and password reset.
-   JWT generation and validation.
-   Session management and token revocation (via Redis).
-   Role-Based Access Control (RBAC) permission checks.
-   Inter-service `X-Service-Token` validation.

## API Endpoints

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `POST` | `/v1/auth/register` | Register a new user. |
| `POST` | `/v1/auth/login` | Login and return JWTs. |
| `POST` | `/v1/auth/refresh` | Refresh an access token. |
| `POST` | `/v1/auth/validate` | Validate a token (used by other services). |
| `GET` | `/v1/users/:id/permissions` | Get a user's computed permissions. |
