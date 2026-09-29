function Arrow({ diagonal = false }) {
  return (
    <span aria-hidden="true" className="arrow">
      {diagonal ? '↗' : '→'}
    </span>
  )
}

export default function ProductCard({ product, onSelect }) {
  return (
    <article
      className="product-item"
      onClick={() => onSelect?.(product)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault()
          onSelect?.(product)
        }
      }}
      aria-label={`View ${product.title} product details`}
    >
      <span className="product-index-num">{product.number}</span>
      <div className="product-content">
        <small>{product.type}</small>
        <h3>{product.title}</h3>
        <p>{product.description}</p>
        {product.tags && (
          <div className="product-tags">
            {product.tags.map((t) => (
              <span key={t}>{t}</span>
            ))}
          </div>
        )}
      </div>
      <Arrow diagonal />
    </article>
  )
}
