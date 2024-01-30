import * as React from "react";
import validator from "@rjsf/validator-ajv8";
import Form from "@rjsf/core";
import { useEffect } from "react";

const DynamicForm: React.FunctionComponent<any> = () => {
  const [schema, setSchema] = React.useState<any>();
  useEffect(() => {
    setSchema(JSON.parse(localStorage.getItem("dynamicForm")!));
  }, []);

  return (
    <>
      <h3>فرم ساخته شده</h3>
      {schema && <Form schema={schema} children={true} validator={validator} />}
      <button
        className="btn btn-danger"
        onClick={() => {
          setSchema(undefined);
          localStorage.removeItem("dynamicForm");
        }}
      >
        حذف فرم
      </button>
    </>
  );
};

export default DynamicForm;
