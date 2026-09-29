import { useOutletContext, Link } from 'react-router-dom'
import Hero from '../components/Hero'
import About from '../components/About'
import Skills from '../components/Skills'
import ProjectCard from '../components/ProjectCard'
import ProductCard from '../components/ProductCard'
import Contact from '../components/Contact'
import { projects } from '../data/projects'
import { products } from '../data/products'

export default function Home() {
  const { darkMode, setSelectedItem } = useOutletContext()

  return (
    <>
      <Hero />

      {/* Cinematic Slide About Section */}
      <About darkMode={darkMode} />

      {/* Skills Preview */}
      <Skills />

      {/* Projects Section */}
      <section className="work section-pad" id="work" aria-label="Selected Projects">
        <div className="wrap">
          <div className="work-heading">
            <div>
              <div className="eyebrow">
                <span>03 / SELECTED WORK</span>
              </div>
              <h2>
                Made with<br />
                <em>intention.</em>
              </h2>
            </div>
            <div className="work-heading-right">
              <span className="work-count">
                A FEW THINGS<br />WE’VE BEEN MAKING
              </span>
              <Link to="/projects" className="work-view-all">
                VIEW ALL PROJECTS ↗
              </Link>
            </div>
          </div>

          <div className="project-grid">
            {projects.map((project) => (
              <ProjectCard
                key={project.id || project.number}
                project={project}
                onSelect={(item) => setSelectedItem(item)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section className="products section-pad" id="products" aria-label="Digital Products">
        <div className="wrap product-layout">
          <div className="product-aside">
            <div className="eyebrow">
              <span>04 / OUT IN THE WORLD</span>
            </div>
            <p>
              Little experiments.<br />
              Useful by design.
            </p>
            <div className="product-stamp">
              DUO<br />
              <span>GOODS</span>
              <i>✳</i>
            </div>
          </div>

          <div className="product-items">
            {products.map((product) => (
              <ProductCard
                key={product.id || product.number}
                product={product}
                onSelect={(item) => setSelectedItem(item)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <Contact />
    </>
  )
}
