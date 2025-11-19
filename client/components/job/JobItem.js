import React from "react";
import Link from "next/link";

const JobItem = () => {
  return (
    <Link href="/jobdetail" className="job-listing">
      <div className="job-listing-details">
        <div className="job-listing-description">
          <h4 className="job-listing-company">Tech</h4>
          <h3 className="job-listing-title">Java Developer required</h3>
          <p className="job-listing-text">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat.
          </p>
        </div>

        <span className="bookmark-icon"></span>
      </div>

      <div className="job-listing-footer">
        <ul>
          <li>
            <i className="fas fa-industry" aria-hidden="true"></i> Business
          </li>
          <li>
            <i className="fas fa-briefcase" aria-hidden="true"></i> Permanent
          </li>
          <li>
            <i className="fas fa-money-check-alt" aria-hidden="true"></i> $50000
          </li>
          <li>
            <i className="far fa-clock" aria-hidden="true"></i> Post 2 months
            ago
          </li>
        </ul>
      </div>
    </Link>
  );
};

export default JobItem;
