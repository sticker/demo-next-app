import { NextPage } from 'next';
import Head from 'next/head';
import Script from 'next/script';
import dynamic from 'next/dynamic';
import { useEffect } from 'react';
import Navbar from '../components/Navbar';
import Footer from '@/components/Footer';

const WebFontLoader = dynamic(() => import('../components/WebFontLoader'), { ssr: false });

const Home: NextPage & { bodyClassName?: string } = () => {

  useEffect(() => {
    const loadTwitterWidgets = () => {
      if (window && (window as any).twttr && (window as any).twttr.widgets) {
        (window as any).twttr.widgets.load();
      }
    };

    loadTwitterWidgets();

    // Twitter ウィジェットのスクリプトがロードされた後にウィジェットを再ロード
    const script = document.createElement('script');
    script.src = 'https://platform.twitter.com/widgets.js';
    script.async = true;
    script.onload = loadTwitterWidgets;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <>
      <Head>
        <title>DARK MACHINE</title>
        <meta content="DARK MACHINE" property="og:title"/>
        <meta content="DARK MACHINE" property="twitter:title"/>
        <meta content='width=device-width, initial-scale=1' name='viewport' />
      </Head>
      <div>
        <Navbar />
        <div className="background-video w-background-video w-background-video-atom">
          <video
            id="e3aa23ce-16df-8894-c87a-529c2a1c3f9e-video"
            autoPlay
            loop
            muted
            playsInline
            poster="/videos/シーケンス-01-poster-00001.jpg"
            style={{ backgroundImage: 'url("/videos/シーケンス-01-poster-00001.jpg")' }}
          >
            <source src="/videos/シーケンス-01-transcode.mp4" type="video/mp4" />
            <source src="/videos/シーケンス-01-transcode.webm" type="video/webm" />
          </video>
          <section className="section">
            <img
              src="images/アセット-22x.png"
              loading="lazy"
              width="426"
              height="auto"
              alt=""
              srcSet="images/アセット-22x-p-500.png 500w, images/アセット-22x-p-800.png 800w, images/アセット-22x-p-1080.png 1080w, images/アセット-22x-p-1600.png 1600w, images/アセット-22x-p-2000.png 2000w, images/アセット-22x.png 2414w"
              sizes="(max-width: 479px) 50vw, (max-width: 767px) 25vw, (max-width: 991px) 26vw, (max-width: 1919px) 56vw, 34vw"
              className="image"
            />
            <div className="tagline">SEIZE THE DARK</div>
          </section>
          {/* <section className="section-2 w-clearfix">
            <a href="https://discord.gg/vcRh2NHg" target="_blank" className="link-block w-inline-block w-clearfix">
              <div className="socialmedialinks">Join Discord</div>
            </a>
            <a href="https://x.com/darkmachinegame?lang=en" target="_blank" className="link-block-2 w-inline-block w-clearfix">
              <div id="https-twitter.com-DarkMachineGame" className="socialmedialinks">Follow X</div>
            </a>
          </section> */}
        </div>
        <section className="section-19">
          <div id="w-node-b264d3b8-cee6-9502-4dde-1d19293c19e8-0872730a" className="w-layout-layout quick-stack-27 wf-layout-layout">
            <div id="w-node-b264d3b8-cee6-9502-4dde-1d19293c19e9-0872730a" className="w-layout-cell">
              <div className="w-layout-blockcontainer container-38 w-container"><img src="images/dmt2.png" loading="lazy" sizes="(max-width: 479px) 100vw, (max-width: 991px) 92vw, (max-width: 1919px) 94vw, 940px" height="Auto" alt="" srcSet="images/dmt2-p-500.png 500w, images/dmt2-p-800.png 800w, images/dmt2-p-1080.png 1080w, images/dmt2-p-1600.png 1600w, images/dmt2.png 1700w" className="image-9"/></div>
              <div className="w-layout-blockcontainer w-container">
                <h1 className="heading-3">ABOUT DARK MACHINE</h1>
                <div className="text-block-6">Dark Machine is a team-based dark mech shooter designed using the latest game and blockchain technologies.<br/>‍<br/>Esports and modern tokenomics synergistically join forces to create an entertainment experience where digital ownership of items that players care about the most transforms the world of competitive mech battles.<br/><br/>Dark Machine will be the world’s first blockchain game to support decentralized tournaments.</div>
              </div>
            </div>
            <div id="w-node-b264d3b8-cee6-9502-4dde-1d19293c19ea-0872730a" className="w-layout-cell cell-45">
              <div className="w-layout-blockcontainer container-37 w-container">
                <h1 className="heading-2">TIMELINE / X</h1>
                <div className="w-layout-blockcontainer twittercontainer_pc w-container">
                  <div className="code-embed w-embed w-script">
                    <a className="twitter-timeline" data-width="400" data-height="600" data-theme="dark" data-tweet-limit="5" href="https://twitter.com/DarkMachineGame">
                      Tweets by DarkMachineGame
                    </a>
                    <script async src="https://platform.twitter.com/widgets.js" charSet="utf-8"></script>
                  </div>
                </div>
                <div className="w-layout-blockcontainer twittercontainer_mobile mobile w-container">
                  <div className="code-embed mobilecode w-embed w-script">
                    <a className="twitter-timeline" data-width="300" data-height="500" data-theme="dark" data-tweet-limit="5" href="https://twitter.com/DarkMachineGame">
                      Tweets by DarkMachineGame
                    </a>
                    <script async src="https://platform.twitter.com/widgets.js" charSet="utf-8"></script>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="section-4">
          <div id="w-node-_9b1b51c6-90e7-5c7f-6a49-041b14cc710a-0872730a" className="w-layout-layout quick-stack-2 wf-layout-layout">
            <div id="w-node-_9b1b51c6-90e7-5c7f-6a49-041b14cc710b-0872730a" className="w-layout-cell">
              <div id="w-node-_3c13795c-6c24-cad8-363b-fa2057f87d42-0872730a" className="w-layout-layout quick-stack wf-layout-layout">
                <div id="w-node-d242c457-de5c-aeab-e265-b2700ce4de20-0872730a" className="w-layout-cell cell">
                  <div className="text-block-7">GAME</div>
                </div>
                <div id="w-node-_21c4f1e1-ec2d-c5a8-2262-54ca9bb3a18a-0872730a" className="w-layout-cell cell-7">
                  <h1 className="heading-4">LEVELS OF GIGANTIC DESTRUCTION<br/></h1><img src="images/dmt3.png" loading="lazy" sizes="(max-width: 479px) 79vw, (max-width: 767px) 87vw, (max-width: 991px) 90vw, (max-width: 1919px) 95vw, 1600px" srcSet="images/dmt3-p-500.png 500w, images/dmt3-p-800.png 800w, images/dmt3-p-1080.png 1080w, images/dmt3.png 1600w" alt="" className="image-10"/>
                </div>
                <div id="w-node-_2b3a5d6d-26e7-77e1-3556-22e93d151ceb-0872730a" className="w-layout-cell">
                  <p className="paragraph">A team arena style mech-based shooter with asymmetrical mech enlargement.</p>
                </div>
                <div id="w-node-c1b2f2fa-5e96-eaa3-6ea7-ac8f92b48c94-0872730a" className="w-layout-cell cell-10">
                </div>
                <div id="w-node-_6edc714c-4c30-00f5-1b74-ab87c0e6cdad-0872730a" className="w-layout-cell cell-4">
                  <h1 className="heading-5">01</h1>
                </div>
              </div>
            </div>
            <div id="w-node-_9b1b51c6-90e7-5c7f-6a49-041b14cc710c-0872730a" className="w-layout-cell">
              <div id="w-node-_679b3199-97da-2ab1-fca2-e1fa4ab88fe9-0872730a" className="w-layout-layout quick-stack wf-layout-layout">
                <div id="w-node-_679b3199-97da-2ab1-fca2-e1fa4ab88fea-0872730a" className="w-layout-cell cell-2">
                  <div className="text-block-7">TOKEN</div>
                </div>
                <div id="w-node-_679b3199-97da-2ab1-fca2-e1fa4ab88feb-0872730a" className="w-layout-cell cell-23">
                  <h1 className="heading-4">MXNA <br/>TOKEN</h1><img src="images/MXNA_1.png" loading="lazy" sizes="(max-width: 479px) 79vw, (max-width: 767px) 87vw, (max-width: 991px) 90vw, (max-width: 1919px) 95vw, 1600px" srcSet="images/MXNA_1-p-500.png 500w, images/MXNA_1-p-800.png 800w, images/MXNA_1-p-1080.png 1080w, images/MXNA_1.png 1600w" alt="" className="image-10" />
                </div>
                <div id="w-node-_679b3199-97da-2ab1-fca2-e1fa4ab88fec-0872730a" className="w-layout-cell cell-25">
                  <p className="paragraph">Utility and value for the new generation of skill-based games. </p>
                </div>
                <div id="w-node-_679b3199-97da-2ab1-fca2-e1fa4ab88fed-0872730a" className="w-layout-cell cell-10">
                </div>
                <div id="w-node-c4f3dce7-e27f-a89f-6ee8-0fdbdf5e14ff-0872730a" className="w-layout-cell cell-4">
                  <h1 className="heading-5">02</h1>
                </div>
              </div>
            </div>
            <div id="w-node-fc0aa414-7fa0-c417-09d5-da7bce10e48e-0872730a" className="w-layout-cell">
              <div id="w-node-_1ca80679-1162-ac2f-9049-1e7ba79a478e-0872730a" className="w-layout-layout quick-stack wf-layout-layout">
                <div id="w-node-_1ca80679-1162-ac2f-9049-1e7ba79a478f-0872730a" className="w-layout-cell cell-3">
                  <div className="text-block-7">TOURNAMENTS</div>
                </div>
                <div id="w-node-_1ca80679-1162-ac2f-9049-1e7ba79a4790-0872730a" className="w-layout-cell cell-22">
                  <h1 className="heading-4">DECENTRALIZED TOURNAMENTS</h1><img src="images/arena.png" loading="lazy" sizes="(max-width: 479px) 79vw, (max-width: 767px) 87vw, (max-width: 991px) 90vw, (max-width: 1919px) 95vw, 1600px" srcSet="images/arena-p-500.png 500w, images/arena-p-800.png 800w, images/arena-p-1080.png 1080w, images/arena.png 1600w" alt="" className="image-10" />
                </div>
                <div id="w-node-_1ca80679-1162-ac2f-9049-1e7ba79a4791-0872730a" className="w-layout-cell cell-24">
                  <p className="paragraph">Realizing the dream of daily tournaments hosted by anyone through transparency and fairness.</p>
                </div>
                <div id="w-node-_1ca80679-1162-ac2f-9049-1e7ba79a4792-0872730a" className="w-layout-cell cell-10">
                </div>
                <div id="w-node-ee985d43-d7b1-907d-4be3-22395a98ac62-0872730a" className="w-layout-cell cell-4">
                  <h1 className="heading-5">03</h1>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="section-15">
          <div className="w-layout-blockcontainer w-container">
            <div className="w-layout-blockcontainer w-container">
              <h1 className="heading-11">PARTNERS</h1>
            </div>
          </div>
          <div className="w-layout-blockcontainer container-30 w-container">
          <div id="w-node-_47c31521-09e1-ea2e-5279-5c7eab98afa9-0872730a" className="w-layout-layout quick-stack-18 wf-layout-layout">
            <div id="w-node-_47c31521-09e1-ea2e-5279-5c7eab98afaa-0872730a" className="w-layout-cell cell-40"><img src="images/Tencent.png" loading="lazy" alt="" className="image-25"/></div>
            <div id="w-node-_47c31521-09e1-ea2e-5279-5c7eab98afab-0872730a" className="w-layout-cell"><img src="images/Sui.png" loading="lazy" width="195" alt="" className="image-15"/></div>
            <div id="w-node-_92f1c008-32d4-e7f8-0077-33109e8bab2a-0872730a" className="w-layout-cell"><img src="images/SwissBorg.png" loading="lazy" alt="" className="image-21"/></div>
            <div id="w-node-_1712c112-b7e1-ad56-04ea-72b0309db5b6-0872730a" className="w-layout-cell cell-41"><img src="images/ImmutableX.png" loading="lazy" width="124" alt="" className="image-14"/></div>
            <div id="w-node-_3caa1902-598c-455e-926f-ef108450c6c7-0872730a" className="w-layout-cell"><img src="images/Mantle.png" loading="lazy" alt="" className="image-22"/></div>
            <div id="w-node-d496ab90-dc09-8b56-f981-8c1806deaaab-0872730a" className="w-layout-cell"><img src="images/YGG.png" loading="lazy" alt="" className="image-16"/></div>
            <div id="w-node-_1bd41f5b-8ac5-0fb7-47da-a59983cc9933-0872730a" className="w-layout-cell"><img src="images/Arcane.png" loading="lazy" alt="" className="image-24"/></div>
            <div id="w-node-a144d367-d6f2-2fc8-3c61-eea5f49da78d-0872730a" className="w-layout-cell"><img src="images/Varys.png" loading="lazy" alt="" className="image-23"/></div>
            <div id="w-node-_07f125a8-b0d7-39c1-54b2-fcd8beabd114-0872730a" className="w-layout-cell"><img src="images/Presto.png" loading="lazy" alt="" className="image-20"/></div>
            <div id="w-node-c1f40baa-f812-74bd-b6d8-3823b8c4c51c-0872730a" className="w-layout-cell"><img src="images/iGamie.png" loading="lazy" alt="" className="image-19"/></div>
            <div id="w-node-_6345592b-3ac1-e71d-441c-65d50a8544fe-0872730a" className="w-layout-cell"><img src="images/BDE.png" loading="lazy" alt="" className="image-18"/></div>
            <div id="w-node-d0a2aa85-ca3c-f665-ef14-0d69dde9d389-0872730a" className="w-layout-cell"><img src="images/CedarCapital.png" loading="lazy" alt="" className="image-17"/></div>
          </div>
          </div>
        </section>
        <Footer />
        <WebFontLoader />
      </div>
    </>
  );
};

Home.bodyClassName = 'home-body';

export default Home;
