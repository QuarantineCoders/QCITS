# Template for generating service pages
generate_service() {
  local file=$1 title=$2 icon=$3 tag=$4 desc=$5 longdesc=$6 features=$7 stack=$8 process=$9
  cat > "/home/claude/qcits/services/${file}" << EOF
<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8"/>
  <meta name="viewport" content="width=device-width,initial-scale=1"/>
  <title>${title} — QCITS</title>
  <meta name="description" content="${desc}"/>
  <link rel="stylesheet" href="../css/style.css"/>
  <link rel="preconnect" href="https://fonts.googleapis.com"/>
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin/>
</head>
<body>
<nav id="main-nav"></nav>
<div class="mobile-menu" id="mobile-menu"></div>
<div class="page-hero">
  <div class="page-hero-tag">${tag}</div>
  <h1>${title}</h1>
  <p>${desc}</p>
</div>
<section>
  <div class="section-inner">
    <div class="service-detail-grid">
      <div class="reveal">
        <div class="section-eyebrow">What's Included</div>
        <h2 class="section-title" style="font-size:1.6rem;">${title}</h2>
        <p style="color:var(--text-secondary);font-size:0.9rem;line-height:1.8;margin-bottom:1.5rem;">${longdesc}</p>
        <ul class="service-feature-list">${features}</ul>
        <div class="service-tech-box">
          <h4>Technologies & Tools</h4>
          <div class="tech-tags">${stack}</div>
        </div>
      </div>
      <div class="reveal">
        <div class="section-eyebrow">Our Process</div>
        <h2 class="section-title" style="font-size:1.6rem;">How we <span>work</span></h2>
        <div class="process-steps">${process}</div>
        <div style="margin-top:2rem;background:var(--bg-card);border:1px solid var(--border);border-radius:var(--radius);padding:1.5rem;">
          <p style="font-size:0.85rem;color:var(--text-secondary);line-height:1.7;margin-bottom:1.1rem;">Ready to get started with ${title}? Let's talk about your project.</p>
          <a class="btn btn-primary" href="../contact.html">Request a Quote →</a>
        </div>
      </div>
    </div>
  </div>
</section>
<section style="background:var(--bg-surface);border-top:1px solid var(--border);text-align:center;padding:3rem 2rem;">
  <div class="section-inner">
    <p style="font-family:var(--font-mono);font-size:0.72rem;color:var(--text-muted);text-transform:uppercase;letter-spacing:0.1em;margin-bottom:0.5rem;">More Services</p>
    <a class="btn btn-outline" href="../services.html">← All Services</a>
  </div>
</section>
<footer id="main-footer"></footer>
<script src="../js/main.js"></script>
<script>
  initNav('services.html');
  initFooter();
</script>
</body>
</html>
EOF
}
