import { useDispatch, useSelector } from "react-redux";
import { select, countUp } from "./state/slice";
// @ts-ignore
import styles from "./styles.module.scss";

export const Hello = () => {
  const dispatch = useDispatch();
  const count = useSelector(select).count;
  return (
    <div>
      <button onClick={() => dispatch(countUp({}))}>+1</button>
      <p>Hello! {count}</p>
    </div>
  );
};
