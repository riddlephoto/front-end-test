import React from 'react';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import Menu from './Menu';
import logo from '../assets/Logo_White.png';

import NewsCard from './NewsCard';
import SmallNewsCard from './SmallNewsCard';
import { fetchNewsData } from '../utils/fetchAPI';
import Loader from './Loader';

const Home = () => {
  const [order, setOrder] = useState('newest');

  const [newsData, setNewsData] = useState(null);
  const [sportData, setSportData] = useState(null);

  useEffect(() => {
    setNewsData(null);
    setSportData(null);
    const fetchDefaultData = async () => {
      const newsDetail = await fetchNewsData(
        `search?&section=world&order-by=${order}&show-fields=all&page-size=8`
      );
      setNewsData(newsDetail);
    };

    fetchDefaultData();

    const fetchSportData = async () => {
      const newsDetail = await fetchNewsData(
        `search?section=sport&page-size=3&order-by=${order}&show-fields=all`
      );
      setSportData(newsDetail);
    };

    fetchSportData();
  }, [order]);

  if (!newsData) return <Loader />;
  if (!sportData) return <Loader />;

  console.log(newsData?.response?.results, sportData?.response?.results);

  const result = newsData?.response?.results;
  const sportResult = sportData?.response?.results;

  console.log(result.slice(5, 9), order);

  return (
    <div className="px-[70px] md:px-[100px] lg:px-[165px]">
      <div className="flex sm:justify-between sm:flex-row items-center flex-col mt-[44px] mb-[30px]">
        <p className="font-serif text-[36px] lg:text-[48px] font-bold mb-[30px] sm:mb-0">Top Stories</p>
        <Menu orderSort={(list) => setOrder(list)} />
      </div>
      <div className="grid sm:grid-cols-1 lg:grid-cols-2 lg:grid-flow-row gap-[15px] sm:gap-[30px] z-[0]">
        <Link to={`/${encodeURIComponent(result[0]?.id)}`}>
          <div
            className={`relative row-span-3 h-[200px] sm:h-[423px] ${
              !result?.fields?.thumbnail ? 'bg-main-blue' : ''
            } overflow-hidden`}
          >
            <img
              className={`h-full hover:scale-110 duration-300 ${
                result[0]?.fields?.thumbnail
                  ? 'object-fill w-full'
                  : 'w-full lg:h-[60%] xl:h-[80%] px-[16%] pt-[21%] pb-[16%] bg-[#0D47A1]'
              }`}
              src={
                result[0]?.fields?.thumbnail
                  ? result[0]?.fields?.thumbnail
                  : logo
              }
              alt={result[0]?.webTitle}
            />
            <div className="absolute bottom-0 bg-main-blue opacity-90 px-[10px] w-full">
              <p className="font-serif text-[14px] sm:text-[20px] text-white font-bold lg:text-[24px]">
                {result[0]?.webTitle}
              </p>
              <p className="font-main-font text-[14px] text-white">
                {result[0]?.fields?.bodyText.slice(0, 70)}...
              </p>
            </div>
          </div>
        </Link>
        <div className="grid md:grid-rows-3 md:grid-cols-2 gap-[15px] sm:gap-[30px] md:h-[423px]">
          {result.slice(1, 3).map((result, index) => (
            <Link
              to={`/${encodeURIComponent(result?.id)}`}
              className={`relative row-span-2 ${
                !result?.fields?.thumbnail ? 'bg-main-blue' : ''
              } overflow-hidden flex`}
              key={index}
            >
              <NewsCard
                media={
                  result?.fields?.thumbnail ? result?.fields?.thumbnail : logo
                }
                title={result?.webTitle}
                briefDetail={result?.fields?.bodyText.slice(0, 30)}
                newsType={result?.sectionName ? result?.sectionName : ' '}
                hasThumbnail={result?.fields?.thumbnail ? true : false}
              />
            </Link>
          ))}
          <Link to={`/${encodeURIComponent(result[3]?.id)}`}>
            <SmallNewsCard
              title={result[3]?.webTitle}
              newsType={result[3]?.sectionName ? result[3]?.sectionName : ' '}
            />
          </Link>
          <Link to={`/${encodeURIComponent(result[4]?.id)}`}>
            <SmallNewsCard
              title={result[4]?.webTitle}
              newsType={result[4]?.sectionName ? result[4]?.sectionName : ' '}
            />
          </Link>
        </div>
      </div>
      <div className="grid gid-cols-1 sm:grid-cols-3 gap-[30px] md:h-[272px] xl:h-[350px] mt-[30px]">
        {result.slice(5, 9).map((result, index) => (
          <Link
            to={`/${encodeURIComponent(result?.id)}`}
            className={`relative row-span-2 ${
              !result?.fields?.thumbnail ? 'bg-main-blue' : ''
            } overflow-hidden`}
            key={index}
          >
            <NewsCard
              media={
                result?.fields?.thumbnail ? result?.fields?.thumbnail : logo
              }
              title={result?.webTitle}
              briefDetail={result?.fields?.bodyText.slice(0, 50)}
              newsType={result?.sectionName ? result?.sectionName : ' '}
              hasThumbnail={result?.fields?.thumbnail ? true : false}
            />
          </Link>
        ))}
      </div>
      <p className="font-serif text-[34px] font-bold mt-[50px] mb-[30px]">
        Sports
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-[30px] z-[0] md:h-[272px] xl:h-[350px] mb-[105px]">
        {sportResult.map((result, index) => (
          <Link
            to={`/${encodeURIComponent(result?.id)}`}
            key={index}
            className={`relative row-span-2 ${
              !result?.fields?.thumbnail ? 'bg-main-blue' : ''
            } overflow-hidden h-[200px]`}
          >
            <NewsCard
              media={
                result?.fields?.thumbnail ? result?.fields?.thumbnail : logo
              }
              title={result?.webTitle}
              hasThumbnail={result?.fields?.thumbnail ? true : false}
              newsType={result?.sectionName ? result?.sectionName : ' '}
            />
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Home;
