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
      addSkillToDB(state.addSkillNameForm, state.addSkillYomiForm, 1);
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
} = slice.actions;
