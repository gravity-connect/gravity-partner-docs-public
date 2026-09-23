import React, {useEffect} from 'react';
import BrowserOnly from '@docusaurus/BrowserOnly';
import Layout from '@theme/Layout';
import ApiReference from '@site/src/components/ApiReference';

import './api.css';

export default function DevicePartnerApiPage() {

  useEffect(() => {
    document.body.classList.add('api-page');
    return () => document.body.classList.remove('api-page');
  }, []);

  return (
    <Layout>
      <BrowserOnly fallback={<div style={{padding: '2rem'}}>Loading API reference…</div>}>
        {() => (
          <ApiReference specUrl="/device-partner-api.yaml" descriptionUrl="/device-partner-description.md" />
        )}
      </BrowserOnly>
    </Layout>
  );
}
