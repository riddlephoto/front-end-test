import React from 'react';

const FormattedMessage = ({ message }) => {

  const paragraphs = message.split('.');

  return (
    <>
      {paragraphs.map((paragraph, index) => (
        <p key={index} className="mb-[15px]">{paragraph}.</p>
      ))}
    </>
  )
}

export default FormattedMessage
