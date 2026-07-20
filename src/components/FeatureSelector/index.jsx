import React, {useState} from 'react';
import clsx from 'clsx';

import './featureselector.css';

export default function FeatureSelector({title, className, children}) {
  const items = React.Children.toArray(children);
  const [selected, setSelected] = useState(0);
  const active = items[selected];

  return (
    <section className={clsx('featureselector', className)}>
      <div className='container'>
        <div className='row'>

          <div className='col col--6'>
            <h5>{title}</h5>

            <ul className='featureselector-list'>
              {items.map((item, i) => {
                const isSelected = i === selected;

                return (
                  <li
                    key={i}
                    className={clsx('featureselector-item', isSelected && 'featureselector-item--selected')}
                  >
                    <span className='featureselector-rule' aria-hidden='true'>
                      <span className='featureselector-rule-dot featureselector-rule-dot--start' />
                      <span className='featureselector-rule-line'>
                        <span className='featureselector-rule-dot featureselector-rule-dot--end' />
                      </span>
                    </span>

                    <button
                      type='button'
                      className='featureselector-headline'
                      onClick={() => setSelected(i)}
                      aria-expanded={isSelected}
                      aria-controls={`featureselector-desc-${i}`}
                    >
                      {item.props.headline}
                    </button>

                    <div id={`featureselector-desc-${i}`} className='featureselector-desc'>
                      <div className='featureselector-desc-inner'>
                        {item.props.image && (
                          <img
                            src={item.props.image}
                            alt={item.props.headline || ''}
                            className='featureselector-image featureselector-image--mobile'
                          />
                        )}
                        {item.props.children}
                      </div>
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>

          <div className='col col--6 featureselector-image-col'>
            {active?.props.image && (
              <img
                key={selected}
                src={active.props.image}
                alt={active.props.headline || ''}
                className='featureselector-image'
              />
            )}
          </div>

        </div>
      </div>
    </section>
  );
}
