import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { LogEvent } from "../types/log";

interface LogsState {
  events: LogEvent[];
  stats: any;
}

const initialState: LogsState = {
  events: [],
  stats: null,
};

const logsSlice = createSlice({
  name: "logs",
  initialState,
  reducers: {
    logReceived(state, action: PayloadAction<{ event: LogEvent; stats: any }>) {
      state.events.push(action.payload.event);
      state.stats = action.payload.stats;

      if (state.events.length > 5000) {
        state.events.shift();
      }
    },
  },
});

export const { logReceived } = logsSlice.actions;
export default logsSlice.reducer;
