# UI Component Library

A powerful and extensible React-based component library designed to accelerate development across web applications. This library provides a wide range of UI components, hooks, utilities, and layouts that are easy to integrate and customize.

## Installation

```bash
npm install @itsrighttime/ui-components
```

or

```bash
yarn add @itsrighttime/ui-components
```

## Usage

You can import grouped modules as needed:

### Example: Using Grouped Exports

```js
import { UIInputs, UIHooks, UIAlert } from "@itsrighttime/ui-components";

const { Button, TextField } = UIInputs.Actions;
const { useAlerts } = UIHooks;
const { Alert } = UIAlert;
```

## Namespaced Exports

| Namespace      | Contains                                      |
| -------------- | --------------------------------------------- |
| `UIAlert`      | Alert components and hooks                    |
| `UICards`      | Card components                               |
| `UIExtra`      | Miscellaneous components like `IndiaMap`      |
| `UIEssentials` | Core essential UI helpers like `Tooltip`      |
| `UIIcons`      | Icon collection                               |
| `UIPages`      | Special UI pages and loading states           |
| `UIInputs`     | Grouped input fields                          |
| `UILayout`     | Layout components like containers & workspace |
| `UIHooks`      | Custom React hooks                            |
| `UIUtils`      | Utility functions and helpers                 |

## Module Structure

## Alerts

- `Alert`
- `AlertContainer`
- `useAlerts`

## Cards

- `CardImg`
- `CardSimpleInfo`
- `CardTextOn`
- `CardTextSliding`

## Inputs

#### Actions

- `PlainButton`
- `Button`
- `IconButton`
- `ImageButton`
- `Link`

#### Text Inputs

- `TextField`
- `TextArea`
- `Label`
- `JsonField`
- `MobileField`
- `EmailField`
- `AddressField`
- `NumberField`
- `Stepper`
- `Slider`

#### Date & Time

- `DatePicker`
- `TimePicker`
- `Calendar`

#### Security

- `OtpField`
- `PasswordField`
- `SecurityQuestion`

#### Selectors

- `Dropdown`
- `DropdownSimple`
- `SearchBox`
- `ColorPicker`
- `RadioGroup`
- `Switch`
- `CheckboxGroup`

#### Uploads

- `FileUpload`
- `AudioPlayer`
- `AudioUpload`
- `ImagePreview`
- `ImageUpload`
- `VideoUpload`
- `VideoPlayer`

## Layout

- `FlexContainer`
- `GridContainer`
- `Workspace`

## Special Pages

- `Loading`
- `ErrorPage`
- `IconError`
- `LoadingChat`
- `LockScreen`
- `LoginForm`

## Extras

- `IndiaMap`
- `Tooltip`

## Hooks

- `useAlerts`
- `useAPICaller`
- `useSmartPosition`
- `useInfiniteScroll`
- `useLazyLoad`
- `useMediaQuery`
- `useOutsideClick`
- `useUserActiveOnTab`
- `useUserPresentOnTab`

## Utilities

- `apiCaller`
- `logger` (with `codeTypes` and `getTrackingCode`)
- `camelToKebab`, `kebabToCamel`
- `getColorCode`
- `delay`
- `getRedirectToURL`, `getRedirectBackUrl`
- `setDocumentTitle`, `setFavicon`

## Icons

- All icons available via: `Icons`

## License

**itsRIGHTtime** internal use only

## Maintained by

**itsRIGHTtime**
