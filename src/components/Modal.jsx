import { useEffect } from 'react'

export default function Modal({ item, onClose }) {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        onClose()
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    document.body.style.overflow = 'hidden'

    return () => {
      window.removeEventListener('keydown', handleKeyDown)
      document.body.style.overflow = ''
    }
  }, [onClose])

  if (!item) return null

  return (
    <div
      className="modal-backdrop"
      role="presentation"
      onClick={onClose}
    >
      <section
        className="project-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          className="modal-close"
          onClick={onClose}
          aria-label="Close dialog"
        >
          ×
        </button>

        {item.image && (
          <img
            src={item.image}
            alt={`${item.title} detail visual`}
            className="modal-img"
          />
        )}

        <div className="modal-content">
          <div className="modal-header-meta">
            <span className="project-type">
              {item.type || item.category} {item.year ? `· ${item.year}` : ''}
            </span>
            {item.role && <span className="modal-role">{item.role}</span>}
          </div>

          <h2 id="modal-title">{item.title}</h2>
          <p>{item.description}</p>

          {(item.tags || item.technologies) && (
            <div className="modal-tags">
              {(item.tags || item.technologies).map((tag) => (
                <span key={tag}>{tag}</span>
              ))}
            </div>
          )}

          {item.link && item.link !== '#' && (
            <a
              href={item.link}
              target="_blank"
              rel="noreferrer"
              className="modal-link-btn"
            >
              VISIT PROJECT ↗
            </a>
          )}
        </div>
      </section>
    </div>
  )
}
