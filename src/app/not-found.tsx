import Link from "next/link";

export default function NotFound() {
  return (
    <main className="container narrow nf" id="main">
      <p className="mono eyebrow">
        <span className="amber">404</span> / NOT FOUND
      </p>
      <h1>That page is not here.</h1>
      <p className="body-lg">Try the home page or the peers edition.</p>
      <div className="cta-row">
        <Link className="btn" href="/">
          Home
        </Link>
        <Link className="btn ghost" href="/peers/">
          Peers edition
        </Link>
      </div>
    </main>
  );
}
