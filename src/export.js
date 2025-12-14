"use client";

/**
 * @module @itsrighttime/ui-components
 * @description A reusable and customizable React UI components library
 */

import "./index.css";

import { Alert } from "./Alert/js/Alert.jsx";
import { AlertContainer } from "./Alert/js/AlertContainer.jsx";
import { CardImg } from "./Cards/js/CardImg.jsx";
import { CardSimpleInfo } from "./Cards/js/CardSimpleInfo.jsx";
import { CardTextOn } from "./Cards/js/CardTextOn.jsx";
import { CardTextSliding } from "./Cards/js/CardTextSliding.jsx";
import { IndiaMap } from "./ExtraThings/js/IndiaMap.jsx";
import { Tooltip } from "./ExtraThings/js/Tooltip.jsx";
import { useAlerts } from "./Hooks/useAlert.js";
import { useAPICaller } from "./Hooks/useAPICaller.js";
import { Button } from "./InputFields/Actions/jsx/Button.jsx";
import { IconButton } from "./InputFields/Actions/jsx/IconButton.jsx";
import { ImageButton } from "./InputFields/Actions/jsx/ImageButton.jsx";
import { Link } from "./InputFields/Actions/jsx/Link.jsx";
import { EmailField } from "./InputFields/CommunicationInput/jsx/EmailInput.jsx";
import { MobileField } from "./InputFields/CommunicationInput/jsx/MobileInput.jsx";
import { Calendar } from "./InputFields/DateTimeInput/jsx/Calendar.jsx";
import { DatePicker } from "./InputFields/DateTimeInput/jsx/DatePicker.jsx";
import { TimePicker } from "./InputFields/DateTimeInput/jsx/TimePicker.jsx";
import { AddressField } from "./InputFields/Location/jsx/AddressField.jsx";
import { NumberField } from "./InputFields/NumericInput.jsx/jsx/NumberField.jsx";
import { Slider } from "./InputFields/NumericInput.jsx/jsx/Slider.jsx";
import { Stepper } from "./InputFields/NumericInput.jsx/jsx/Stepper.jsx";
import { OtpField } from "./InputFields/Security/jsx/OtpField.jsx";
import { PasswordField } from "./InputFields/Security/jsx/PasswordField.jsx";
import { SecurityQuestion } from "./InputFields/Security/jsx/SecurityQuestion.jsx";
import { CheckboxGroup } from "./InputFields/Selectors/jsx/CheckboxGroup.jsx";
import { ColorPicker } from "./InputFields/Selectors/jsx/ColorPicker.jsx";
import { Dropdown } from "./InputFields/Selectors/jsx/Dropdown.jsx";
import { RadioGroup } from "./InputFields/Selectors/jsx/RadioGroup.jsx";
import { SearchBox } from "./InputFields/Selectors/jsx/SearchBox.jsx";
import { Switch } from "./InputFields/Selectors/jsx/Switch.jsx";
import { JsonField } from "./InputFields/TextInput/jsx/JsonField.jsx";
import { Label } from "./InputFields/TextInput/jsx/Label.jsx";
import { TextArea } from "./InputFields/TextInput/jsx/TextArea.jsx";
import { TextField } from "./InputFields/TextInput/jsx/TextField.jsx";
import { AudioPlayer } from "./InputFields/Uploads/jsx/AudioPlayer.jsx";
import { AudioUpload } from "./InputFields/Uploads/jsx/AudioUpload.jsx";
import { FileUpload } from "./InputFields/Uploads/jsx/FileUpload.jsx";
import { ImagePreview } from "./InputFields/Uploads/jsx/ImagePreview.jsx";
import { ImageUpload } from "./InputFields/Uploads/jsx/ImageUpload.jsx";
import { VideoPlayer } from "./InputFields/Uploads/jsx/VideoPlayer.jsx";
import { VideoUpload } from "./InputFields/Uploads/jsx/VideoUpload.jsx";
import { apiCaller } from "./utils/apiCaller.js";
import { UtilsLogger } from "./utils/logger/logger.util.js";
import * as Icons from "./utils/icons.jsx";
import { Loading } from "./SpecialPages/js/Loading.jsx";
import { ErrorPage } from "./SpecialPages/js/ErrorPage.jsx";
import { IconError } from "./SpecialPages/js/IconError.jsx";
import { LoadingChat } from "./SpecialPages/js/LoadingChat.jsx";
import { FlexContainer } from "./Layout/Containers/jsx/FlexContainer.jsx";
import { GridContainer } from "./Layout/Containers/jsx/GridContainer.jsx";
import { PlainButton } from "./InputFields/Actions/jsx/PlainButton.jsx";
import { DropdownSimple } from "./InputFields/Selectors/jsx/DropdownSimple.jsx";
import { useSmartPosition } from "./Hooks/useSmartPosition.js";
import { useInfiniteScroll } from "./Hooks/useInfiniteScroll.js";
import { useLazyLoad } from "./Hooks/useLazyLoad.js";
import { useMediaQuery } from "./Hooks/useMediaQuery.js";
import { useOutsideClick } from "./Hooks/useOutsideClick.js";
import { useUserActiveOnTab } from "./Hooks/useUserActiveOnTab.js";
import { useUserPresentOnTab } from "./Hooks/useUserPresentOnTab.js";
import { Workspace } from "./Layout/Workspace/jsx/Workspace.jsx";
import { LockScreen } from "./Layout/Workspace/jsx/LockScreen.jsx";
import { fromKebabCase, toKebabCase } from "./utils/caseConverter.js";
import { getColorCode } from "./utils/COLOR.js";
import { delay } from "./utils/delay.js";
import {
  getRedirectBackUrl,
  redirectUrlWithBack,
} from "./utils/redirectToUrl.js";
import { setDocumentTitle } from "./utils/setDocumentTitle.js";
import { setFavicon } from "./utils/setFavicon.js";
import { redirectURL } from "./utils/redirectURL.js";
import { Stack } from "./utils/Stack.js";
import { AuthProvider, useAuth } from "./Context/jsx/AuthContext.jsx";
import {
  DynamicProvider,
  useDynamicContent,
} from "./Context/jsx/DynamicContext.jsx";
import { LoginForm } from "./Auth/js/LoginForm.jsx";
import { useQueryParams } from "./Hooks/useQueryParams.js";
import { Table } from "./Layout/Table/jsx/Table.jsx";

import { Header } from "./Layout/Header/jsx/Header.jsx";
import { Footer } from "./Layout/Footer/jsx/Footer.jsx";
import { WebStructure } from "./Layout/WebStructure/jsx/WebStructure.jsx";
import { translator, useTranslator } from "./service/translator/index.js";
import { GenericForm } from "./Layout/Forms/jsx/GenericForm.jsx";
import { useSmartNavigate } from "./Hooks/useSmartNavigate.js";
import { FOOTER_BRANDS_KEYS } from "./Layout/Footer/helper/KEYS.js";
import {
  FIELDS_PROPS,
  FORM_FIELDS_TYPE,
} from "./Layout/Forms/validation/helper/fields.js";
import { UrlTextField } from "./InputFields/TextInput/jsx/UrlTextField.jsx";
import { OPERATORS } from "./Layout/Forms/validation/helper/operators.js";
import { isValidFormStructure } from "./Layout/Forms/validation/isValidFormStructure.js";
import { validateSchema } from "./Layout/Forms/validation/validateSchema.js";
import { configToSchema } from "./Layout/Forms/validation/configToSchema.js";
import { validateResponse } from "./Layout/Forms/validation/validateResponse.js";
import IconGallery from "./Usecases/Misc/IconGallery.jsx";

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
  Icons: Icons,
  IconGallery,
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
    UrlTextField,
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
  Form: GenericForm,
  Header,
  Footer,
  WebStructure,
  KEYS: { FORM_FIELDS_TYPE, OPERATORS, FOOTER_BRANDS_KEYS, FIELDS_PROPS },
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
  useSmartNavigate,
};

export const UIUtils = {
  apiCaller,
  logger: UtilsLogger.logger,
  codeTypes: UtilsLogger.codeTypes,
  getTrackingCode: UtilsLogger.getTrackingCode,
  setAllowedTypes: UtilsLogger.setAllowedTypes,
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
  form: {
    isValidFormStructure,
    validateSchema,
    configToSchema,
    validateResponse,
  },
};

export const UIContext = {
  Auth: { AuthProvider, useAuth },
  Dynamic: { DynamicProvider, useDynamicContent },
};

export const UIServices = {
  Translation: {
    useTranslator,
    translator,
  },
};

export default {
  UIAlert,
  UICards,
  UIExtra,
  UIEssentials,
  UIIcons,
  UIPages,
  UIInputs,
  UILayout,
  UIHooks,
  UIUtils,
};
