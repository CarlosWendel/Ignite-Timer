import { HandPalm, Play } from "phosphor-react";
import { HomeContainer, StartCountdownButton, StopCountdownButton } from "./styles";
import { zodResolver } from '@hookform/resolvers/zod';
import * as zod from 'zod';
import { createContext, useState } from "react";
import { Countdown } from "./components/Countdown";
import { NewCycleForm } from "./components/NewCycleForm";
import { FormProvider, useForm } from "react-hook-form";


interface Cycle {
  id: string,
  task: string,
  minutesAmount: number,
  startDate: Date,
  interruptedDate?: Date
  finishedDate?: Date,
 
}
interface CyclesContextType {
  activeCycle: Cycle | undefined,
  activeCycleId: string | null,
  markCurrentCycleAsFinished: () => void,
  amountSecondsPassed:number,
  setSecondsPassed:(seconds: number) => void
 

}
const newCycleFromValidatioSchema = zod.object({
  task: zod.string().min(1, 'Informe a tarefa'),
  minutesAmount: zod.number()
    .min(1, 'O ciclo precisa ser de no mínimo 5 minutos')
    .max(60, 'O ciclo precisa ser de no máximo 60 minutos'),
});

export const CyclesContext = createContext({} as CyclesContextType)

interface NewCycleFromData {
  task: string;
  minutesAmount: number;
}

export function Home() {
  const [cycles, setCycles] = useState<Cycle[]>([])
  const [activeCycleId, setActiveCycleId] = useState<string | null>(null)
  const [amountSecondsPassed, setAmountSecondsPassed] = useState(0)

  const newCycleForm = useForm<NewCycleFromData>({
    resolver: zodResolver(newCycleFromValidatioSchema),
    defaultValues: {
      task: '',
      minutesAmount: 0,
    },
  });
  const { handleSubmit, watch, reset } = newCycleForm

  const activeCycle = cycles.find((cycles) => cycles.id === activeCycleId)

  function setSecondsPassed(seconds: number){
    setAmountSecondsPassed(seconds)
  }
  function markCurrentCycleAsFinished() {
    setCycles(state => state.map(cycle => {
      if (cycle.id == activeCycleId) {
        return { ...cycle, finishedDate: new Date() }
      } else {
        return cycle;
      }
    }),
    )

  }

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



  function handleInterruptCycle() {


    setCycles(state =>
      state.map(cycle => {
        if (cycle.id == activeCycleId) {
          return { ...cycle, interruptedDate: new Date() }
        } else {
          return cycle;
        }
      }),
    )
    setActiveCycleId(null)
  }






  const task = watch('task');

  return (
    <HomeContainer>
      <form onSubmit={handleSubmit(handleCreateNewCycle)}>
        <CyclesContext.Provider value={{ activeCycle, activeCycleId, markCurrentCycleAsFinished,amountSecondsPassed,setSecondsPassed }}>
          <FormProvider {...newCycleForm}>
            <NewCycleForm />
          </FormProvider>
          <Countdown />
        </CyclesContext.Provider>



        {activeCycle ? (
          <StopCountdownButton onClick={handleInterruptCycle} type="button">
            <HandPalm size={24} />
            Interromper
          </StopCountdownButton>
        ) : (
          <StartCountdownButton disabled={!task} type="submit">
            <Play size={24} />
            Começar
          </StartCountdownButton>

        )
        }

      </form>
    </HomeContainer>
  );
}