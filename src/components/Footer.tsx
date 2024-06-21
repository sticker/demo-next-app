import React from 'react';

const Footer: React.FC = () => {
  return (
    <section className='footer-dark'>
      <div className='container-8'>
        <div className='footer-wrapper'>
          <a href='#' className='footer-brand w-inline-block'>
            <img
              src='images/アセット-22x.png'
              loading='lazy'
              width='189'
              sizes='(max-width: 479px) 62vw, 189px'
              alt=''
              srcSet='images/アセット-22x-p-500.png 500w, images/アセット-22x-p-800.png 800w, images/アセット-22x-p-1080.png 1080w, images/アセット-22x-p-1600.png 1600w, images/アセット-22x-p-2000.png 2000w, images/アセット-22x.png 2414w'
              className="image-26"
            />
          </a>
          <div className='footer-content'>
            <div
              id='w-node-fa7f236a-4cad-8572-9cb4-4e6ae14a4f72-0872730a'
              className='footer-block'
            >
              <a href='#' className='footer-link'>
                Terms &amp; Conditions
              </a>
              <a href='#' className='footer-link'>
                Privacy policy
              </a>
            </div>
          </div>
        </div>
      </div>
      <div className='footer-divider'></div>
      <div className='footer-copyright-center'>Copyright 2024 Meta-X</div>
    </section>
  );
};

export default Footer;
