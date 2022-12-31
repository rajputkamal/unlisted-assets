import { createStore } from 'redux';
import {combineReducers} from 'redux'

//for logos reducer
const initialStateLogosReducer = [
    {
        allLogos: new Map()
    }
]

async function chatUpdate(state, action) {

    //console.log("inside chatUpdate")
    // if (typeof state === 'undefined') {
    //     return false
    // }

    switch (action.type) {
        case 'chatupdated':
            return true

        default:
            return false
    }
}

async function logosUpdate(state=initialStateLogosReducer, action) {
    //console.log("inside logosUpdate")
    switch (action.type) {
        case 'logosUpdated':
            // console.log("yyyyyyyppppppppp232 message initiated11"+action.allLogos)
            return Object.assign({}, state, {
                allLogos: action.allLogos
            })

        default:
            return state
    }
}

const allReducers = combineReducers({
    //we access this by any key we want
    chatUpdate: chatUpdate,
    logosUpdate: logosUpdate
})


const store = createStore(allReducers)



export {store}

// dispatch({
//     type: 'logosUpdated', //action type
//     allLogos: data //payload information
// });


// store.getState().allLogos