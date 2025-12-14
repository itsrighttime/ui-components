import styles from "../css/ErrorPage.module.css";

/**
 * ErrorPage Component
 *
 * Displays a full-page error message with optional details and navigation.
 *
 * Props:
 * @param {string|number} statusCode - HTTP status code or custom error code (default: "404").
 * @param {string} ErrorMsg - Brief error message describing what went wrong (default: "not found").
 * @param {string|null} statusDetail - Optional detailed description of the error.
 * @param {string|number|null} responseCode - Optional response code from server or API.
 * @param {Function} handleNavigate - Callback function to navigate back or to a specified page.
 * @param {string} navigateTo - Label for the navigation link/button (default: "Home Page").
 *
 * Features:
 * - Renders an SVG warning icon alongside the status code.
 * - Displays main error message and optional detailed info.
 * - Provides a button for users to navigate back to a specified page.
 * - Fully styled via `ErrorPage.module.css`.
 *
 * @example
 * Usage:
 * <ErrorPage
 *   statusCode="500"
 *   ErrorMsg="server error"
 *   statusDetail="Database connection failed"
 *   responseCode="DB1001"
 *   handleNavigate={() => navigate("/")}
 *   navigateTo="Dashboard"
 * />
 */
export const ErrorPage = ({
  statusCode = "404",
  ErrorMsg = "not found",
  statusDetail = null,
  responseCode = null,
  handleNavigate,
  navigateTo = "Home Page",
}) => {
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <p className={styles.errorCode}>{statusCode}</p>
        <div className={styles.message}>
          <h1 id="pageTitle" className={styles.title}>
            <svg
              aria-hidden="true"
              className={styles.icon}
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
              />
            </svg>
            <span className={styles.titleText}>Oops! Page {statusCode}.</span>
          </h1>
          <p className={styles.description}>
            The page you are looking for was {ErrorMsg}.
          </p>
          {statusDetail && (
            <p className={styles.description}>
              <span className="boldL2">Detail:</span> {statusDetail}
            </p>
          )}
          {responseCode !== null && (
            <p className={styles.description}>
              <span className="boldL2">Response Code:</span> {responseCode}
            </p>
          )}
          <p className={styles.instruction}>
            You may return to{" "}
            <button
              className={styles.link}
              style={{ border: "none", background: "none", cursor: "pointer" }}
              onClick={handleNavigate}
            >
              {navigateTo}
            </button>{" "}
            or try using the correct URL.
          </p>
        </div>
      </div>
    </div>
  );
};
