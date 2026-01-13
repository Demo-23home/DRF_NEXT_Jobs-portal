import React from "react";
import JobItem from "./job/JobItem";
import Link from "next/link";
import { useRouter } from "next/router";
import ReactPaginate from "react-paginate";
import Filters from "./layout/Filters";

const Home = ({ data }) => {
  const { count, resPerPage, jobs } = data;
  const router = useRouter();
  let { key_word } = router.query;

  // Ensure valid page number
  let currentPage = parseInt(router.query.page, 10);
  if (!currentPage || isNaN(currentPage)) currentPage = 1;

  const handlePageClick = ({ selected }) => {
    const newPage = selected + 1;

    router.push({
      pathname: router.pathname,
      query: {
        ...router.query,
        page: newPage,
      },
    });
  };

  return (
    <div className="container container-fluid">
      <div className="row">
        <div className="col-xl-3 col-lg-4">
          <Filters />
        </div>

        <div className="col-xl-9 col-lg-8 content-left-offset">
          <div className="my-5">
            <h4 className="page-title">
              {key_word
                ? `${jobs.length} Results for ${key_word}`
                : "Latest Jobs"}
            </h4>

            <Link href="/stats">
              <button className="btn btn-secondary float-right stats_btn">
                Get Topic stats
              </button>
            </Link>

            <div className="d-block">
              <Link href="/search">Go to Search</Link>
            </div>
          </div>

          {Array.isArray(jobs) &&
            jobs.map((job) => <JobItem key={job.id} job={job} />)}

          {/* Pagination */}
          {count > resPerPage && (
            <ReactPaginate
              pageCount={Math.ceil(count / resPerPage)}
              onPageChange={handlePageClick}
              forcePage={currentPage - 1} // ZERO based index
              previousLabel="Prev"
              nextLabel="Next"
              breakLabel="..."
              containerClassName="pagination justify-content-center"
              pageClassName="page-item"
              pageLinkClassName="page-link"
              previousClassName="page-item"
              nextClassName="page-item"
              previousLinkClassName="page-link"
              nextLinkClassName="page-link"
              activeClassName="active"
              breakClassName="page-item"
              breakLinkClassName="page-link"
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
