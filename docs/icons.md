# Icons Reference

This library provides a rich collection of pre-defined React SVG icons that can be imported and used directly in your application.

Each icon is exported as a React component, making it easy to integrate with your UI. Here's the complete list of available icons:

## Basic Actions

| Icon Name        | Description                             |
| ---------------- | --------------------------------------- |
| `resetFieldIcon` | Resets or clears a field                |
| `crossIcon`      | Closes, cancels, or dismisses something |
| `plusIcon`       | Add or expand                           |
| `minusIcon`      | Remove or collapse                      |
| `tickSingleIcon` | Single checkmark                        |
| `tickDoubleIcon` | Double checkmark                        |

## Arrows & Navigation

| Icon Name        | Description             |
| ---------------- | ----------------------- |
| `arrowUpIcon`    | Arrow pointing upward   |
| `arrowDownIcon`  | Arrow pointing downward |
| `arrowLeftIcon`  | Arrow pointing left     |
| `arrowRightIcon` | Arrow pointing right    |
| `homeIcon`       | Navigate to home        |
| `linesIcon`      | Hamburger menu icon     |

## Search & Filter

| Icon Name    | Description              |
| ------------ | ------------------------ |
| `searchIcon` | Search magnifier         |
| `filterIcon` | Filter menu (optional)\* |

## Scheduling & Time

| Icon Name          | Description              |
| ------------------ | ------------------------ |
| `calendarIcon`     | Represents a calendar    |
| `sendScheduleIcon` | Send with scheduled time |
| `reminderIcon`     | Reminder notification    |
| `timeIcon`         | Time or clock icon       |

## Files & Media

| Icon Name        | Description                 |
| ---------------- | --------------------------- |
| `fileUploadIcon` | Upload file                 |
| `fileIcon`       | Generic file representation |
| `noteIcon`       | Text or note                |
| `imageIcon`      | Image available             |
| `imageNotIcon`   | Image not found             |
| `videoIcon`      | Video available             |
| `videoNotIcon`   | Video not available         |
| `mediaIcon`      | Generic media content       |
| `previewIcon`    | Preview file or content     |

## Communication

| Icon Name         | Description                 |
| ----------------- | --------------------------- |
| `sendIcon`        | Send message or file        |
| `meetingIcon`     | Meeting or conference       |
| `directShareIcon` | Share directly with someone |
| `shareIcon`       | Generic share               |
| `copyIcon`        | Copy to clipboard           |

## Audio & Playback

| Icon Name        | Description      |
| ---------------- | ---------------- |
| `playIcon`       | Play button      |
| `pauseIcon`      | Pause button     |
| `speakerOffIcon` | Mute speaker     |
| `speakerOnIcon`  | Speaker sound on |

## Reactions & Social

| Icon Name         | Description          |
| ----------------- | -------------------- |
| `heartFilledIcon` | Filled heart (liked) |
| `heartHollowIcon` | Hollow heart         |
| `analyticsIcon`   | Analytics or stats   |

## Visibility & Privacy

| Icon Name      | Description             |
| -------------- | ----------------------- |
| `eyeIcon`      | Show or reveal          |
| `eyeCrossIcon` | Hide or conceal         |
| `lockIcon`     | Locked content or field |

## Sync & Connectivity

| Icon Name         | Description                 |
| ----------------- | --------------------------- |
| `syncCurveIcon`   | Syncing with curve arrow    |
| `syncStrightIcon` | Syncing with straight arrow |
| `syncCloudIcon`   | Sync with cloud             |
| `syncDeviceIcon`  | Sync with another device    |
| `syncErrorIcon`   | Sync failed or error        |

## Call & Communication

| Icon Name        | Description            |
| ---------------- | ---------------------- |
| `callCenterIcon` | Call center or support |
| `callErrorIcon`  | Call failure           |
| `callIcon`       | Initiate call          |
| `callAddIcon`    | Add a call             |
| `callWifiIcon`   | WiFi call              |
| `callOnIcon`     | Active call            |
| `callMissIcon`   | Missed call            |

## Authentication & Users

| Icon Name     | Description  |
| ------------- | ------------ |
| `loginIcon`   | Login icon   |
| `logoutIcon`  | Logout icon  |
| `profileIcon` | User profile |

## Display & Mode

| Icon Name         | Description                     |
| ----------------- | ------------------------------- |
| `screenModeIcon`  | Display or fullscreen mode      |
| `screenMode2Icon` | Alternative screen display mode |

## Shapes & Indicators

| Icon Name          | Description               |
| ------------------ | ------------------------- |
| `circleThinIcon`   | Thin outlined circle      |
| `circleThikIcon`   | Thick outlined circle     |
| `cirlceFilledIcon` | Filled circle             |
| `allDoneIcon`      | Task completion indicator |

---

## Usage Example

```jsx
import { searchIcon, plusIcon } from "your-library/icons";

function MyComponent() {
  return (
    <div>
      <button>{searchIcon} Search</button>
      <button>{plusIcon} Add</button>
    </div>
  );
}
```
