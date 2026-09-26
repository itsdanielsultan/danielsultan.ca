# Future Mississauga visual-language refresh

Date: 26 September 2026.

## Source and implementation

- Reference: https://futuremississauga.com/, captured at `../../artifacts/future-mississauga-refresh-2026-09-26/future-mississauga-reference.png`.
- Implementation: local six-page static website at port 4216.
- Desktop screenshot: `../../artifacts/future-mississauga-refresh-2026-09-26/homepage-desktop-final.png`.
- Full comparison: `../../artifacts/future-mississauga-refresh-2026-09-26/reference-comparison.png` (reference left, implementation right).
- Both desktop captures are 1280 × 720 pixels, 1280 × 720 CSS pixels, 1× density. No density normalization needed. Comparison canvas: 2560 × 720.
- State: top of homepage, light theme, navigation closed. The personal site's copy and navigation intentionally differ; the request was a shared design language, not a clone.
- Mobile proof: `../../artifacts/future-mississauga-refresh-2026-09-26/homepage-mobile-final.png`, 390 × 844, light theme. Other page captures are named `<page>-<width>-light-final.png` in the same artifact folder.
- Individual desktop and mobile views were also opened at readable size. No additional cropped typography comparison was needed.

## Findings and iteration history

1. P2: the existing `.page-head p` selector overrode the small eyebrow size. Fixed with `.page-head .eyebrow`; confirmed in the final mobile evidence and course screenshots.
2. P2: compressed heading spacing and the removed mobile line break visually joined words. Relaxed heading tracking, added word spacing and retained the deliberate two-line homepage heading. Confirmed in `homepage-mobile-final.png` and `mobile-review.png`.
3. Some batch screenshots were captured before decoded images were painted. These were not treated as evidence of successful image rendering. The homepage was recaptured after a separate state check; its real atlas image is visibly present in `homepage-mobile-final.png`. The course screenshot in `mobile-review.png` visibly shows its dashboard. No blank placeholder was introduced.

## Required surfaces

- Typography: Manrope display and DM Sans text match the source families; lighter display weights replace the former heavy condensed face. Desktop and mobile titles wrap without clipping.
- Spacing/layout: paired editorial introduction, broad project image, thin separators and simple aligned rows. Existing page routes, employer logos and selective project photographs remain. Phone navigation retains 44px controls.
- Colour/tokens: source paper #f8f8f3, ink #192b31, muted #627074 and rose #c47d88. Small accent text uses darker #965261 on light paper. Dark mode has coordinated blue-black surfaces and readable pale text rather than merely inverting images.
- Image quality: the homepage and portfolio use the actual 1600px-wide atlas render. Existing Synapse top-down photo and course screenshot remain. The promotional social card is explicitly documented as a generated composition, not model evidence, and has no portrait.
- Copy: both current projects are prominent; the Reddit launch and research are linked. Future Mississauga is described as independent and ongoing, with proposed and uncertain geometry qualified. Existing résumé, job descriptions and other project content are preserved.

## Functional checks

- All six routes checked at 390, 768 and 1280 CSS pixels in both themes. No horizontal overflow or duplicate H1s.
- Visible image resources load; local links, asset paths and fragment targets pass the static check. No duplicate IDs.
- Hamburger opens and closes; Escape closes it; selecting a page closes it. Theme persists across navigation.
- Hover motion on the theme control remains disabled. Existing copy-email and mail links are retained unchanged.
- Browser console check returned no errors or warnings for the checked local pages.
- Existing print layout is retained; the downloadable résumé is unchanged.

## Scope and remaining notes

The reference has no dark theme, portrait or personal-site navigation. Those are intentional retained features, not fidelity defects. LinkedIn publishing is a separate external workflow; this report does not claim that its banner was uploaded.

final result: passed
