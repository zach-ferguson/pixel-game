import { configureStore } from '@reduxjs/toolkit';
import galleryReducer from '../../Components/Gallery/gallerySlice.js'
import editorReducer from '../../Components/Create/editorSlice.js'

export default configureStore({
  reducer: {
    gallery: galleryReducer,
    editor: editorReducer,
  }
});
