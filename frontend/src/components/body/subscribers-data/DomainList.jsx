export default function DomainList({ domains, onSetFilter }) {
  return (
    <div className="domain-list">
      <button
        className="domain-list__button reset"
        onClick={() => onSetFilter('')}
      >
        reset
      </button>
      {domains.map(domain => (
        <button
          key={domain}
          className="domain-list__button"
          onClick={() => onSetFilter(domain)}
        >
          {domain}
        </button>
      ))}
    </div>
  );
}
