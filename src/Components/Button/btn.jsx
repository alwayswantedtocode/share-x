import React from 'react'

const btn = ({ Label, btnClass }) => {
  return (
    <button className={`rounded-md ${btnClass}`} type="submit">
      {Label}
    </button>
  );
};

export default btn