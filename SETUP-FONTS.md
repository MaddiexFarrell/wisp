# Söhne Font Setup

Your codebase is now configured to use Söhne instead of Inter. To complete the setup:

## 1. Get the Söhne font files

Purchase and download Söhne from Klim Type Foundry:
https://klim.co.nz/retail-fonts/soehne/

You'll need the **Web Fonts** package (WOFF2 format).

## 2. Add the font files

Place these three files in `/public/fonts/soehne/`:
- `soehne-light.woff2` (weight 300)
- `soehne-regular.woff2` (weight 400)
- `soehne-medium.woff2` (weight 500)

## 3. Restart your dev server

After adding the font files:
```bash
# Stop the current dev server (Ctrl+C)
# Then restart it
npm run dev
```

## What was changed

- ✅ Added `@font-face` declarations in `src/app/globals.css`
- ✅ Updated font variables to use "Söhne" instead of Inter
- ✅ Removed Inter import from `src/app/layout.tsx`
- ✅ Created `/public/fonts/soehne/` directory

## Fallback behavior

Until you add the font files, the site will fall back to system UI fonts (San Francisco on Mac, Segoe UI on Windows, etc.). This is intentional and won't break anything.

Once you add the Söhne files, they'll load automatically and replace the fallback fonts.
