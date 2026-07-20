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
          title="The Open Standard for VPP & OEM Integrations"
          desc="Connect a DER fleet to dozens of utility programs with one integration, powering reliable demand response with near-real-time control and visibility."
          button="Get Started"
          link="/docs/getting-started"
          className='HomeBanner'
        />

        <Band color='grey'>

          <h5>VPPs and Demand Response Programs</h5>
          <p className='callout'>Integrating with Demand Response programs means integrating with each VPP and DERMS vendor operating those programs.</p>
          <p className='callout'>Gravity Connect OEM partners are compatible with an array of programs managed by VPP partners.</p>

        </Band>


        <Grid title="Why Gravity Connect">
          <Block>
            <img src={useBaseUrl('/img/flexible.png')} alt="..." />
            <h3>Flexible & Customizable</h3>
            <p>Support the right UX for each program with one integration, from direct install and pre-enrollment flows to command optimization algorithms.</p>
          </Block>
          <Block>
            <img src={useBaseUrl('/img/compatible.png')} alt="..." />
            <h3>Widely Compatible</h3>
            <p>Integrate once to join a network of OEMs and programs.</p>
          </Block>
          <Block>
            <img src={useBaseUrl('/img/reliable.png')} alt="..." />
            <h3>Reliable</h3>
            <p>Certified partners undergo rigorous quality testing so they can provide dependable, predictable load shift where and when it’s needed.</p>
          </Block>
        </Grid>

        <Cards title="Devices We Connect With">
          <Card>
            <h3>Thermostat</h3>
            <img src={useBaseUrl('/img/thermostat.svg')} alt="..." />
          </Card>
          <Card>
            <h3>Water Heater</h3>
            <img src={useBaseUrl('/img/thermostat.svg')} alt="..." />
          </Card>
          <Card>
            <h3>Battery</h3>
            <p>Stuff could go here? What if we put some text in here too?</p>
            <img src={useBaseUrl('/img/thermostat.svg')} alt="..." />
          </Card>
          <Card>
            <h3>EVSE</h3>
            <img src={useBaseUrl('/img/thermostat.svg')} alt="..." />
          </Card>
          <Card>
            <h3>Vehicle to Grid</h3>
            <img src={useBaseUrl('/img/thermostat.svg')} alt="..." />
          </Card>
        </Cards>

        <Band
          color='black'
          image={useBaseUrl('/img/certified.png')}
        >

          <h5>Certification</h5>

          <h2>Gravity Connect Certification</h2>
          <p>Certified partners meet rigorous standards for both functionality and security.</p>

          <ul>
            <li>Lorem ipsum dolor sit amet, consectetur adipiscing elit maecenas vel ant.</li>
            <li>Lorem ipsum dolor sit amet, consectetur adipiscing elit maecenas vel ant.</li>
            <li>Lorem ipsum dolor sit amet, consectetur adipiscing elit maecenas vel ant.</li>
          </ul>

        </Band>

        <FeatureSelector title="Why It's Better">
          <FeatureSelectorItem headline="Purpose-built" image={useBaseUrl('/img/flexible.png')}>
            <p>Gravity Connect is designed for every aspect of VPP-OEM integrations, from enrollment to commands.</p>
          </FeatureSelectorItem>
          <FeatureSelectorItem headline="Quickly scalable" image={useBaseUrl('/img/compatible.png')}>
            <p>Integrate once to join a growing network of OEMs and programs, without rebuilding for each new partner.</p>
          </FeatureSelectorItem>
          <FeatureSelectorItem headline="Rapidly responsive" image={useBaseUrl('/img/reliable.png')}>
            <p>Near-real-time control and visibility keep commands and telemetry moving with minimal latency.</p>
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