import { Link } from "react-router-dom";

const Header = ({ user, setUser, display }) => {
  const displayButton = display ? (
    <div className="items-center flex-shrink-0 hidden lg:flex">
      <button
        onClick={() => {
          if (!user.loggedIn) return;
          setUser({ loggedIn: false });
        }}
        className="flex items-center px-4 -mb-1 border-b-2 border-transparent"
      >
        Logout
      </button>
    </div>
  ) : (
    ""
  );
  return (
    <header className="p-4 bg-[#111827] text-gray-100">
      <div className="container flex justify-between h-16 mx-auto">
        <div className="flex">
          <ul className="items-stretch hidden space-x-3 lg:flex">
            <li className="flex">
              <Link
                rel="noopener noreferrer"
                to="/home"
                className="flex items-center px-4 -mb-1 border-b-2 border-transparent"
              >
                Home
              </Link>
            </li>
          </ul>
        </div>

        {displayButton}
      </div>
    </header>
  );
};

export default Header;
