export const checklist = [
  {
    group: "Type and color",
    items: [
      "Replaced Times, Georgia, Arial, Courier, and Trebuchet with one sans family and one heading face.",
      "Locked the type scale. Removed one-off sizes such as 11px, 13px, 15px, 19px, and 31px.",
      "Moved spacing onto a 4px scale. Removed 7px, 9px, 11px, and 13px gaps.",
      "Put color and radius in CSS variables and dropped the indigo-to-violet gradient chrome.",
      "Darkened muted text so labels clear WCAG AA on the paper background.",
    ],
  },
  {
    group: "Behavior",
    items: [
      "Removed dead controls: Filter, Sync now, the AI chip, Click, and per-row View.",
      "Export downloads a CSV of the rows in the current view.",
      "New deal opens a dialog, checks required fields, and adds the deal to the session.",
      "Stage changes update the board and confirm with a toast.",
      "Account names open a detail page. A note can be saved there for the session.",
      "Removing a deal asks for confirmation, then updates the board.",
      "Rows, cards, navigation, and buttons have hover and active states.",
    ],
  },
  {
    group: "Sample data",
    items: [
      "Replaced three placeholder rows and lorem with 12 accounts, 16 deals, and an activity log, using one currency and date format.",
    ],
  },
  {
    group: "States",
    items: [
      "Search and filters that match nothing show an empty state and a clear action.",
      "Stalled renewals render an empty state instead of a blank box.",
      "Refresh on reports replays a skeleton loading state, then restores the figures.",
      "Reports can show an error state with retry.",
      "Unknown account links render a not-found state, and the reports stub is now a finished view.",
    ],
  },
  {
    group: "Responsive layout",
    items: [
      "The page no longer forces an 1180px canvas, so phones do not scroll sideways.",
      "Navigation collapses into a menu sheet on small screens.",
      "Account rows become cards on narrow screens, and the pipeline scrolls inside the board.",
    ],
  },
  {
    group: "Accessibility",
    items: [
      "Form controls have visible labels. The rough search field had only a placeholder.",
      "Focus rings stay visible. The rough build removed outlines on buttons.",
      "Added a skip link, nav and main landmarks, and names on icon buttons.",
    ],
  },
] as const;

export const fixCount = checklist.reduce((sum, group) => sum + group.items.length, 0);
