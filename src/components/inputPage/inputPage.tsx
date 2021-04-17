import { useDispatch, useSelector } from "react-redux";
import {
  selectTalismanAll,
  addTalisman,
  setTalismanTextForm,
  addSkill,
  setSkillNameForm,
  setSkillYomiForm,
  setSkillSize,
  setRemoveSkillId,
  select,
} from "./state/slice";
import { TextForm } from "../forms/textForm";
import { RadioButtonForm } from "../forms/radioButtonForm";
import { PullDownForm } from "../forms/pullDownForm";
import { Skill } from "../../commons/types/skill";
// @ts-ignore
import styles from "./styles.module.scss";

export type Props = {
  skills: Skill[];
};

export const InputPage = ({ skills }: Props) => {
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
        <p>名前</p>
        <TextForm
          setMethod={setSkillNameForm}
          selector={(state) => select(state).addSkillNameForm}
        ></TextForm>
        <p>よみ</p>
        <TextForm
          setMethod={setSkillYomiForm}
          selector={(state) => select(state).addSkillYomiForm}
        ></TextForm>
        <p>必要スロット</p>
        <RadioButtonForm
          name="slot"
          id={1}
          setMethod={setSkillSize}
          selector={(state) => select(state).addSkillSize}
        >
          1
        </RadioButtonForm>
        <RadioButtonForm
          name="slot"
          id={2}
          setMethod={setSkillSize}
          selector={(state) => select(state).addSkillSize}
        >
          2
        </RadioButtonForm>

        <RadioButtonForm
          name="slot"
          id={3}
          setMethod={setSkillSize}
          selector={(state) => select(state).addSkillSize}
        >
          3
        </RadioButtonForm>

        <RadioButtonForm
          name="slot"
          id={4}
          setMethod={setSkillSize}
          selector={(state) => select(state).addSkillSize}
        >
          該当なし
        </RadioButtonForm>

        <button onClick={() => dispatch(addSkill())}>Add</button>
      </div>
      <div>
        <h1>スキル削除</h1>
        <PullDownForm
          name="skillRemove"
          items={skills.map((skill) => skill.name)}
          setMethod={setRemoveSkillId}
          selector={(state) => select(state).removeSkillId}
        ></PullDownForm>
      </div>
    </div>
  );
};
