# Card Components Guide

This document explains how to use the card components from the UI library. These are reusable, styled, and responsive components intended for blogs, teams, portfolios, products, and more.

## Components Included

- `CardImg` – Blog/product card with image and link
- `CardSimpleInfo` – Compact profile/info card
- `CardTextOn` – Image background card with text overlay
- `CardTextSliding` – Interactive promotional card with CTA

## Cards

- [`CardImg`](#1️-cardimg)
- [`CardSimpleInfo`](#2️-cardsimpleinfo)
- [`CardTextOn`](#3️-cardtexton)
- [`CardTextSliding`](#4️-cardtextsliding)

## Importing

```js
import { UICards } from "@itsrighttime/ui-components";

const { CardImg, CardSimpleInfo, CardTextOn, CardTextSliding } = UICards;
```

Also import or place images as needed:

```jsx
import img1 from "path/to/img1.jpg";
import img2 from "path/to/img2.jpg";
```

## 1️. `CardImg`

Displays a card with an image, title, short description, and a link.

### Props

| Prop           | Type     | Default  | Description                                      |
| -------------- | -------- | -------- | ------------------------------------------------ |
| `img`          | `string` | required | Path or URL to the image                         |
| `title`        | `string` | required | Title or heading                                 |
| `desc`         | `string` | required | Short description                                |
| `targetLink`   | `string` | `"#"`    | Anchor link URL                                  |
| `targetTab`    | `string` | `_blank` | Open in new tab or same tab (`_blank` / `_self`) |
| `colorName`    | `string` | `"red"`  | Theme color: `cyan`, `red`, `yellow`, etc.       |
| `borderRadius` | `string` | `"10px"` | Optional border radius                           |

### Usage

```jsx
<CardImg
  img={img1}
  title="Top 5 Interior Tips"
  desc="Learn how to maximize space and aesthetics."
  targetLink="/blog/interior-tips"
  targetTab="_self"
  colorName="cyan"
/>
```

## 2️. `CardSimpleInfo`

Compact card for people/team members with optional color and position.

### Props

| Prop           | Type     | Default  | Description                        |
| -------------- | -------- | -------- | ---------------------------------- |
| `img`          | `string` | required | Image path or URL                  |
| `name`         | `string` | required | Person's name                      |
| `desc`         | `string` | required | Description or role                |
| `title`        | `string` | `null`   | Optional designation (e.g., "CEO") |
| `colorName`    | `string` | `"cyan"` | Theme color                        |
| `borderRadius` | `string` | `"10px"` | Optional border radius             |

### Usage

```jsx
<CardSimpleInfo
  img={img1}
  name="Danishan Farookh"
  desc="Leading our design department with modern vision."
  title="Creative Head"
  colorName="green"
/>
```

## 3️. `CardTextOn`

Text-over-image card for articles, authors, and blog content.

### Props

| Prop           | Type     | Default   | Description                                            |
| -------------- | -------- | --------- | ------------------------------------------------------ |
| `authorName`   | `string` | required  | Author or contributor name                             |
| `date`         | `string` | required  | Publication or creation date                           |
| `img`          | `string` | required  | Background image                                       |
| `desc`         | `string` | required  | Summary/description                                    |
| `productID`    | `string` | `null`    | Optional product ID or tag                             |
| `orientation`  | `string` | `"H"`     | Layout: `H` (horizontal), `V` (vertical), `S` (square) |
| `colorName`    | `string` | `"white"` | Text color from theme palette                          |
| `borderRadius` | `string` | `"10px"`  | Optional border radius                                 |

### Usage

```jsx
<CardTextOn
  authorName="Ayesha Khan"
  date="May 15, 2025"
  img={img1}
  desc="An in-depth view of how AI is shaping design decisions globally."
  productID="AI-UX-22"
  orientation="H"
  colorName="blue"
/>
```

## 4️. `CardTextSliding`

Animated card with image background and a CTA button.

### Props

| Prop           | Type                 | Default   | Description                 |
| -------------- | -------------------- | --------- | --------------------------- |
| `img`          | `string`             | required  | Background image            |
| `productName`  | `string`             | required  | Product or title            |
| `desc`         | `string`             | required  | Description or pitch        |
| `setResult`    | `Function or string` | `"#"`     | Callback function for CTA   |
| `productID`    | `string`             | `null`    | Optional product identifier |
| `orientation`  | `string`             | `"V"`     | Layout: `H`, `V`, or `S`    |
| `colorName`    | `string`             | `"white"` | Theme color                 |
| `borderRadius` | `string`             | `"10px"`  | Optional border radius      |

### Usage

```jsx
<CardTextSliding
  img={img2}
  productName="Smart Home Kit"
  desc="Automate your living with our AI-driven devices."
  setResult={() => console.log("Expert view requested")}
  productID="SHK-2025"
  orientation="H"
  colorName="green"
/>
```

---

## Theme Colors

Use the following for `colorName` where applicable:

- `cyan`
- `red`
- `yellow`
- `green`
- `blue`
- `gray`
- `white`
- `black`

## Notes

- All components are responsive and respect custom styles like `borderRadius`.
- Image files should be optimized (WebP, JPEG).
- Button component is required for `CardTextSliding`.

---

## Example: Combine All Cards

```jsx
<div>
  <CardImg ... />
  <CardSimpleInfo ... />
  <CardTextOn ... />
  <CardTextSliding ... />
</div>
```
