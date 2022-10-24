import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const UploadEmployees = () => {
  const [file, setFile] = useState();
  const [displayUploadMessage, setDisplayUploadMessage] = useState(false);

  const handleChange = (event) => {
    const file = event.target.files[0];
    setFile(file);
  };

  let displayMessage = displayUploadMessage ? (
    <div
      class="flex bg-red-100 rounded-lg p-4 mb-4 text-sm text-red-700"
      role="alert"
    >
      <svg
        class="w-5 h-5 inline mr-3"
        fill="currentColor"
        viewBox="0 0 20 20"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fill-rule="evenodd"
          d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
          clip-rule="evenodd"
        ></path>
      </svg>
      <div>Please choose a csv file .</div>
    </div>
  ) : (
    ""
  );

  let navigate = useNavigate();
  const send = (event) => {
    event.preventDefault();
    if (!file) {
      setDisplayUploadMessage(true);
      return;
    }
    const data = new FormData();
    data.append("file", file);
    fetch("http://localhost:2000/upload", {
      method: "POST",
      body: data,
    })
      .then((res) => res.text())
      .then((resBody) => navigate("/home"));
  };

  return (
    <div className="flex items-center justify-center p-12">
      <div className="mx-auto w-full max-w-[550px] bg-white">
        <form className="py-6 px-9">
          <div className="mb-6 pt-4">
            <label
              htmlFor="file"
              className="mb-5 block text-xl font-semibold text-[#07074D]"
            >
              {displayMessage}
              Upload Employee Data File (CSV only)
            </label>

            <div className="mb-8">
              <input
                required
                accept=".csv"
                onChange={handleChange}
                className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50  focus:outline-none  "
                id="file_input"
                type="file"
              />
            </div>
          </div>

          <div>
            <button
              onClick={send}
              className="hover:shadow-form w-full rounded-md bg-[#111827] py-3 px-8 text-center text-base font-semibold text-white outline-none"
            >
              Upload
            </button>
          </div>
          <div>
            <Link
              type="button"
              to="/home"
              className="mt-6 hover:shadow-form w-full rounded-md bg-[#111827] py-3 px-8 text-center text-base font-semibold text-white outline-none"
            >
              Back
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UploadEmployees;

/* <div className=" bg-gray-500 ">
      <form>
        <div className="flex ">
          <label htmlFor="file">File</label>
          <input type="file" id="file" accept=".csv" onChange={handleChange} />
        </div>
      </form>

      <button
        onClick={send}
        className="px-8 py-3  font-semibold mt-10 rounded bg-gray-100 text-gray-800"
      >
        Upload
      </button>

      <style>
        {`
        input {
          font-size: 16px;
          padding: 5px;
          margin: 10px;
        }
        
        label {
          font-size: 18px;
          width: 100px;
          text-align: left;
        }
        `}
      </style>
    </div> */
