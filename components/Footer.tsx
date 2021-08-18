import React from 'react';

interface Props {}

const Footer = (props: Props) => {
  return (
    <footer className="flex flex-col bg-purple-500 text-white  shadow-lg p-2">
      <div className="flex flex-wrap justify-center items-center">
        <p className="p-2">
          Base de municípios:{' '}
          <a
            href="https://servicodados.ibge.gov.br/api/docs"
            target="_blank"
            rel="noreferrer"
            className="underline"
          >
            IBGE
          </a>{' '}
        </p>
        <p className="p-2">
          Dados estatísticos:{' '}
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
        <p className="p-2">
          Projeto no GitHub:{' '}
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
