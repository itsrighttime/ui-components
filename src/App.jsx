import { useState } from "react";
import "./App.css";
import "./export.js";

import { BrowserRouter, Route, Routes } from "react-router-dom";
import { getProductLogo } from "./assets/productsLogo/productLogo.assets.js";
import { GenericForm } from "./Layout/Forms/jsx/GenericForm.jsx";
import { configData07 } from "./Layout/Forms/helper/data-07.js";
import { useEffect } from "react";
import { apiCaller } from "./utils/apiCaller.js";

const App = () => {
  const [formConfig, setFormConfig] = useState(null);
  useEffect(() => {
    const fetchData = async () => {
      const response = await apiCaller({
        endpoint: "http://localhost:4320/public/irt/candidate-form-config",
        method: "GET",
      });

      if (response.success) {
        setFormConfig(response.data.data);
      }
    };

    fetchData();
  }, []);

  return (
    <BrowserRouter>
      <div className="App">
        {formConfig && (
          <GenericForm
            config={formConfig}
            onSubmit={(value) => {
              console.log("Submited", value);
            }} // Your custom submission logic
            submitLabel="Create User"
            settings={{
              // showLabelAlways: true,
              color: "var(--colorDarkBlue)",
              width: "550px",

              gap: "3rem",
            }}
          />
        )}
      </div>
    </BrowserRouter>
  );
};

export default App;
