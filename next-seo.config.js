const site = `https://${process.env.VERCEL_URL}`;
const siteName = 'Estatísticas Covid-19';
const description = 'Estatísticas dos municípios do Brasi';
const keywords = 'Covid-19, pablohen, next, react, js, tailwind, css';
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
        url: `${site}/logo.png`,
        width: 320,
        height: 129,
        alt: 'Covid-19',
      },
    ],
  },
};

export default nextSeo;
