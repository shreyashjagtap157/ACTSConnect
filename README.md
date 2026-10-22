# ACTSConnect

ACTSConnect is a social and professional networking application intended to connect current students and alumni of the ACTS organization. Its goal is to support academic help, career advice, referrals, job opportunities and community networking.

> **Repository status — 22 October 2026:** full-stack source is present, but the canonical frontend/submodule layout is not yet clear. No recent GitHub Actions runs or GitHub releases were found for this repository, and a production deployment was not independently verified. Treat this as a development project until its build, integration and security gates pass.

## Intended product areas

- Student and alumni profiles.
- Posts and community updates.
- Professional networking and referrals.
- Job-opportunity sharing.
- Accommodation information for students.
- Real-time or video-related experiences where configured.

The presence of a dependency or directory does not by itself prove that a feature is fully integrated or production-ready.

## Repository layout

The current repository contains:

- `frontend/` — React application and npm manifest.
- `acts-connect-backend/` — Spring Boot backend and Maven manifest.
- `ACTS Connect/` and `ACTS Connect.zip` — additional historical/project material.
- `.gitmodules` — a declared frontend submodule.

The submodule metadata refers to `acts-connect-frontend/ActsConnect_Frontend` from another GitHub owner, while the observed root layout uses `frontend/` and `acts-connect-backend/`. Resolve this discrepancy and document one canonical source of truth before making releases.

Related repositories in this account:

- [Frontend repository](https://github.com/shreyashjagtap157/acts-connect-frontend)
- [Backend repository](https://github.com/shreyashjagtap157/acts-connect-backend)

These sibling repositories have older histories and should not be assumed to match the directories currently nested here without a comparison.

## Technology

The frontend package manifest identifies React 18, Material UI, Redux Toolkit, Axios, React Router, Formik and Tailwind CSS, among other dependencies.

The backend Maven manifest identifies Spring Boot 3.3.2, Java 17, Spring Web, Spring Data JPA, MySQL, Spring Security and JWT-related libraries.

Use the manifests in the current checkout as the source of truth for exact dependency versions.

## Local development

Prerequisites: Node.js/npm, JDK 17, the Maven wrapper and a configured database.

Frontend:

```bash
cd frontend
npm ci
npm run build
```

Backend:

```bash
cd acts-connect-backend
# Linux/macOS
./mvnw verify
# Windows PowerShell
.`mvnw.cmd` verify
```

Configure database credentials and authentication secrets through a local, untracked environment/configuration file. Never commit production credentials. The commands above are build checks; they do not prove frontend/backend integration or successful production deployment.

## Known engineering work

The primary repository has longstanding issues concerning asynchronous operations, backend test coverage, connection pooling and caching. It also has an open pull request addressing an auto-generated constructor stub. Confirm whether each item is still relevant before closing or implementing it.

## Validation priorities

1. Consolidate the source layout and correct the stale submodule definition.
2. Add CI for frontend installation/build/tests and backend Maven verification.
3. Test registration, authentication, authorization, profiles, posts and networking end to end.
4. Audit JWT/session handling, password storage, input validation and database access.
5. Document a reproducible development setup and only advertise verified deployment URLs.

## License

See the repository's [LICENSE](LICENSE), if present, and verify the licensing of any external submodules before redistribution.
