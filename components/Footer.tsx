import React from 'react';
import {
  LocationMarkerIcon,
  ChartPieIcon,
  LockOpenIcon,
} from '@heroicons/react/solid';

interface Props {}

const Footer = (props: Props) => {
  return (
    <footer className="flex flex-col bg-purple-500 text-white  shadow-lg p-2">
      <div className="flex flex-wrap justify-center items-center">
        <p className="flex items-center p-2 space-x-1">
          <LocationMarkerIcon className="h-6 mr-2" />
          Cidades:{' '}
          <a
            href="https://servicodados.ibge.gov.br/api/docs"
            target="_blank"
            rel="noreferrer"
            className="underline"
          >
            IBGE
          </a>{' '}
        </p>
        <p className="flex items-center p-2 space-x-1">
          <ChartPieIcon className="h-6 mr-2" />
          Estatísticas:{' '}
          <a
            href="https://brasil.io"
            target="_blank"
            rel="noreferrer"
            className="underline"
          >
            Brasil.IO
          </a>
        </p>
      </div>

      <div className="flex flex-wrap justify-center items-center">
        <p className="flex items-center p-2 space-x-1">
          <LockOpenIcon className="h-6 mr-2" />
          GitHub:{' '}
          <a
            href="https://github.com/pablohen/covid"
            target="_blank"
            rel="noreferrer"
            className="underline"
          >
            pablohen
          </a>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
