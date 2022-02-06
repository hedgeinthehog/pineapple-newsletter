export default function NavLink({ title, to, className }) {
  return (
    <a className={className} href={to}>
      {title}
    </a>
  );
}
