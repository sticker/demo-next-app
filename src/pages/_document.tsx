import Document, {
  Html,
  Head,
  Main,
  NextScript,
  DocumentContext,
  DocumentInitialProps,
} from 'next/document';
import React from 'react';
import Script from 'next/script';

interface MyDocumentProps extends DocumentInitialProps {
  bodyClassName?: string;
}

class MyDocument extends Document<MyDocumentProps> {
  static async getInitialProps(ctx: DocumentContext) {
    const originalRenderPage = ctx.renderPage;
    let bodyClassName = 'body';

    ctx.renderPage = () =>
      originalRenderPage({
        enhanceApp: (App: any) => {
          return function EnhanceApp(props: any) {
            bodyClassName = (props.Component as any).bodyClassName || 'body';
            return <App {...props} />;
          };
        },
      });

    const initialProps = await Document.getInitialProps(ctx);
    return { ...initialProps, bodyClassName };
  }

  render() {
    const { bodyClassName } = this.props;
    return (
      <Html lang='en'>
        <Head>
          <link rel='stylesheet' href='/css/normalize.css' />
          <link rel='stylesheet' href='/css/webflow.css' />
          <link rel='stylesheet' href='/css/dm-design-01.webflow.css' />
          <link rel='shortcut icon' href='/images/favicon.ico' />
          <link rel='apple-touch-icon' href='/images/webclip.png' />
        </Head>
        <body className={bodyClassName}>
          <Main />
          <NextScript />
          <Script
            id='mod-script'
            strategy='beforeInteractive'
            dangerouslySetInnerHTML={{
              __html: `!function(o,c){var n=c.documentElement,t=" w-mod-";n.className+=t+"js",("ontouchstart"in o||o.DocumentTouch&&c instanceof DocumentTouch)&&(n.className+=t+"touch")}(window,document);`,
            }}
          />
          <Script
            src='https://d3e54v103j8qbb.cloudfront.net/js/jquery-3.5.1.min.dc5e7f18c8.js'
            strategy='beforeInteractive'
          />
          <script src="https://cdn.jsdelivr.net/npm/eruda"></script>
          <script>eruda.init();</script>
        </body>
      </Html>
    );
  }
}

export default MyDocument;
