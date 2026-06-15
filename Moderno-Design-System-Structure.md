# Moderno Design System — Structure & Component Reference

**System:** Moderno Design System
**Purpose:** A complete design system for building startup products end-to-end — marketing landing pages, web applications, e-commerce stores, portfolios, emails, and advertising/visual assets.

## About this document

This is a **tool-agnostic, machine-readable reference**. It is written to be consumed by an AI as context or as a base for *building* products: it describes the system's architecture (its foundations and its component library), the naming conventions it exposes, and what each part is for. It is not tied to any specific design or no-code tool — values and conventions can be mapped to CSS variables, design tokens, utility classes, or component props on any platform.

The system is organized in two layers:

1. **Foundations** — the primitive design decisions (color, typography, spacing, radius, elevation, borders, icons) that every component inherits. Everything downstream is built from these.
2. **Component library** — reusable components and full example compositions, grouped by product domain: Shared Components, Marketing Website, Applications, E-Commerce, Portfolio, and Images & Ads.

The system is **re-themeable by design**: foundation values are referenced by semantic name, so changing a foundation propagates everywhere without editing components. Tokens use human-readable, utility-style names (e.g. `color/text/primary`, `text-weight-bold`, `radius/button`) that map cleanly to any target platform.

---

## 1. Foundations

Foundations are the single source of primitive decisions. Components never hard-code raw values; they reference foundation tokens by intent, which makes the whole system consistent and globally adjustable.

### 1.1 Color

Color is defined in **two layers**:

**Primitive palette (raw values).** Hue families — a neutral/gray family plus brand hues (purple, blue, green, orange, red, pink) — each expressed as a stepped shade scale from light to dark. Primitives are the raw ink of the system and are not applied to components directly.

**Semantic roles (what components consume).** Primitives are mapped to intent-based roles, named `category/property/variant`:

- `color/text/*` — text colors (e.g. `primary`, plus secondary/muted/inverse roles for hierarchy).
- `color/background/*` — surface and background fills.
- `color/border/*` — borders, dividers, and input strokes (e.g. `color/border/primary`).
- Brand/accent roles — the primary brand color used for emphasis and primary actions.
- State roles — success, warning, error, and info colors for feedback.

Every color in the system is documented with four things: a **friendly name**, a **usage** note (where/when to use it), the **value** (hex), and a **background utility class** in the form `bg-{name}`.

**Theming.** Semantic roles are the swap layer. To re-skin the product or support light/dark, remap roles to different primitives — components stay untouched because they only know roles, not raw colors.

### 1.2 Typography

The type system is expressed as HTML-tag styles plus utility overrides, so it maps directly to web output.

**Heading scale** — the tags `h1`, `h2`, `h3`, `h4`, `h5`, `h6` define the default heading styles. Each carries its own `font-size`, `font-weight`, `line-height`, and `letter-spacing`.

**Text size utilities** — used when a piece of text needs a size that differs from its default tag:

- `text-size-medium`
- `text-size-regular`
- `text-size-small`
- `text-size-tiny`

**Text weight utilities** — used when weight needs to differ from the default tag:

- `text-weight-black`
- `text-weight-bold`
- `text-weight-semibold`
- `text-weight-medium`
- `text-weight-normal`
- `text-weight-light`

A base **font family** and **base weight** are foundation tokens (e.g. `font/family`, `font/weight`) that components inherit — for example, buttons reference the button font-family and weight rather than redefining them.

### 1.3 Spacing & layout

A consistent spacing scale drives all padding, gaps, and margins. Component spacing is tokenized by part and axis, e.g. `spacing/{component}/px` (horizontal padding), `spacing/{component}/py` (vertical padding), and `spacing/{component}/gap` (internal gap). Spacing values are **responsive**: they scale by breakpoint so the same component composes correctly on desktop and mobile.

### 1.4 Sizing

Component dimensions are tokenized and follow a small / medium / large rhythm reused across controls — for example control heights `size/button-height/sm`, `size/button-height/md`, `size/button-height/lg`. Sizing tokens also participate in responsive scaling.

### 1.5 Radius

A corner-radius scale defines roundness. Components reference a radius token (e.g. `radius/button`) so the system's roundness is consistent and can be changed in one place.

### 1.6 Shadows / elevation

A **7-step elevation scale** expresses depth on the z-axis, from subtlest to strongest:

`xxsmall` → `xsmall` → `small` → `medium` → `large` → `xlarge` → `xxlarge`

Use lower steps for subtle separation (cards, inputs, list rows) and higher steps for floating surfaces that sit above the page (dropdowns, popovers, modals, sheets).

### 1.7 Borders

Border width and border color are tokenized (e.g. `border-width/{component}`, `color/border/*`) and define outlines, dividers, input strokes, and separators. Border radius is governed by the radius scale (1.5).

### 1.8 Icons

A built-in icon set is provided in two delivery formats: as an **image** and as an **inline HTML embed** (so icons can be styled with the surrounding text color/size).

- **UI icons:** chevron up, chevron down, chevron left, chevron right, filters, link, email, live chat, phone, pin (location), clock, menu.
- **Brand / social icons:** Google, Facebook, Apple, Instagram, LinkedIn, X, YouTube, Dribbble, Relume.

### 1.9 Theming model

Design decisions are layered so a product can be re-skinned or re-targeted by overriding one layer without rebuilding components:

- **Theme / color layer** — semantic color roles; override to re-skin or support light/dark.
- **Responsive layer** — sizing and spacing values that scale by breakpoint; override to change density or breakpoints.
- **Component layer** — per-component decisions (radius, border width, type) that reference the layers above.

---

## 2. Shared Components

Cross-cutting UI primitives reused by every product type (marketing, applications, e-commerce, portfolio). These are the atoms and molecules of the system.

### 2.1 Form inputs

| Component | Description |
|-----------|-------------|
| Button | Primary action control. Variants by hierarchy (primary / secondary / tertiary / ghost / link), size (sm / md / lg), state, and optional leading/trailing icons. |
| Text input | Single-line text field with label, placeholder, helper/error text, and leading/trailing icons. |
| Dropdown and Selectbox | Selection control for choosing one option from a list (native-style select and custom dropdown menu). |
| Textarea | Multi-line text input for longer free-form content. |
| Date pickers | Calendar-based single-date and date-range selection. |
| Checkbox | Multi-select boolean control, including indeterminate state. |
| Radio | Single-select control within a group of mutually exclusive options. |
| Toggle | On/off switch for instant binary settings. |

### 2.2 Data & stats

| Component | Description |
|-----------|-------------|
| List | Generic list rows for displaying records or items. |
| Table | Tabular data with headers, rows, and typed cells. |
| Charts | Charting primitives (not available in this version). |

### 2.3 Data display

| Component | Description |
|-----------|-------------|
| Indicator | Status dots and legends (sizes small/large, optional border; colors green/orange/blue/red/pink) for signalling state. |
| Avatar | User/entity image with sizes, image fallbacks (initials), and optional status. |
| Badge | Compact status/label token with color and style variants. |
| Card | Container surface that groups related content and actions. |
| Chips | Compact interactive tags for filters, selections, and input tokens. |
| Accordion | Collapsible content panels for progressive disclosure. |
| Callout | Highlighted block that draws attention to a message or tip. |
| Share and Invite | UI for sharing resources and inviting collaborators. |
| Carousel | Horizontally scrollable/sliding content gallery. |

### 2.4 Navigation

| Component | Description |
|-----------|-------------|
| Navbars | Top navigation bars for sites and apps. |
| Sidebar | Vertical side navigation / app rail. |
| Pagination | Page-by-page navigation through long result sets. |
| Tabs | Switch between sibling views within the same context. |

### 2.5 Utilities

| Component | Description |
|-----------|-------------|
| Tooltip | Contextual hint shown on hover/focus. |
| Toast | Transient, non-blocking notification. |
| Sheet | Slide-in panel/overlay surface (bottom or side). |
| Skeleton | Loading placeholders that mimic content layout. |
| Scrollbar | Custom scrollbar styling. |
| Loaders | Spinners and progress indicators. |
| Handler | Drag/resize handles and interaction affordances. |
| Dividers | Visual separators between content blocks. |

---

## 3. Marketing Website

Everything needed to assemble public-facing landing and content sites, plus full example pages.

### 3.1 Marketing components

| Component | Description |
|-----------|-------------|
| Banners | Top-of-page promo/announcement strips. |
| Hero | Above-the-fold hero sections with headline, copy, media, and CTAs. |
| Headers | Site headers / marketing navigation variants. |
| Features | Feature highlight sections (grids, alternating media, icon lists). |
| Content | General content/prose sections. |
| Careers | Jobs/openings and careers-page sections. |
| Pricing | Pricing tables and plan comparison sections. |
| Footers | Site footers with navigation, legal, and social links. |
| Contact | Contact sections and forms. |
| FAQs | Frequently-asked-questions sections. |
| Testimonials | Social proof and customer quote sections. |
| Logos | Logo clouds / "trusted by" strips. |
| Team | Team member grids and bios. |
| CTA | Call-to-action sections. |
| Blog headers | Blog index/landing headers. |
| Blog sections | Blog post listing/preview sections. |
| Blog post header | Single-article header (title, meta, hero). |
| Newsletter | Email signup / subscription sections. |
| Stats | Metric/number highlight sections. |
| Contact modals | Modal-based contact/lead capture. |
| 404 Errors | 404 / error-state marketing sections. |

### 3.2 Emails

| Component | Description |
|-----------|-------------|
| Emails | Marketing and transactional email templates and content blocks. |

### 3.3 Marketing example pages

Ready-to-use full-page compositions built from the components above: Home pages, Pricing pages, About pages, Contact pages, Blog pages, Blog post pages, Legal pages, 404 pages, Team pages, and FAQ pages.

---

## 4. Applications

Components and example screens for building applications, dashboards, and SaaS products across **three targets**: responsive web, **native iOS** (SwiftUI / UIKit, following Apple's Human Interface Guidelines), and **native Android** (Jetpack Compose + Material 3, in Kotlin). Sections 4.1–4.8 describe the shared/web component model. Section 4.9 adds the native-mobile component layer, mapped back to the same Moderno foundations (color roles, type, spacing, radius, elevation) so a product stays visually consistent across platforms.

### 4.1 Headings

| Component | Description |
|-----------|-------------|
| Page headers | App page titles with actions, breadcrumbs, and meta. |
| Card headers | Headers for cards and panels. |
| Section top | Top section headers within a view. |
| Section bottom | Bottom section bars (actions / summary). |

### 4.2 Data display

| Component | Description |
|-----------|-------------|
| Description List | Key/value detail lists. |
| Stats | Metric/stat blocks and tiles. |
| Calendars | Calendar and date views. |
| Area Charts | Area and stacked-area chart compositions. |
| Bar Charts | Vertical and horizontal bar charts. |
| Bar Lists | Ranked bar-list visualizations. |
| Line Charts | Line / trend charts. |
| Donut Charts | Donut / pie distribution charts. |
| Bar Compositions | Composed bar-chart layouts. |
| KPI Cards | Headline KPI / metric cards. |
| Spark Charts | Inline sparkline charts. |
| Status monitoring | Status / health monitoring displays. |
| Cards | Application content cards. |

### 4.3 Lists

| Component | Description |
|-----------|-------------|
| Tables | Application data tables (sorting, selection, row actions). |
| Grid lists | Card / tile grid layouts. |
| Stacked List | Vertically stacked record lists. |
| Feeds | Activity / timeline feeds. |

### 4.4 Forms

| Component | Description |
|-----------|-------------|
| Toggles | In-app toggle settings rows. |
| Action panels | Panels pairing a description with an action. |
| Checkboxes | App checkbox groups. |
| Comboboxes | Searchable select / autocomplete. |
| Radio Groups | App radio group patterns. |
| Text areas | App multi-line inputs. |
| Input Groups | Composed inputs with add-ons / prefixes / suffixes. |
| Select menus | App select menus. |
| Form layouts | Full form layout patterns. |

### 4.5 Feedback

| Component | Description |
|-----------|-------------|
| Alerts | Inline alert messages (info / success / warning / error). |
| Banners | App-level banner notifications. |
| Empty states | Zero-data / first-run states. |

### 4.6 Overlays

| Component | Description |
|-----------|-------------|
| Slide-overs | Side drawer overlays for detail / edit flows. |
| Modals or Dialogs | Centered modal dialogs. |

### 4.7 Layouts

| Component | Description |
|-----------|-------------|
| Application Shells | Full app frames (sidebar + topbar + content region). |
| Media objects | Media + text object patterns. |
| Containers | Layout container wrappers. |
| List containers | Containers specialized for lists. |
| Panels | Generic panel surfaces. |

### 4.8 Application example screens

Full screen compositions: Sign-ups and Logins, Sign-up and Login modals, Onboarding & feed, Dashboard home, Playground, Detail screen, Settings screen, Account and management, Billing and usage, Chart compositions, Tasks list, and Informational pages.

### 4.9 Native mobile (iOS & Android)

Native mobile apps must use platform-native components, navigation patterns, and ergonomics rather than reskinned web UI. The system pairs with the standard platform kits — **Apple iOS / iPadOS** (Human Interface Guidelines) for iOS and the **Material 3 Design Kit** for Android — and maps Moderno's foundations onto each platform's theming system so brand and layout stay consistent.

#### 4.9.1 Foundation mapping (web → native)

| Moderno foundation | iOS (SwiftUI / UIKit) | Android (Compose / Material 3) |
|--------------------|------------------------|-------------------------------|
| Semantic color roles (`color/text|background|border/*`, brand, state) | Asset-catalog **semantic colors** + system colors; light/dark via appearance | **Material color scheme** roles (`primary`, `surface`, `onSurface`, `outline`, `error`…), optional Material You dynamic color |
| Typography (`h1–h6`, `text-size-*`, `text-weight-*`) | **Dynamic Type** text styles (largeTitle…caption), scalable, using the system or brand font | **Material type scale** (display/headline/title/body/label), using the system or brand font |
| Spacing scale | Points (pt); safe-area aware | Density-independent pixels (dp); window-insets aware |
| Sizing (min touch target) | ≥ 44 × 44 pt | ≥ 48 × 48 dp |
| Radius scale | `cornerRadius` / `clipShape` | `Shapes` (extra-small → extra-large) |
| Elevation `xxsmall–xxlarge` | Layering, materials/blur, subtle shadows | **Tonal + shadow elevation** levels (0–5) |
| Icons (UI + brand/social) | **SF Symbols** + brand assets | **Material Symbols** + brand assets |

#### 4.9.2 iOS components (SwiftUI / UIKit)

| Component | Description |
|-----------|-------------|
| Navigation Bar | Top bar with title (inline/large), back button, and bar-button items. |
| Tab Bar | Bottom tab navigation for top-level sections. |
| Toolbar | Contextual action bar (bottom or in navigation). |
| Sidebar (iPad) | Source-list navigation for regular-width / iPad layouts. |
| Search Bar | Searchable field integrated with navigation. |
| List / Form | Grouped & inset-grouped lists, Sections, with rows, disclosure, and swipe actions. |
| Buttons | Filled, tinted, bordered, bordered-prominent, and plain styles. |
| Menu & Context Menu | Pull-down/pop-up menus and long-press context menus. |
| Pickers | Wheel/segmented/menu pickers; Date Picker (wheel, compact, graphical). |
| Controls | Toggle (Switch), Slider, Stepper, Segmented Control. |
| Text entry | TextField, SecureField, TextEditor (multiline). |
| Sheets & overlays | Sheet (page/form), detents (bottom-sheet sizing), Popover, Full-Screen Cover, Alert, Confirmation Dialog (action sheet). |
| Feedback | ProgressView (linear/circular), Activity indicator, Pull-to-refresh (refreshable). |
| Display | Label, Image, Avatar, Badge, DisclosureGroup, Gauge, Swift Charts. |
| System affordances | Status bar, Home indicator, Safe areas, SF Symbols, Dynamic Type, Haptics. |

#### 4.9.3 Android components (Jetpack Compose + Material 3, Kotlin)

| Component | Description |
|-----------|-------------|
| Scaffold | Screen skeleton wiring top bar, bottom bar, FAB, snackbar host, and content. |
| Top App Bar | Small / center-aligned / medium / large variants. |
| Bottom Navigation Bar | Top-level destination bar (Navigation Bar). |
| Navigation Rail | Side navigation for medium-width / foldable / tablet. |
| Navigation Drawer | Modal and permanent drawers. |
| Tabs | Fixed and scrollable tab rows. |
| Search Bar | Docked and full-screen Material search. |
| Buttons | Filled, tonal, outlined, elevated, and text buttons. |
| FAB | Standard, small, large, and Extended FAB. |
| Icon Button & Segmented Button | Toggle/standard icon buttons; single/multi-select segmented buttons. |
| Chips | Assist, filter, input, and suggestion chips. |
| Selection controls | Switch, Checkbox, Radio button, Slider (continuous/range). |
| Text fields | Filled and outlined; with leading/trailing icons, helper/error. |
| Menus & pickers | Dropdown/exposed-dropdown menus; Date Picker, Time Picker. |
| Containers | Surface; Card (elevated/filled/outlined); Bottom Sheet (modal/standard); Side Sheet; Dialog. |
| Lists | LazyColumn / LazyRow, List items, Dividers. |
| Feedback | Snackbar, Badge, Tooltip, Linear/Circular progress, Loading indicator, Pull-to-refresh. |
| System affordances | Material You dynamic color, edge-to-edge + window insets, window size classes (adaptive layouts), Material Symbols, tonal elevation, Haptics. |

#### 4.9.4 Cross-platform native guidance

- **Use native navigation models.** iOS leans on tab bar + navigation stack + sheets; Android on Scaffold + bottom bar/rail/drawer + Material containers. Don't force one platform's pattern onto the other.
- **Adapt to form factor.** Honor window size classes (Android) and size classes / iPad multitasking (iOS): phone uses bottom navigation, tablet/foldable uses rail or sidebar.
- **Respect platform ergonomics.** Minimum touch targets (44 pt iOS / 48 dp Android), safe areas / window insets, system back gesture, and platform-correct haptics and motion.
- **Theme through roles, not raw values.** Map Moderno semantic color roles and type to each platform's theming system (asset-catalog colors + Dynamic Type on iOS; Material color scheme + type scale on Android) so a single brand definition drives both apps.

---

## 5. E-Commerce

Storefront building blocks and full shopping-flow examples.

### 5.1 E-commerce components

| Component | Description |
|-----------|-------------|
| Store navigation | Storefront headers/menus and category navigation. |
| Promo sections | Promotional / merchandising sections. |
| Category Preview | Category showcase blocks. |
| Category Filters | Faceted filtering controls. |
| Product Lists | Product grid / list displays. |
| Product Features | Product feature / detail highlights. |
| Product Details | Product detail modules (gallery, info, add-to-cart). |
| Reviews | Ratings and review blocks. |
| Shopping cart | Cart line items and summary. |
| Checkout forms | Checkout, shipping, and payment forms. |
| Order summaries | Order summary panels. |
| Order history | Past orders list. |
| Incentives | Shipping / returns / guarantee incentive blocks. |

### 5.2 E-commerce example pages

Full-page flows: Storefront, Product, Category, Shopping cart, Checkout, Order detail, Order history, and Product quickviews.

---

## 6. Portfolio

Building blocks and examples for personal and agency portfolio sites.

### 6.1 Portfolio components

| Component | Description |
|-----------|-------------|
| Portfolio Headers | Portfolio / intro headers. |
| Portfolio sections | Work / project showcase sections. |
| Long Form Content | Case-study / long-read content layouts. |

### 6.2 Portfolio example pages

Full compositions: Portfolio pages and Portfolio mockups (plus portfolio-related email templates).

---

## 7. Images & Ads

Visual and marketing asset templates for social, advertising, and brand surfaces.

| Asset type | Description |
|------------|-------------|
| Mockups & Post Images | Device mockups and social post image templates. |
| Cover & Billboards | Cover art and large-format billboard / banner templates. |
| Stories | Vertical story-format (9:16) ad / social templates. |
| Wallpapers | Branded wallpaper templates. |
| Backgrounds | Decorative background patterns and surfaces. |

---

## How to use this as build context

- **Start from foundations.** Resolve color, typography, spacing, radius, elevation, and border tokens first; every component reads from them. Treat semantic roles (not raw hexes) as the contract.
- **Compose, don't reinvent.** Build screens by assembling Shared Components, then domain components (Marketing / Applications / E-Commerce / Portfolio). Example pages show canonical compositions to imitate.
- **Respect the naming conventions.** Tokens and utilities (`color/text/*`, `bg-*`, `text-size-*`, `text-weight-*`, `radius/*`, shadow steps `xxsmall`–`xxlarge`) are the system's vocabulary; reuse them so output stays consistent and re-themeable.
- **Theme by overriding layers.** Change the theme/color layer to re-skin, the responsive layer to change density/breakpoints, and the component layer for per-component tweaks — without rewriting components.
