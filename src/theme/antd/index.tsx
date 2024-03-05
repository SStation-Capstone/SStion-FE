import { StyleProvider } from '@ant-design/cssinjs';
import { ConfigProvider, theme } from 'antd';
import 'antd/dist/reset.css';

import {
  customThemeTokenConfig,
  themeModeToken,
  colorPrimarys,
  customComponentConfig,
} from './theme';

type Props = {
  children: React.ReactNode;
};
export default function AntdConfig({ children }: Props) {
  // const { themeMode, themeColorPresets } = useSettings();

  const algorithm = theme.defaultAlgorithm;
  const colorPrimary = colorPrimarys.default;

  return (
    <ConfigProvider
      // locale={language.antdLocal}
      theme={{
        token: { colorPrimary, ...customThemeTokenConfig, ...themeModeToken.light.token },
        components: { ...customComponentConfig, ...themeModeToken.light.components },
        algorithm,
      }}
    >
      {/* https://ant.design/docs/react/compatible-style-cn#styleprovider */}
      <StyleProvider hashPriority="high">{children}</StyleProvider>
    </ConfigProvider>
  );
}
