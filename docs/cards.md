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
| `colorText`    | `string` | `"white"` | Text color from theme palette                          |
| `colorTitle`   | `string` | `"white"` | Text color from theme palette                          |
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
  colorTitle="blue"
/>
```

## 4️. `CardTextSliding`

Animated card with image background and a CTA button.

### Props

| Prop           | Type     | Default    | Description                 |
| -------------- | -------- | ---------- | --------------------------- |
| `img`          | `string` | required   | Background image            |
| `productName`  | `string` | required   | Product or title            |
| `desc`         | `string` | required   | Description or pitch        |
| `link`         | `string` | `"#"`      | link                        |
| `productID`    | `string` | `null`     | Optional product identifier |
| `orientation`  | `string` | `"V"`      | Layout: `H`, `V`, or `S`    |
| `colorLink`    | `string` | `"white"`  | Theme color                 |
| `borderRadius` | `string` | `"10px"`   | Optional border radius      |
| `linkLabel`    | `string` | `undefine` | Button label                |

### Usage

```jsx
<CardTextSliding
  img={img2}
  productName="Smart Home Kit"
  desc="Automate your living with our AI-driven devices."
  link={"#"}
  productID="SHK-2025"
  orientation="H"
  colorLink="green"
/>
```

## 5️. `CardAchievement`

Achievement card to highlight key metrics, accomplishments, or stats with an optional icon.

### Props

| Prop          | Type     | Default     | Description                         |
| ------------- | -------- | ----------- | ----------------------------------- |
| `title`       | `string` | required    | Title of the achievement            |
| `metric`      | `string` | `undefined` | Highlighted metric or value         |
| `description` | `string` | `undefined` | Supporting description text         |
| `iconName`    | `string` | `undefined` | Icon name from `MyIcons` collection |

### Usage

```jsx
<CardAchievement
  title="Users Reached"
  metric="50K+"
  description="Active users across the platform"
  iconName="usersIcon"
/>
```

## 6️. `CardDecision`

Card component for documenting key decisions along with reasoning and impact.

### Props

| Prop          | Type     | Default     | Description                       |
| ------------- | -------- | ----------- | --------------------------------- |
| `decision`    | `string` | required    | Decision statement                |
| `reason`      | `string` | `undefined` | Reason behind the decision        |
| `impact`      | `string` | `undefined` | Outcome or impact of the decision |
| `description` | `string` | `undefined` | Additional explanation            |

### Usage

```jsx
<CardDecision
  decision="Adopt Microservices"
  reason="Improves scalability"
  impact="Faster deployments"
  description="Helps teams work independently"
/>
```

## 7️. `CardEvent`

Event card for displaying timelines, meetups, or important occasions.

### Props

| Prop          | Type     | Default     | Description                           |
| ------------- | -------- | ----------- | ------------------------------------- |
| `name`        | `string` | required    | Event name                            |
| `date`        | `string` | required    | Event date                            |
| `location`    | `string` | `undefined` | Event location                        |
| `description` | `string` | `undefined` | Event description                     |
| `links`       | `array`  | `undefined` | List of related links `{label, href}` |

### Usage

```jsx
<CardEvent
  name="Product Launch"
  date="Aug 20, 2025"
  location="San Francisco"
  description="Official release event"
  links={[
    { label: "Register", href: "#" },
    { label: "Details", href: "#" },
  ]}
/>
```

## 8️. `CardExperience`

Experience card for showcasing work history or professional roles.

### Props

| Prop               | Type     | Default     | Description              |
| ------------------ | -------- | ----------- | ------------------------ |
| `role`             | `string` | required    | Job title or role        |
| `org`              | `string` | `undefined` | Organization name        |
| `period`           | `string` | `"~"`       | Time period              |
| `responsibilities` | `array`  | `undefined` | List of responsibilities |
| `skills`           | `array`  | `undefined` | Skills used              |
| `description`      | `string` | `undefined` | Role summary             |

### Usage

```jsx
<CardExperience
  role="Frontend Developer"
  org="Tech Corp"
  period="2022 – 2024"
  responsibilities={["UI development", "Performance optimization"]}
  skills={["React", "CSS"]}
  description="Worked on scalable UI systems"
/>
```

## 9️. `CardMedia`

Media card for displaying images, videos, or quotes.

### Props

| Prop        | Type     | Default     | Description                        |
| ----------- | -------- | ----------- | ---------------------------------- |
| `mediaType` | `string` | required    | `"image"`, `"video"`, or `"quote"` |
| `src`       | `string` | `undefined` | Media source URL                   |
| `text`      | `string` | `undefined` | Quote text                         |
| `caption`   | `string` | `undefined` | Caption below the media            |

### Usage

```jsx
<CardMedia
  mediaType="image"
  src="/images/demo.png"
  caption="Initial prototype"
/>
```

## 10️. `CardMilestone`

Milestone card for highlighting key achievements or roadmap checkpoints.

### Props

| Prop          | Type     | Default     | Description            |
| ------------- | -------- | ----------- | ---------------------- |
| `title`       | `string` | required    | Milestone title        |
| `subtitle`    | `string` | `undefined` | Secondary label        |
| `description` | `string` | `undefined` | Milestone details      |
| `iconName`    | `string` | `undefined` | Icon from `MyIcons`    |
| `link`        | `object` | `undefined` | `{ label, href }` link |

### Usage

```jsx
<CardMilestone
  title="Series A Funding"
  subtitle="2024"
  description="Raised $5M from investors"
  iconName="trophyIcon"
  link={{ label: "Read More", href: "#" }}
/>
```

## 11️. `CardPhase`

Phase card for representing stages in a process or roadmap.

### Props

| Prop          | Type     | Default     | Description    |
| ------------- | -------- | ----------- | -------------- |
| `title`       | `string` | required    | Phase title    |
| `period`      | `string` | `"~"`       | Phase duration |
| `description` | `string` | `undefined` | Phase overview |
| `highlights`  | `array`  | `undefined` | Key highlights |

### Usage

```jsx
<CardPhase
  title="Research Phase"
  period="Q1 2024"
  description="Market and user research"
  highlights={["User interviews", "Competitor analysis"]}
/>
```

## 12️. `CardProduct`

Product card for displaying product versions, status, and updates.

### Props

| Prop         | Type     | Default      | Description                   |
| ------------ | -------- | ------------ | ----------------------------- |
| `name`       | `string` | required     | Product name                  |
| `version`    | `string` | `"20.252.3"` | Product version               |
| `status`     | `string` | `"released"` | Product status                |
| `tagline`    | `string` | `undefined`  | Short description             |
| `highlights` | `array`  | `undefined`  | Feature highlights            |
| `links`      | `array`  | `undefined`  | Related links `{label, href}` |

### Usage

```jsx
<CardProduct
  name="Nova UI Kit"
  version="1.2.0"
  status="beta"
  tagline="Modern UI components"
  highlights={["New cards", "Dark mode"]}
  links={[
    { label: "Docs", href: "#" },
    { label: "GitHub", href: "#" },
  ]}
/>
```

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

## Example: Combine All Cards

```jsx
<div>
  <CardImg ... />
  <CardSimpleInfo ... />
  <CardTextOn ... />
  <CardTextSliding ... />
</div>
```
