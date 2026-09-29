export default function SectionTitle({ number, title, subtitle, accent = true }) {
  return (
    <div className="section-title-wrap">
      <div className="eyebrow">
        <span>{number}</span>
        {accent && <span className="eyebrow-dot" aria-hidden="true" />}
      </div>
      {title && (
        <h2 className="section-title-heading">
          {typeof title === 'string' && title.includes('<em>') ? (
            <span dangerouslySetInnerHTML={{ __html: title }} />
          ) : (
            title
          )}
        </h2>
      )}
      {subtitle && <p className="section-title-sub">{subtitle}</p>}
    </div>
  )
}
