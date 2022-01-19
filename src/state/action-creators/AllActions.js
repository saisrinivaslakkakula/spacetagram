import axios from 'axios';
import {
  FETCH_ALL_PHOTOS,
  LIKE_IMAGE,
} from './types';

export const fetchAllData = () => async (dispatch) => {

    const result = await axios.get('https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?sol=1000&api_key=nyrqd1Ggq3ea8EVknJHtgetZDmBCBDRhBTvjsERU')
    const {data} = result
   const {photos} = data
   var modifiedData = []
   photos.map(item=>{
     const itemModified = {
       ...item,
       liked:false
     }
     modifiedData.push(itemModified)
   }
    )
    console.log(modifiedData)
    dispatch({
      type: FETCH_ALL_PHOTOS,
      payload: modifiedData.slice(0,100),
    })
    
};

export const likeImage = (data) => async (dispatch) => {
  dispatch({
    type:   LIKE_IMAGE,
    payload: data,
  })
}


