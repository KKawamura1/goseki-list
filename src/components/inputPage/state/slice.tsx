import {
  createSlice,
  createEntityAdapter,
  EntityState,
} from "@reduxjs/toolkit";
import { Action } from "../../../commons/action";
import { addTalisman as addTalismanToDB } from "../utilities/addTalisman";
import { addSkill as addSkillToDB } from "../utilities/addSkill";

// State types
type TalismanEntityState = {
  id: number;
  name: string;
};
export type State = {
  talismans: EntityState<TalismanEntityState>;
  addTalismanTextForm: string;
  addSkillNameForm: string;
  addSkillYomiForm: string;
  addSkillSize: number;
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
    addTalismanTextForm: "",
    addSkillNameForm: "",
    addSkillYomiForm: "",
    addSkillSize: 0,
  } as State,
  reducers: {
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
    addSkill: (state) => {
      addSkillToDB(
        state.addSkillNameForm,
        state.addSkillYomiForm,
        state.addSkillSize
      );
      state.addSkillNameForm = "";
      state.addSkillYomiForm = "";
    },
    setTalismanTextForm: (state, action: Action<{ text: string }>) => {
      state.addTalismanTextForm = action.payload.text;
    },
    setSkillNameForm: (state, action: Action<{ text: string }>) => {
      state.addSkillNameForm = action.payload.text;
    },
    setSkillYomiForm: (state, action: Action<{ text: string }>) => {
      state.addSkillYomiForm = action.payload.text;
    },
    setSkillSize: (state, action: Action<{ id: number }>) => {
      state.addSkillSize = action.payload.id;
      console.log(state.addSkillSize);
    },
  },
  extraReducers: (builder) => {},
});

export const select = (state: ParentState): State => state.inputPage;
export const reducer = slice.reducer;
export const {
  addTalisman,
  addSkill,
  setTalismanTextForm,
  setSkillNameForm,
  setSkillYomiForm,
  setSkillSize,
} = slice.actions;
