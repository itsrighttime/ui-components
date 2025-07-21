import { Alert } from "./Alert/js/Alert";
import { AlertContainer } from "./Alert/js/AlertContainer";
import { CardImg } from "./Cards/js/CardImg";
import { CardSimpleInfo } from "./Cards/js/CardSimpleInfo";
import { CardTextOn } from "./Cards/js/CardTextOn";
import { CardTextSliding } from "./Cards/js/CardTextSliding";
import { IndiaMap } from "./ExtraThings/js/IndiaMap";
import { Tooltip } from "./ExtraThings/js/Tooltip";
import { useAlerts } from "./Hooks/useAlert";
import { useAPICaller } from "./Hooks/useAPICaller";
import { Button } from "./InputFields/Actions/jsx/Button";
import { IconButton } from "./InputFields/Actions/jsx/IconButton";
import { ImageButton } from "./InputFields/Actions/jsx/ImageButton";
import { Link } from "./InputFields/Actions/jsx/Link";
import { EmailField } from "./InputFields/CommunicationInput/jsx/EmailInput";
import { MobileField } from "./InputFields/CommunicationInput/jsx/MobileInput";
import { Calendar } from "./InputFields/DateTimeInput/jsx/Calendar";
import { DatePicker } from "./InputFields/DateTimeInput/jsx/DatePicker";
import { TimePicker } from "./InputFields/DateTimeInput/jsx/TimePicker";
import { AddressField } from "./InputFields/Location/jsx/AddressField";
import { NumberField } from "./InputFields/NumericInput.jsx/jsx/NumberField";
import { Slider } from "./InputFields/NumericInput.jsx/jsx/Slider";
import { Stepper } from "./InputFields/NumericInput.jsx/jsx/Stepper";
import { OtpField } from "./InputFields/Security/jsx/OtpField";
import { PasswordField } from "./InputFields/Security/jsx/PasswordField";
import { SecurityQuestion } from "./InputFields/Security/jsx/SecurityQuestion";
import { CheckboxGroup } from "./InputFields/Selectors/jsx/CheckboxGroup";
import { ColorPicker } from "./InputFields/Selectors/jsx/ColorPicker";
import { Dropdown } from "./InputFields/Selectors/jsx/Dropdown";
import { RadioGroup } from "./InputFields/Selectors/jsx/RadioGroup";
import { SearchBox } from "./InputFields/Selectors/jsx/SearchBox";
import { Switch } from "./InputFields/Selectors/jsx/Switch";
import { JsonField } from "./InputFields/TextInput/jsx/JsonField";
import { Label } from "./InputFields/TextInput/jsx/Label";
import { TextArea } from "./InputFields/TextInput/jsx/TextArea";
import { TextField } from "./InputFields/TextInput/jsx/TextField";
import { AudioPlayer } from "./InputFields/Uploads/jsx/AudioPlayer";
import { AudioUpload } from "./InputFields/Uploads/jsx/AudioUpload";
import { FileUpload } from "./InputFields/Uploads/jsx/FileUpload";
import { ImagePreview } from "./InputFields/Uploads/jsx/ImagePreview";
import { ImageUpload } from "./InputFields/Uploads/jsx/ImageUpload";
import { VideoPlayer } from "./InputFields/Uploads/jsx/VideoPlayer";
import { VideoUpload } from "./InputFields/Uploads/jsx/VideoUpload";
import { apiCaller } from "./utils/apiCaller";
import { UtilsLogger } from "./utils/logger/logger.util";
import * as Icons from "./utils/icons";
import { Loading } from "./SpecialPages/js/Loading";
import { ErrorPage } from "./SpecialPages/js/ErrorPage";
import { IconError } from "./SpecialPages/js/IconError";
import { LoadingChat } from "./SpecialPages/js/LoadingChat";
import { FlexContainer } from "./Layout/Containers/jsx/FlexContainer";
import { GridContainer } from "./Layout/Containers/jsx/GridContainer";
import { PlainButton } from "./InputFields/Actions/jsx/PlainButton";
import { DropdownSimple } from "./InputFields/Selectors/jsx/DropdownSimple";
import { useSmartPosition } from "./Hooks/useSmartPosition";
import { useInfiniteScroll } from "./Hooks/useInfiniteScroll";
import { useLazyLoad } from "./Hooks/useLazyLoad";
import { useMediaQuery } from "./Hooks/useMediaQuery";
import { useOutsideClick } from "./Hooks/useOutsideClick";
import { useUserActiveOnTab } from "./Hooks/useUserActiveOnTab";
import { useUserPresentOnTab } from "./Hooks/useUserPresentOnTab";
import { Workspace } from "./Layout/Workspace/jsx/Workspace";
import { LockScreen } from "./Layout/Workspace/jsx/LockScreen";
import { fromKebabCase, toKebabCase } from "./utils/caseConverter";
import { getColorCode } from "./utils/COLOR";
import { delay } from "./utils/delay";
import { getRedirectBackUrl, redirectUrlWithBack } from "./utils/redirectToUrl";
import { setDocumentTitle } from "./utils/setDocumentTitle";
import { setFavicon } from "./utils/setFavicon";
import { redirectURL } from "./utils/redirectURL";
import { Stack } from "./utils/Stack";
import { AuthProvider, useAuth } from "./Context/jsx/AuthContext";
import {
  DynamicProvider,
  useDynamicContent,
} from "./Context/jsx/DynamicContext";
import { LoginForm } from "./Auth/js/LoginForm";
import { useQueryParams } from "./Hooks/useQueryParams";
import { Table } from "./Layout/Table/jsx/Table";

export const UIAlert = {
  Alert,
  AlertContainer,
  useAlerts,
};

export const UICards = {
  CardImg,
  CardSimpleInfo,
  CardTextOn,
  CardTextSliding,
};

export const UIExtra = {
  IndiaMap,
};

export const UIEssentials = {
  Tooltip,
  Table,
};

export const UIIcons = {
  Icons,
};

export const UIPages = {
  Loading,
  ErrorPage,
  IconError,
  LoadingChat,
  LockScreen,
  LoginForm,
};

export const UIInputs = {
  Actions: {
    PlainButton,
    Button,
    IconButton,
    ImageButton,
    Link,
  },
  Text: {
    TextField,
    TextArea,
    Label,
    JsonField,
    MobileField,
    EmailField,
    AddressField,
    NumberField,
    Stepper,
    Slider,
  },
  DateTime: {
    DatePicker,
    TimePicker,
    Calendar,
  },

  Security: {
    OtpField,
    PasswordField,
    SecurityQuestion,
  },

  Selectors: {
    Dropdown,
    DropdownSimple,
    SearchBox,
    ColorPicker,
    RadioGroup,
    Switch,
    CheckboxGroup,
  },

  Upload: {
    FileUpload,
    AudioPlayer,
    AudioUpload,
    ImagePreview,
    ImageUpload,
    VideoUpload,
    VideoPlayer,
  },
};

export const UILayout = {
  FlexContainer,
  GridContainer,
  Workspace,
};

export const UIHooks = {
  useSmartPosition,
  useAlerts,
  useAPICaller,
  useInfiniteScroll,
  useLazyLoad,
  useMediaQuery,
  useOutsideClick,
  useSmartPosition,
  useUserActiveOnTab,
  useUserPresentOnTab,
  useQueryParams,
};

export const UIUtils = {
  apiCaller,
  logger: UtilsLogger.logger,
  codeTypes: UtilsLogger.codeTypes,
  getTrackingCode: UtilsLogger.getTrackingCode,
  fromKebabCase,
  toKebabCase,
  getColorCode,
  delay,
  redirectURL,
  redirectUrlWithBack,
  getRedirectBackUrl,
  setDocumentTitle,
  setFavicon,
  Stack,
};

export const UIContext = {
  Auth: { AuthProvider, useAuth },
  Dynamic: { DynamicProvider, useDynamicContent },
};
