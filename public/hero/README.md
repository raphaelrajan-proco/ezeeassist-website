# Hero background variants

Committed image files only. Never a CDN, and never an image pasted into a chat
window — those cannot be committed and the build will 404 on them.

## Naming

    public/hero/hero-bg-<slug>.jpg

e.g. `hero-bg-deep.jpg`, `hero-bg-wash.jpg`. Keep slugs descriptive of the
image, not of where it is used, so one image can serve several sections.

## Registering a variant

Add it to `lib/data/hero-backgrounds.ts` with its **own** base colour and
scrim. A lighter photograph needs a stronger scrim to hold the same copy, so a
variant must never inherit another's scrim. Re-measure contrast per image
against the lightest pixel under the copy column, not the average.

See DESIGN.md §5 for the layer composition and the scrim table.

## Format

JPEG, sRGB, ~2400px on the long edge, quality ~80. These sit behind a scrim, so
detail is not worth the bytes. Run them through an optimiser before committing.
