export default function SocialLink({ icon, to, className }) {
  return (
    <a className={className} href={to}>
      <div className="icon">
        <i className={icon}></i>
      </div>
    </a>
  );
}
