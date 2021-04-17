import { useDispatch, useSelector } from "react-redux";
import { setTalismanTextForm, select } from "./state/slice";

// https://ja.reactjs.org/docs/forms.html

export const TextForm = () => {
  const dispatch = useDispatch();
  const value = useSelector(select).addTalismanTextForm;
  return (
    <input
      type="text"
      value={value}
      onChange={(event) => {
        dispatch(setTalismanTextForm({ text: event.target.value }));
      }}
    ></input>
  );
};
