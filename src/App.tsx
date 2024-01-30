import * as React from "react";
import validator from "@rjsf/validator-ajv8";
import Form from "@rjsf/core";
import "./App.css";
import DynamicForm from "./dynamicForm/index.tsx";

function App() {
  const [dynamicForm, setDynamicForm] = React.useState<any>();

  const [schema, setSchema] = React.useState<any>({
    title: "مشخصات پمپ",
    description: "تغییرات مشخصات فرم",
    type: "object",
    properties: {},
  });

  const addNewProperty = (type: "string" | "number" | "boolean") => {
    const newPropertyName = prompt("نام فیلد مورد نظر را وارد نمایید");
    if (newPropertyName) {
      setSchema((prevFormData) => ({
        ...prevFormData,
        properties: {
          ...prevFormData.properties,
          [newPropertyName]: {
            type: type,
            title: newPropertyName,
          },
        },
      }));
    }
  };

  const removeProperty = () => {
    const propertyToRemove = prompt("نام فیلد مورد نظر جهت حذف :");
    if (propertyToRemove && schema.properties[propertyToRemove]) {
      const updatedProperties = { ...schema.properties };
      delete updatedProperties[propertyToRemove];

      setSchema((prevFormData) => ({
        ...prevFormData,
        properties: updatedProperties,
      }));
    }
  };
  const uiSchema = {};

  const handleSubmit: any = ({ formData }) => {
    localStorage.setItem("dynamicForm", JSON.stringify(formData));
  };

  return (
    <div className="App">
      <div className="container p-2">
        <div className="row">
          <div className="col-4">
            <div className="d-flex justify-content-center w-100">
              <button
                className="btn btn-primary p-1 m-1 w-100"
                onClick={() => addNewProperty("number")}
              >
                {" "}
                + مقدار عددی
              </button>
              <button
                className="btn btn-warning p-1 m-1 w-100"
                onClick={() => addNewProperty("boolean")}
              >
                {" "}
                + چک باکس
              </button>
              <button
                className="btn btn-success p-1 m-1 w-100"
                onClick={() => addNewProperty("string")}
              >
                {" "}
                + مقدار رشته ای
              </button>
            </div>
            <div className="d-flex justify-content-center w-100">
              <button
                className="btn btn-danger p-1 m-1 w-100"
                onClick={() => removeProperty()}
              >
                {" "}
                - مقدار عددی
              </button>
              <button
                className="btn btn-danger p-1 m-1 w-100"
                onClick={() => removeProperty()}
              >
                {" "}
                - چک باکس
              </button>
              <button
                className="btn btn-danger p-1 m-1 w-100"
                onClick={() => removeProperty()}
              >
                {" "}
                - مقدار رشته ای
              </button>
            </div>
            <Form
              schema={schema}
              uiSchema={uiSchema}
              formData={schema}
              onSubmit={handleSubmit}
              validator={validator}
            >
              <button
                className="btn btn-info"
                style={{ marginTop: "10px", width: "100%" }}
                type="submit"
              >
                ساخت فرم
              </button>
            </Form>
          </div>
          <div className="col-4"></div>
          <div className="col-4">
            <DynamicForm />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
