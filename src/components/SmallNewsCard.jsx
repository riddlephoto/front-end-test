import React from 'react';

const SmallNewsCard = ({ title, newsType }) => {
  const borderColor = {
    Sport: 'border-b-[4px] border-[#D32F2F]',
    News: 'border-b-[4px] border-[#2196F3]',
    Culture: 'border-b-[4px] border-[#FFCA28]',
  };

  return (
    <>
      <div className={`bg-main-blue w-full h-full ${borderColor[newsType]} min-h-[80px]`}>
        <p className="font-serif text-[14px] sm:text-[18px] lg:text-[14px] xl:text-[18px] text-white font-bold">
          {title}
        </p>
      </div>
    </>
  );
};

export default SmallNewsCard;
