# Node.js + TypeScript Lambda (CI/CD)

Sample AWS Lambda written in TypeScript: build, unit tests with Jest, zip artifact, and deploy to Lambda via GitHub Actions on push to `main`.

## Requirements

- Node.js 20.x (matches the workflow and a typical Lambda runtime)
- npm
- For automated deploy: an AWS account, a Lambda function already created, and IAM credentials allowed to call `lambda:UpdateFunctionCode`

## Setup

```sh
cd 01-node-ts-ci-cd-lambda
npm install
```

## Scripts

| Script | Description |
|--------|-------------|
| `npm run build` | Compile `src/` to `dist/` with `tsc` |
| `npm test` | Run Jest tests once |
| `npm run test:watch` | Run Jest in watch mode |
| `npm run zip` | Zip the contents of `dist/` into `function.zip` (run `build` first) |
| `npm run start:dev` | Load `src/index.ts` with `ts-node` (does not invoke the handler) |

## Project layout

- `src/index.ts` — exports `handler` (API Gateway–style response: `statusCode` + JSON `body`)
- `test/` — Jest specs (`*.test.ts`), configured via `jest.config.js` and `tsconfig.jest.json`
- `.github/workflows/deploy.yml` — CI: install, build, test, zip, `aws lambda update-function-code`

## Local checks

```sh
npm run build
npm test
```

To call the compiled handler once from Node:

```sh
node -e "require('./dist/index.js').handler().then(console.log)"
```

## Lambda configuration

After `npm run zip`, the archive contains compiled files at the **root** of the zip (for example `index.js`). In AWS Lambda set:

- **Handler:** `index.handler`
- **Runtime:** Node.js 20.x (or align with your function)

Adjust the workflow if your function name is not `basic-ci-cd` (see `deploy.yml`).

## GitHub Actions secrets

Configure these repository secrets:

- `AWS_ACCESS_KEY_ID`
- `AWS_SECRET_ACCESS_KEY`
- `AWS_REGION`

The workflow runs on push to `main` only.

## Repository layout note

GitHub loads workflows from `.github/workflows` at the **repository root**. This file is inside `01-node-ts-ci-cd-lambda/`, which is correct when this directory is the root of the Git repository. If you keep a parent monorepo as the Git root, move or duplicate the workflow there and set the job’s working directory to this project folder.
