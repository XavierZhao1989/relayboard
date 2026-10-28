import type { Metadata } from "next";
import { RoughFrame } from "./rough-frame";

export const metadata: Metadata = {
  title: "Rough prototype",
  description: "The unfinished Relayboard prototype, with placeholder data and controls that do nothing.",
};

export default function BeforePage() {
  return (
    <RoughFrame active="home">
      <h1 className="rough-title">Dashboard!!!</h1>
      <p className="rough-subtitle">welcome back user here is your overview of the things</p>
      <div className="rough-toolbar">
        <button type="button" className="rough-blue">
          Export
        </button>
        <button type="button" className="rough-green">
          New Deal
        </button>
        <button type="button" className="rough-plain">
          Filter
        </button>
        <button type="button" className="rough-purple">
          Sync now
        </button>
        <div className="rough-fakeButton">AI magic</div>
        <button type="button" className="rough-click">
          Click
        </button>
        <input className="rough-search" placeholder="Search..." />
      </div>

      <div className="rough-kpis">
        <div className="rough-kpiA">
          Users
          <strong>3</strong>
        </div>
        <div className="rough-kpiB">
          MRR
          <strong>$???</strong>
        </div>
        <div className="rough-kpiC">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor
          incididunt ut labore.
        </div>
      </div>

      <div className="rough-row">
        <div className="rough-panel" style={{ width: 280 }}>
          <h2>Chart??</h2>
          <div className="rough-chart">
            <div className="rough-bar" style={{ height: 46 }}>
              Q1
            </div>
            <div className="rough-bar" style={{ height: 120, background: "#22c55e" }}>
              Q2
            </div>
            <div className="rough-bar" style={{ height: 78, background: "#f97316" }}>
              ??
            </div>
          </div>
        </div>
        <div className="rough-panel" style={{ flex: 1, marginTop: 14 }}>
          <h2>Notes</h2>
          <p className="rough-lorem">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent
            libero. Sed cursus ante dapibus diam.
          </p>
          <p className="rough-todo">TODO: hook up API</p>
        </div>
      </div>

      <table className="rough-table">
        <thead>
          <tr>
            <th>Company</th>
            <th>Amount</th>
            <th>Status</th>
            <th>Owner</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Acme Corp</td>
            <td>$10,000</td>
            <td>Pending</td>
            <td>—</td>
            <td>
              <button type="button" className="rough-view">
                View
              </button>
            </td>
          </tr>
          <tr>
            <td>Test Co</td>
            <td>lorem</td>
            <td>???</td>
            <td>TODO</td>
            <td>
              <button type="button" className="rough-view">
                View
              </button>
            </td>
          </tr>
          <tr>
            <td>Foo Industries</td>
            <td>$1</td>
            <td>new</td>
            <td></td>
            <td>
              <button type="button" className="rough-view">
                View
              </button>
            </td>
          </tr>
        </tbody>
      </table>
      <p className="rough-footer">powered by AI · last updated: never</p>
    </RoughFrame>
  );
}
