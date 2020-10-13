import React from "react";
import FormItem from "../components/FormItem";

const EditItems = (props) => {
  return (
    <div>
      <FormItem action="edit" id={props.match.params.id} />
    </div>
  );
};

export default EditItems;
