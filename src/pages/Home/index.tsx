import { Play } from "phosphor-react";
import { HomeContainer, CountdoenContainer, FormContainer, Separator, StartcountdownButton, TaskInput, MinutesAmountInput } from "./styles";
import { useForm } from 'react-hook-form'
import { zodResolver } from "@hookform/resolvers/zod"; 
import * as zod from 'zod';


export function Home() {
  const { register, handleSubmit,watch } = useForm()



  function handleCreateNewCycle(data:any) {
    console.log(data)
  }

  const task = watch( 'task')
  return (
    <HomeContainer>
      <form onSubmit={handleSubmit(handleCreateNewCycle)} action="">
        <FormContainer>
          <label htmlFor="">Vou trabalhar em </label>
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

          <label htmlFor="minutesAmout">durante</label>
          <MinutesAmountInput
            type="number" id="minutesAmount"
            placeholder="00"
            step={5}
            min={5}
            max={60}
            {...register('minutesAmount',{valueAsNumber:true})} />

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