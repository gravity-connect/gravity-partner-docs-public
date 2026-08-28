import React, {useEffect} from 'react';
import useBaseUrl from '@docusaurus/useBaseUrl';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Link from '@docusaurus/Link';
import Layout from '@theme/Layout';

import PageBanner from '@site/src/components/PageBanner';
import Band from '@site/src/components/Band';
import Grid from '@site/src/components/Grid';
import Block from '@site/src/components/Grid/block';
import Cards from '@site/src/components/Cards';
import Card from '@site/src/components/Cards/card';
import FeatureSelector from '@site/src/components/FeatureSelector';
import FeatureSelectorItem from '@site/src/components/FeatureSelector/item';

export default function Home() {
  const {siteConfig} = useDocusaurusContext();

  useEffect(() => {
    document.body.classList.add('home-page');
    return () => document.body.classList.remove('home-page');
  }, []);

  useEffect(() => {
    const onScroll = () => {
      document.body.classList.toggle('scrolled', window.scrollY > 50);
    };

    onScroll();
    window.addEventListener('scroll', onScroll, {passive: true});

    return () => {
      window.removeEventListener('scroll', onScroll);
      document.body.classList.remove('scrolled');
    };
  }, []);

  return (
    <Layout
      title={siteConfig.title}
      description="The open standard for VPP and OEM integrations">

      <main>

        <PageBanner
          title="The Open Standard for OEM Integrations with Virtual Power Plants"
          desc="Connect a fleet of Distributed Energy Resources to dozens of utility programs with one integration, powering reliable Virtual Power Plants with near-real-time control and visibility."
          button="Get Started"
          link="/docs/introduction"
          className='HomeBanner'
        />

        <Band color='grey'>

          <h5>VPPs and Demand Response Programs</h5>
          <p className='callout'>Integrating with Demand Response programs used to mean integrating with each VPP and DERMS vendor and building custom reports and enrollment flows for each program.</p>
          <p className='callout'>With Gravity Connect, build a single integration that standardizes enrollment, near-real-time data streaming, and commands. Join our network of partners and programs with a single integration.</p>

        </Band>


        <Grid title="Why Gravity Connect">
          <Block>
            <img src={useBaseUrl('/img/flexible.png')} alt="..." />
            <h3>Purpose-built</h3>
            <p>Gravity Connect is designed for every aspect of VPP-OEM integrations, including enrollment, near-real-time data streaming, and commands, and it’s easy to develop, with no custom XML.</p>
          </Block>
          <Block>
            <img src={useBaseUrl('/img/compatible.png')} alt="..." />
            <h3>Flexible and customizable</h3>
            <p>Use a single integration to support the right user experience for each program, from one-click in-app onboarding and marketplace pre-enrollment flows to command optimization algorithms.</p>
          </Block>
          <Block>
            <img src={useBaseUrl('/img/reliable.png')} alt="..." />
            <h3>Reliable</h3>
            <p>Certified Partners undergo rigorous quality testing so they can provide dependable, predictable load shift where and when it’s needed.</p>
          </Block>
        </Grid>

        <Cards title="Device Types We Connect With">
        <Card>
            <h3>Battery</h3>
            <img src={useBaseUrl('/img/thermostat.svg')} alt="..." />
          </Card>
          <Card>
            <h3>EVSE</h3>
            <img src={useBaseUrl('/img/thermostat.svg')} alt="..." />
          </Card>
          <Card>
            <h3>Water Heater</h3>
            <img src={useBaseUrl('/img/thermostat.svg')} alt="..." />
          </Card>
          <Card>
            <h3>Thermostat</h3>
            <img src={useBaseUrl('/img/thermostat.svg')} alt="..." />
          </Card>
          <Card>
            <h3>Vehicle to Grid</h3>
            <img src={useBaseUrl('/img/thermostat.svg')} alt="..." />
          </Card>
          <Card>
            <p>... and more! Partner with us to support new device types</p>
          </Card>
        </Cards>

        <Band
          color='black'
          image={useBaseUrl('/img/certified.png')}
        >

          <h5>Certification</h5>

          <h2>An Open Standard with Certification</h2>
          <p>Gravity Connect is an open standard developed through a partnership between Virtual Peaker and DER OEMs.</p>

          <ul>
            <li>Available under the BSD license, the open-source specification can be used freely to support any energy initiative without vendor lock-in. </li>
            <li>Certified partners meet rigorous standards for both functionality and security. The <a href="url">optional certification process</a> verifies quality and promotes the integration on this site.</li>
            <li>The specification is maintained by Virtual Peaker with contributions from partners across the industry, including many OEMs.</li>
          </ul>

        </Band>

        <FeatureSelector title="Why It's Better">
          <FeatureSelectorItem headline="End-to-end support" image={useBaseUrl('/img/flexible.png')}>
            <p>Gravity Connect supports a variety of device enrollment and onboarding flows for program designs including bring-your-own-device and direct install, unlike other open standards, which often exclude enrollment entirely.</p>
          </FeatureSelectorItem>
          <FeatureSelectorItem headline="Modern and responsive" image={useBaseUrl('/img/compatible.png')}>
            <p>Gravity Connect uses a REST API with JSON payloads, OAuth 2.0 authentication, and webhooks for near-real-time control and visibility that supports advanced control algorithms, such as precise load shaping and energy arbitrage.</p>
          </FeatureSelectorItem>
          <FeatureSelectorItem headline="Consistent and standardized" image={useBaseUrl('/img/reliable.png')}>
            <p>There’s no need to build custom commands and reports for each program; simply enable the applicable enrollment module(s) for each program.</p>
          </FeatureSelectorItem>
        </FeatureSelector>

        <Band background={useBaseUrl('/img/join.png')}>

          <h2>Join our efficient, sustainable energy ecosystem</h2>
          <p>Access the guides or dive into the documentation.</p>

          <Link className='button button--outline button--lg margin-right--md' to='/docs/getting-started'>
            Go to Guides
          </Link>
          <Link className='button button--outline button--lg' to='/api'>
            Read the Docs
          </Link>

        </Band>

      </main>

    </Layout>
  );
}