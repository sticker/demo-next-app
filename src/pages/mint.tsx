import { NextPage } from 'next';
import Head from 'next/head';
import dynamic from 'next/dynamic';
import Navbar from '../components/Navbar';
import Footer from '@/components/Footer';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

const WebFontLoader = dynamic(() => import('../components/WebFontLoader'), {
  ssr: false,
});

const Mint: NextPage & { bodyClassName?: string } = () => {
  const router = useRouter();
  const [timeLeft, setTimeLeft] = useState<null | {
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
  }>(null);

  const calculateTimeLeft = () => {
    const mintDate = new Date(process.env.NEXT_PUBLIC_MINT_DATE!); // 環境変数からmintの日付と時刻を取得
    const now = new Date();
    const difference = mintDate.getTime() - now.getTime();

    if (difference > 0) {
      setTimeLeft({
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      });
    } else {
      setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      router.push('/nft-staking'); // mint日を超えていたらリダイレクト
    }
  };

  useEffect(() => {
    const timer = setInterval(calculateTimeLeft, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <>
      <Head>
        <meta charSet='utf-8' />
        <title>MINT</title>
        <meta content="MINT" property="og:title"/>
        <meta content="MINT" property="twitter:title"/>
        <meta content="width=device-width, initial-scale=1" name="viewport"/>
      </Head>
      <div>
        <Navbar />
        <section className="section-18"></section>
        <section className="section-16">
          <div className="w-layout-blockcontainer container-31 w-container">
            <img 
              src="images/Machina_Dark_Main_黒背景メイン.png" 
              loading="lazy" 
              sizes="(max-width: 767px) 5vw, (max-width: 991px) 36.3984375px, (max-width: 1919px) 47px, 5vw" 
              srcSet="images/Machina_Dark_Main_黒背景メイン-p-500.png 500w, images/Machina_Dark_Main_黒背景メイン-p-800.png 800w, images/Machina_Dark_Main_黒背景メイン-p-1080.png 1080w, images/Machina_Dark_Main_黒背景メイン-p-1600.png 1600w, images/Machina_Dark_Main_黒背景メイン.png 2000w" 
              alt="" 
              className="image-13"
            />
            <h1 className="heading-14">ENERGY GENERATING</h1>
            <div className="text-block-26">The time for minting is coming soon!</div>
            <div id="w-node-_5a73a420-2902-f1f4-d18f-22f213cd0da5-986059e1" className="w-layout-layout quick-stack-19 wf-layout-layout">
              <div id="w-node-_5a73a420-2902-f1f4-d18f-22f213cd0da6-986059e1" className="w-layout-cell cell-39">
                <h1 className="heading-14">{timeLeft ? timeLeft.days : ''}</h1>
                <div className="text-block-26">DAYS</div>
              </div>
              <div id="w-node-_5a73a420-2902-f1f4-d18f-22f213cd0da7-986059e1" className="w-layout-cell cell-39">
                <h1 className="heading-14">{timeLeft ? timeLeft.hours : ''}</h1>
                <div className="text-block-26">HOURS</div>
              </div>
              <div id="w-node-_6213c47f-9b28-af2f-107d-c89db9e64fc7-986059e1" className="w-layout-cell cell-39">
                <h1 className="heading-14">{timeLeft ? timeLeft.minutes : ''}</h1>
                <div className="text-block-26">MINUTES</div>
              </div>
              <div id="w-node-a420f054-5cb8-76f7-ce90-e1ee4426b9f0-986059e1" className="w-layout-cell cell-39">
                <h1 className="heading-14">{timeLeft ? timeLeft.seconds : ''}</h1>
                <div className="text-block-26">SECONDS</div>
              </div>
            </div>
            <a href="#" className="button-78 w-button">Check Whitelist</a>
          </div>
          <section className="section-14"></section>
        </section>
        <Footer />
        <WebFontLoader />
      </div>
    </>
  );
};

Mint.bodyClassName = 'nft-body';

export default Mint;
