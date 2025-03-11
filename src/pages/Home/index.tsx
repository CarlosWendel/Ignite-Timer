import { Play } from "phosphor-react";
import { HomeContainer, CountdoenContainer, FormContainer, Separator, StartcountdownButton, TaskInput, MinutesAmountInput } from "./styles";

export function Home() {
  return (
    <HomeContainer>
      <form action="">
        <FormContainer>
          <label htmlFor="">Vou trabalhar em </label>
          <TaskInput id="task" list="task-suggestions" placeholder="Dê um nome para seu projeto..."/>

        

          <datalist id="task-suggestions">
            <option value="Projeto 1" />
            <option value="Projeto 2" />
            <option value="Projeto 3" />
            <option value="Projeto 4" />
            <option value="banana" />
          </datalist>

          <label htmlFor="minutesAmout">durante</label>
          <MinutesAmountInput type="number" id="minutesAmount" placeholder="00" step={5} min={5} max={60} />

          <span>minutos.</span>
        </FormContainer>


        <CountdoenContainer>
          <span>0</span>
          <span>0</span>
          <Separator>:</Separator>
          <span>0</span>
          <span>0</span>
        </CountdoenContainer>

        <StartcountdownButton disabled type="submit">
          <Play size={24} />
          Começar
        </StartcountdownButton>

      </form>
    </HomeContainer>
  );
}