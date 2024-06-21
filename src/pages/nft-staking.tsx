import { NextPage } from 'next';
import Head from 'next/head';
import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';
import { useAccount } from 'wagmi';
import { readContract } from '@wagmi/core';
import { useWeb3Modal } from '@web3modal/wagmi/react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import softStakingAbi from '../config/abi/SoftStakingABI.json';
import nftAbi from '../config/abi/NftABI.json';
import { formatNumber } from '@/utils/format';
import { ToastContainer } from '@/config/toast';
import { config } from '@/config';

const WebFontLoader = dynamic(() => import('../components/WebFontLoader'), {
  ssr: false,
});

const SOFT_STAKING_CONTRACT_ADDRESS = process.env
  .NEXT_PUBLIC_SOFT_STAKING_CONTRACT_ADDRESS as `0x${string}`;

const NFT_CONTRACT_ADDRESS = process.env
  .NEXT_PUBLIC_NFT_CONTRACT_ADDRESS as `0x${string}`;

const NftStaking: NextPage & { bodyClassName?: string } = () => {
  const { open } = useWeb3Modal();
  const { address, isConnected } = useAccount();
  const [allPoint, setAllPoint] = useState<string>('0');
  const [multiplier, setMultiplier] = useState<string>('0');
  const [weeklyPoint, setWeeklyPoint] = useState<string>('0');
  const [holdingNft, setHoldingNft] = useState<string>('0');

  useEffect(() => {
    const fetchData = async () => {
      if (isConnected && address) {
        try {
          const holdingNftResult = await readContract(config, {
            address: NFT_CONTRACT_ADDRESS,
            abi: nftAbi,
            functionName: 'balanceOf',
            args: [address],
          });
          console.log('holdingNftResult:', holdingNftResult);
          setHoldingNft(formatNumber(holdingNftResult as string));

          const allPointResult = await readContract(config, {
            address: SOFT_STAKING_CONTRACT_ADDRESS,
            abi: softStakingAbi,
            functionName: 'getAllPoint',
            args: [address],
          });
          console.log('allPointResult:', allPointResult);
          setAllPoint(formatNumber(allPointResult as string));

          const multiplierResult = await readContract(config, {
            address: SOFT_STAKING_CONTRACT_ADDRESS,
            abi: softStakingAbi,
            functionName: 'getMultiplier',
            args: [holdingNftResult],
          });
          console.log('multiplierResult:', multiplierResult);
          setMultiplier(formatNumber(multiplierResult as string));

          const weeklyPointResult = await readContract(config, {
            address: SOFT_STAKING_CONTRACT_ADDRESS,
            abi: softStakingAbi,
            functionName: 'getWeeklyPoint',
            args: [address],
          });
          console.log('weeklyPointResult:', weeklyPointResult);
          setWeeklyPoint(formatNumber(weeklyPointResult as string));
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      }
    };

    fetchData(); // Fetch data on component mount

    const intervalId = setInterval(fetchData, 10000); // Fetch data every 10 seconds

    return () => clearInterval(intervalId); // Cleanup interval on component unmount
  }, [address, isConnected]);

  return (
    <>
      <Head>
        <title>NFT Staking</title>
        <meta content='NFT Staking' property='og:title' />
        <meta content='NFT Staking' property='twitter:title' />
        <meta content='width=device-width, initial-scale=1' name='viewport' />
      </Head>
      <div>
        <Navbar />
        <section className='section-18'></section>
        <section className='section-17'>
          <div className='w-layout-blockcontainer container-35 w-container'>
            <h1 className='heading-15'>NFT Staking</h1>
            <div className='text-block-27'>
              If you stop soft staking NFTs (holding them in your wallet), you
              will lose the points you have earned up to that point.
            </div>
          </div>
          <div className='w-layout-blockcontainer container-32 w-container'></div>
          <div className='w-layout-blockcontainer container-33 w-container'>
            <div
              id='w-node-_79138c81-2ee0-0f18-76ae-baadefe11e88-20e9a754'
              className='w-layout-layout quick-stack-26 wf-layout-layout'
            >
              <div
                id='w-node-_79138c81-2ee0-0f18-76ae-baadefe11e89-20e9a754'
                className='w-layout-cell'
              >
                <div
                  id='w-node-cccf5a62-ef0a-e7b1-abff-bdc0fb4813cd-20e9a754'
                  className='w-layout-layout quick-stack-20 wf-layout-layout'
                >
                  <div
                    id='w-node-cccf5a62-ef0a-e7b1-abff-bdc0fb4813ce-20e9a754'
                    className='w-layout-cell cell-42'
                  >
                    <div
                      data-poster-url='videos/CrystalBox3-poster-00001.jpg'
                      data-video-urls='videos/CrystalBox3-transcode.mp4,videos/CrystalBox3-transcode.webm'
                      data-autoplay='true'
                      data-loop='true'
                      data-wf-ignore='true'
                      className='background-video-2 w-background-video w-background-video-atom'
                    >
                      <video
                        id='760d3571-a5a3-1d2d-09f0-ffb39e8fc4d9-video'
                        autoPlay
                        loop
                        style={{
                          backgroundImage:
                            'url("videos/CrystalBox3-poster-00001.jpg")',
                        }}
                        muted
                        playsInline
                        data-wf-ignore='true'
                        data-object-fit='cover'
                      >
                        <source
                          src='videos/CrystalBox3-transcode.mp4'
                          data-wf-ignore='true'
                        />
                        <source
                          src='videos/CrystalBox3-transcode.webm'
                          data-wf-ignore='true'
                        />
                      </video>

                      {!isConnected && (
                        <button
                          className='button-76 w-button'
                          onClick={() => open()}
                        >
                          Connect Wallet
                        </button>
                      )}
                    </div>
                  </div>
                  <div
                    id='w-node-_47e68f78-495f-8063-7c04-00b2cf30fbb4-20e9a754'
                    className='w-layout-cell cell-43'
                  >
                    <a href='#' className='button-77 w-button'>
                      Buy NFT
                    </a>
                  </div>
                </div>
              </div>
              <div
                id='w-node-_79138c81-2ee0-0f18-76ae-baadefe11e8a-20e9a754'
                className='w-layout-cell cell-44'
              >
                <div
                  id='w-node-_774e7ed8-1136-e327-549b-5bac80d21154-20e9a754'
                  className='w-layout-layout quick-stack-21 wf-layout-layout'
                >
                  <div
                    id='w-node-_774e7ed8-1136-e327-549b-5bac80d21155-20e9a754'
                    className='w-layout-cell'
                  >
                    <div
                      id='w-node-_64e24eb8-f6cf-ae2c-d34c-09ea764b9cfe-20e9a754'
                      className='w-layout-layout quick-stack-25 wf-layout-layout'
                    >
                      <div
                        id='w-node-_64e24eb8-f6cf-ae2c-d34c-09ea764b9cff-20e9a754'
                        className='w-layout-cell'
                      >
                        <div className='text30'>Points Earned per Week</div>
                      </div>
                      <div
                        id='w-node-_459c49ed-4dd0-eb89-c53f-bab49a3a3f83-20e9a754'
                        className='w-layout-cell'
                      >
                        <div className='text31'>{weeklyPoint}</div>
                      </div>
                    </div>
                  </div>
                  <div
                    id='w-node-_774e7ed8-1136-e327-549b-5bac80d21156-20e9a754'
                    className='w-layout-cell'
                  >
                    <div
                      id='w-node-d19ed288-2ae0-2693-8901-0b952e66af9d-20e9a754'
                      className='w-layout-layout quick-stack-22 wf-layout-layout'
                    >
                      <div
                        id='w-node-d19ed288-2ae0-2693-8901-0b952e66af9e-20e9a754'
                        className='w-layout-cell'
                      >
                        <div className='text30'>Total Points Earned</div>
                      </div>
                      <div
                        id='w-node-d19ed288-2ae0-2693-8901-0b952e66afa1-20e9a754'
                        className='w-layout-cell'
                      >
                        <div className='text31'>{allPoint}</div>
                      </div>
                    </div>
                  </div>
                  <div
                    id='w-node-_5d8c06b2-f289-3e04-0f6d-5fe1f7a14f17-20e9a754'
                    className='w-layout-cell'
                  >
                    <div
                      id='w-node-f3ad45d1-1556-f855-b607-f4a6a638849f-20e9a754'
                      className='w-layout-layout quick-stack-24 wf-layout-layout'
                    >
                      <div
                        id='w-node-f3ad45d1-1556-f855-b607-f4a6a63884a0-20e9a754'
                        className='w-layout-cell'
                      >
                        <div className='text30'>NFT Holdings</div>
                      </div>
                      <div
                        id='w-node-f3ad45d1-1556-f855-b607-f4a6a63884a3-20e9a754'
                        className='w-layout-cell'
                      >
                        <div className='text31'>{holdingNft}</div>
                      </div>
                    </div>
                  </div>
                  <div
                    id='w-node-e8b4056f-d18a-46d9-7cef-317c624057c1-20e9a754'
                    className='w-layout-cell'
                  >
                    <div
                      id='w-node-aafc7655-d6d1-7089-2e70-38eb8e6dfb99-20e9a754'
                      className='w-layout-layout quick-stack-23 wf-layout-layout'
                    >
                      <div
                        id='w-node-aafc7655-d6d1-7089-2e70-38eb8e6dfb9a-20e9a754'
                        className='w-layout-cell'
                      >
                        <div className='text30'>Multiplier</div>
                      </div>
                      <div
                        id='w-node-aafc7655-d6d1-7089-2e70-38eb8e6dfb9d-20e9a754'
                        className='w-layout-cell'
                      >
                        <div className='text31'>{multiplier}%</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className='section-18'></section>
        <Footer />
        <WebFontLoader />
      </div>
      <ToastContainer />
    </>
  );
};

NftStaking.bodyClassName = 'nft-staking-body';

export default NftStaking;
