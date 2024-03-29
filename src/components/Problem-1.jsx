import React, {  useContext, useEffect, useState } from "react";

const Problem1 = () => {
  const [show, setShow] = useState("all");
  const [todos, setTodos] = useState([]);

  useEffect(()=>{
    setTodos(JSON.parse(localStorage.getItem("info")) || []);
},[])

  const handleClick = (val) => {
    setShow(val);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const name = e.target.name.value;
    const status = e.target.status.value;
    const info = { name, status };
    setTodos([...todos, info]);
    localStorage.setItem("info", JSON.stringify([...todos, info]));
  };

  const active = todos?.filter(t => t.status.toLowerCase() === "active");
  const complete = todos?.filter(t => t.status.toLowerCase() === "completed");
  const pending = todos?.filter(t => t.status.toLowerCase() === "pending");
  const archive = todos?.filter(t => t.status.toLowerCase() === "archive");

  let content = [];
  if(show === "active"){
    content = active;
  }
  else if(show === "completed"){
    content = complete;
  }
  else if(show === "pending"){
    content = pending;
  }
  else if(show === "archive"){
    content = archive;
  }
  else {
    content = todos.sort((a, b) => {
        if (a.status === "active" && b.status !== "active") {
            return -1;
        }
        if (a.status === "completed" && b.status !== "completed") {
            return -1;
        }
        if (a.status !== "archive" && b.status === "archive") {
            return 1;
        }
        return 0;
    });
    
  }

  return (
    <div className="container">
      <div className="row justify-content-center mt-5">
        <h4 className="text-center text-uppercase mb-5">Problem-1</h4>
        <div className="col-6 ">
          <form
            onSubmit={handleSubmit}
            className="row gy-2 gx-3 align-items-center mb-4"
          >
            <div className="col-auto">
              <input
                type="text"
                className="form-control"
                name="name"
                placeholder="Name"
              />
            </div>
            <div className="col-auto">
              <input
                type="text"
                className="form-control"
                name="status"
                placeholder="Status"
              />
            </div>
            <div className="col-auto">
              <button type="submit" className="btn btn-primary">
                Submit
              </button>
            </div>
          </form>
        </div>
        <div className="col-8">
          <ul className="nav nav-pills mb-3" id="pills-tab" role="tablist">
            <li className="nav-item">
              <button
                className={`nav-link ${show === "all" && "active"}`}
                type="button"
                onClick={() => handleClick("all")}
              >
                All
              </button>
            </li>
            <li className="nav-item">
              <button
                className={`nav-link ${show === "active" && "active"}`}
                type="button"
                onClick={() => handleClick("active")}
              >
                Active
              </button>
            </li>
            <li className="nav-item">
              <button
                className={`nav-link ${show === "completed" && "active"}`}
                type="button"
                onClick={() => handleClick("completed")}
              >
                Completed
              </button>
            </li>
          </ul>
          <div className="tab-content"></div>
          <table className="table table-striped ">
            <thead>
              <tr>
                <th scope="col">Name</th>
                <th scope="col">Status</th>
              </tr>
            </thead>
            <tbody>
              {content?.map((t) => (
                <tr key={t.name}>
                  <td>{t.name}</td>
                  <td>{t.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Problem1;
