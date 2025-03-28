import { useEffect, useState } from "react";
import { CountdoenContainer, Separator } from "./styles";
import { differenceInSeconds } from "date-fns";


interface CountdownProps{
  activeCycle: any;
  setCycles:any;
  activeCycleId:any
}
export function Countdown ({activeCycle, setCycles,activeCycleId}: CountdownProps){

  const [amountSecondsPassed, setAmountSecondsPassed] = useState(0)
    const totalSeconds = activeCycle ? activeCycle.minutesAmount * 60 : 0;
    

    useEffect(() => {
        let interval: number;
    
        if (activeCycle) {
          interval = setInterval(() => {
    
            const secondsDiffernce = differenceInSeconds(new Date(), activeCycle.startDate)
    
            if (secondsDiffernce >= totalSeconds) {
              setCycles(state => state.map(cycle => {
                if (cycle.id == activeCycleId) {
                  return { ...cycle, finishedDate: new Date() }
                } else {
                  return cycle;
                }
              }),
              )
    
              setAmountSecondsPassed(totalSeconds)
              clearInterval(interval)
            } else {
              setAmountSecondsPassed(secondsDiffernce)
            }
          }, 1000)
        }
        return () => {
          clearInterval(interval)
        }
      }, [activeCycle, totalSeconds, activeCycleId])
    
      function handleCreateNewCycle(data: NewCycleFromData) {
        const id = String(new Date().getTime())
        const newCycle: Cycle = {
          id: id,
          task: data.task,
          minutesAmount: data.minutesAmount,
          startDate: new Date()
        }
    
        setCycles((state) => [...state, newCycle])
        setActiveCycleId(id)
        setAmountSecondsPassed(0)
        reset()
      }

    return(
        <CountdoenContainer>
          <span>{minutes[0]}</span>
          <span>{minutes[1]}</span>
          <Separator>:</Separator>
          <span>{seconds[0]}</span>
          <span>{seconds[1]}</span>
        </CountdoenContainer>
    )
}