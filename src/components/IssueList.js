import useInfiniteScroll from "../hooks/useInfiniteScroll";
import IssueItem from "./IssueItem";
import Loading from "./Loading";

const FinalIssuesList = ({ issues, filter }) => {
  const openIssues = issues?.filter((i) => i.status === "open");
  const closedIssues = issues?.filter((i) => i.status === "closed");

  const Component = ({ issues }) => {
    return (
      <div className="issues" data-testid="issues">
        {issues?.map((i, idx) => (
          <IssueItem issue={i} key={idx} />
        ))}
      </div>
    );
  };

  if (filter === 0) {
    return <Component issues={issues} />;
  } else if (filter === 1) {
    return <Component issues={openIssues} />;
  } else if (filter === 2) {
    return <Component issues={closedIssues} />;
  }
};

function IssueList({ issues, filter, page }) {
  const [isFetching, setIsFetching] = useInfiniteScroll(fetchMoreListItems);

  function fetchMoreListItems() {}

  return (
    <>
      {issues ? (
        <FinalIssuesList issues={issues} filter={filter} />
      ) : (
        <Loading />
      )}
    </>
  );
}

export default IssueList;

// console.log("innerHeight: ", window.innerHeight);
// console.log("document: ", document.documentElement.scrollTop);
// console.log("sum: ", document.documentElement.offsetHeight);
