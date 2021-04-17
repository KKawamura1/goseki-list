import { useDispatch, useSelector } from "react-redux";
import { selectTalismanAll, addTalisman, select } from "./state/slice";
import { TextForm } from "./textForm";
// @ts-ignore
import styles from "./styles.module.scss";

export const InputPage = () => {
  const dispatch = useDispatch();
  const talismans = useSelector(selectTalismanAll).map((talisman) => (
    <p>{talisman.name}</p>
  ));
  return (
    <div>
      <TextForm></TextForm>
      <button onClick={() => dispatch(addTalisman())}>Add</button>
      <div>{talismans}</div>
    </div>
  );
};
