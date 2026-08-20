type CapabilityHeaderProps = {
  id: string;
  title: string;
  promise: string;
};

export default function CapabilityHeader({
  id,
  title,
  promise,
}: CapabilityHeaderProps) {
  return (
    <header className="scc-header">
      <p className="scc-header__number">
        <span className="scc-header__index">{id}</span>
      </p>
      <h3 className="scc-header__title">{title}</h3>
      <p className="scc-header__promise">{promise}</p>
    </header>
  );
}
