import { createContext, ReactNode, useReducer, useState } from "react";

interface CreateCycleDate {
  task: string,
  minutesAmount: number
}

interface Cycle {
  id: string,
  task: string,
  minutesAmount: number,
  startDate: Date,
  interruptedDate?: Date
  finishedDate?: Date,

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

export const CyclesContext = createContext({} as CyclesContextType)

export function CyclesContextProvider({ children }: CyclesContextProviderProps) {
  const [cycles, dispatch] = useReducer((state: Cycle[], action: any) => {

    if(action.type == 'ADD_NEW_CYCLE'){
      return [...state,action.payload.newCycle]
    }
    return state
  }, [])


  const [activeCycleId, setActiveCycleId] = useState<string | null>(null)
  const [amountSecondsPassed, setAmountSecondsPassed] = useState(0)

  const activeCycle = cycles.find((cycles) => cycles.id === activeCycleId)

  function setSecondsPassed(seconds: number) {
    setAmountSecondsPassed(seconds)
  }
  function markCurrentCycleAsFinished() {
    dispatch({
      type: 'MARK_CURRENT_CYCLE_AS_FINISHED',
      payload: {
        activeCycleId,
      }
    })
   /* setCycles(state => state.map(cycle => {
      if (cycle.id == activeCycleId) {
        return { ...cycle, finishedDate: new Date() }
      } else {
        return cycle;
      }
    }),
    )*/

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
      type: 'ADD_NEW_CYCLE',
      payload: {
         newCycle,
      }
    })

    // setCycles((state) => [...state, newCycle])
    setActiveCycleId(id)
    setAmountSecondsPassed(0)

  }


  function interruptCurrentCycle() {
    dispatch({
      type: 'INTERRUPT_CURRENT_CYCLE',
      payload: {
        activeCycleId,
      }
    })
    /*setCycles(state =>

      state.map(cycle => {
        if (cycle.id == activeCycleId) {
          return { ...cycle, interruptedDate: new Date() }
        } else {
          return cycle;
        }
      }),
    )
    setActiveCycleId(null)*/
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

