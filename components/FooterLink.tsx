interface Props {
  Icon?: any;
  link: string;
  text: string;
}

const FooterLink = ({ Icon, link, text }: Props) => {
  return (
    <a href={link} target="_blank" rel="noreferrer" className="p-2">
      <p className="flex items-center p-1 px-2 border border-white rounded-full text-white transform transition-all duration-150 ease-in-out hover:bg-purple-400">
        {Icon && <Icon className="h-6 mr-2" />}
        {text}
      </p>
    </a>
  );
};

export default FooterLink;
