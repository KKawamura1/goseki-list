import { Dispatch, ReactNode } from "react";
import { useDispatch, useSelector } from "react-redux";

// https://ja.reactjs.org/docs/forms.html

export type Props = {
  name: string;
  items: ReactNode[];
  values: Number[];
  setMethod: Dispatch<{ value: number }>;
  // selector: (state: any) => number;
};

export const PullDownForm = ({
  name,
  items,
  values,
  setMethod,
  // selector,
}: Props) => {
  const dispatch = useDispatch();
  // const value = useSelector(selector);
  const options = items.map((item, index) => (
    <option key={index} value={values[index].toString()}>
      {item}
    </option>
  ));
  return (
    <select
      name={name}
      // value={value}
      required
      onChange={(event) => {
        dispatch(setMethod({ value: Number(event.target.value) }));
      }}
    >
      {options}
    </select>
  );
};
