import React from 'react'

const NewsCard = ({media, title, briefDetail, newsType, hasThumbnail}) => {

  const borderColor = {
    Sport: "border-b-[4px] border-[#D32F2F]",
    News: "border-b-[4px] border-[#2196F3]",
    Culture: "border-b-[4px] border-[#FFCA28]"
  } 
// console.log(hasThumbnail)
  return (
    <>
      <img className={`w-full hover:scale-110 duration-300 ${hasThumbnail ? 'object-cover h-full ' : 'lg:h-[60%] xl:h-[70%] px-[16%] pt-[21%] pb-[16%] bg-[#0D47A1]'}`} src={media} alt={title} />
      <div className={`absolute bottom-0 bg-main-blue ${hasThumbnail ? 'opacity-90 ': ''} px-[10px] w-full ${borderColor[newsType]} min-h-[67px] xl:min-h-[134px]`}>
        <p className="font-serif text-[14px] sm:text-[20px] md:text-[16px] xl:text-[20px] text-white font-bold">{title}</p>
        <p className={`font-main-font text-[14px] text-white`}>{briefDetail ? `${briefDetail}...` : ""}</p>
      </div>
    </>
  )
}

export default NewsCard