import { createSlice } from "@reduxjs/toolkit";

// Create a slice to manage store navigation state
const storeNavigation = createSlice({
  name: "storeitemId", // Slice name (consider a more descriptive name)
  initialState: {
    storeStates: {
      id: false,
      editOption: false,
      invoice: true, // Initially set to true
      invoiceDetailes: false,
      sellers: false,
      items: false,
      issue_note: false,
      po: false,
    },
  },
  reducers: {
    changeTheStatusOfStoreState: (state, action) => {
      // Reset all states to false except the one being updated
      for (let key in state.storeStates) {
        if (key !== action.payload.key) {
          state.storeStates[key] = false;
        }
      }
      // Update the state specified in the action payload
      state.storeStates[action.payload.key] = action.payload.value;
    },
  },
});

// Export the action creator
export const {
  changeTheStatusOfStoreState,
} = storeNavigation.actions;

// Export the reducer
export default storeNavigation.reducer;
