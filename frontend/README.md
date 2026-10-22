# ACTSConnect Frontend

This directory contains the React frontend component used by the ACTSConnect repository, a student/alumni networking application intended to support profiles, community posts, career opportunities, referrals and related campus services.

> **Repository status — 22 October 2026:** This nested frontend is part of the primary repository. Its current API integration and production readiness are not established by a successful frontend build alone. See the root README for repository-wide validation status.

## Technology

The checked-in package manifest identifies React 18, React Router, Material UI, Redux Toolkit, Axios, Formik and Tailwind CSS, among other dependencies. Always use the versioned `package.json` and lockfile in this checkout as the dependency source of truth.

## Local development

Requirements: a supported Node.js/npm installation.

```bash
npm ci
npm start
```

To create a production build:

```bash
npm run build
```

Run the tests configured by the repository where practical:

```bash
npm test
```

The current application may expect backend APIs, environment configuration and authentication services. Configure local endpoints without committing secrets. Successful frontend compilation alone does not verify API integration or user workflows.

## Current maintenance priorities

1. Compare this repository with `ACTSConnect/frontend/` in the primary repository and select one canonical source.
2. Correct any API endpoints or setup instructions that refer to a different repository layout.
3. Verify login/session handling, API errors, authorization expectations and real-time/video integrations.
4. Add CI for clean dependency installation, production build, lint and tests.
5. Keep dependency/security updates aligned with the backend integration contract.

## License and provenance

Check the repository's license and third-party dependency terms before redistribution. This repository is associated with the broader ACTSConnect project; do not assume it is the authoritative or latest frontend without comparing histories.
