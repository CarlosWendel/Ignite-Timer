import { createContext, ReactNode, useReducer, useState } from "react";
import {ActionTypes, Cycle, cyclesReducer} from '../reducers/cycles'

interface CreateCycleDate {
  task: string,
  minutesAmount: number
}


interface CyclesContextType {
  cycles: Cycle[]
  activeCycle: Cycle | undefined,
  activeCycleId: string | null,
  markCurrentCycleAsFinished: () => void,
  amountSecondsPassed: number,
  setSecondsPassed: (seconds: number) => void,
  createNewCycle: (Date: CreateCycleDate) => void,
  interruptCurrentCycle: () => void



}


interface CyclesContextProviderProps {

  children: ReactNode
}

// eslint-disable-next-line react-refresh/only-export-components
export const CyclesContext = createContext({} as CyclesContextType)



export function CyclesContextProvider({ children }: CyclesContextProviderProps) {
  const [cyclesState, dispatch] = useReducer(cyclesReducer,{
    cycles:[],
    activeCycleId: null
  })


  const {cycles, activeCycleId }=cyclesState;

  const [amountSecondsPassed, setAmountSecondsPassed] = useState(0)

  const activeCycle = cycles.find((cycles) => cycles.id === activeCycleId)

  function setSecondsPassed(seconds: number) {
    setAmountSecondsPassed(seconds)
  }
  function markCurrentCycleAsFinished() {
    dispatch({
      type: ActionTypes.MARK_CURRENT_CYCLE_AS_FINISHED,
      payload: {
        activeCycleId,
      }
    })
  }

  function createNewCycle(data: CreateCycleDate) {
    const id = String(new Date().getTime())
    const newCycle: Cycle = {
      id: id,
      task: data.task,
      minutesAmount: data.minutesAmount,
      startDate: new Date()
    }

    dispatch({
      type: ActionTypes.ADD_NEW_CYCLE,
      payload: {
         newCycle,
      }
    })
    
    setAmountSecondsPassed(0)

  }


  function interruptCurrentCycle() {
    dispatch({
      type: ActionTypes.INTERRUPT_CURRENT_CYCLE,
      payload: {
        activeCycleId,
      }
    })
   
  }



  return (
    <CyclesContext.Provider value={{
      activeCycle,
      activeCycleId,
      markCurrentCycleAsFinished,
      amountSecondsPassed,
      setSecondsPassed,
      createNewCycle,
      interruptCurrentCycle,
      cycles
    }}>
      {children}
    </CyclesContext.Provider>
  )
}

