import { Link } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa";

export default function NotFound() {
  return (
    <div className="nf-page">
      <div className="nf-inner">
        {/* Big typographic 404 */}
        <div className="nf-code-wrap">
          <span className="nf-four nf-four-l">4</span>
          <span className="nf-zero">0</span>
          <span className="nf-four nf-four-r">4</span>
        </div>

        {/* Ruled divider */}
        <div className="nf-rule" />

        <p className="nf-eyebrow">Page not found</p>

        <h2 className="nf-headline">
          Even the best text tools
          <br />
          can't find what isn't there.
        </h2>

        <p className="nf-sub">
          The page you're looking for doesn't exist, was moved, or perhaps was
          removed by an overzealous "Remove Extra Spaces" pass.
        </p>

        <div className="nf-actions">
          <Link to="/" className="nf-btn-primary">
            Back to editor <FaArrowRight size={12} />
          </Link>
          <Link to="/tools" className="nf-btn-ghost">
            Browse tools
          </Link>
        </div>

        {/* Decorative oversized ghost text */}
        <div className="nf-ghost-text" aria-hidden="true">
          NOT FOUND
        </div>
      </div>
    </div>
  );
}
