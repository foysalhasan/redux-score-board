// SELECTING THE DOM ELEMENTS
const matchWrapper = document.querySelector('.all-matches')

// DEFAULT REDUX STORE
const defaultState = [
  {
    id: 1,
    score: 0,
  },
]

// ALL ACTIONS
const INCREAMENT = 'store/increament'
const DECREAMENT = 'store/decreament'
const ADDMATCH = 'match/add'
const DELETEMATCH = 'match/delete'
const RESETMATCH = 'match/reset'

// ACTION CREATOR
const increament = (payload) => {
  return {
    type: INCREAMENT,
    payload,
  }
}

const decreament = (payload) => {
  return {
    type: DECREAMENT,
    payload,
  }
}
const addMatch = () => {
  return {
    type: ADDMATCH,
  }
}

const resetMatch = () => {
  return {
    type: RESETMATCH,
  }
}
const deleteMatch = (id) => {
  return {
    type: DELETEMATCH,
    payload: id,
  }
}
const getId = (matches) => {
  const maxId = matches.reduce((acc, match) => {
    return Math.max(acc, match.id)
  }, -1)
  return maxId + 1
}

const counterReducer = (state = defaultState, action) => {
  if (action.type === ADDMATCH) {
    const id = getId(state)
    return [...state, { id: id, score: 0 }]
  } else if (action.type === DELETEMATCH) {
    return state.filter((match) => match.id !== action.payload)
  } else if (action.type === INCREAMENT) {
    return state.map((match) => {
      if (match.id === action.payload.id) {
        return {
          ...match,
          score: match.score + Number(action.payload.value),
        }
      } else {
        return match
      }
    })
  } else if (action.type === DECREAMENT) {
    return state.map((match) => {
      if (match.id === action.payload.id) {
        return {
          ...match,
          score: match.score - Number(action.payload.value) > 0 ? match.score - Number(action.payload.value) : 0,
        }
      } else {
        return match
      }
    })
  } else if (action.type === RESETMATCH) {
    const resetMatch = state.map((match) => {
      return {
        ...match,
        score: 0,
      }
    })
    return resetMatch
  } else {
    return state
  }
}

const store = Redux.createStore(counterReducer)

// RENDERING THE DOM
store.subscribe(render)
function render() {
  const state = store.getState()
  const allMatch = state
    .map((match) => {
      return `<div class="match">
    <div class="wrapper">
      <button class="lws-delete" onclick="deleteHandler(${match.id})">
        <img src="./image/delete.svg" alt="" />
      </button>
      <h3 class="lws-matchName">Match ${match.id}</h3>
    </div>
    <div class="inc-dec">
      <form class="incrementForm" onsubmit="doIncreament(event, ${match.id})">
        <h4>Increment</h4>
        <input type="number" name="increment" class="lws-increment" />
      </form>
      <form class="decrementForm" onsubmit="doDecreament(event, ${match.id})">
        <h4>Decrement</h4>
        <input type="number" name="decrement" class="lws-decrement" />
      </form>
    </div>
    <div class="numbers">
      <h2 class="lws-singleResult">${match.score}</h2>
    </div>
    </div>`
    })
    .join('')

  matchWrapper.innerHTML = allMatch
}

function doIncreament(event, id) {
  event.preventDefault()
  const value = Number(event.target.querySelector('input').value)
  store.dispatch(increament({ id, value }))
}
function doDecreament(event, id) {
  event.preventDefault()
  const value = Number(event.target.querySelector('input').value)
  store.dispatch(decreament({ id, value }))
}

function addMatchHandler() {
  store.dispatch(addMatch())
}
function resetHandler() {
  store.dispatch(resetMatch())
}

function deleteHandler(id) {
  store.dispatch(deleteMatch(id))
}
render()
