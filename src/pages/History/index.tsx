import { useContext } from "react";
import {formatDistanceToNow} from 'date-fns'
import { HistoryContainer, HistoryList, Status } from "./styles";
import { CyclesContext } from "../../contexts/CyclesContext";


export function History() {
    const {cycles}= useContext(CyclesContext)
    return (
        <HistoryContainer>
            <h1>My history</h1>


            <HistoryList>
                <table>
                    <thead>
                        <tr>
                            <th>Tarefa</th>
                            <th>Discusão</th>
                            <th>Inicio</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                      {cycles.map((cycle)=>{
                        return(
                            <tr key={cycle.id}>
                                <td>{cycle.task}</td>
                                <td>{cycle.minutesAmount} minutos </td>
                                <td>{formatDistanceToNow(cycle.startDate,{
                                    addSuffix: true,
                                })}</td>
                                <td>
                                    {cycle.finishedDate && (<Status statusColor="green">Concluido</Status>)}

                                    {cycle.interruptedDate && (<Status statusColor="red">Interronpido</Status>)}

                                    {!cycle.finishedDate && !cycle.interruptedDate && (<Status statusColor="yellow">Em andamento</Status>)}
                                </td>
                            </tr>
                        )
                      })}
                    </tbody>
                </table>
            </HistoryList>
        </HistoryContainer>
    );
} 