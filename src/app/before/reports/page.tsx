import type { Metadata } from "next";
import { RoughFrame } from "../rough-frame";

export const metadata: Metadata = {
  title: "Reports stub",
  description: "The unfinished reports page from the Relayboard prototype.",
};

export default function BeforeReportsPage() {
  return (
    <RoughFrame active="reports">
      <h1 className="rough-title">Reports</h1>
      <p className="rough-subtitle">work in progress — do not ship</p>
      <div className="rough-wip">
        <h2>chart goes here</h2>
        <p className="rough-lorem">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
          incididunt ut labore et dolore magna aliqua.
        </p>
        <p className="rough-todo">TODO: connect data source. generate insights button TBD.</p>
        <button type="button" className="rough-purple">
          Generate insights
        </button>
        <input className="rough-bareInput" placeholder="date range" />
        <textarea className="rough-bareArea" placeholder="ask the model..." />
        <table className="rough-table">
          <thead>
            <tr>
              <th>Metric</th>
              <th>Value</th>
            </tr>
          </thead>
          <tbody />
        </table>
      </div>
    </RoughFrame>
  );
}
