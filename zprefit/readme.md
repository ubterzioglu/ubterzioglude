# ZPREFIT

Single-page, static preview tool to see how your image will look on social platforms before uploading.

## MVP
- LinkedIn — Banner (desktop + mobile approx)
- Drag to reposition
- Zoom + Fit/Fill
- Safe zone overlay (+ mobile emphasis)
- No storage, no cookies, no network

## Run
Open `zprefit.html` in your browser.

## Add a new template
1) Create a file under `templates/` (e.g. `instagram.js`)
2) Push a template object into `window.ZPREFIT_TEMPLATES`
3) Include the new script in `zprefit.html` before `app.js`

Example:
```html
<script src="./templates/instagram.js"></script>
<script src="./app.js"></script>
