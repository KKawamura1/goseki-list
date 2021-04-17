import { Dispatch, ReactNode } from "react";
import { useDispatch, useSelector } from "react-redux";

// https://ja.reactjs.org/docs/forms.html

export type Props = {
  name: string;
  id: number;
  children: ReactNode;
  setMethod: Dispatch<{ id: number }>;
  selector: (state: any) => number;
};

export const RadioButtonForm = ({
  name,
  id,
  children,
  setMethod,
  selector,
}: Props) => {
  const dispatch = useDispatch();
  const selectedId = useSelector(selector);
  return (
    <label>
      <input
        type="radio"
        name={name}
        checked={id === selectedId}
        onChange={(event) => {
          dispatch(setMethod({ id: id }));
        }}
      ></input>
      {children}
    </label>
  );
};
