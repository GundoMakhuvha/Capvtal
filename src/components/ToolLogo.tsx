interface ToolLogoProps {
  name: string;
  icon: string;
}

const ToolLogo = ({ name, icon }: ToolLogoProps) => (
  <div className="tool-logo group" title={name}>
    <img
      src={icon}
      alt={`${name} logo`}
      width={36}
      height={36}
      loading="lazy"
      decoding="async"
      className="h-8 w-8 object-contain opacity-70 grayscale transition-all duration-500 group-hover:opacity-100 group-hover:grayscale-0 md:h-9 md:w-9"
    />
    <span className="line-clamp-2 text-center text-[10px] font-medium leading-tight text-muted-foreground md:text-[11px]">{name}</span>
  </div>
);

export default ToolLogo;
