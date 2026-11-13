import React, {useEffect, useState} from 'react';
import useBaseUrl from '@docusaurus/useBaseUrl';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import yaml from 'js-yaml';

import redocTheme from './redocTheme';

interface ApiReferenceProps {
  specUrl: string;
  descriptionUrl: string;
}

// Fetches the OpenAPI spec and a separate markdown description file, then
// merges the description into spec.info.description before handing the
// result to Redoc. This lets the long-form intro/changelog/auth docs live in
// an easy-to-edit markdown file instead of a single escaped YAML string,
// without needing a build-time script to merge them.
export default function ApiReference({specUrl, descriptionUrl}: ApiReferenceProps) {
  const resolvedSpecUrl = useBaseUrl(specUrl);
  const resolvedDescriptionUrl = useBaseUrl(descriptionUrl);
  const {siteConfig} = useDocusaurusContext();
  const [spec, setSpec] = useState<Record<string, any> | null>(null);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    let cancelled = false;
    setSpec(null);
    setError(null);

    Promise.all([
      fetch(resolvedSpecUrl).then((res) => res.text()),
      fetch(resolvedDescriptionUrl).then((res) => res.text()),
    ])
      .then(([specText, descriptionText]) => {
        if (cancelled) return;
        const parsedSpec = yaml.load(specText) as Record<string, any>;
        // Markdown links are written root-relative (e.g. "/vpp-api"); prefix
        // them with the site's baseUrl since Redoc renders this markdown
        // outside Docusaurus's own link-resolution pipeline.
        const resolvedDescription = descriptionText.replace(
          /\]\(\/(?!\/)/g,
          `](${siteConfig.baseUrl}`
        );
        parsedSpec.info = {
          ...parsedSpec.info,
          description: resolvedDescription,
        };
        setSpec(parsedSpec);
      })
      .catch((err) => {
        if (!cancelled) setError(err);
      });

    return () => {
      cancelled = true;
    };
  }, [resolvedSpecUrl, resolvedDescriptionUrl, siteConfig.baseUrl]);

  if (error) {
    return <div style={{padding: '2rem'}}>Failed to load API reference: {error.message}</div>;
  }

  if (!spec) {
    return <div style={{padding: '2rem'}}>Loading API reference…</div>;
  }

  const {RedocStandalone} = require('redoc');
  return (
    <RedocStandalone
      spec={spec}
      options={{
        nativeScrollbars: true,
        theme: redocTheme,
      }}
    />
  );
}
