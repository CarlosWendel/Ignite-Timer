import { Play } from "phosphor-react";
import { HomeContainer,CountdoenContainer, FormContainer } from "./styles";

export function Home() {
  return (
    <HomeContainer>
      <form action="">
        <FormContainer>
        <label htmlFor="">Vou trabalhar em </label>
        <input id="task" />

        <label htmlFor="">durante</label>
        <input type="number" id="minutesAmount" />

        <span>minutos.</span>


        <CountdoenContainer>
          <span>0</span>
          <span>0</span>
          <span>:</span>
          <span>0</span>
          <span>0</span>
        </CountdoenContainer>

        <button type="submit">
          <Play size={24}/>
          Começar
          </button>
          </FormContainer>
      </form>
    </HomeContainer>
  );
}