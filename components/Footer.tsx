import {
  LocationMarkerIcon,
  ChartPieIcon,
  LockOpenIcon,
  SunIcon,
} from '@heroicons/react/solid';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';
import FooterLink from './FooterLink';
import ToggleThemeButton from './ToggleThemeButton';

interface Props {}

const Footer = (props: Props) => {
  return (
    <footer className="flex flex-col bg-purple-500 dark:bg-gray-900 p-2">
      <div className="flex flex-wrap justify-center items-center">
        <FooterLink
          Icon={LocationMarkerIcon}
          link="https://servicodados.ibge.gov.br/api/docs"
          text="Cidades: IBGE"
        />

        <FooterLink
          Icon={ChartPieIcon}
          link="https://brasil.io"
          text="Estatísticas: Brasil.IO"
        />
      </div>

      <div className="flex flex-wrap justify-center items-center">
        <FooterLink
          Icon={LockOpenIcon}
          link="https://github.com/pablohen/covid"
          text="GitHub: pablohen"
        />

        <ToggleThemeButton />
      </div>
    </footer>
  );
};

export default Footer;
