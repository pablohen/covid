const site = `https://${process.env.VERCEL_URL}`;
const siteName = 'Estatísticas Covid-19 Brasil';
const description =
  'Veja as estatísticas da Covid-19 de cada município do Brasil';
const keywords =
  'Covid-19, estatísticas, Brasil, pablohen, next, react, js, tailwind, css';
const nextSeo = {
  defaultTitle: siteName,
  titleTemplate: `%s | ${siteName}`,
  description,
  keywords,
  openGraph: {
    type: 'website',
    locale: 'pt-BR',
    site_name: siteName,
    description,
    images: [
      {
        url: `${site}/logo.jpg`,
        width: 256,
        height: 256,
        alt: 'Covid-19',
      },
    ],
  },
};

export default nextSeo;
