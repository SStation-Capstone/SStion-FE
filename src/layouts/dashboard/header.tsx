import { Button, Drawer, Modal, message } from 'antd';
import Color from 'color';
import { CSSProperties, useState } from 'react';

import { IconButton, Iconify, SvgIcon } from '@/components/icon';
// import LocalePicker from '@/components/locale-picker';
// import { useSettings } from '@/store/settingStore';
import { useSettings } from '@/store/settingStore';
import { useResponsive, useThemeToken } from '@/theme/hooks';
import { Html5QrcodePlugin } from '@/utils/Html5QrcodePlugin';

import AccountDropdown from '../_common/account-dropdown';
import BreadCrumb from '../_common/bread-crumb';
import NoticeButton from '../_common/notice';
// import SettingButton from '../_common/setting-button';

import { HEADER_HEIGHT, NAV_COLLAPSED_WIDTH, NAV_WIDTH, OFFSET_HEADER_HEIGHT } from './config';
import Nav from './nav';

import { ThemeLayout } from '#/enum';

type Props = {
  className?: string;
  offsetTop?: boolean;
};
export default function Header({ className = '', offsetTop = false }: Props) {
  const [messageApi, contextHolder] = message.useMessage();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [showInfo, setShowInfo] = useState(false);
  const onNewScanResult = (decodedText: any) => {
    const newWindow =
      import.meta.env.MODE === 'development'
        ? window.open(`http://localhost:5173/#/checkout/${decodedText}`, '_blank')
        : window.open(`https://sstation-web.netlify.app/#/checkout/${decodedText}`, '_blank');
    if (newWindow) {
      newWindow.opener = null;
      onClose();
    } else {
      messageApi.open({
        type: 'error',
        content: 'The new tab could not be opened. Please check your browser settings.',
      });
    }
  };
  const onClose = async () => {
    setShowInfo(false);
  };
  const { themeLayout } = useSettings();
  const { colorBgElevated } = useThemeToken();
  const { screenMap } = useResponsive();

  const headerStyle: CSSProperties = {
    position: 'fixed',
    borderBottom: '',
    backgroundColor: Color(colorBgElevated).alpha(1).toString(),
  };

  if (screenMap.md) {
    headerStyle.right = '0px';
    headerStyle.left = 'auto';
    headerStyle.width = `calc(100% - ${
      themeLayout === ThemeLayout.Vertical ? NAV_WIDTH : NAV_COLLAPSED_WIDTH
    }px)`;
  } else {
    headerStyle.width = '100vw';
  }

  return (
    <>
      {contextHolder}
      <header className={`z-20 w-full ${className}`} style={headerStyle}>
        <div
          className="text-gray flex flex-grow items-center justify-between px-4 backdrop-blur xl:px-6 2xl:px-10"
          style={{
            height: offsetTop ? OFFSET_HEADER_HEIGHT : HEADER_HEIGHT,
            transition: 'height 200ms cubic-bezier(0.4, 0, 0.2, 1) 0ms',
          }}
        >
          <div className="flex items-baseline">
            <IconButton onClick={() => setDrawerOpen(true)} className="h-10 w-10 md:hidden">
              <SvgIcon icon="ic-menu" size="24" />
            </IconButton>
            <div className="hidden md:block">
              <BreadCrumb />
            </div>
          </div>

          <div className="flex">
            {/* <SearchBar /> */}
            {/* <LocalePicker /> */}
            {/* <IconButton onClick={() => window.open('https://github.com/d3george/slash-admin')}>
              <Iconify icon="mdi:github" size={24} />
            </IconButton> */}
            <IconButton onClick={() => setShowInfo(true)}>
              <Iconify icon="streamline:qr-code-solid" size={24} />
            </IconButton>
            <NoticeButton />
            {/* <SettingButton /> */}
            <AccountDropdown />
          </div>
        </div>
      </header>
      <Drawer
        placement="left"
        onClose={() => setDrawerOpen(false)}
        open={drawerOpen}
        closeIcon={false}
        headerStyle={{ display: 'none' }}
        bodyStyle={{ padding: 0, overflow: 'hidden' }}
        width="auto"
      >
        <Nav closeSideBarDrawer={() => setDrawerOpen(false)} />
      </Drawer>
      {showInfo && (
        <Modal
          title="Scan QR"
          open
          onCancel={() => onClose()}
          footer={[
            <Button key="back" onClick={onClose}>
              Cancel
            </Button>,
          ]}
          width={1000}
        >
          <Html5QrcodePlugin
            fps={10}
            qrbox={500}
            disableFlip={false}
            qrCodeSuccessCallback={onNewScanResult}
          />
        </Modal>
      )}
    </>
  );
}
