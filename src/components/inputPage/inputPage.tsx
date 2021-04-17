import { useDispatch } from "react-redux";
import {
  addTalisman,
  setTalismanSkillId,
  setTalismanSkillLevel,
  setTalismanSlotKind,
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
import { Skill, skillToString } from "../../commons/types/skill";
import { Talisman, talismanToString } from "../../commons/types/talisman";
// @ts-ignore
import styles from "./styles.module.scss";

export type Props = {
  skills: Skill[];
  talismans: Talisman[];
};

const slots: [number, number, number][] = [
  [0, 0, 0],
  [1, 0, 0],
  [1, 1, 0],
  [1, 1, 1],
  [2, 0, 0],
  [2, 1, 0],
  [2, 1, 1],
  [2, 2, 0],
  [2, 2, 1],
  [2, 2, 2],
  [3, 0, 0],
  [3, 1, 0],
  [3, 1, 1],
  [3, 2, 0],
  [3, 2, 1],
  [3, 2, 2],
  [3, 3, 0],
  [3, 3, 1],
  [3, 3, 2],
  [3, 3, 3],
];

export const InputPage = ({ skills, talismans }: Props) => {
  const dispatch = useDispatch();
  return (
    <div>
      <div>
        <h1>護石追加</h1>
        {[...new Array(2)].map((_, num) => (
          <div key={num}>
            <PullDownForm
              name={`talismanSkill${num}`}
              items={skills.map((skill) => skillToString(skill))}
              values={skills.map((skill) => skill.id)}
              placeHolder={true}
              setMethod={({ value }) =>
                setTalismanSkillId({ place: num, skillId: value })
              }
              // selector={(state) =>
              //   select(state).addTalisman.skills[num].skillId
              // }
            ></PullDownForm>
            <PullDownForm
              name={`talismanLevel${num}`}
              items={[...new Array(8)].map((_, num) => num)}
              values={[...new Array(8)].map((_, num) => num)}
              placeHolder={false}
              setMethod={({ value }) =>
                setTalismanSkillLevel({ place: num, skillLevel: value })
              }
              // selector={(state) => select(state).addTalisman.skills[num].level}
            ></PullDownForm>
          </div>
        ))}
        <PullDownForm
          name="talismanSlot"
          items={slots.map((slots) => `${slots[0]}-${slots[1]}-${slots[2]}`)}
          values={slots.map((_, index) => index)}
          placeHolder={false}
          setMethod={({ value }) => {
            const count = (target: number) =>
              slots[value]
                .map((slot) =>
                  slot === target ? (1 as number) : (0 as number)
                )
                .reduce((left, right) => left + right);
            return setTalismanSlotKind({
              slotSize: [count(1), count(2), count(3)],
            });
          }}
          // selector={(state) => select(state).addTalisman.slotSize}
        ></PullDownForm>
        <button onClick={() => dispatch(addTalisman())}>Add</button>
        <div>
          {talismans
            .map((talisman) =>
              talismanToString(
                (id) => skills.find((element) => element.id === id)?.name || "",
                talisman
              )
            )
            .map((text) => (
              <p>{text}</p>
            ))}
        </div>
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
        {[...new Array(4)].map((_, num) => (
          <RadioButtonForm
            name="slot"
            id={num + 1}
            key={num}
            setMethod={setSkillSize}
            // selector={(state) => select(state).addSkillSize}
          >
            {num === 3 ? "該当なし" : num}
          </RadioButtonForm>
        ))}
        <button onClick={() => dispatch(addSkill())}>Add</button>
      </div>
      <div>
        <h1>スキル削除</h1>
        <PullDownForm
          name="skillRemove"
          items={skills.map((skill) => skillToString(skill))}
          values={skills.map((skill) => skill.id)}
          placeHolder={true}
          setMethod={setRemoveSkillId}
          // selector={(state) => select(state).removeSkillId}
        ></PullDownForm>

        <button onClick={() => dispatch(removeSkill())}>削除</button>
      </div>
    </div>
  );
};
