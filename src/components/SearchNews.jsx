import React from 'react';
import { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';

import logo from '../assets/Logo_White.png';

import { fetchNewsData } from '../utils/fetchAPI';

import Menu from './Menu';
import NewsCard from './NewsCard';
import Loader from './Loader';

const SearchNews = () => {
  const { searchQuery } = useParams();

  const [isLoading, setIsLoading] = useState(false);
  const [order, setOrder] = useState(
    localStorage.getItem('selectedOrder') || 'newest'
  );
  const [page, setPage] = useState(1);

  const [searchContent, setSearchContent] = useState(null);
  const [shouldScrollToTop, setShouldScrollToTop] = useState(true);

  const handlePreserveOrder = (order) => {
    localStorage.setItem('selectedOrder', order);
  };

  const handleScrollTop = () => {
    setShouldScrollToTop(true);
  };

  console.log(localStorage.getItem('selectedOrder'));

  const handleScroll = () => {
    const scrollTop = document.documentElement.scrollTop;
    const scrollHeight = document.documentElement.scrollHeight;
    const clientHeight = document.documentElement.clientHeight;

    const threshold = scrollHeight - clientHeight * 2;

    if (scrollTop >= threshold) {
      setShouldScrollToTop(false);
      setPage(page + 1);
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [page, isLoading]);

  useEffect(() => {
    setIsLoading(true);
    const fetchDefaultData = async () => {
      const newsDetail = await fetchNewsData(
        `search?&q=${searchQuery}&order-by=${order}&show-fields=all&page-size=15&page=${page}`
      );
      // setSearchContent(newsDetail);
      setSearchContent((searchContent) => {
        if (!searchContent || page === 1) {
          return newsDetail;
        } else {
          return {
            response: {
              results: [
                ...searchContent.response.results,
                ...newsDetail.response.results,
              ],
            },
          };
        }
      });
      setIsLoading(false);
      if (shouldScrollToTop) {
        setPage(1);
        window.scrollTo(0, 0);
      }
    };
    fetchDefaultData();
  }, [searchQuery, order, page]);

  if (!searchContent) return <Loader />;

  const result = searchContent?.response?.results;

  return (
    <div className="px-[70px] md-[100px] lg:px-[165px]">
      <div className="flex sm:justify-between sm:flex-row items-center flex-col mt-[44px] mb-[30px]">
        <p className="font-serif text-[36px] lg:text-[48px] font-bold  mb-[30px] sm:mb-0">
          Search Results
        </p>
        <Menu
          orderSort={(list) => {
            setOrder(list);
            handlePreserveOrder(list);
            handleScrollTop();
          }}
        />
      </div>
      <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[30px] mb-[105px]">
        {result.map((result, index) => (
          <Link
            to={`/${encodeURIComponent(result?.id)}`}
            key={index}
            className={`relative row-span-2 ${
              !result?.fields?.thumbnail ? 'bg-main-blue' : ''
            } overflow-hidden h-[200px] sm:h-[350px]`}
          >
            <NewsCard
              media={
                result?.fields?.thumbnail ? result?.fields?.thumbnail : logo
              }
              title={result?.webTitle}
              hasThumbnail={result?.fields?.thumbnail ? true : false}
              newsType={result?.pillarName ? result?.pillarName : ' '}
            />
          </Link>
        ))}
      </div>
      {isLoading && <Loader />}
    </div>
  );
};

export default SearchNews;
