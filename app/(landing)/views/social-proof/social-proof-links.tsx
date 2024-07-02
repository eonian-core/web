import { useLocalSocials } from '../../../socials'
import ExternalLink from '../../../components/links/external-link'
import styles from './social-proof.module.scss'

const SocialProofLinks: React.FC = () => {
  const socials = useLocalSocials()

  return <div>
    <ul className={`${styles.socialProofLinks}`}>
      {socials.map(({ name, href, icon }) => (
        <li key={name}>
          <ExternalLink href={href} icon={icon} />
        </li>
      ))}
    </ul>
  </div>
}

export default SocialProofLinks
