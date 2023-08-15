import React from 'react';
import { useState, useEffect, useRef } from 'react';

import dropDownIcon from '../assets/add.svg';

const Menu = ({ orderSort }) => {

  const sortList = [
    { sortName: 'Newest first', sortVal: 'newest'},
    { sortName: 'Oldest first', sortVal: 'oldest' },
    { sortName: 'Most popular', sortVal: 'relevance' },
  ];

  const [dropDown, setDropDown] = useState(false);
  const [options, setOptions] = useState('Newest first');

  const dropdownRef = useRef(null);

  console.log()

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropDown(false);
      }
    };

    document.addEventListener('mousedown', handleOutsideClick);

    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, []);

  return (
    <div
      className="w-[255px] min-h-[44px] border-b-[1px] border-black flex items-center px-[5px] justify-between relative"
      onClick={() => setDropDown(!dropDown)}
      ref={dropdownRef}
    >
      <p className="text-[16px] font-main-font">{options}</p>
      <img
        src={dropDownIcon}
        alt="dropDownIcon"
        className={
          dropDown ? 'rotate-180 duration-300' : 'rotate-0 duration-300'
        }
      />
      {dropDown && (
        <ul className="absolute top-[50px] left-0 border-[1px] border-grey w-full cursor-pointer animate-fadeIn z-[999]">
          {sortList.map((list, index) => (
            <li
              className="py-[7.5px] px-[5px] bg-white font-main-font tex-[16px] hover:bg-gray-200 duration-300"
              key={index}
              onClick={() => {setOptions(list.sortName); orderSort(list.sortVal)}}
            >
              {list.sortName}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Menu;
