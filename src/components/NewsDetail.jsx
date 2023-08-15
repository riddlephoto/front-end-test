import React from 'react';
import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import FormattedMessage from './FormattedMessage';

import { fetchNewsDetail } from '../utils/fetchAPI';
import Loader from './Loader';

const NewsDetail = () => {
  const { id } = useParams();
  console.log('ID:', id);

  const [newsDetail, setNewsDetail] = useState(null);

  useEffect(() => {
    setNewsDetail(null);
    const fetchDetail = async () => {
      const newsDetailStore = await fetchNewsDetail(`${id}?show-fields=all`);
      setNewsDetail(newsDetailStore);
    };
    fetchDetail();
  }, [id]);

  if (!newsDetail) return <Loader />;
  console.log(newsDetail);

  const detailResult = newsDetail?.response?.content;

  const options = {
    weekday: 'short',
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    timeZone: 'BST',
  };

  const formattedDay = (date) => {
    const formattedParts = date.toLocaleString('en-GB', options).split(',');
    return [formattedParts[0], formattedParts[1], formattedParts[2]];
  };

  return (
    <div className="mt-[111px] px-[70px] md:px-[100px] lg:px-[165px]">
      <div className="border-b-[1px] border-[#979797] mb-[13.75px] max-w-[635px]">
        <p className="font-main-font text-[12px] text-black opacity-[0.87] mb-[10px]">
          {formattedDay(new Date(detailResult?.webPublicationDate))} BST
        </p>
        <p className="font-serif text-[34px] font-bold text-black opacity-[0.87] mb-[10px]">
          {detailResult?.webTitle}
        </p>
        <p className="font-serif text-[20px] font-bold text-black opacity-[0.87] mb-[14.25px]">
          {detailResult?.fields?.headline}
        </p>
      </div>
      <div className="flex xl:flex-row xl:items-start items-center flex-col-reverse gap-[30px]">
        <div className="max-w-[635px]">
          <p className="font-main-font text-[14px] text-black opacity-[0.87] leading-5 mb-[293px]">
            <FormattedMessage message={detailResult?.fields?.bodyText} />
          </p>
        </div>
        <div className="xl:sticky xl:top-[20px]">
          {detailResult?.fields?.thumbnail ? (
            <img
              className="w-full object-contain"
              src={detailResult?.fields?.thumbnail}
              alt={detailResult?.webTitle}
            />
          ) : (
            ''
          )}
          <p className="font-main-font text-[12px] text-black opacity-[0.87]">
            {detailResult?.fields?.trailText
              ? detailResult?.fields?.trailText
              : ''}
          </p>
        </div>
      </div>
    </div>
  );
};

export default NewsDetail;
