import React from 'react';
import clsx from 'clsx';

import './band.css';

export default function Band({color, background, image, children}) {
  return (
    <section
      className={clsx('band', color && `band--${color}`, background && 'band--background')}
      style={background ? {'--band-background-image': `url(${background})`} : undefined}
    >
        <div className="container">
            <div className="row">
                {image ? (
                    <>
                        <div className='col col--6'>
                            {children}
                        </div>
                        <div className='col col--6'>
                            <img src={image} alt='' />
                        </div>
                    </>
                ) : (
                    <div className='col col--12'>
                        {children}
                    </div>
                )}
            </div>
        </div>
    </section>
  );
}
