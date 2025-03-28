import { useForm } from "react-hook-form";
import { FormContainer, MinutesAmountInput, TaskInput } from "./styles";
import { zodResolver } from '@hookform/resolvers/zod';
import * as zod from 'zod';

export function NewCycleForm(){

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
  
    const { register, handleSubmit, watch, reset } = useForm<NewCycleFromData>({
      resolver: zodResolver(newCycleFromValidatioSchema),
      defaultValues: {
        task: '',
        minutesAmount: 0,
      },
    });
    
    return(
        <FormContainer>
            
        <label htmlFor="task">Vou trabalhar em </label>
        <TaskInput
          id="task"
          list="task-suggestions"
          placeholder="Dê um nome para seu projeto..."
          disabled={!!activeCycle}
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
          min={1}
          max={60}
          disabled={!!activeCycle}
          {...register('minutesAmount', { valueAsNumber: true })}
        />

        <span>minutos.</span>
      </FormContainer>
    )
}