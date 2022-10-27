import { useEffect, useState } from "react";
import Header from "./Header";
import Tippy from "@tippyjs/react";
import "tippy.js/dist/tippy.css";
import { ClipLoader } from "react-spinners";

const DisplayEmployees = () => {
  const [employees, setEmployees] = useState();
  const [numberOfEmployees, setNumberOfEmployees] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  const style = {
    position: "fixed",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
  };

  useEffect(() => {
    fetch("https://employee-data-collation-app.herokuapp.com/user-data") // https://employee-data-collation-app.herokuapp.com/ //http://localhost:2000
      .then((res) => {
        return res.json();
      })
      .then(({ result }) => {
        setEmployees(result);
        setNumberOfEmployees(result.length);
        setIsLoading(false);
      });
  }, []);

  const calcAge = (past, today) => {
    //convert to UTC
    // console.log("past", past);
    const today_UTC = new Date(
      Date.UTC(today.getUTCFullYear(), today.getUTCMonth(), today.getUTCDate())
    );
    const past_UTC = new Date(
      Date.UTC(past.getUTCFullYear(), past.getUTCMonth(), past.getUTCDate())
    );

    let days = today_UTC.getDate() - past_UTC.getDate();
    if (days < 0) {
      today_UTC.setMonth(today_UTC.getMonth() - 1);
      days += DaysInMonth(today_UTC);
    }

    let months = today_UTC.getMonth() - past_UTC.getMonth();
    if (months < 0) {
      today_UTC.setFullYear(today_UTC.getFullYear() - 1);
      months += 12;
    }

    const years = today_UTC.getFullYear() - past_UTC.getFullYear();

    const yearAbbreviation = years > 1 ? "yrs" : "yr";
    const monthAbbreviation = months > 1 ? "mos" : "mo";

    return `${years ? years : ""}${years ? yearAbbreviation : ""} ${
      months ? months : ""
    }${months ? monthAbbreviation : ""} ${days ? days : ""}${days ? "d" : ""}`;
  };

  const DaysInMonth = (today_UTC) => {
    const monthStart = new Date(
      today_UTC.getFullYear(),
      today_UTC.getMonth(),
      1
    );
    const monthEnd = new Date(
      today_UTC.getFullYear(),
      today_UTC.getMonth() + 1,
      1
    );
    const monthLength = (monthEnd - monthStart) / (1000 * 60 * 60 * 24);
    return monthLength;
  };

  // const calculateDaysOfEmployment = (startDate) => {
  //   let today = new Date().toISOString().slice(0, 10);
  //   const diffInMs = new Date(today) - new Date(startDate);
  //   const diffInDays = diffInMs / (1000 * 60 * 60 * 24);
  //   return diffInDays;
  // };

  // function parseDays(value) {
  //   let year, months, week, days;

  //   year = value >= 365 ? Math.floor(value / 365) : 0;
  //   value = year ? value - year * 365 : value;

  //   months = value >= 30 ? Math.floor((value % 365) / 30) : 0;
  //   value = months ? value - months * 30 : value;

  //   week = value >= 7 ? Math.floor((value % 365) / 7) : 0;
  //   value = week ? value - week * 7 : value;

  //   days = value < 7 ? Math.floor((value % 365) % 7) : 0;

  //   // console.log("years = ", year);
  //   // console.log("months = ", months);
  //   // console.log("weeks = ", week);
  //   // console.log("days = ", days);
  //   const yearAbbreviation = year > 1 ? "yrs" : "yr";
  //   const monthAbbreviation = months > 1 ? "mos" : "mo";

  //   return `${year ? year : ""}${year ? yearAbbreviation : ""} ${
  //     months ? months : ""
  //   }${months ? monthAbbreviation : ""} ${days ? days : ""}${days ? "d" : ""}`;
  // }

  // const date = employees ? employees[2].date_of_employment : "not yet";
  // const startDate = new Date(date);

  // console.log("calculated date: ", calculateDaysOfEmployment(startDate));
  // console.log(numberOfEmployees);

  return (
    <>
      <Header display={false} />
      <div className="flex justify-center">
        <p className="mx-5 mt-6 bg-[#111827] text-white p-4 rounded-md shadow-md">
          &#8470; of employees:{" "}
          {isLoading ? (
            <ClipLoader color="#fff" size={12} />
          ) : (
            numberOfEmployees
          )}{" "}
        </p>
        <p className="mx-5 mt-6 p-4 bg-[#111827] text-white rounded-md shadow-md ">
          Date format: YYYY-MM-DD
        </p>
      </div>
      {isLoading ? (
        <ClipLoader color="#111827" cssOverride={style} />
      ) : (
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
                        {
                          // parseDays(
                          //   calculateDaysOfEmployment(employee.date_of_employment)
                          // )
                          calcAge(
                            new Date(employee.date_of_employment),
                            new Date()
                          )
                        }{" "}
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
      )}
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
