import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import logo from '../assets/Logo_White.png';

const Navbar = () => {

  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const handleQueryChange = (newQuery) => {

    if (newQuery) {
      navigate(`/search/${newQuery}`);

    }
  };

  return (
    <div className="h-[126px] items-end flex justify-between relative">
      <Link to="/" onClick={() => setSearchQuery("")}>
        <img className="h-[49px] w-[132px] sm:mb-[39px] mb-[50px]" src={logo} alt="logo" />
        </Link>
        <input
            placeholder="Search all news"
            className="absolute right-0 text-[16px] h-[44px] bg-searchIcon bg-no-repeat bg-main-blue border-b-4 border-white pl-[27px] w-[90px] bg-[center_right_35px]
            bg-[length:24px] pr-[63px] focus:outline-none text-white font-main-font focus:md:w-[300px] focus:w-[250px] focus:bg-sub-blue duration-500"
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              handleQueryChange(e.target.value);
            }}
          />
    </div>
  );
};

export default Navbar;
