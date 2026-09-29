# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

FlowSync is a training project (AI4Devs course). Two independent npm projects, TypeScript end to end, no root `package.json`:

- `backend/` — AdonisJS 7 API (Lucid ORM on SQLite, VineJS validators, token auth). **Treat as read-only in this session**: the exercise reads it (especially validators) but does not modify it.
- `frontend/` — React 19 + Vite 8, currently the untouched Vite starter (`src/App.tsx`). This is where feature work happens. The course expects shadcn/ui components (copied into the repo, not installed as a dependency); not set up yet.

`README.md` is the exercise statement (generated, do not edit by hand). `prompts.md` is a template where the student records every prompt they launched, verbatim.

Requires Node.js 24+ (older versions fail with `Unknown file extension ".ts"`).

## Commands

Backend (`cd backend`):

```bash
npm install
cp .env.example .env && node ace generate:key   # first time only
node ace migration:run                          # creates tmp/db.sqlite3
npm run dev          # node ace serve --hmr, http://localhost:3333
npm test             # node ace test (Japa)
node ace test --files=tests/functional/foo.spec.ts   # single file
node ace test functional                             # single suite (unit | functional)
npm run lint         # eslint
npm run typecheck    # tsc --noEmit
npm run format       # prettier (@adonisjs/prettier-config)
```

Test suites are declared in `adonisrc.ts`: `tests/unit/**/*.spec.ts` and `tests/functional/**/*.spec.ts` (functional suites start the HTTP server). No tests exist yet; only `tests/bootstrap.ts`.

Frontend (`cd frontend`):

```bash
npm install
npm run dev          # http://localhost:5173
npm run build        # tsc -b && vite build
npm run lint         # oxlint
```

The frontend has no formatter and no test runner configured.

## Backend architecture

Request flow: `start/routes.ts` → controller (`app/controllers`) → validator (`app/validators`, VineJS via `request.validateUsing`) → Lucid model (`app/models`) → transformer (`app/transformers`) → `ctx.serialize(...)`.

API surface (all under `/api/v1`):

| Method | Path | Auth | Body |
|---|---|---|---|
| POST | `/auth/signup` | no | `fullName` (nullable), `email`, `password` (8–32 chars), `passwordConfirmation` (must equal `password`) |
| POST | `/auth/login` | no | `email`, `password` |
| GET | `/account/profile` | Bearer token | — |
| POST | `/account/logout` | Bearer token | — |

Key details that span multiple files:

- **Signup requires `passwordConfirmation`** and enforces a unique email (`app/validators/user.ts`). A product ticket may not mention this.
- **Response envelope**: `providers/api_provider.ts` adds `ctx.serialize`, which wraps payloads in `{ data: ... }`. Signup/login return `{ data: { user, token } }`; profile returns `{ data: user }`. The user shape comes from `UserTransformer` (`id, fullName, email, createdAt, updatedAt, initials`; never the password).
- **Auth**: default guard is `api` (access tokens, `config/auth.ts`). Tokens are opaque strings prefixed `oat_`, stored hashed in `auth_access_tokens`. Send as `Authorization: Bearer <token>`. Logout deletes the current token.
- **Errors**: `ForceJsonResponseMiddleware` forces JSON on every response. Validation failures return 422 with `{ errors: [{ message, field, rule }] }`; bad credentials from `User.verifyCredentials` return 400 (`E_INVALID_CREDENTIALS`).
- **CORS**: in dev every origin is allowed with credentials (`config/cors.ts`); production allowlist is empty.
- **Schema generation**: `database/schema.ts` is generated from migrations (Lucid `schemaGeneration`, custom rules in `database/schema_rules.ts`). Models extend the generated classes (e.g. `User extends compose(UserSchema, withAuthFinder(hash))`) instead of declaring columns. Change the DB only via new migrations, never by editing tables or `schema.ts` by hand.
- **Generated code**: `.adonisjs/` (controller index `#generated/controllers`, Tuyau route registry used for typed test clients) is produced by the `indexEntities` / `generateRegistry` hooks in `adonisrc.ts`. Routes reference controllers as `controllers.Name`, not direct imports.
- **Import aliases**: use subpath imports from `package.json` (`#models/*`, `#validators/*`, `#transformers/*`, `#start/*`, ...) rather than relative paths.
