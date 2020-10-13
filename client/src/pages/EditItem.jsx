import React from "react";
import FormItem from "../components/Forms/FormItem";

const EditItem = (props) => {
  return (
    <div>
      <FormItem action="edit" id={props.match.params.id} />
    </div>
  );
};

export default EditItem;
