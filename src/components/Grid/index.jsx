import React from 'react';
import clsx from 'clsx';

import './grid.css';

export default function Grid({title, children, className}) {
  const blocks = React.Children.toArray(children);

  return (
    <section className={clsx('grid', className)}>
      <div className='container'>

        <h5>{title}</h5>

        <div className='row'>
          {blocks.map((block, i) => (
            <div className='col' key={i}>
              {block}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}