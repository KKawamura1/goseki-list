import { createSlice } from "@reduxjs/toolkit";
import { Action } from "../../../commons/action";
import { addTalisman as addTalismanToDB } from "../utilities/addTalisman";
import { removeTalisman as removeTalismanFromDB } from "../utilities/removeTalisman";
import { addSkill as addSkillToDB } from "../utilities/addSkill";
import { removeSkill as removeSkillFromDB } from "../utilities/removeSkill";
import { NextRouter } from "next/dist/client/router";

// State types
export type State = {
  addTalisman: {
    skills: [
      { skillId: number | null; level: number },
      { skillId: number | null; level: number }
    ];
    slotSize: [number, number, number];
  };
  addSkillNameForm: string;
  addSkillYomiForm: string;
  addSkillSize: number;
  removeSkillId: number | null;
};
type ParentState = { inputPage: State };

// Main slice
const slice = createSlice({
  name: "inputPage", // ParentState と名前を合わせる必要がある
  initialState: {
    addTalisman: {
      skills: [
        { skillId: null, level: 0 },
        { skillId: null, level: 0 },
      ],
      slotSize: [0, 0, 0],
    },
    addSkillNameForm: "",
    addSkillYomiForm: "",
    addSkillSize: 0,
    removeSkillId: null,
  } as State,
  reducers: {
    // Add talisman
    addTalisman: (state, action: Action<{ router: NextRouter }>) => {
      addTalismanToDB({
        skill1Id: state.addTalisman.skills[0].skillId,
        level1: state.addTalisman.skills[0].level,
        skill2Id: state.addTalisman.skills[1].skillId,
        level2: state.addTalisman.skills[1].level,
        slot1: state.addTalisman.slotSize[0],
        slot2: state.addTalisman.slotSize[1],
        slot3: state.addTalisman.slotSize[2],
      }).finally(() => {
        action.payload.router.replace(action.payload.router.asPath);
      });
    },
    setTalismanSkillId: (
      state,
      action: Action<{ place: number; skillId: number }>
    ) => {
      state.addTalisman.skills[action.payload.place].skillId =
        action.payload.skillId;
    },
    setTalismanSkillLevel: (
      state,
      action: Action<{ place: number; skillLevel: number }>
    ) => {
      state.addTalisman.skills[action.payload.place].level =
        action.payload.skillLevel;
    },
    setTalismanSlotKind: (
      state,
      action: Action<{ slotSize: [number, number, number] }>
    ) => {
      state.addTalisman.slotSize = action.payload.slotSize;
    },
    // Remove talisman
    removeTalisman: (
      state,
      action: Action<{ talismanId: number; router: NextRouter }>
    ) => {
      removeTalismanFromDB(action.payload.talismanId).finally(() => {
        action.payload.router.replace(action.payload.router.asPath);
      });
    },
    // Add Skill
    addSkill: (state, action: Action<{ router: NextRouter }>) => {
      addSkillToDB(
        state.addSkillNameForm,
        state.addSkillYomiForm,
        state.addSkillSize
      ).finally(() => {
        // state.addSkillNameForm = "";
        // state.addSkillYomiForm = "";
        action.payload.router.replace(action.payload.router.asPath);
      });
    },
    setSkillNameForm: (state, action: Action<{ text: string }>) => {
      state.addSkillNameForm = action.payload.text;
    },
    setSkillYomiForm: (state, action: Action<{ text: string }>) => {
      state.addSkillYomiForm = action.payload.text;
    },
    setSkillSize: (state, action: Action<{ id: number }>) => {
      state.addSkillSize = action.payload.id;
    },
    // Remove Skill
    removeSkill: (state, action: Action<{ router: NextRouter }>) => {
      if (state.removeSkillId !== null) {
        removeSkillFromDB(state.removeSkillId).finally(() => {
          action.payload.router.replace(action.payload.router.asPath);
        });
      }
    },
    setRemoveSkillId: (state, action: Action<{ value: number }>) => {
      state.removeSkillId = action.payload.value;
    },
  },
  extraReducers: (builder) => {},
});

export const select = (state: ParentState): State => state.inputPage;
export const reducer = slice.reducer;
export const {
  addTalisman,
  setTalismanSkillId,
  setTalismanSkillLevel,
  setTalismanSlotKind,
  removeTalisman,
  addSkill,
  setSkillNameForm,
  setSkillYomiForm,
  setSkillSize,
  removeSkill,
  setRemoveSkillId,
} = slice.actions;
