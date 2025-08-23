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

| Namespace                             | Contains                                      |
| ------------------------------------- | --------------------------------------------- |
| [`UIAlert`](./docs/alert.md)          | Alert components and hooks                    |
| [`UICards`](./docs/cards.md)          | Card components                               |
| `UIExtra`                             | Miscellaneous components like `IndiaMap`      |
| [`UIEssentials`](./docs/essential.md) | Core essential UI helpers like `Tooltip`      |
| [`UIIcons`](./docs/icons.md)          | Icon collection                               |
| [`UIPages`](./docs/pages.md)          | Special UI pages and loading states           |
| [`UIInputs`](./docs/input.md)         | Grouped input fields                          |
| [`UILayout`](./docs/layout.md)        | Layout components like containers & workspace |
| [`UIHooks`](./docs/hooks.md)          | Custom React hooks                            |
| [`UIUtils`](./docs/utils.md)          | Utility functions and helpers                 |

## Imports

## Module Structure

## [Alerts](./docs/alert.md)

- `Alert`
- `AlertContainer`
- `useAlerts`

## [Cards](./docs/cards.md)

- `CardImg`
- `CardSimpleInfo`
- `CardTextOn`
- `CardTextSliding`

## [Inputs](./docs/input.md)

#### [Actions](./docs/input/actions.md)

- `PlainButton`
- `Button`
- `IconButton`
- `ImageButton`
- `Link`

#### [Text Inputs](./docs/text-inputs.md)

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

#### [Date & Time](./docs/input/date-time.md)

- `DatePicker`
- `TimePicker`
- `Calendar`

#### [Security](./docs/input/sequrity-question.md)

- `OtpField`
- `PasswordField`
- `SecurityQuestion`

#### [Selectors](./docs/input/selectors.md)

- `Dropdown`
- `DropdownSimple`
- `SearchBox`
- `ColorPicker`
- `RadioGroup`
- `Switch`
- `CheckboxGroup`

#### [Uploads](./docs/uploads.md)

- `FileUpload`
- `AudioPlayer`
- `AudioUpload`
- `ImagePreview`
- `ImageUpload`
- `VideoUpload`
- `VideoPlayer`

## [Layout](./docs/layout.md)

- [`FlexContainer`](./docs/container.md#flexcontainer)
- [`GridContainer`](./docs/container.md#gridcontainer)
- [`Workspace`](./docs/layout.md#workspace-component--usage-guide)
- [`Header`](./docs/layout.md#header-component--usage-guide)
- [`Footer`](./docs/layout.md#footer-component)
- [`WebStructure`](./docs/web-structure.md)
- [`Form`](./docs/generic-form.md)

## [Special Pages](./docs/pages.md)

- [`Loading`](./docs/pages.md#loading-component)
- [`ErrorPage`](./docs/pages.md#errorpage-component)
- [`IconError`](./docs/pages.md#iconerror-component)
- [`LoadingChat`](./docs/pages.md#loadingchat-component)
- [`LockScreen`](./docs/pages.md#lockscreen)
- [`LoginForm`](./docs/pages.md#loginform)

## UIEssentials

- `IndiaMap`
- [`Tooltip`](./docs/tooltip.md)
- [`Table`](./docs/table.md)

## [Hooks](./docs/hooks.md)

- [`useAlerts`](./docs/hooks.md#6-usealerts--manage-alert-queue) [`2`](./docs/alert.md)
- [`useAPICaller`](./docs/hooks.md#7-useapicaller--easy-api-requests-with-lifecycle-management) [`2`](./docs/api.md#useapi-react-hook-for-auto-fetching) [`3`](./docs/hooks/useApiCaller.md)
- [`useSmartPosition`](./docs/hooks.md#8-usesmartposition--dynamic-popuptooltip-positioning) [`2`](./docs/hooks/useSmartPosition.md)
- [`useInfiniteScroll`](./docs/hooks.md#9-useinfinitescroll--paginated-scroll-window-with-smart-restore)
- [`useLazyLoad`](./docs/hooks.md#1-uselazyloadref)
- [`useMediaQuery`](./docs/hooks.md#2-usemediaquerybreakpoint)
- [`useOutsideClick`](./docs/hooks.md#3-useoutsideclickref-handler)
- [`useUserActiveOnTab`](./docs/hooks.md#4-useuseractiveontabtimeoutinminutes)
- [`useUserPresentOnTab`](./docs/hooks.md#5-useuserpresentontab-onfocus-onblur-)
- [`useQueryParams`](./docs/hooks/useQueryParams.md)

## [Utilities](./docs/utils.md)

- [`apiCaller`](./docs/api.md)
- [`logger` (with `codeTypes` and `getTrackingCode`)](./docs/logger.md)
- [`toKebabCase`](./docs/utils.md#tokebabcasestr)
- [`fromKebabCase`](./docs/utils.md#fromkebabcasestr-format)
- [`getColorCode`](./docs/utils.md#getcolorcodecolorname)
- [`delay`](./docs/utils.md#delayms)
- [`redirectURL`](./docs/utils.md#redirecturltarget)
- [`redirectUrlWithBack`](./docs/utils.md#redirecttourlwithback-to-from-)
- [`getRedirectBackUrl`](./docs/utils.md#getredirectbackurlurl)
- [`setDocumentTitle`](./docs/utils.md#setdocumenttitletitle)
- [`setFavicon`](./docs/utils.md#setfaviconlogoname-extension--png)

## [Icons](./docs/icons.md)

- All icons available via: `Icons`

## [Services]

- [`Translation`](./docs/services/translation.md)

- All icons available via: `Icons`

## License

**itsRIGHTtime** internal use only

## Maintained by

**itsRIGHTtime**
