import { Link } from 'react-router-dom'

export default function NotFound() {
  return (
    <div className="page-view not-found-page wrap section-pad">
      <div className="eyebrow">
        <span>ERROR 404 / NOT FOUND</span>
        <span className="eyebrow-dot" />
      </div>
      <h1 className="not-found-code">404</h1>
      <h2 className="not-found-title">
        The canvas you’re looking for<br />
        <em>does not exist.</em>
      </h2>
      <p className="not-found-sub">
        The page may have been relocated, archived, or is still being sketched into reality.
      </p>
      <Link to="/" className="not-found-home-btn">
        RETURN TO HOME →
      </Link>
    </div>
  )
}
