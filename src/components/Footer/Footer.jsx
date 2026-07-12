import styles from './Footer.module.css';

const teamMembers = [
  {
    id: 1,
    name: 'Ana García',
    role: 'CEO & Fundadora',
    avatar: 'AG',
    linkedin: '#',
  },
  {
    id: 2,
    name: 'Carlos López',
    role: 'Director de Tecnología',
    avatar: 'CL',
    linkedin: '#',
  },
  {
    id: 3,
    name: 'María Rodríguez',
    role: 'Jefa de Diseño',
    avatar: 'MR',
    linkedin: '#',
  },
];

function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.companyInfo}>
          <h3 className={styles.footerLogo}>⚡ TechStore</h3>
          <p className={styles.description}>
            Tu tienda de tecnología de confianza. Ofrecemos los mejores productos
            electrónicos con envío rápido y garantía extendida.
          </p>
          <div className={styles.contactInfo}>
            <p>📍 Buenos Aires, Argentina</p>
            <p>📞 +54 11 1234-5678</p>
            <p>✉️ hola@techstore.com</p>
          </div>
        </div>

        <div className={styles.teamSection}>
          <h4 className={styles.teamTitle}>Nuestro Equipo</h4>
          <div className={styles.teamGrid}>
            {teamMembers.map((member) => (
              <div key={member.id} className={styles.memberCard}>
                <div className={styles.avatar}>{member.avatar}</div>
                <div className={styles.memberInfo}>
                  <strong>{member.name}</strong>
                  <span>{member.role}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className={styles.bottom}>
        <p>© 2024 TechStore. Todos los derechos reservados.</p>
      </div>
    </footer>
  );
}

export default Footer;
