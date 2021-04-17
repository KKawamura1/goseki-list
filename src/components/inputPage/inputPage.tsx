import { useDispatch, useSelector } from "react-redux";
import {
  selectTalismanAll,
  addTalisman,
  setTalismanTextForm,
  addSkill,
  setSkillNameForm,
  setSkillYomiForm,
  select,
} from "./state/slice";
import { TextForm } from "./textForm";
// @ts-ignore
import styles from "./styles.module.scss";

export const InputPage = () => {
  const dispatch = useDispatch();
  const talismans = useSelector(selectTalismanAll).map((talisman) => (
    <p key={talisman.id}>{talisman.name}</p>
  ));
  return (
    <div>
      <div>
        <h1>護石追加</h1>
        <TextForm
          setMethod={setTalismanTextForm}
          selector={(state) => select(state).addTalismanTextForm}
        ></TextForm>
        <button onClick={() => dispatch(addTalisman())}>Add</button>
        <div>{talismans}</div>
      </div>
      <div>
        <h1>スキル追加</h1>
        <TextForm
          setMethod={setSkillNameForm}
          selector={(state) => select(state).addSkillNameForm}
        ></TextForm>
        <TextForm
          setMethod={setSkillYomiForm}
          selector={(state) => select(state).addSkillYomiForm}
        ></TextForm>
        <button onClick={() => dispatch(addSkill())}>Add</button>
      </div>
    </div>
  );
};
