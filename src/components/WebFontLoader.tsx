import { useEffect } from 'react';
import WebFont from 'webfontloader';

const WebFontLoader: React.FC = () => {
  useEffect(() => {
    WebFont.load({
      google: {
        families: [
          "Montserrat:100,100italic,200,200italic,300,300italic,400,400italic,500,500italic,600,600italic,700,700italic,800,800italic,900,900italic",
          "Exo:100,100italic,200,200italic,300,300italic,400,400italic,500,500italic,600,600italic,700,700italic,800,800italic,900,900italic",
          "Nunito Sans:regular,500,600,700,800,900:latin,latin-ext,vietnamese",
        ],
      },
    });
  }, []);

  return null;
};

export default WebFontLoader;
