import React from "react";
import Link from "next/link";
import moment from "moment";

const JobItem = ({ job }) => {
  return (
    <Link href={`/jobs/${job.id}`} className="job-listing">
      <div className="job-listing-details">
        <div className="job-listing-description">
          <h4 className="job-listing-company">{job.company}</h4>
          <h3 className="job-listing-title">{job.title}</h3>
          <p className="job-listing-text">
            {job.description.substring(0, 200)}...
          </p>
        </div>

        <span className="bookmark-icon"></span>
      </div>

      <div className="job-listing-footer">
        <ul>
          <li>
            <i className="fas fa-industry" aria-hidden="true"></i>{" "}
            {job.industry}
          </li>
          <li>
            <i className="fas fa-briefcase" aria-hidden="true"></i>{" "}
            {job.jobType}
          </li>
          <li>
            <i className="fas fa-money-check-alt" aria-hidden="true"></i>{" "}
            {job.salary}
          </li>
          <li>
            <i className="far fa-clock" aria-hidden="true"></i>
            {moment.utc(job.created_at).local().startOf("seconds").fromNow()}
          </li>
        </ul>
      </div>
    </Link>
  );
};

export default JobItem;
