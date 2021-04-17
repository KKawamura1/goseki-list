import { useDispatch } from "react-redux";
import { setTalismanTextForm } from "./state/slice";

// https://ja.reactjs.org/docs/forms.html

export const TextForm = () => {
  const dispatch = useDispatch();
  return (
    <input
      type="text"
      onChange={(event) => {
        dispatch(setTalismanTextForm({ text: event.target.value }));
      }}
    ></input>
  );
};
