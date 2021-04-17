import {
  createSlice,
  createEntityAdapter,
  EntityState,
} from "@reduxjs/toolkit";
import { Action } from "../../../commons/action";
import { addTalisman as addTalismanToDB } from "../utilities/addTalisman";
import { addSkill as addSkillToDB } from "../utilities/addSkill";
import { removeSkill as removeSkillFromDB } from "../utilities/removeSkill";

// State types
type TalismanEntityState = {
  id: number;
  name: string;
};
export type State = {
  talismans: EntityState<TalismanEntityState>;
  addTalismanSkillId: number,
  addTalismanTextForm: string;
  addSkillNameForm: string;
  addSkillYomiForm: string;
  addSkillSize: number;
  removeSkillId: number;
};
type ParentState = { inputPage: State };

// Entity adapters
const talismanAdapter = createEntityAdapter<TalismanEntityState>({
  selectId: (talisman) => talisman.id,
});
const initialTalismanEntityState = talismanAdapter.getInitialState();
export const {
  selectIds: selectTalismanIds,
  selectAll: selectTalismanAll,
} = talismanAdapter.getSelectors(
  (state: ParentState) => state.inputPage.talismans
);

// Main slice
const slice = createSlice({
  name: "inputPage", // ParentState と名前を合わせる必要がある
  initialState: {
    talismans: initialTalismanEntityState,
    addTalismanSkillId: "",
    addTalismanTextForm: "",
    addSkillNameForm: "",
    addSkillYomiForm: "",
    addSkillSize: 0,
    removeSkillId: 0,
  } as State,
  reducers: {
    // Add talisman
    addTalisman: (state) => {
      const ids = state.talismans.ids.map((id) => {
        if (typeof id === "string") {
          throw Error("No way!");
        }
        return id;
      });
      const newId = Math.max(...ids, 0) + 1;
      const newName = state.addTalismanTextForm;
      talismanAdapter.addOne(state.talismans, { id: newId, name: newName });
      addTalismanToDB(newName);
      state.addTalismanTextForm = "";
    },
    setTalismanTextForm: (state, action: Action<{ text: string }>) => {
      state.addTalismanTextForm = action.payload.text;
    },
    // Add Skill
    addSkill: (state) => {
      addSkillToDB(
        state.addSkillNameForm,
        state.addSkillYomiForm,
        state.addSkillSize
      );
      state.addSkillNameForm = "";
      state.addSkillYomiForm = "";
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
    removeSkill: (
      state,
      action: Action<{ idToSkillId: (selectId: number) => number }>
    ) => {
      removeSkillFromDB(action.payload.idToSkillId(state.removeSkillId));
    },
    setRemoveSkillId: (state, action: Action<{ value: number }>) => {
      state.removeSkillId = action.payload.value;
      console.log(state.removeSkillId);
    },
  },
  extraReducers: (builder) => {},
});

export const select = (state: ParentState): State => state.inputPage;
export const reducer = slice.reducer;
export const {
  addTalisman,
  setTalismanTextForm,
  addSkill,
  setSkillNameForm,
  setSkillYomiForm,
  setSkillSize,
  removeSkill,
  setRemoveSkillId,
} = slice.actions;
