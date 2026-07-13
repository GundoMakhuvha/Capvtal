interface ToolLogoProps {
  name: string;
  icon: string;
}

const ToolLogo = ({ name, icon }: ToolLogoProps) => (
  <div className="tool-logo group" title={name}>
    <img
      src={icon}
      alt={name}
      className="h-8 w-8 object-contain opacity-60 group-hover:opacity-100 transition-opacity grayscale group-hover:grayscale-0"
    />
  </div>
);

export default ToolLogo;
