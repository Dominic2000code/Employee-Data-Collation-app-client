import { useEffect, useState } from "react";

import Header from "./Header";

const DisplayLogs = () => {
  const [timeStamps, setTimeStamps] = useState();
  const [recordsPerTimestamp, setRecordsPerTimestamp] = useState();

  const createUniqueTimeStamps = (duplicate) => {
    const uniqueTimestamps = [...new Set(duplicate)];
    return uniqueTimestamps;
  };

  const countRecordsPerTimestamp = (duplicateTimestamps) => {
    const obj = {};
    for (let timeStamp of duplicateTimestamps) {
      //   console.log("from here:", timeStamp);
      if (!obj.hasOwnProperty(timeStamp)) {
        obj[timeStamp] = 1;
      } else {
        obj[timeStamp] += 1;
      }
    }
    // console.log("object: ", obj);
    setRecordsPerTimestamp(obj);
  };

  const compileTimeStamps = (data) => {
    const timeStampsArr = [];
    data.forEach((data) => {
      timeStampsArr.push(data.Timestamp);
    });
    setTimeStamps(createUniqueTimeStamps(timeStampsArr));
    countRecordsPerTimestamp(timeStampsArr);
  };

  useEffect(() => {
    fetch("https://employee-data-collation-app.herokuapp.com/user-data") // https://employee-data-collation-app.herokuapp.com/  // http://localhost:2000
      .then((res) => {
        return res.json();
      })
      .then(({ result }) => {
        compileTimeStamps(result);
      });
    // eslint-disable-next-line
  }, []);

  //   console.log(recordsPerTimestamp[timeStamps[0]]);
  return (
    <div>
      <Header display={false} />
      <div className="flex w-screen h-screen p-10">
        <div className="flex flex-col w-full border-t border-r border-black">
          <div className="flex flex-shrink-0 bg-[#111827] text-white">
            <div className="flex items-center flex-grow w-0 h-10 px-2 border-b border-l border-black">
              <span>Time of Upload</span>
            </div>
            <div className="flex items-center flex-grow w-0 h-10 px-2 border-b border-l border-black">
              <span>&#8470; of Records Uploaded</span>
            </div>
            <div className="flex items-center flex-grow w-0 h-10 px-2 border-b border-l border-black">
              <span>Status</span>
            </div>
            <div className="flex items-center flex-grow w-0 h-10 px-2 border-b border-l border-black">
              <span>Error</span>
            </div>
          </div>
          <div className="overflow-auto">
            {timeStamps &&
              timeStamps.map((timestamp) => (
                <div key={timestamp} className="flex flex-shrink-0">
                  <div className="flex items-center flex-grow w-0 h-10 px-2 border-b border-l border-black">
                    <span>{new Date(timestamp).toLocaleString()}</span>
                  </div>
                  <div className="flex items-center flex-grow w-0 h-10 px-2 border-b border-l border-black">
                    <span>{recordsPerTimestamp[timestamp]}</span>
                  </div>
                  <div className="flex items-center flex-grow w-0 h-10 px-2 border-b border-l border-black">
                    <span> {200} </span>
                  </div>
                  <div className="flex items-center flex-grow w-0 h-10 px-2 border-b border-l border-black">
                    <span> {`No error`} </span>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DisplayLogs;

/*
<p>Upload TimeStamps</p>
      {timeStamps &&
        timeStamps.map((timeStamp) => (
          <p key={timeStamp}>{new Date(timeStamp).toLocaleString()}</p>
        ))}
*/
