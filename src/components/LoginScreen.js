import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../App";

const LoginScreen = () => {
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();
  const [isWrong, setIsWrong] = useState(false);
  console.log(isWrong);

  // eslint-disable-next-line
  const { user, setUser } = useContext(UserContext);

  const handleUsername = (event) => {
    setUsername(event.target.value);
  };
  const handlePassword = (event) => {
    setPassword(event.target.value);
  };

  let displayMessage = isWrong ? (
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
      <div>
        <span class="font-medium">wrong!</span> input correct credentials.
      </div>
    </div>
  ) : (
    ""
  );

  let navigate = useNavigate();
  const handleSubmit = (event) => {
    event.preventDefault();

    // if (user.loggedIn) return;

    if (username === "admin" && password === "keypass") {
      setUser({ loggedIn: true });
      navigate("/home");
      // console.log("all correct");
    } else {
      setIsWrong(true);
    }
  };
  return (
    <>
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-300">
        <div className="flex flex-col bg-white shadow-md px-4 sm:px-6 md:px-8 lg:px-10 py-8 rounded-md w-full max-w-md">
          <div className="font-medium self-center text-xl sm:text-2xl uppercase text-gray-800">
            {displayMessage}
            Login
          </div>

          <div className="mt-10">
            <form onSubmit={handleSubmit}>
              <div className="flex flex-col mb-6">
                <label className="mb-1 text-xs sm:text-sm tracking-wide text-gray-600">
                  Username:
                </label>
                <div className="relative">
                  <input
                    id="username"
                    required
                    type="text"
                    name="username"
                    onChange={handleUsername}
                    className="text-sm sm:text-base placeholder-gray-500 pl-10 pr-4 rounded-lg border border-gray-400 w-full py-2 focus:outline-none focus:border-blue-400"
                  />
                </div>
              </div>
              <div className="flex flex-col mb-6">
                <label className="mb-1 text-xs sm:text-sm tracking-wide text-gray-600">
                  Password:
                </label>
                <div className="relative">
                  <input
                    required
                    id="password"
                    type="password"
                    name="password"
                    onChange={handlePassword}
                    className="text-sm sm:text-base placeholder-gray-500 pl-10 pr-4 rounded-lg border border-gray-400 w-full py-2 focus:outline-none focus:border-blue-400"
                    placeholder="Password"
                  />
                </div>
              </div>

              <div className="flex w-full">
                <button
                  type="submit"
                  className="flex items-center justify-center focus:outline-none text-white text-sm sm:text-base bg-[#111827] hover:bg-[#2d4069] rounded py-2 w-full transition duration-150 ease-in"
                >
                  <span className="mr-2 uppercase">Login</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default LoginScreen;

/* <div>
      <h1>Login Screen</h1>

      <form onSubmit={handleSubmit}>
        <label className="block mb-2 text-sm">Username:</label>
        <br />
        <input
          type="text"
          id="username"
          name="username"
          onChange={handleUsername}
        />
        <br />
        <label>Password:</label>
        <br />
        <input
          type="password"
          id="password"
          name="password"
          onChange={handlePassword}
        />
        <input type="submit" value="Submit" />
      </form>
    </div> */
