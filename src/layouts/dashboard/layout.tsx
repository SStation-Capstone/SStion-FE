import { useScroll } from 'framer-motion';
import { Suspense, useCallback, useEffect, useRef, useState } from 'react';
import styled from 'styled-components';

import { CircleLoading } from '@/components/loading';
import ProgressBar from '@/components/progress-bar';
// import { useSettings } from '@/store/settingStore';
import { useThemeToken } from '@/theme/hooks';

import Header from './header';
import Nav from './nav';

import { ThemeMode } from '#/enum';

// eslint-disable-next-line react/prop-types
function Layout({ Component }: any) {
  const { colorTextBase } = useThemeToken();
  // const { themeLayout, themeMode } = useSettings();

  const mainEl = useRef(null);
  const { scrollY } = useScroll({ container: mainEl });
  /**
   * y轴是否滚动
   */
  const [offsetTop, setOffsetTop] = useState(false);
  const onOffSetTop = useCallback(() => {
    scrollY.on('change', (scrollHeight) => {
      if (scrollHeight > 0) {
        setOffsetTop(true);
      } else {
        setOffsetTop(false);
      }
    });
  }, [scrollY]);

  useEffect(() => {
    onOffSetTop();
  }, [onOffSetTop]);

  const verticalLayout = (
    <>
      <Header offsetTop={offsetTop} />
      <div className="z-50 hidden h-full flex-shrink-0 md:block">
        <Nav />
      </div>
      {/* <Main ref={mainEl} offsetTop={offsetTop} /> */}
      <main
        className="flex overflow-auto"
        style={{
          paddingTop: '112px',
          transition: 'padding 200ms cubic-bezier(0.4, 0, 0.2, 1) 0ms',
          width: '100vw',
        }}
      >
        <div className="m-auto h-full w-full flex-grow sm:p-2 xl:max-w-screen-xl">{Component}</div>
      </main>
    </>
  );

  // const horizontalLayout = (
  //   <div className="relative flex flex-1 flex-col">
  //     <Header />
  //     <NavHorizontal />
  //     <Main ref={mainEl} offsetTop={offsetTop} />
  //   </div>
  // );

  const layout = verticalLayout;

  return (
    <StyleWrapper $themeMode={ThemeMode.Light}>
      <ProgressBar />

      <div
        className="flex h-screen overflow-hidden"
        style={{
          color: colorTextBase,
          background: '#EB1111',
          transition:
            'color 200ms cubic-bezier(0.4, 0, 0.2, 1) 0ms, background 150ms cubic-bezier(0.4, 0, 0.2, 1) 0ms',
        }}
      >
        <Suspense fallback={<CircleLoading />}>{layout}</Suspense>
      </div>
    </StyleWrapper>
  );
}
export default Layout;

const StyleWrapper = styled.div<{ $themeMode?: ThemeMode }>`
  /* 设置滚动条的整体样式 */
  ::-webkit-scrollbar {
    width: 8px; /* 设置滚动条宽度 */
  }

  /* 设置滚动条轨道的样式 */
  ::-webkit-scrollbar-track {
    border-radius: 8px;
    background: ${(props) => (props.$themeMode === ThemeMode.Dark ? '#2c2c2c' : '#FAFAFA')};
  }

  /* 设置滚动条滑块的样式 */
  ::-webkit-scrollbar-thumb {
    border-radius: 10px;
    background: ${(props) => (props.$themeMode === ThemeMode.Dark ? '#6b6b6b' : '#C1C1C1')};
  }

  /* 设置鼠标悬停在滚动条上的样式 */
  ::-webkit-scrollbar-thumb:hover {
    background: ${(props) => (props.$themeMode === ThemeMode.Dark ? '#939393' : '##7D7D7D')};
  }
`;
