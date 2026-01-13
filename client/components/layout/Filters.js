import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";

const Filters = () => {
  const router = useRouter();

  // State to store query params safely after hydration
  const [params, setParams] = useState(new URLSearchParams());

  // Hydrate query params from URL on mount + whenever router.query changes
  useEffect(() => {
    if (typeof window !== "undefined") {
      setParams(new URLSearchParams(window.location.search));
    }
  }, [router.query]);

  // Handles checkbox selection
  const handleClick = (checkbox) => {
    const updatedParams = new URLSearchParams(params.toString());

    // Uncheck other checkboxes in same group
    document.getElementsByName(checkbox.name).forEach((item) => {
      if (item !== checkbox) item.checked = false;
    });

    // Remove filter if unchecked
    if (!checkbox.checked) {
      updatedParams.delete(checkbox.name);
    } else {
      updatedParams.set(checkbox.name, checkbox.value);
    }

    setParams(updatedParams);

    // Sync with URL without reloading the page
    router.replace({
      pathname: router.pathname,
      query: Object.fromEntries(updatedParams.entries()),
    });
  };

  // Returns whether a checkbox should be checked
  const checkHandler = (name, value) => {
    const selected = params.get(name);
    return selected === value;
  };

  return (
    <div className="sidebar mt-5">
      <h3>Filters</h3>

      <hr />
      <h5 className="filter-heading mb-3">Job Type</h5>

      {["Permanent", "Temporary", "Internship"].map((type, index) => (
        <div className="form-check" key={type}>
          <input
            className="form-check-input"
            type="checkbox"
            name="job_type"
            id={`job_type_${index}`}
            value={type}
            checked={checkHandler("job_type", type)}
            onChange={(e) => handleClick(e.target)}
          />
          <label className="form-check-label" htmlFor={`job_type_${index}`}>
            {type}
          </label>
        </div>
      ))}

      <hr />
      <h5 className="mb-3">Education</h5>

      {["Bachelors", "Masters", "Phd"].map((level, index) => (
        <div className="form-check" key={level}>
          <input
            className="form-check-input"
            type="checkbox"
            name="education"
            id={`edu_${index}`}
            value={level}
            checked={checkHandler("education", level)}
            onChange={(e) => handleClick(e.target)}
          />
          <label className="form-check-label" htmlFor={`edu_${index}`}>
            {level}
          </label>
        </div>
      ))}

      <hr />
      <h5 className="mb-3">Experience</h5>

      {["No Experience", "1 Years", "2 Years", "3 Years above"].map(
        (exp, index) => (
          <div className="form-check" key={exp}>
            <input
              className="form-check-input"
              type="checkbox"
              name="experience"
              id={`exp_${index}`}
              value={exp}
              checked={checkHandler("experience", exp)}
              onChange={(e) => handleClick(e.target)}
            />
            <label className="form-check-label" htmlFor={`exp_${index}`}>
              {exp}
            </label>
          </div>
        )
      )}

      <hr />
      <h5 className="mb-3">Salary Range</h5>

      {[
        "1-50000",
        "50000-100000",
        "100000-200000",
        "300000-500000",
        "500000-1000000",
      ].map((range, index) => (
        <div className="form-check" key={range}>
          <input
            className="form-check-input"
            type="checkbox"
            name="salary"
            id={`salary_${index}`}
            value={range}
            checked={checkHandler("salary", range)}
            onChange={(e) => handleClick(e.target)}
          />
          <label className="form-check-label" htmlFor={`salary_${index}`}>
            ${range.replace("-", " - $")}
          </label>
        </div>
      ))}

      <hr />
    </div>
  );
};

export default Filters;
