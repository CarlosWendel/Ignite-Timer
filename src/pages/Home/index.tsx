import { Play } from "phosphor-react";
import { HomeContainer, CountdoenContainer, FormContainer, Separator, StartcountdownButton, TaskInput, MinutesAmountInput } from "./styles";
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod'; 
import * as zod from 'zod';
import { useState } from "react";

const newCycleFromValidatioSchema = zod.object({
  task: zod.string().min(1, 'Informe a tarefa'),
  minutesAmount: zod.number()
    .min(5, 'O ciclo precisa ser de no mínimo 5 minutos')
    .max(60, 'O ciclo precisa ser de no máximo 60 minutos'),
});

interface NewCycleFromData {
  task: string;
  minutesAmount: number;
}
interface Cycle{
  id:string,
  task: string,
  minutesAmount: number,
 
}

export function Home() {
  const[cycles, setCycles] = useState<Cycle[]>([])
  const[activeCycleId, setActiveCycleId]= useState<string | null>(null)


  const { register, handleSubmit, watch, reset } = useForm<NewCycleFromData>({
    resolver: zodResolver(newCycleFromValidatioSchema),
    defaultValues: {
      task: '',
      minutesAmount: 0,
    },
  });

  function handleCreateNewCycle(data: NewCycleFromData) {
    const id =String(new Date().getTime())
    const newCycle: Cycle = {
      id: id,
      task: data.task,
      minutesAmount: data.minutesAmount
    }

    setCycles((state)=>[...state, newCycle])
    setActiveCycleId(id)
    reset()
  }

  const activeCycle= cycles.find((cycles) => cycles.id === activeCycleId)
  const task = watch('task');

  return (
    <HomeContainer>
      <form onSubmit={handleSubmit(handleCreateNewCycle)}>
        <FormContainer>
          <label htmlFor="task">Vou trabalhar em </label>
          <TaskInput
            id="task"
            list="task-suggestions"
            placeholder="Dê um nome para seu projeto..."
            {...register('task')}
          />

          <datalist id="task-suggestions">
            <option value="Projeto 1" />
            <option value="Projeto 2" />
            <option value="Projeto 3" />
            <option value="Projeto 4" />
            <option value="banana" />
          </datalist>

          <label htmlFor="minutesAmount">durante</label>
          <MinutesAmountInput
            type="number"
            id="minutesAmount"
            placeholder="00"
            step={5}
            min={5}
            max={60}
            {...register('minutesAmount', { valueAsNumber: true })}
          />

          <span>minutos.</span>
        </FormContainer>

        <CountdoenContainer>
          <span>0</span>
          <span>0</span>
          <Separator>:</Separator>
          <span>0</span>
          <span>0</span>
        </CountdoenContainer>

        <StartcountdownButton disabled={!task} type="submit">
          <Play size={24} />
          Começar
        </StartcountdownButton>
      </form>
    </HomeContainer>
  );
}