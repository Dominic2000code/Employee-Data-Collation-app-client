import { useContext } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../App";
import Header from "./Header";

const Home = () => {
  const { user, setUser } = useContext(UserContext);
  return (
    <div>
      <Header user={user} setUser={setUser} display={true} />

      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-4 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="w-full bg-gray-900 rounded-lg sahdow-lg p-12 flex flex-col justify-center items-center">
            <div className="mb-8">
              <div className="bg-accent text-accent-content ">
                <Link
                  type="button"
                  to="/upload-employees"
                  className="px-8 py-3  font-semibold mt-10 rounded bg-gray-100 text-gray-800"
                >
                  Upload Employees
                </Link>
              </div>
            </div>
          </div>

          <div className="w-full bg-gray-900 rounded-lg sahdow-lg p-12 flex flex-col justify-center items-center">
            <div className="mb-8">
              <div className="bg-accent text-accent-content">
                <Link
                  to="/display-employees"
                  type="button"
                  className="px-8 py-3  font-semibold mt-10 rounded bg-gray-100 text-gray-800"
                >
                  Display Employees
                </Link>
              </div>
            </div>
          </div>

          <div className="w-full bg-gray-900 rounded-lg sahdow-lg p-12 flex flex-col justify-center items-center">
            <div className="mb-8">
              <div className="bg-accent text-accent-content">
                <Link
                  to="/display-logs"
                  type="button"
                  className="px-8 py-3  font-semibold mt-10 rounded bg-gray-100 text-gray-800"
                >
                  Display Logs
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
