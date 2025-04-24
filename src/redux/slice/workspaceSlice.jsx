import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  workspaces: [],
  currentWorkspace: null,
  isLoading: false,
  error: null,
  hasCompletedOnboarding: false,
  workspace: {},
};

const workspaceSlice = createSlice({
  name: "workspace",
  initialState,
  reducers: {
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },

    setError: (state, action) => {
      state.error = action.payload;
      state.isLoading = false;
    },

    setWorkspaces: (state, action) => {
      state.workspaces = action.payload;
      state.error = null;
    },

    setCurrentWorkspace: (state, action) => {
      state.currentWorkspace = action.payload;
      state.error = null;
    },

    addWorkspace: (state, action) => {
      state.workspaces.push(action.payload);
      state.currentWorkspace = action.payload;
      state.hasCompletedOnboarding = true;
      state.error = null;
    },

    updateWorkspace: (state, action) => {
      const updatedWorkspace = action.payload;
      state.workspaces = state.workspaces.map((workspace) =>
        workspace._id === updatedWorkspace._id ? updatedWorkspace : workspace
      );
      if (state.currentWorkspace?._id === updatedWorkspace._id) {
        state.currentWorkspace = updatedWorkspace;
      }
    },

    setOnboardingStatus: (state, action) => {
      state.hasCompletedOnboarding = action.payload;
    },

    clearWorkspaceState: (state) => {
      state.workspaces = [];
      state.currentWorkspace = null;
      state.hasCompletedOnboarding = false;
      state.error = null;
    },
    setWorkspaceDetails: (state, action) => {
      state.workspace = action.payload;
    },

    updateWorkspaceDetails: (state, action) => {
      state.workspace.workspace = {
        ...state.workspace.workspace,
        ...action.payload,
      };
    },
  },
});

export const {
  setLoading,
  setError,
  setWorkspaces,
  setCurrentWorkspace,
  addWorkspace,
  updateWorkspace,
  setOnboardingStatus,
  clearWorkspaceState,
  setWorkspaceDetails,
  updateWorkspaceDetails,
} = workspaceSlice.actions;

export default workspaceSlice.reducer;
