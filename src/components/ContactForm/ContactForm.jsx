import { useState } from 'react';
import styles from './ContactForm.module.css';

const initialState = {
  nombre: '',
  email: '',
  asunto: '',
  mensaje: '',
};

function ContactForm() {
  const [form, setForm] = useState(initialState);
  const [enviado, setEnviado] = useState(false);
  const [errors, setErrors] = useState({});

  const validar = () => {
    const newErrors = {};
    if (!form.nombre.trim()) newErrors.nombre = 'El nombre es requerido';
    if (!form.email.trim()) {
      newErrors.email = 'El email es requerido';
    } else if (!/\S+@\S+\.\S+/.test(form.email)) {
      newErrors.email = 'El email no es válido';
    }
    if (!form.asunto.trim()) newErrors.asunto = 'El asunto es requerido';
    if (!form.mensaje.trim()) newErrors.mensaje = 'El mensaje es requerido';
    return newErrors;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = validar();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    setEnviado(true);
    setForm(initialState);
  };

  if (enviado) {
    return (
      <div className={styles.success}>
        <span>✅</span>
        <h3>¡Mensaje enviado!</h3>
        <p>Nos pondremos en contacto a la brevedad.</p>
        <button onClick={() => setEnviado(false)} className={styles.btnReset}>
          Enviar otro mensaje
        </button>
      </div>
    );
  }

  return (
    <section className={styles.section}>
      <h2 className={styles.titulo}>Contactanos</h2>
      <p className={styles.subtitulo}>
        ¿Tenés alguna consulta sobre nuestros productos? Escribinos.
      </p>
      <form onSubmit={handleSubmit} className={styles.form} noValidate>
        <div className={styles.row}>
          <div className={styles.field}>
            <label htmlFor="nombre">Nombre</label>
            <input
              type="text"
              id="nombre"
              name="nombre"
              value={form.nombre}
              onChange={handleChange}
              placeholder="Tu nombre completo"
              className={errors.nombre ? styles.inputError : ''}
            />
            {errors.nombre && <span className={styles.error}>{errors.nombre}</span>}
          </div>
          <div className={styles.field}>
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="tu@email.com"
              className={errors.email ? styles.inputError : ''}
            />
            {errors.email && <span className={styles.error}>{errors.email}</span>}
          </div>
        </div>
        <div className={styles.field}>
          <label htmlFor="asunto">Asunto</label>
          <input
            type="text"
            id="asunto"
            name="asunto"
            value={form.asunto}
            onChange={handleChange}
            placeholder="¿En qué podemos ayudarte?"
            className={errors.asunto ? styles.inputError : ''}
          />
          {errors.asunto && <span className={styles.error}>{errors.asunto}</span>}
        </div>
        <div className={styles.field}>
          <label htmlFor="mensaje">Mensaje</label>
          <textarea
            id="mensaje"
            name="mensaje"
            value={form.mensaje}
            onChange={handleChange}
            placeholder="Escribí tu mensaje aquí..."
            rows={5}
            className={errors.mensaje ? styles.inputError : ''}
          />
          {errors.mensaje && <span className={styles.error}>{errors.mensaje}</span>}
        </div>
        <button type="submit" className={styles.btnSubmit}>
          Enviar mensaje ✉️
        </button>
      </form>
    </section>
  );
}

export default ContactForm;
