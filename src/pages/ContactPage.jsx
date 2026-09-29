import Contact from '../components/Contact'

export default function ContactPage() {
  return (
    <div className="page-view contact-page">
      <div className="wrap page-header">
        <div className="eyebrow">
          <span>DUO® / GET IN TOUCH</span>
          <span className="eyebrow-dot" />
        </div>
        <h1 className="page-title">
          Let’s create something<br />
          <em>remarkable.</em>
        </h1>
        <p className="page-lead">
          We’re actively available for design systems, frontend architecture projects, and creative collaborations.
        </p>
      </div>

      <Contact />
    </div>
  )
}
