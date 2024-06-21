import React, { useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Script from 'next/script';
import { useWeb3Modal } from '@web3modal/wagmi/react';
import { useAccount, useChainId, useSwitchChain } from 'wagmi';
import { formatWalletAddress } from '@/utils/format';

const Navbar: React.FC = () => {
  const { open } = useWeb3Modal();
  const account = useAccount();
  const chainId = useChainId();
  const { chains, switchChain } = useSwitchChain();

  const mintDate = new Date(process.env.NEXT_PUBLIC_MINT_DATE!); // 環境変数からmintの日付と時刻を取得
  const now = new Date();
  const difference = mintDate.getTime() - now.getTime();
  const isMintStart = difference < 0;

  useEffect(() => {
    const webflowInit = () => {
      if (window && (window as any).Webflow) {
        (window as any).Webflow.destroy(); // 既存のインスタンスを破棄
        (window as any).Webflow.ready(); // Webflowを初期化
        (window as any).Webflow.require('ix2').init(); // Interactionsを初期化
      }
    };

    const script = document.createElement('script');
    script.src = '/js/webflow.js';
    script.onload = webflowInit;
    document.body.appendChild(script);

    return () => {
      if (script) {
        document.body.removeChild(script);
      }
    };
  }, []);

  useEffect(() => {
    if (account && account.isConnected && chains && chainId !== chains[0].id) {
      switchChain({ chainId: chains[0].id });
    }
  }, [account, chainId]);

  return (
    <div className='navbar-logo-left'>
      <div
        data-animation='default'
        data-collapse='medium'
        data-duration='400'
        data-easing='ease'
        data-easing2='ease'
        role='banner'
        className='navbar001 w-nav'
      >
        <div className='nav-new w-container'>
          <Link
            href='/'
            aria-current='page'
            className='logo_link w-clearfix w-nav-brand w--current'
          >
            <Image
              src='/images/アセット-22x.png'
              alt='Logo'
              width={250}
              height={29}
              layout='responsive'
              sizes='(max-width: 479px) 31vw, (max-width: 767px) 24vw, (max-width: 991px) 25vw, 250px'
              className='logo'
            />
          </Link>
          <div className='space'></div>
          <nav role='navigation' className='dropdown-menu w-nav-menu'>
            <Link
              href='/'
              aria-current='page'
              className='menu-links w-nav-link w--current'
            >
              HOME
            </Link>
            <Link
              href={isMintStart ? '/nft-staking' : '/mint'}
              className='menu-links w-nav-link'
            >
              NFT
            </Link>
            <Link href='/nft-staking' className='menu-links w-nav-link'>
              NFT(Staking)
            </Link>
            <Link href='/claim' className='menu-links w-nav-link'>
              Claim
            </Link>
            <button
              className='menu-links cta w-nav-link'
              onClick={() => open()}
            >
              {account && account.isConnected
                ? formatWalletAddress(account.address)
                : 'CONNECT WALLET'}
            </button>
          </nav>
          <div className='humberger w-nav-button'>
            <div className='humberger-icon w-icon-nav-menu'></div>
          </div>
        </div>
      </div>
      <Script src='/js/webflow.js' strategy='lazyOnload' />
    </div>
  );
};

export default Navbar;
