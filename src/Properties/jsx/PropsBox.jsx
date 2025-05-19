import React, { lazy, Suspense, useContext } from "react";
import styles from "../css/PropsBox.module.css";
import Loading from "../../SpecialPages/js/Loading.jsx";
import { FormContext } from "../../FormBuilder/jsx/FormBuilder.jsx";
import { TakeTextFieldProp } from "../../FormBuilder/jsx/PropBuilder/TakeTextFieldProp.jsx";
const ShowComponents = lazy(() => import("./ShowComponents.jsx"));

const PropBox = ({ color }) => {
  let component;
  const { state, setFieldId } = useContext(FormContext);

  switch (state.fieldId) {
    case "C01":
      component = <ShowComponents setFieldId={setFieldId} color={color} />;
      break;
    case "CA025":
      component = (
        <TakeTextFieldProp
          setResult={(value) => {
            console.log(value);
          }}
          color={color}
        />
      );
      break;
    default:
      component = null;
  }

  return (
    <Suspense
      fallback={
        <Loading windowHeight="100%" windowWidth="100%" color={color} />
      }
    >
      <div className={styles.propBox}>{component}</div>
    </Suspense>
  );
};

export default React.memo(PropBox);
