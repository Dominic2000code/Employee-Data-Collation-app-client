import { useEffect, useState } from "react";
import Header from "./Header";
import Tippy from "@tippyjs/react";
import "tippy.js/dist/tippy.css";

const DisplayEmployees = () => {
  const [employees, setEmployees] = useState();
  const [numberOfEmployees, setNumberOfEmployees] = useState(0);

  useEffect(() => {
    fetch("http://localhost:2000/user-data")
      .then((res) => {
        return res.json();
      })
      .then(({ result }) => {
        setEmployees(result);
        setNumberOfEmployees(result.length);
      });
  }, []);

  const calculateDaysOfEmployment = (startDate) => {
    let today = new Date().toISOString().slice(0, 10);
    const diffInMs = new Date(today) - new Date(startDate);
    const diffInDays = diffInMs / (1000 * 60 * 60 * 24);
    return diffInDays;
  };

  function parseDays(value) {
    let year, months, week, days;

    year = value >= 365 ? Math.floor(value / 365) : 0;
    value = year ? value - year * 365 : value;

    months = value >= 30 ? Math.floor((value % 365) / 30) : 0;
    value = months ? value - months * 30 : value;

    week = value >= 7 ? Math.floor((value % 365) / 7) : 0;
    value = week ? value - week * 7 : value;

    days = value < 7 ? Math.floor((value % 365) % 7) : 0;

    // console.log("years = ", year);
    // console.log("months = ", months);
    // console.log("weeks = ", week);
    // console.log("days = ", days);

    return `${year ? year : ""}${year ? "y" : ""} ${months ? months : ""}${
      months ? "m" : ""
    } ${days ? days : ""}${days ? "d" : ""}`;
  }

  // const date = employees ? employees[2].date_of_employment : "not yet";
  // const startDate = new Date(date);

  // console.log("calculated date: ", calculateDaysOfEmployment(startDate));
  // console.log(numberOfEmployees);

  return (
    <>
      <Header display={false} />
      <div className="flex justify-center">
        <p className="mx-5 mt-6 bg-[#111827] text-white p-4 rounded-md shadow-md">
          &#8470; of employees: {numberOfEmployees}{" "}
        </p>
        <p className="mx-5 mt-6 p-4 bg-[#111827] text-white rounded-md shadow-md ">
          Date format: MM/DD/YYYY
        </p>
      </div>
      <div className="flex w-screen h-screen p-10">
        <div className="flex flex-col w-full border-t border-r border-black">
          <div className="flex flex-shrink-0 bg-[#111827] text-white">
            <div className="flex cursor-pointer items-center flex-grow w-0 h-10 px-2 border-b border-l border-black">
              <span>First Name</span>
            </div>
            <div className="flex cursor-pointer items-center flex-grow w-0 h-10 px-2 border-b border-l border-black">
              <span>Middle Name</span>
            </div>
            <Tippy content="Date of Graduation">
              <div className="flex cursor-pointer items-center flex-grow w-0 h-10 px-2 border-b border-l border-black">
                <span>D.O.G</span>
              </div>
            </Tippy>
            <Tippy content="Date of Employment">
              <div className="flex cursor-pointer items-center flex-grow w-0 h-10 px-2 border-b border-l border-black">
                <span>D.O.E</span>
              </div>
            </Tippy>
            <Tippy content="Duration of employment">
              <div className="flex cursor-pointer items-center flex-grow w-0 h-10 px-2 border-b border-l border-black">
                <span>D.E</span>
              </div>
            </Tippy>
            <div className="flex items-center cursor-pointer flex-grow w-0 h-10 px-2 border-b border-l border-black">
              <span>Position</span>
            </div>
            <div className="flex items-center cursor-pointer flex-grow w-0 h-10 px-2 border-b border-l border-black">
              <span>Salary</span>
            </div>
            <div className="flex items-center cursor-pointer flex-grow w-0 h-10 px-2 border-b border-l border-black">
              <span>Supervisor(s)</span>
            </div>
            <Tippy content="Employee Code">
              <div className="flex items-center cursor-pointer flex-grow w-0 h-10 px-2 border-b border-l border-black">
                <span>Emp_Code</span>
              </div>
            </Tippy>
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
                      {parseDays(
                        calculateDaysOfEmployment(employee.date_of_employment)
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
                    <span> {employee.supervisor.replace(";", ",")} </span>
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
