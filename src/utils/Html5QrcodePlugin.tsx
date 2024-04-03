import { Html5QrcodeScanner } from 'html5-qrcode';
import { useEffect } from 'react';

const qrcodeRegionId = 'html5qr-code-full-region';

const createConfig = (props: any) => {
  const config = {} as any;
  if (props.fps) {
    config.fps = props.fps;
  }
  if (props.qrbox) {
    config.qrbox = props.qrbox;
  }
  if (props.aspectRatio) {
    config.aspectRatio = props.aspectRatio;
  }
  if (props.disableFlip !== undefined) {
    config.disableFlip = props.disableFlip;
  }
  return config;
};

export function Html5QrcodePlugin(props: any) {
  useEffect(() => {
    // when component mounts
    const config = createConfig(props);
    // eslint-disable-next-line react/destructuring-assignment
    const verbose = props.verbose === true;
    // Suceess callback is required.
    // eslint-disable-next-line react/destructuring-assignment
    if (!props.qrCodeSuccessCallback) {
      // eslint-disable-next-line @typescript-eslint/no-throw-literal
      throw 'qrCodeSuccessCallback is required callback.';
    }
    const html5QrcodeScanner = new Html5QrcodeScanner(qrcodeRegionId, config, verbose);
    // eslint-disable-next-line react/destructuring-assignment
    html5QrcodeScanner.render(props.qrCodeSuccessCallback, props.qrCodeErrorCallback);

    // cleanup function when component will unmount
    return () => {
      html5QrcodeScanner.clear().catch((error: any) => {
        console.error('Failed to clear html5QrcodeScanner. ', error);
      });
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <div id={qrcodeRegionId} />;
}
