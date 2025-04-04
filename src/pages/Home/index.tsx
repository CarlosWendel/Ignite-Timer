import { HandPalm, Play } from "phosphor-react";
import { HomeContainer, StartCountdownButton, StopCountdownButton } from "./styles";
import { zodResolver } from '@hookform/resolvers/zod';
import * as zod from 'zod';
import { createContext, useState } from "react";
import { Countdown } from "./components/Countdown";
import { NewCycleForm } from "./components/NewCycleForm";
import { FormProvider, useForm } from "react-hook-form";


const newCycleFromValidatioSchema = zod.object({
  task: zod.string().min(1, 'Informe a tarefa'),
  minutesAmount: zod.number()
    .min(1, 'O ciclo precisa ser de no mínimo 5 minutos')
    .max(60, 'O ciclo precisa ser de no máximo 60 minutos'),
});



interface NewCycleFromData {
  task: string;
  minutesAmount: number;
}

export function Home() {


  const newCycleForm = useForm<NewCycleFromData>({
    resolver: zodResolver(newCycleFromValidatioSchema),
    defaultValues: {
      task: '',
      minutesAmount: 0,
    },
  });
  const { handleSubmit, watch, reset } = newCycleForm

  

 
 





  const task = watch('task');

  return (
    <HomeContainer>
      <form onSubmit={handleSubmit(handleCreateNewCycle)}>
          <FormProvider {...newCycleForm}>
            <NewCycleForm />
          </FormProvider>
          <Countdown />
       



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