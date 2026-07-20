import React from 'react';
import clsx from 'clsx';

import './cards.css';

export default function Grid({title, children, className}) {
  const cards = React.Children.toArray(children);

  return (
    <section className={clsx('cards', className)}>
      <div className='container'>

        <h5>{title}</h5>

        <div className='row'>
          {cards.map((card, i) => (
            <div className='col col--4' key={i}>
              {card}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}