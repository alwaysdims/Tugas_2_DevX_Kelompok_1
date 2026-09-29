import { useOutletContext, Link } from 'react-router-dom'
import ProductCard from '../components/ProductCard'
import { products } from '../data/products'

export default function ProductsPage() {
  const { setSelectedItem } = useOutletContext()

  return (
    <div className="page-view products-page">
      <div className="wrap page-header">
        <div className="eyebrow">
          <span>DUO® / DIGITAL GOODS</span>
          <span className="eyebrow-dot" />
        </div>
        <h1 className="page-title">
          Useful tools &<br />
          <em>open experiments.</em>
        </h1>
        <p className="page-lead">
          Design assets, developer resources, and field guides built during our explorations in creative web engineering.
        </p>
      </div>

      <section className="products-archive section-pad wrap">
        <div className="products-grid-editorial">
          {products.map((product) => (
            <ProductCard
              key={product.id || product.number}
              product={product}
              onSelect={(p) => setSelectedItem(p)}
            />
          ))}
        </div>

        <div className="about-cta-bar" style={{ marginTop: '90px' }}>
          <span>INTERESTED IN COLLABORATING ON A NEW TOOL?</span>
          <Link to="/contact" className="about-cta-btn">
            REACH OUT →
          </Link>
        </div>
      </section>
    </div>
  )
}
