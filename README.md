# Relayboard

A before-and-after of the same fictional B2B pipeline desk. One route is a rough prototype. The other is a finished demo: working controls, a sample book of accounts and deals, and the empty, loading, and error states a reviewer expects.

No backend, no accounts, and no model calls. Everything lives in the browser session. Refresh the page to restore the sample book.

## Run locally

```bash
npm install
npm run dev
```

Open [http://localhost:3847](http://localhost:3847).

```bash
npm run lint
npm run build
npm start
```

Deploy on Vercel with the default Next.js settings. There are no environment variables.

## Routes

| Route | What it is |
| --- | --- |
| `/` | Case study, punch list, and screenshots |
| `/before` | Rough overview. Buttons do nothing. |
| `/before/reports` | Unfinished reports stub |
| `/after` | Finished overview |
| `/after/accounts` | Searchable account book |
| `/after/accounts/harbor-pine` | Account detail |
| `/after/deals` | Pipeline board |
| `/after/reports` | Report with loading, empty, and error states |

## Punch list

The finished demo covers these fixes:

1. Replaced Times, Georgia, Arial, Courier, and Trebuchet with one sans family and one heading face.
2. Locked the type scale. Removed one-off sizes such as 11px, 13px, 15px, 19px, and 31px.
3. Moved spacing onto a 4px scale. Removed 7px, 9px, 11px, and 13px gaps.
4. Put color and radius in CSS variables and dropped the indigo-to-violet gradient chrome.
5. Darkened muted text so labels clear WCAG AA on the paper background.
6. Removed dead controls: Filter, Sync now, the AI chip, Click, and per-row View.
7. Export downloads a CSV of the rows in the current view.
8. New deal opens a dialog, checks required fields, and adds the deal to the session.
9. Stage changes update the board and confirm with a toast.
10. Account names open a detail page. A note can be saved there for the session.
11. Removing a deal asks for confirmation, then updates the board.
12. Rows, cards, navigation, and buttons have hover and active states.
13. Replaced three placeholder rows and lorem with 12 accounts, 16 deals, and an activity log, using one currency and date format.
14. Search and filters that match nothing show an empty state and a clear action.
15. Stalled renewals render an empty state instead of a blank box.
16. Refresh on reports replays a skeleton loading state, then restores the figures.
17. Reports can show an error state with retry.
18. Unknown account links render a not-found state, and the reports stub is now a finished view.
19. The page no longer forces an 1180px canvas, so phones do not scroll sideways.
20. Navigation collapses into a menu sheet on small screens.
21. Account rows become cards on narrow screens, and the pipeline scrolls inside the board.
22. Form controls have visible labels. The rough search field had only a placeholder.
23. Focus rings stay visible. The rough build removed outlines on buttons.
24. Added a skip link, nav and main landmarks, and names on icon buttons.

Screenshots of both states, desktop and mobile, live in `public/shots` and on the case study page.
