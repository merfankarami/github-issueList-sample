import { useState, useEffect } from "react";
import useSWR from "swr";

import { fetcher } from "../api";
import OpenIssueIcon from "./OpenIssueIcon";
import CloseIssueIcon from "./CloseIssueIcon";
import IssueList from "./IssueList";

function App() {
  const [issuesFilter, setIssuesFilter] = useState(0);
  const { data: issues } = useSWR("http://localhost:9000/issues", fetcher);

  return (
    <div className="container">
      <div className="box">
        <div className="box-header">
          <div
            onClick={() => setIssuesFilter(1)}
            data-testid="open-issues"
            className="open-issues">
            <OpenIssueIcon /> Open
          </div>
          <div
            onClick={() => setIssuesFilter(2)}
            data-testid="close-issues"
            className="close-issues">
            <CloseIssueIcon /> Closed
          </div>
        </div>

        <IssueList issues={issues} filter={issuesFilter} page={1} />
      </div>
    </div>
  );
}

export default App;
