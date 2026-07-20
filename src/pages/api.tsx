import React, {useEffect} from 'react';
import BrowserOnly from '@docusaurus/BrowserOnly';
import Layout from '@theme/Layout';
import redocTheme from './_redocTheme';

import './api.css';

export default function ApiReference() {

  useEffect(() => {
    document.body.classList.add('api-page');
    return () => document.body.classList.remove('api-page');
  }, []);

  return (
    <Layout>
      <BrowserOnly fallback={<div style={{padding: '2rem'}}>Loading API reference…</div>}>
        {() => {
          const {RedocStandalone} = require('redoc');
          return (
            <RedocStandalone
              specUrl="/Gravity-Connect/vp-api.yaml"
              options={{
                nativeScrollbars: true,
                theme: redocTheme,
              }}
            />
          );
        }}
      </BrowserOnly>
    </Layout>
  );
}
