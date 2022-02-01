import SocialLink from './SocialLink';
import socialLinks from '../../helpers/social-links';

export default function SocialLinksBar() {
  return (
    <div className="social-links__wrapper">
      {/* loops over pre-defined social links stored in 'helpers/' */}
      {socialLinks.map(({ icon, to, id }) => {
        return (
          <SocialLink
            key={id}
            className={`${id} social-links__item`}
            icon={icon}
            to={to}
          />
        );
      })}
    </div>
  );
}
