# Dominion-Luxury Apartments — Site Audit

## Scope and verified local changes

Inspected the eight local pages, shared CSS and JavaScript, the sitemap, robots file, contact form, maps, gallery, and existing image assets.

- Kept the established Dominion design; no MOJO-style redesign was introduced.
- Removed unverified homepage testimonials, rating figures, and review counts. The concierge now identifies itself as scripted help, does not request/store a visitor's name, and links review requests to the Google Maps property search rather than pretending to submit feedback.
- Confirmed daily rates are GHS 450 for a studio and GHS 600 for a one-bedroom. Removed the unconfirmed monthly amount and six-month advance term; monthly rates are enquiry-only.
- Updated contact and FAQ copy to match the confirmed daily rates.
- Replaced the previous plus-code location with owner-supplied coordinates (5.644609640587883, -0.043361395659025616) in local maps, map links, and homepage structured data.
- Added the owner-provided Google listing bedroom photo to the Apartments gallery and homepage. The homepage Open Graph and Twitter previews use this local property photo.
- Kept imagery local to the project; no Unsplash, Pinterest, stock, or generated images were added. Replaced the homepage's two misleading `pool-photo-10.jpg` placements with existing owner-provided bedroom images, and corrected gallery captions and alt text to describe the actual rooms shown.
- Made social preview image URLs absolute, removed the lightbox's empty image source, prevented duplicated carousel buttons from entering the keyboard tab order, added reduced-motion gallery behavior, and made the photo viewer keyboard accessible with focus restoration.
- Removed an unverified neighbourhood rating and travel-time estimates. Location destinations now open Google Maps directions.
- Removed an unverified guest-count maximum, improved whitespace validation and invalid-date focus, and stopped automatically opening WhatsApp after a failed form request.
- Removed unverified facility and amenity claims from the Apartments page and structured data. Visitors are asked to confirm facility availability directly rather than being promised a pool, parking, Wi-Fi, backup power, parties, or 24/7 utilities.
- Updated the enquiry flow to leave FormSubmit's CAPTCHA protection enabled by default and require an explicit successful JSON response before showing the thank-you page.
- Added a contact-form notice explaining the FormSubmit data path and that the form is not a booking confirmation. Removed an unverified response-time promise.
- Added a linked privacy notice describing the form fields, FormSubmit's documented 30-day archive retention, WhatsApp's prefilled message behavior, and third-party maps/font requests.
- Preserved pre-existing image deletions and other unrelated worktree changes.

## Local verification performed

- `node --check script.js` and `git diff --check` passed.
- All eight HTML routes returned HTTP 200 in local browser checks. All eight showed no horizontal overflow at 320, 375, 768, or 1280 CSS pixels; all page images loaded and had alt attributes. The empty lightbox image has no `src` until opened.
- Mobile navigation opened, focused the first link, and Escape returned focus to the toggle. FAQ accordion expanded and updated its state.
- Reduced-motion mode showed a static, non-duplicated gallery. The photo dialog opened by keyboard, kept focus within the dialog, closed on Escape, and restored focus.
- Form tests used mocked fetch only: missing/whitespace input was rejected, the WhatsApp link included entered details, a simulated network failure preserved the WhatsApp fallback, an explicit provider success response reached the thank-you page, and an HTTP 200 response marked unsuccessful did not. No real enquiry or email was sent.
- Local SEO metadata checks confirmed canonical tags on indexable pages and absolute social image URLs. Local sitemap XML and JavaScript syntax were checked.
- No package manifest or configured build, lint, test, analytics, or Lighthouse runner was found.

## Production comparison and remaining work

- **Production is not in sync with this worktree.** The live homepage still shows the old rating and testimonials; the live Apartments page still publishes GHS 10,000/month and the six-month advance requirement; the live Contact page still says rates are unpublished and shows the old plus code.
- The live `robots.txt` currently points to `https://www.dominionluxuryapartments.com/sitemap.xml`, a different domain from the configured canonical domain. The local robots file points to the configured domain.
- `https://dominionluxuryapartment.com/sitemap.xml` currently returns HTTP 404. A non-existent production URL returned HTTP 404; the production error status is therefore working.
- Real FormSubmit email delivery and provider response behavior have not been verified. Client-side checks are not server-side validation; verify the live form without sending real visitor data before relying on it.
- Analytics/Search Console ownership, accessibility audit tooling, and measured performance scores remain unverified.
- The owner confirmed the direct coordinates (5.644609640587883, -0.043361395659025616) as authoritative despite the slightly different Google Maps listing pin.
- Monthly rates/payment terms and guest capacity still need owner confirmation before being represented as confirmed facts.
- Changes are local and uncommitted; none have been deployed. GitHub CLI is not authenticated in this environment.

## Readiness

**LOCAL WORK COMPLETE; PRODUCTION NOT UPDATED.** The live site still has the old ratings/review copy and unconfirmed monthly pricing/terms, its robots file points to a different domain, and its sitemap returns 404. Publishing requires the owner's review and approval, GitHub authentication, fixing production crawler configuration, and a real FormSubmit delivery check.
