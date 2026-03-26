import React from "react";
import dynamic from "next/dynamic";
import Link from "next/link";

const DataTable = dynamic(() => import("react-data-table-component"), {
  ssr: false,
});

const JobCandidates = ({ candidates_applied }) => {
  const columns = [
    { name: "Job Title", sortable: true, selector: (row) => row.title },
    { name: "User's name", sortable: true, selector: (row) => row.user },
    { name: "Resume", selector: (row) => row.resume },
    { name: "Applied At", sortable: true, selector: (row) => row.applied_at },
  ];

  const data = [];

  candidates_applied &&
    candidates_applied.forEach((item) => {
      data.push({
        title: item.job?.title || `Job #${item.job}`,
        user: item.user,
        resume: (
          <Link
            href={item.resume}
            target="_blank"
            rel="noreferrer"
            className="text-success"
          >
            <b>
              <i aria-hidden className="fas fa-download"></i> View Resume
            </b>
          </Link>
        ),
        applied_at: item.applied_at.substring(0, 10),
      });
    });

  return (
    <div className="row">
      <div className="col-2"></div>
      <div className="col-8 mt-5">
        <h4 className="my-5">
          {candidates_applied &&
            `${candidates_applied.length} Candidates applied for this position`}
        </h4>
        <DataTable columns={columns} data={data} pagination responsive />
      </div>
      <div className="col-2"></div>
    </div>
  );
};

export default JobCandidates;