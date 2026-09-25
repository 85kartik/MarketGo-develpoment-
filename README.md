# MarketGo Project

Full-stack shopping app: Express/MongoDB API (`server/`) + Expo/React Native app (`frontend/`).

## Running the server

```bash
cd server
cp .env.example .env   # fill in MONGO_URL, JWT_CODE, EMAIL_USER, EMAIL_PASS, GROQ_API_KEY
npm install
npm run dev             # nodemon, http://localhost:5252
```

## Running the frontend

```bash
cd frontend
npm install
npx expo start
```

By default the app points at `http://10.0.2.2:5252/api/v1` (Android emulator's alias
for your host machine). Edit `src/constants/config.js` if you're using a physical
device or iOS simulator — see the comments in that file.

## ⚠️ Rotate your secrets

`server/.env` (Mongo URL, JWT secret, email credentials, Groq API key) was previously
committed to git history because `server/.gitignore` had a path that didn't actually
match the file. That's fixed now and `.env` is untracked going forward, but the old
values are still recoverable from git history on GitHub. **Rotate all of them**
(new Mongo password, new JWT secret, new email app password, new Groq key) and,
if you want them fully gone from history, use `git filter-repo` or GitHub's
"remove sensitive data" guide, then force-push.

## What changed in this pass

- **Frontend ↔ backend were completely out of sync** — the app's `BASE_URL` was
  missing `/v1`, and most service files (`cart`, `review`, `order`, `wishlist`,
  `address`, `payment`, `home`, `coupon`) called routes that either had the wrong
  prefix/verb or didn't exist on the server at all. `src/api/endpoints.js` is now
  the single source of truth for every route, matching the server exactly.
- **Product browsing didn't exist** — the backend only had `POST /product/create-product`.
  Added `GET /product`, `GET /product/:idOrSlug`, `PUT /product/update/:id`,
  `DELETE /product/delete/:id`.
- **Built real backends** for wishlist, address, and payment (gateway-agnostic
  create/verify stub — swap in Razorpay/Stripe when ready), plus coupons and a
  composite `/home` endpoint, since the frontend already had screens for all of
  these with nothing behind them.
- **Frontend was missing its root project files entirely** (`package.json`,
  `App.js`, `index.js`, `app.json`, `babel.config.js`) — it couldn't be installed
  or run at all. Added all of them.
- **Fixed a nested-`NavigationContainer` crash**: both `AppNavigator` and
  `AuthNavigator` created their own container; React Navigation throws on this.
- Fixed a wrong `FormData` field name in `EditProductScreen` (`image` →
  `photo`, matching the server's multer field).
- Fixed the leaked `.env` (see above).

## Known follow-ups (not fixed in this pass — out of scope for "sync the routes")

- Several vendor screens (e.g. `EditProductScreen`) reference product fields
  (`brand`, `discount`, `stock`) that don't exist on the `Product` model
  (`price`, `quantity`, `inStock`, `lowStockLimit`). This is a data-model
  mismatch inside the UI forms, not a routing issue — worth a follow-up pass.
- `vendorService.getReviews()` has no backend endpoint yet (returns an empty
  list client-side) — add a review-moderation route if that screen needs to be real.
- `CartContext.js` and `WishlistContext.js` are currently empty files; cart/wishlist
  state isn't wired into global context yet, screens would need to call the
  services directly or you can build out the providers.
