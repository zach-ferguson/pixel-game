import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import api from '../../Utils/api'

export const updatePixels = createAsyncThunk(
  'editor/updateGalleryItemPixel',
  async ({pixelId, newColor}, { getState }) => {
    var activeGalleryItem = getState().editor.activeGalleryItem
    const res = await api.patch('/gallery/pixel/' + activeGalleryItem._id, {
      pixelId: pixelId,
      newColor: newColor
    })
    return res.data
  }
) 

export const updateWidth = createAsyncThunk(
  'editor/updateGalleryItemWidth',
  async ({ newWidth }, { getState }) => {
    var activeGalleryItem = getState().editor.activeGalleryItem
    const res = await api.patch('/gallery/width/' + activeGalleryItem._id, {
      newWidth: newWidth,
    })
    return res.data
  }
) 
// id will go in {empty} once add full row/column is implemented
export const addNewPixel = createAsyncThunk(
  'editor/addPixelToGalleryItem',
  async ({empty}, { getState }) => {
    var activeGalleryItem = getState().editor.activeGalleryItem
    const res = await api.patch('/gallery/addPixel/' + activeGalleryItem._id )
    return res.data
  }
)

export const deletePixel = createAsyncThunk(
  'editor/deletePixelInGalleryItem',
  async ({ pixelId }, { getState }) => {
    var activeGalleryItem = getState().editor.activeGalleryItem
    const res = await api.patch('/gallery/deletePixel/' + activeGalleryItem._id,{ 
      pixelId: pixelId
    })
    return res.data
  }
)

export const createNewGalleryItem = createAsyncThunk(
  'editor/createNewGalleryItem',
  async ({ itemName, width, height, author, collabEnabled }) => {
    const res = await api.post('/gallery/new', {
      name: itemName,
      width: width,
      height: height,
      authors: [author],
      collab: collabEnabled
    })
    return res.data
  }
)

export const editGalleryItemTitle = createAsyncThunk(
  'editor/editGalleryItemTitle',
  async ({ newTitle}, { getState }) => {
    var activeGalleryItem = getState().editor.activeGalleryItem
    const res = await api.patch('/gallery/title/' + activeGalleryItem._id, {
      newTitle: newTitle
    })
    return res.data
  }
)

export const fetchGalleryItem = createAsyncThunk(
  'editor/fetchGalleryItem',
  async ({ id }) => {
    const res = await api.get('/gallery/' + id)
    return res.data
  }
)

export const editGalleryItemCollab = createAsyncThunk(
  'editor/editGalleryItemCollab',
  async ({ newCollabState }, { getState }) => {
    const activeGalleryItem = getState().editor.activeGalleryItem
    const res = await api.patch('/gallery/collab/' + activeGalleryItem._id, {
      collab: newCollabState,
    })
    return res.data
  }
)

export const forkActiveGalleryItem = createAsyncThunk(
  'editor/forkActiveGalleryItem',
  async ({ name, author, collab }, { getState }) => {
    var activeGalleryItem = getState().editor.activeGalleryItem
    const res = await api.post('/gallery/fork/' + activeGalleryItem._id, {
      name: name,
      authors: [author],
      collab: collab,
    })
    return res.data
  }
)

const editorSlice = createSlice({
  name: 'editor',
  initialState: {
    activeGalleryItem: {}
  },
  reducers:{
    setActiveGalleryItem(state, action){
      const { targetGalleryItem } = action.payload
      console.log('setActive Reducer, ', targetGalleryItem)
      state.activeGalleryItem = targetGalleryItem
    }
  },
  extraReducers(builder){
    builder
      // fetch galley item by id
      .addCase(fetchGalleryItem.fulfilled, (state, action) => {
        state.activeGalleryItem = action.payload
      })
      .addCase(fetchGalleryItem.rejected, (state, action) => {
        console.log('fetch gallery item failed')
      })

      // update a pixel in activeGalleryItem 
      .addCase(updatePixels.fulfilled, (state, action) => {
        state.activeGalleryItem = action.payload
      })
      .addCase(updatePixels.rejected, (state, action) => {
        console.log('update pixel failed')
      })

      // delete a pixel in activeGalleryItem 
      .addCase(deletePixel.fulfilled, (state, action) => {
        state.activeGalleryItem = action.payload
      })
      .addCase(deletePixel.rejected, (state, action) => {
        console.log('delete pixel failed')
      })

      // add a pixel in activeGalleryItem 
      .addCase(addNewPixel.fulfilled, (state, action) => {
        state.activeGalleryItem = action.payload
      })
      .addCase(addNewPixel.rejected, (state, action) => {
        console.log('delete pixel failed')
      })

      // update width in activeGalleryItem
      .addCase(updateWidth.fulfilled, (state, action) => {
        state.activeGalleryItem = action.payload
      })
      .addCase(updateWidth.rejected, (state, action) => {
        console.log('update width failed')
      })

      // create new activeGalleryItem
      .addCase(createNewGalleryItem.fulfilled, (state, action) => {
        state.activeGalleryItem = action.payload
      })
      .addCase(createNewGalleryItem.rejected, (state, action) => {
        console.log('new item creation failed')
      })

      // update activeGalleryItems title
      .addCase(editGalleryItemTitle.fulfilled, (state, action) => {
        state.activeGalleryItem = action.payload
        console.log(action.payload)
      })
      .addCase(editGalleryItemTitle.rejected, (state, action) => {
        console.log('title change failed')
      })

      // update activeGalleryItem's collab setting
      .addCase(editGalleryItemCollab.fulfilled, (state, action) => {
        state.activeGalleryItem = action.payload
        console.log(action.payload)
      })
      .addCase(editGalleryItemCollab.rejected, (state, action) => {
        console.log('collab setting change failed')
      })

      // fork activeGalleryItem
      .addCase(forkActiveGalleryItem.fulfilled, (state, action) => {
        state.activeGalleryItem = action.payload
        console.log(action.payload)
      })
      .addCase(forkActiveGalleryItem.rejected, (state, action) => {
        console.log('fork failed')
      })
  }
})

export const { setActiveGalleryItem } = editorSlice.actions

export default editorSlice.reducer