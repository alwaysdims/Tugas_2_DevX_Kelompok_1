import { useState } from 'react'

function Arrow({ diagonal = false }) {
  return (
    <span aria-hidden="true" className="arrow">
      {diagonal ? '↗' : '→'}
    </span>
  )
}

export default function Contact() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' })
  const [errors, setErrors] = useState({})
  const [submitted, setSubmitted] = useState(false)

  const validate = () => {
    const errs = {}
    if (!formData.name.trim()) {
      errs.name = 'Please enter your name.'
    }
    if (!formData.email.trim()) {
      errs.email = 'Please enter your email.'
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errs.email = 'Please provide a valid email address.'
    }
    if (!formData.message.trim()) {
      errs.message = 'Please share a brief message or project inquiry.'
    } else if (formData.message.trim().length < 10) {
      errs.message = 'Message must be at least 10 characters.'
    }
    return errs
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }))
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const validationErrors = validate()
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors)
    } else {
      setErrors({})
      setSubmitted(true)
    }
  }

  return (
    <section className="contact section-pad" id="contact" aria-label="Contact section">
      <div className="wrap contact-inner">
        <div className="eyebrow">
          <span>05 / HAVE SOMETHING IN MIND?</span>
          <span>WE’RE LISTENING</span>
        </div>

        <h2>
          Let’s make<br />
          <em>it matter.</em>
        </h2>

        <div className="contact-grid">
          <div className="contact-info-col">
            <p className="contact-desc">
              Whether you have an ambitious digital product in mind, need architectural frontend development, or simply want to connect with two curious makers — we’d love to talk.
            </p>
            <a className="contact-link" href="mailto:hello@duo.studio">
              hello@duo.studio <Arrow diagonal />
            </a>
            <div className="contact-locations">
              <span>LOCATED IN INDONESIA</span>
              <span>AVAILABLE WORLDWIDE · REMOTE</span>
            </div>
          </div>

          <div className="contact-form-col">
            {submitted ? (
              <div className="contact-success-box" role="status">
                <h3>Message Received ✳</h3>
                <p>
                  Thank you, <strong>{formData.name}</strong>. Your inquiry has been noted. We will get back to you shortly at <em>{formData.email}</em>.
                </p>
                <button
                  type="button"
                  className="contact-reset-btn"
                  onClick={() => {
                    setSubmitted(false)
                    setFormData({ name: '', email: '', message: '' })
                  }}
                >
                  SEND ANOTHER MESSAGE
                </button>
              </div>
            ) : (
              <form className="contact-form" onSubmit={handleSubmit} noValidate>
                <div className="form-group">
                  <label htmlFor="contact-name">NAME</label>
                  <input
                    id="contact-name"
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Your Name"
                    className={errors.name ? 'input-error' : ''}
                    aria-invalid={!!errors.name}
                    aria-describedby={errors.name ? 'name-error' : undefined}
                  />
                  {errors.name && (
                    <span id="name-error" className="error-text" role="alert">
                      {errors.name}
                    </span>
                  )}
                </div>

                <div className="form-group">
                  <label htmlFor="contact-email">EMAIL</label>
                  <input
                    id="contact-email"
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="name@domain.com"
                    className={errors.email ? 'input-error' : ''}
                    aria-invalid={!!errors.email}
                    aria-describedby={errors.email ? 'email-error' : undefined}
                  />
                  {errors.email && (
                    <span id="email-error" className="error-text" role="alert">
                      {errors.email}
                    </span>
                  )}
                </div>

                <div className="form-group">
                  <label htmlFor="contact-message">MESSAGE</label>
                  <textarea
                    id="contact-message"
                    name="message"
                    rows={4}
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Tell us about your project or idea..."
                    className={errors.message ? 'input-error' : ''}
                    aria-invalid={!!errors.message}
                    aria-describedby={errors.message ? 'message-error' : undefined}
                  />
                  {errors.message && (
                    <span id="message-error" className="error-text" role="alert">
                      {errors.message}
                    </span>
                  )}
                </div>

                <button type="submit" className="contact-submit-btn">
                  <span>SEND MESSAGE</span>
                  <Arrow diagonal />
                </button>
              </form>
            )}
          </div>
        </div>

        <div className="contact-bottom">
          <span>GOOD WORK STARTS WITH A CONVERSATION.</span>
          <a href="https://github.com" target="_blank" rel="noreferrer">
            GITHUB <Arrow diagonal />
          </a>
        </div>
      </div>
    </section>
  )
}
