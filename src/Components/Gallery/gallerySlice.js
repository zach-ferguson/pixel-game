import { createAsyncThunk, createEntityAdapter, createSlice } from '@reduxjs/toolkit'
import api from '../../Utils/api'

const galleryItemsAdapter = createEntityAdapter({
  sortComparer: (a, b) => b.date.localeCompare(a.date)
})

const initialState = galleryItemsAdapter.getInitialState({
  status: 'idle',
  error: null,
})

// thunks

export const fetchGalleryItems = createAsyncThunk(
  'gallery/fetchGalleryItems',
  async () => {
    const res = await api.get('/gallery')
    console.log('gallery', res.data)
    return res.data
  }
)

export const gallerySlice = createSlice({
  name: 'gallery',
  initialState,
  reducers: {
    updateGalleryItem(state, action){
      const { id, newGalleryItem } = action.payload
      console.log(id, newGalleryItem, 'ooga')
      //galleryItemsAdapter.updateOne(id, newGalleryItem)
    }
  },
  extraReducers(builder){
    builder
      // fetch gallery items
      .addCase(fetchGalleryItems.pending, (state, action) => {
        state.status = 'loading'
      }) 
      .addCase(fetchGalleryItems.fulfilled, (state, action) => {
        state.status = 'succeeded'
        galleryItemsAdapter.upsertMany(state, action.payload)
      })
      .addCase(fetchGalleryItems.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message
      })
  }
})

export default gallerySlice.reducer

export const {
  selectAll: selectAllGalleryItems,
  selectById: selectGalleryItemById,
  selectIds: selectGalleryItemIds
} = galleryItemsAdapter.getSelectors(state => state.gallery)

