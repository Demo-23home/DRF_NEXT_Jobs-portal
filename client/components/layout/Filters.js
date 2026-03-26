import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";

const Filters = () => {
  const router = useRouter();
  const [params, setParams] = useState(new URLSearchParams());

  // Load query params from URL
  useEffect(() => {
    if (typeof window !== "undefined") {
      setParams(new URLSearchParams(window.location.search));
    }
  }, [router.query]);

  // Handle checkbox clicks
  const handleClick = (checkbox) => {
    const updatedParams = new URLSearchParams(params.toString());

    // Uncheck other checkboxes in the same group
    document.getElementsByName(checkbox.name).forEach((item) => {
      if (item !== checkbox) item.checked = false;
    });

    if (!checkbox.checked) {
      updatedParams.delete(checkbox.name);
    } else {
      updatedParams.set(checkbox.name, checkbox.value);
    }

    setParams(updatedParams);

    router.replace({
      pathname: router.pathname,
      query: Object.fromEntries(updatedParams.entries()),
    });
  };

  // Returns whether a checkbox should be checked
  const checkHandler = (name, value) => {
    return params.get(name) === value;
  };

  // Clear all filters
  const clearFilters = () => {
    setParams(new URLSearchParams());

    // Uncheck all checkboxes
    document.querySelectorAll("input[type=checkbox]").forEach((checkbox) => {
      checkbox.checked = false;
    });

    // Remove all query params except maybe page or key_word
    router.replace({
      pathname: router.pathname,
      query: {},
    });
  };

  return (
    <div className="sidebar mt-5">
      <h3>Filters</h3>

      <button
        className="btn btn-sm btn-primary mb-3"
        onClick={clearFilters}
      >
        Clear Filters
      </button>

      <hr />
      <h5 className="filter-heading mb-3">Job Type</h5>

      {["Permanent", "Temporary", "Internship"].map((type, i) => (
        <div className="form-check" key={type}>
          <input
            className="form-check-input"
            type="checkbox"
            name="job_type"
            id={`job_type_${i}`}
            value={type}
            checked={checkHandler("job_type", type)}
            onChange={(e) => handleClick(e.target)}
          />
          <label className="form-check-label" htmlFor={`job_type_${i}`}>
            {type}
          </label>
        </div>
      ))}

      <hr />
      <h5 className="mb-3">Education</h5>

      {["Bachelors", "Masters", "Phd"].map((level, i) => (
        <div className="form-check" key={level}>
          <input
            className="form-check-input"
            type="checkbox"
            name="education"
            id={`edu_${i}`}
            value={level}
            checked={checkHandler("education", level)}
            onChange={(e) => handleClick(e.target)}
          />
          <label className="form-check-label" htmlFor={`edu_${i}`}>
            {level}
          </label>
        </div>
      ))}

      <hr />
      <h5 className="mb-3">Experience</h5>

      {["No Experience", "1 Years", "2 Years", "3 Years above"].map(
        (exp, i) => (
          <div className="form-check" key={exp}>
            <input
              className="form-check-input"
              type="checkbox"
              name="experience"
              id={`exp_${i}`}
              value={exp}
              checked={checkHandler("experience", exp)}
              onChange={(e) => handleClick(e.target)}
            />
            <label className="form-check-label" htmlFor={`exp_${i}`}>
              {exp}
            </label>
          </div>
        )
      )}

      <hr />
      <h5 className="mb-3">Salary Range</h5>

      {[
        "1-5000",
        "5000-10000",
        "10000-20000",
        "20000-50000",
        "50000-100000",
      ].map((range, i) => (
        <div className="form-check" key={range}>
          <input
            className="form-check-input"
            type="checkbox"
            name="salary"
            id={`salary_${i}`}
            value={range}
            checked={checkHandler("salary", range)}
            onChange={(e) => handleClick(e.target)}
          />
          <label className="form-check-label" htmlFor={`salary_${i}`}>
            ${range.replace("-", " - $")}
          </label>
        </div>
      ))}

      <hr />
    </div>
  );
};

export default Filters;
