import { useEffect, useState } from "react";
import Header from "./Header";

const DisplayEmployees = () => {
  const [employees, setEmployees] = useState();

  useEffect(() => {
    fetch("http://localhost:2000/user-data")
      .then((res) => {
        return res.json();
      })
      .then(({ result }) => setEmployees(result));
  }, []);

  const calculateDaysOfEmployment = (startDate) => {
    let today = new Date().toISOString().slice(0, 10);
    const diffInMs = new Date(today) - new Date(startDate);
    const diffInDays = diffInMs / (1000 * 60 * 60 * 24);
    return diffInDays;
  };

  const date = employees ? employees[2].date_of_employment : "not yet";
  const startDate = new Date(date);

  console.log("calculated date: ", calculateDaysOfEmployment(startDate));

  return (
    <>
      <Header display={false} />
      <div className="flex w-screen h-screen p-10">
        <div className="flex flex-col w-full border-t border-r border-black">
          <div className="flex flex-shrink-0 bg-[#111827] text-white">
            <div className="flex items-center flex-grow w-0 h-10 px-2 border-b border-l border-black">
              <span>First Name</span>
            </div>
            <div className="flex items-center flex-grow w-0 h-10 px-2 border-b border-l border-black">
              <span>Middle Name</span>
            </div>
            <div className="flex items-center flex-grow w-0 h-10 px-2 border-b border-l border-black">
              <span>D.O.G</span>
            </div>
            <div className="flex items-center flex-grow w-0 h-10 px-2 border-b border-l border-black">
              <span>D.O.E</span>
            </div>
            <div className="flex items-center flex-grow w-0 h-10 px-2 border-b border-l border-black">
              <span>Duration in Days</span>
            </div>
            <div className="flex items-center flex-grow w-0 h-10 px-2 border-b border-l border-black">
              <span>Position</span>
            </div>
            <div className="flex items-center flex-grow w-0 h-10 px-2 border-b border-l border-black">
              <span>Salary</span>
            </div>
            <div className="flex items-center flex-grow w-0 h-10 px-2 border-b border-l border-black">
              <span>Supervisor</span>
            </div>
            <div className="flex items-center flex-grow w-0 h-10 px-2 border-b border-l border-black">
              <span>Emp_Code</span>
            </div>
          </div>
          <div className="overflow-auto">
            {employees &&
              employees.map((employee) => (
                <div
                  key={employee.employee_code}
                  className="flex flex-shrink-0"
                >
                  <div className="flex items-center flex-grow w-0 h-10 px-2 border-b border-l border-black">
                    <span>{employee.first_name}</span>
                  </div>
                  <div className="flex items-center flex-grow w-0 h-10 px-2 border-b border-l border-black">
                    <span>{employee.middle_name}</span>
                  </div>
                  <div className="flex items-center flex-grow w-0 h-10 px-2 border-b border-l border-black">
                    <span> {employee.date_of_graduation} </span>
                  </div>
                  <div className="flex items-center flex-grow w-0 h-10 px-2 border-b border-l border-black">
                    <span> {employee.date_of_employment} </span>
                  </div>
                  <div className="flex items-center flex-grow w-0 h-10 px-2 border-b border-l border-black">
                    <span>
                      {" "}
                      {calculateDaysOfEmployment(
                        employee.date_of_employment
                      )}{" "}
                    </span>
                  </div>
                  <div className="flex items-center flex-grow w-0 h-10 px-2 border-b border-l border-black">
                    <span> {employee.position} </span>
                  </div>
                  <div className="flex items-center flex-grow w-0 h-10 px-2 border-b border-l border-black">
                    <span> &#8373;{employee.salary} </span>
                  </div>
                  <div className="flex items-center flex-grow w-0 h-10 px-2 border-b border-l border-black">
                    <span> {employee.supervisor} </span>
                  </div>
                  <div className="flex items-center flex-grow w-0 h-10 px-2 border-b border-l border-black">
                    <span> {employee.employee_code} </span>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default DisplayEmployees;

/* 
<div>
      <h1>Employees</h1>
      {employees &&
        employees.map((employee) => (
          <p key={employee.employee_code}> {employee.first_name} </p>
        ))}
    </div> */
