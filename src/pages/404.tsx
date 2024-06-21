import { NextPage } from 'next';
import Head from 'next/head';
import dynamic from 'next/dynamic';

const WebFontLoader = dynamic(() => import('../components/WebFontLoader'), {
  ssr: false,
});

const Custom404: NextPage & { bodyClassName?: string } = () => {
  return (
    <>
      <Head>
        <title>Not Found</title>
        <meta content='Not Found' property='og:title' />
        <meta content='Not Found' property='twitter:title' />
        <meta content='width=device-width, initial-scale=1' name='viewport' />
      </Head>
      <div>
        <div className='utility-page-wrap'>
          <div className='utility-page-content'>
            <img
              src='https://d3e54v103j8qbb.cloudfront.net/static/page-not-found.211a85e40c.svg'
              alt=''
              className='image-11'
            />
            <h2 className='heading-12'>Page Not Found</h2>
            <div className='text-block-24'>
              The page you are looking for doesn&#x27;t exist or has been moved
            </div>
          </div>
        </div>
        <WebFontLoader />
      </div>
    </>
  );
};

Custom404.bodyClassName = '';

export default Custom404;
