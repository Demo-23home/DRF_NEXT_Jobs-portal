import React from "react";
import dynamic from "next/dynamic";
import Link from "next/link";

const DataTable = dynamic(() => import("react-data-table-component"), {
  ssr: false,
});

const AppliedJobs = ({ jobs }) => {
  const columns = [
    { name: "Job name", sortable: true, selector: (row) => row.title },
    { name: "Salary", sortable: true, selector: (row) => row.salary },
    { name: "Education", sortable: true, selector: (row) => row.education },
    { name: "Experience", sortable: true, selector: (row) => row.experience },
    { name: "Applied on", sortable: true, selector: (row) => row.applied_at },
    { name: "Action", sortable: true, selector: (row) => row.action },
  ];

  const data = [];

  jobs &&
    jobs.forEach((item) => {
      data.push({
        title: item.job.title,
        eduction: item.job.education,
        salary: item.job.salary,
        experience: item.job.experience,
        applied_at: item.applied_at.substring(0, 10),
        action: (
          <Link legacyBehavior href={`/job/${item.job.id}`}>
            <a className="btn btn-primary">
              <i aria-hidden className="fa fa-eye"></i>
            </a>
          </Link>
        ),
      });
    });
  return (
    <div className="row">
      <div className="col-2"></div>
      <div className="col-8 mt-5">
        <h4 className="my-5"> Jobs Applied</h4>
        <DataTable columns={columns} data={data} pagination responsive />
      </div>
      <div className="col-2"></div>
    </div>
  );
};

export default AppliedJobs;
