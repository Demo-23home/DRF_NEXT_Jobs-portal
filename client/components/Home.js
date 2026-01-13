import React from "react";
import JobItem from "./job/JobItem";
import Link from "next/link";
import { useRouter } from "next/router";

const Home = ({ data }) => {
  const { count, resPerPage, jobs } = data;
  const router = useRouter();
  let {key_word} = router.query
  return (
    <div className="container container-fluid">
      <div className="row">
        <div className="col-xl-3 col-lg-4">{/* <Filters /> */}</div>

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
          {jobs && jobs.map((job) => <JobItem key={job.id} job={job} />)}
        </div>
      </div>
    </div>
  );
};

export default Home;
