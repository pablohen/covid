const site = `https://${process.env.VERCEL_URL}`;
const siteName = 'Estatísticas Covid-19 Brasil';
const description = 'Veja as estatísticas da Covid-19 de cada cidade do Brasil';
const nextSeo = {
  defaultTitle: siteName,
  titleTemplate: `%s | ${siteName}`,
  description,
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
