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
  removeSkill,
  select,
} from "./state/slice";
import { TextForm } from "../forms/textForm";
import { RadioButtonForm } from "../forms/radioButtonForm";
import { PullDownForm } from "../forms/pullDownForm";
import { Skill } from "../../commons/types/skill";
// @ts-ignore
import styles from "./styles.module.scss";
import { Talisman } from "../../commons/types/talisman";

export type Props = {
  skills: Skill[];
  talismans: Talisman[];
};

export const InputPage = ({ skills, talismans }: Props) => {
  const dispatch = useDispatch();
  return (
    <div>
      {/* <div>
        <h1>護石追加</h1>
        <PullDownForm
          name="talismanSkill1"
          items={skills.map((skill) => skill.name)}
          setMethod={setRemoveSkillId}
          selector={(state) => select(state).removeSkillId}
        ></PullDownForm>
        <TextForm
          setMethod={setTalismanTextForm}
          selector={(state) => select(state).addTalismanTextForm}
        ></TextForm>
        <button onClick={() => dispatch(addTalisman())}>Add</button>
        <div>{talismans}</div>
      </div> */}
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
          items={skills.map((skill) => skill.name + " (" + skill.size + ")")}
          values={skills.map((skill) => skill.id)}
          setMethod={setRemoveSkillId}
          selector={(state) => select(state).removeSkillId}
        ></PullDownForm>

        <button onClick={() => dispatch(removeSkill())}>削除</button>
      </div>
    </div>
  );
};
