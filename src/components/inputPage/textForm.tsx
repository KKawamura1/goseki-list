import { Dispatch } from "react";
import { useDispatch, useSelector } from "react-redux";

// https://ja.reactjs.org/docs/forms.html

export type Props = {
  setMethod: Dispatch<{ text: string }>;
  selector: (state: any) => string;
};

export const TextForm = ({ setMethod, selector }: Props) => {
  const dispatch = useDispatch();
  const value = useSelector(selector);
  // const value = useSelector(select).addTalismanTextForm;
  return (
    <input
      type="text"
      value={value}
      onChange={(event) => {
        dispatch(setMethod({ text: event.target.value }));
      }}
    ></input>
  );
};
