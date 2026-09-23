import React from 'react';

import signalSettings from '@site/static/signal-setting-list.json';

export default function DeviceSpecList({deviceType, kind}) {
  const definitions = signalSettings[deviceType] || {};
  const entries = Object.entries(definitions).filter(
    ([, def]) => Boolean(def.isSignal) === (kind === 'signal')
  );

  if (entries.length === 0) {
    return <p>There are currently no {kind}s defined for this device type.</p>;
  }

  return (
    <>
      {entries.map(([name, def]) => (
        <div key={name}>
          <h4>
            <code>{name}</code> ({def.type})
          </h4>
          <ul>
            {def.docs?.description && <li>{def.docs.description}</li>}
            {def.docs?.unit && <li>Unit: {def.docs.unit}</li>}
            {def.values && (
              <li>
                Valid Values
                <ul>
                  {def.values.map((value) => (
                    <li key={value}>
                      <code>{value}</code>
                    </li>
                  ))}
                </ul>
              </li>
            )}
            {def.docs?.exampleValues && (
              <li>
                Example Values
                <ul>
                  {def.docs.exampleValues.map((value) => (
                    <li key={value}>
                      <code>{value}</code>
                    </li>
                  ))}
                </ul>
              </li>
            )}
            {def.docs?.additionalDocs && <li>{def.docs.additionalDocs}</li>}
          </ul>
        </div>
      ))}
    </>
  );
}
