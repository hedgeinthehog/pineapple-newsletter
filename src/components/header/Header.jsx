import Logo from './Logo';
import NavLink from './NavLink';
import navLinks from '../../helpers/nav-links';

export default function Header() {
  return (
    <header className="header">
      <Logo />
      <nav className="nav-bar">
        {/* loops over pre-defined navigation links stored in 'helpers/' */}
        {navLinks.map(({ title, to, id }) => {
          return (
            <NavLink key={id} className="nav-bar__item" title={title} to={to} />
          );
        })}
      </nav>
    </header>
  );
}
