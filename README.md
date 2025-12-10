# Loan Eligibility Simulator Frontend

A small React + TypeScript single-page app that walks a user through a multi-step loan application and shows a mocked eligibility and rate outcome. Built with Vite and Chakra UI; all data is simulated in the browser, no backend required.

## Table of Contents

- [Overview](#overview)
- [Prerequisites & Setup](#prerequisites--setup)
- [Running & Building](#running--building)
- [Testing (Happy Path with Validation)](#testing-happy-path-with-validation)
- [Mock Data & Where To Change It](#mock-data--where-to-change-it)
- [Limitations](#limitations)
- [Future Improvements](#future-improvements)

## Overview

The wizard collects:
- Loan product and purpose
- Loan amount and term
- Basic income, expenses and employment details

On the final **Review** step the app calls a local mock API and renders:
- Eligibility decision (eligible flag, risk category, recommended amount)
- Affordability metrics (debt-to-income, disposable income)
- Estimated rate, monthly payment and short payment schedule

These values are **mocked**: the frontend always uses fixed example responses defined in the mock API module, aligned with the sample payloads in `LoanEligibilitySimulatorEndpoints.md`. They are for demo only, not real credit decisions.

## Project

### Task Tracking
Task tracking was done with Asana:

<img width="1330" height="752" alt="AsanaTime" src="https://github.com/user-attachments/assets/1a8a7425-cfab-4ec9-baf4-1ac823a1b4ee" />


### Time Tracking
Time tracking was done with Clockify:

<img width="1358" height="350" alt="Clockify (Time)" src="https://github.com/user-attachments/assets/b973cf8f-0677-468e-8d25-b6a797d7f57e" />

### GitHub Pages
The page can be viewed via GitHub pages [here.](https://joshp2401.github.io/loan-eligibility-demo/)


## Prerequisites & Setup

- Node.js 20.x LTS (or later)
- npm 10.x

Clone and install:

```bash
git clone <REPO_URL> loan-eligibility-demo
cd loan-eligibility-demo
npm install
```

If you hit version issues, check and update:

```bash
node -v
npm -v
npm outdated
npm update
```

## Running & Building

Development server (with hot reload):

```bash
npm run dev
```

Production build:

```bash
npm run build
```

Preview the built app:

```bash
npm run preview
```

Lint the codebase:

```bash
npm run lint
```

## Testing (Happy Path with Validation)

There is no automated test runner yet. To test the flow and the error messages:

1. Run `npm run dev` and open the printed URL.

2. Step 1 – Product & purpose
   - First try clicking **Next** without choosing a product or purpose and check that validation errors show.
   - Then pick any loan product and a valid purpose to clear the errors.

3. Step 2 – Income & expenses
   - Try invalid inputs to surface errors, for example:
     - Leave income or expenses empty and blur the field.
     - Enter income below R5,000.
     - Type non-numeric text into a numeric field.
   - Then fix them with realistic values (e.g. age in range, income ≥ R5,000, sensible expenses) so the step can continue.

4. Step 3 – Loan details
   - Trigger a few errors:
     - Amount below R5,000 or above R300,000.
     - Term outside 6–60 months.
     - Negative existing debt, or out-of-range credit score.
   - Correct them with valid values so you can proceed to Review.

5. Step 4 – Review
   - Confirm the summary matches the mocked response data provided.
   - Confirm once Submit is clicked that the entered form values are logged.
   - Refresh the page and confirm the mocked offer stays the same (responses are fixed demo data from the mock API).

## Mock Data & Where To Change It

All products, eligibility responses and rate calculations live in the mock API module under `src/features/loan-application/api/loanApi.ts`. Adjusting the returned JSON there will immediately change what the Review step displays, making it easy to script different demo scenarios (e.g. lower approval likelihood, different payment schedule).

## Limitations

- Mocked backend only (no persistence or real credit rules).
- Eligibility and rate outcomes do not change based on the exact inputs; they are fixed examples for demonstration and UI review.

## Future Improvements

- Implement proper functionality to use real data from the frontend to determine eligibility and calculate rates based on actual user inputs.
- Add translation functionality using i18next to support multiple languages in the application.
