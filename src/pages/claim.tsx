import { NextPage } from 'next';
import Head from 'next/head';
import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';
import {
  type BaseError,
  useAccount,
  useReadContract,
  useWriteContract,
  useWaitForTransactionReceipt,
} from 'wagmi';
import { readContract } from '@wagmi/core';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import claimAbi from '../config/abi/SaleTokenClaimABI.json';
import { formatDateTime, formatNumber, formatWeiNumber } from '@/utils/format';
import { ToastContainer } from '@/config/toast';
import { useToast } from '@/hooks/toast';
import { config } from '@/config';

const WebFontLoader = dynamic(() => import('../components/WebFontLoader'), {
  ssr: false,
});

const CLAIM_CONTRACT_ADDRESS = process.env
  .NEXT_PUBLIC_CLAIM_CONTRACT_ADDRESS as `0x${string}`;

interface ClaimInfo {
  totalAmount: string;
  tgeTime: string;
  tgeAmount: string;
  lockoutPeriod: string;
  subsequentUnlock: string;
  unlockable: string;
  totalClaimed: string;
  remaining: string;
}

const Claim: NextPage & { bodyClassName?: string } = () => {
  const { showToast } = useToast();
  const account = useAccount();
  const [canClaim, setCanClaim] = useState<boolean>(false);
  const [claimInfo, setClaimInfo] = useState<ClaimInfo | null>(null);
  const [isSetTge, setIsSetTge] = useState<boolean>(false);
  const [isStarted, setIsStarted] = useState(false);
  const [totalAmount, setTotalAmount] = useState<string>('0');
  const [tgeTime, setTgeTime] = useState<string>('0');
  const [tgeAmount, setTgeAmount] = useState<string>('0');
  const [lockoutPeriod, setLockoutPeriod] = useState<string>('0');
  const [subsequentUnlock, setSubsequentUnlock] = useState<string>('0');
  const [unlockable, setUnlockable] = useState<string>('0');
  const [totalClaimed, setTotalClaimed] = useState<string>('0');
  const [remaining, setRemaining] = useState<string>('0');

  const { data: hash, error, writeContractAsync } = useWriteContract();

  const readConfig = {
    abi: claimAbi,
    address: CLAIM_CONTRACT_ADDRESS,
    functionName: 'getClaimInfoView',
    args: [account.address],
    enabled: account && account.isConnected,
  };

  const { data } = useReadContract(readConfig);

  useEffect(() => {
    if (data) {
      console.log(data);
      const _claimInfo = data as ClaimInfo;
      setClaimInfo(_claimInfo);
    }
  }, [data]);

  useEffect(() => {
    if (claimInfo && Number(claimInfo.tgeTime) > 0) {
      setIsSetTge(true);
    }
  }, [claimInfo]);

  useEffect(() => {
    if (claimInfo) {
      const nowUnixTime = new Date().getTime() / 1000;
      if (Number(claimInfo.tgeTime) <= nowUnixTime) {
        setIsStarted(true);
      }
    }
  }, [claimInfo]);

  useEffect(() => {
    if (claimInfo) {
      setTotalAmount(formatWeiNumber(claimInfo.totalAmount));
      if (Number(claimInfo.tgeTime) > 0) {
        setTgeTime(formatDateTime(claimInfo.tgeTime));
        setSubsequentUnlock(formatDateTime(claimInfo.subsequentUnlock));
      } else {
        setTgeTime('Coming soon');
        setSubsequentUnlock('Coming soon');
      }
      setTgeAmount(formatWeiNumber(claimInfo.tgeAmount));
      setLockoutPeriod(formatNumber(claimInfo.lockoutPeriod));
      setUnlockable(formatWeiNumber(claimInfo.unlockable));
      setTotalClaimed(formatWeiNumber(claimInfo.totalClaimed));
      setRemaining(formatWeiNumber(claimInfo.remaining));
    }
  }, [claimInfo]);

  useEffect(() => {
    if (claimInfo && Number(claimInfo.unlockable) > 0) {
      setCanClaim(true);
    }
  }, [claimInfo]);

  const handleClaim = async () => {
    console.log('Claiming...');
    if (!account.isConnected) {
      showToast('Please connect your wallet.', 'error');
      return;
    }
    if (!isStarted) {
      showToast('Not started yet.', 'error');
      return;
    }
    if (Number(remaining) <= 0) {
      showToast('No remaining tokens.', 'error');
      return;
    }
    if (!canClaim) {
      showToast('No unlockable tokens.', 'error');
      return;
    }
    const ret = await writeContractAsync({
      abi: claimAbi,
      address: CLAIM_CONTRACT_ADDRESS,
      functionName: 'claim',
    });
    console.log(ret);
  };

  useEffect(() => {
    if (error) {
      showToast((error as BaseError).shortMessage || error.message, 'error');
    }
  }, [error, showToast]);

  const { isSuccess: isConfirmed } = useWaitForTransactionReceipt({
    hash,
  });

  useEffect(() => {
    if (isConfirmed) {
      showToast('Claimed successfully.', 'success');
      const read = async () => {
        const data = await readContract(config, readConfig);
        console.log(data);
        const _claimInfo = data as ClaimInfo;
        setClaimInfo(_claimInfo);
      };
      read();
    }
  }, [isConfirmed, readConfig, showToast]);

  return (
    <>
      <Head>
        <title>Claim</title>
        <meta content="Claim" property="og:title"/>
        <meta content="Claim" property="twitter:title"/>
        <meta content='width=device-width, initial-scale=1' name='viewport' />
      </Head>
      <div>
        <Navbar />
        <section className='section-5'>
          <div className='w-layout-blockcontainer container-10 w-container'>
            <h1 className='heading-8'>Token Claim</h1>
            <div className="text-block-10"><br/>In the Dark Machine, to control the selling pressure of the tokens, <br/>the start time of the vesting (token distribution) will be randomly distributed over a maximum of 72 hours.<br/><br/>The timing of the TGE will be announced separately. You will be able to claim token(s) after that.</div>
            <div
              id='w-node-_07fac1b9-93a7-9f58-f181-8ba3cfdd01fc-ada8afbe'
              className='w-layout-layout quick-stack-6 wf-layout-layout'
            >
              <div
                id='w-node-_07fac1b9-93a7-9f58-f181-8ba3cfdd01fd-ada8afbe'
                className='w-layout-cell cell-21'
              >
                <div className='text-block-9'>Private Sale</div>
              </div>
              <div
                id='w-node-_07fac1b9-93a7-9f58-f181-8ba3cfdd01fe-ada8afbe'
                className='w-layout-cell cell-11'
              >
                <div className='text-block-9'>10,000 MXNA</div>
              </div>
              <div
                id='w-node-_6ba19cda-370b-9edc-fee6-5c8be8676c00-ada8afbe'
                className='w-layout-cell'
              >
                <div className='text-block-9'>Total Amount</div>
              </div>
              <div
                id='w-node-_2ce2e092-ea14-0df6-b347-175eaf697faf-ada8afbe'
                className='w-layout-cell cell-12'
              >
                <div className='text-block-9'>{totalAmount} MXNA</div>
              </div>
              <div
                id='w-node-_836cf70a-0671-6992-bc8b-7c92f3b9471f-ada8afbe'
                className='w-layout-cell'
              >
                <div className='text-block-9'>--</div>
              </div>
              <div
                id='w-node-_79330b4c-aac6-8d58-107f-cfbe6122fac8-ada8afbe'
                className='w-layout-cell cell-20'
              >
                <div className='text-block-9'>--</div>
              </div>
              <div
                id='w-node-c70ccbce-f827-78ac-df6d-8020d82a5af0-ada8afbe'
                className='w-layout-cell'
              >
                <div className='text-block-9'>TGE Date</div>
              </div>
              <div
                id='w-node-_7b65cffe-b40f-a622-1928-8e65f58de237-ada8afbe'
                className='w-layout-cell cell-13'
              >
                <div className={isSetTge ? 'text-block-9' : 'text-block-11'}>
                  {tgeTime}
                </div>
              </div>
              <div
                id='w-node-_09233a01-2e4b-ed00-6ffe-36f8d1d8cd77-ada8afbe'
                className='w-layout-cell'
              >
                <div className='text-block-9'>TGE </div>
              </div>
              <div
                id='w-node-_31cbd509-8fcf-2d32-6466-b182493408e2-ada8afbe'
                className='w-layout-cell cell-14'
              >
                <div className='text-block-9'>{tgeAmount} MXNA</div>
              </div>
              <div
                id='w-node-f5a69537-d274-fbaf-6385-04443db33178-ada8afbe'
                className='w-layout-cell'
              >
                <div className='text-block-9'>Lockout period</div>
              </div>
              <div
                id='w-node-_2ef50c0b-81cf-a03d-eaf9-e843cd05c7a0-ada8afbe'
                className='w-layout-cell cell-15'
              >
                <div className='text-block-9'>{lockoutPeriod} weeks</div>
              </div>
              <div
                id='w-node-_77a897c3-dfb4-1494-9838-6c561c37f52d-ada8afbe'
                className='w-layout-cell'
              >
                <div className='text-block-9'>Subsequent Unlock (weekly)</div>
              </div>
              <div
                id='w-node-_89fe5700-5f8c-964b-3dbf-45364207fbdd-ada8afbe'
                className='w-layout-cell cell-16'
              >
                <div className={isSetTge ? 'text-block-9' : 'text-block-11'}>
                  {subsequentUnlock}
                </div>
              </div>
              <div
                id='w-node-c97016c3-07b7-3378-77d2-3bdcc28cd210-ada8afbe'
                className='w-layout-cell'
              >
                <div className='text-block-9'>--</div>
              </div>
              <div
                id='w-node-_7fb703f3-b957-b042-7427-c42724ee3375-ada8afbe'
                className='w-layout-cell cell-20'
              >
                <div className='text-block-9'>--</div>
              </div>
              <div
                id='w-node-cba22537-ca49-4414-6e2b-8650efb19d81-ada8afbe'
                className='w-layout-cell'
              >
                <div className='text-block-9'>Unlockable</div>
              </div>
              <div
                id='w-node-_97159a11-62f0-ccde-6e7f-37cf63d5013f-ada8afbe'
                className='w-layout-cell cell-17'
              >
                <div className='text-block-9'>{unlockable} MXNA</div>
              </div>
              <div
                id='w-node-_4a2baca8-41d8-1dde-1e86-c98ac3b6955d-ada8afbe'
                className='w-layout-cell'
              >
                <div className='text-block-9'>Total Claimed</div>
              </div>
              <div
                id='w-node-ae8eb7e2-0a3f-bfbd-eadc-d080ba98615d-ada8afbe'
                className='w-layout-cell cell-18'
              >
                <div className='text-block-9'>{totalClaimed} MXNA</div>
              </div>
              <div
                id='w-node-_023ff045-139b-6320-8b05-4d66f27a26db-ada8afbe'
                className='w-layout-cell'
              >
                <div className='text-block-9'>Remaining</div>
              </div>
              <div
                id='w-node-_3d9208e7-2f17-62e3-57bc-d279b63e2cd8-ada8afbe'
                className='w-layout-cell cell-19'
              >
                <div className='text-block-9'>{remaining} MXNA</div>
              </div>
            </div>
            <div className='w-layout-blockcontainer container-11 w-container'>
              <button
                className={`button-6 ${canClaim ? '' : 'button-off'} w-button`}
                onClick={handleClaim}
              >
                Claim
              </button>
            </div>
          </div>
        </section>
        <Footer />
        <WebFontLoader />
      </div>
      <ToastContainer />
    </>
  );
};

Claim.bodyClassName = 'claim-body';

export default Claim;
