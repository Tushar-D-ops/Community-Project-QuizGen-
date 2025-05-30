// src/redux/quizSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { LogIn } from "lucide-react";

// 🔄 Async thunk to fetch quizzes from backend
export const fetchQuizzes = createAsyncThunk(
  "quiz/fetchQuizzes",
  async (_, { rejectWithValue }) => {
    const backend_url=import.meta.env.VITE_BACKEND_URL
    try {
      const response = await axios.get(backend_url+"/api/quizzes");
      console.log(response);
      
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Fetch failed");
    }
  }
);

const quizSlice = createSlice({
  name: "quiz",
  initialState: {
    newAdded: [],
    loading: false,
    error: null,
  },
  reducers: {
    addNewQuiz: (state, action) => {
      state.newAdded.unshift(action.payload); // push to top
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchQuizzes.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchQuizzes.fulfilled, (state, action) => {
        state.loading = false;
        state.newAdded = action.payload;
      })
      .addCase(fetchQuizzes.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { addNewQuiz } = quizSlice.actions;

export default quizSlice.reducer;
