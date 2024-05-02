import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  getSpeeches as getSpeechesApi,
  createSpeech as createSpeechApi,
  updateSpeech as updateSpeechApi,
  removeSpeech as removeSpeechApi,
} from "../../helpers/fakebackend_helper";

export const createSpeech = createAsyncThunk(
  "speech/createSpeech",
  async ({ selectedIvrCampaignId, title, speechText, speechAudio }) => {
    try {
      const response = await createSpeechApi({
        ivrCampaignId: selectedIvrCampaignId,
        title,
        speechText,
        speechAudio,
      });

      console.log("create speech reponse in thunk ->", response);
      return response;
    } catch (error) {
      console.log("error in create speech thunk", error);
    }
  }
);
export const updateSpeech = createAsyncThunk(
  "speech/updateSpeech",
  async ({
    selectedIvrCampaignId,
    listSpeechId,
    title,
    speechText,
    speechAudio,
  }) => {
    try {
      const response = await updateSpeechApi({
        ivrCampaignId: selectedIvrCampaignId,
        speechId: listSpeechId,
        title,
        speechText,
        speechAudio,
      });

      console.log("update speech reponse in thunk ->", response);
      return response;
    } catch (error) {
      console.log("error in update speech thunk", error);
    }
  }
);
export const removeSpeech = createAsyncThunk(
  "speech/removeSpeech",
  async ({ selectedIvrCampaignId, listSpeechId }) => {
    try {
      const response = await removeSpeechApi({
        ivrCampaignId: selectedIvrCampaignId,
        speechId: listSpeechId,
      });

      return response;
    } catch (error) {
      console.log("error in delete speech thunk", error);
    }
  }
);
export const getSpeeches = createAsyncThunk("speech/getSpeeches", async () => {
  try {
    const response = await getSpeechesApi();

    console.log("get speeches reponse in thunk ->", response);
    return response;
  } catch (error) {
    console.log("error in get speeches thunk", error);
  }
});
