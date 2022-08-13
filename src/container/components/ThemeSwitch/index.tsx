import { Switch } from 'antd';
import { useThemeSwitcher } from 'react-css-theme-switcher';

import { Theme } from '../../../_shared/enums';

import s from './s.module.scss';

type ThemeSwitchProps = JSX.IntrinsicAttributes &
  React.ClassAttributes<HTMLDivElement> &
  React.HTMLAttributes<HTMLDivElement>;

const ThemeSwitch = (props: ThemeSwitchProps): JSX.Element => {
  const { currentTheme, switcher: setTheme } = useThemeSwitcher();

  const isDarkThemeEnabled: boolean = currentTheme === Theme.Dark;

  const toggleTheme = (): void => {
    const nextTheme: Theme =
      currentTheme === Theme.Dark ? Theme.Light : Theme.Dark;
    localStorage.setItem('theme', nextTheme);
    setTheme({ theme: nextTheme });
  };

  return (
    <div {...props}>
      <span className={isDarkThemeEnabled ? s.iconDisabled : s.iconEnabled}>
        &#9728;
      </span>
      <Switch
        className={s.switch}
        checked={isDarkThemeEnabled}
        onClick={toggleTheme}
        size="small"
      />
      <span className={!isDarkThemeEnabled ? s.iconDisabled : s.iconEnabled}>
        &#127762;
      </span>
    </div>
  );
};

export default ThemeSwitch;
