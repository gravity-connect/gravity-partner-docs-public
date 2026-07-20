import React from 'react';
import clsx from 'clsx';

export default function Block({children, className}) {
  return (
    <div className={clsx('block', className)}>
      {children}
    </div>
  );
}