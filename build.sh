#!/usr/bin/env sh
set -eu

rm -rf dist
mkdir -p dist

cp \
  index.html \
  impressum.html \
  datenschutz.html \
  404.html \
  styles.css \
  base.css \
  sections.css \
  responsive.css \
  logo.css \
  legal.css \
  app.js \
  favicon.svg \
  manifest.webmanifest \
  _headers \
  _redirects \
  robots.txt \
  sitemap.xml \
  dist/

echo "Static site prepared in dist/"
