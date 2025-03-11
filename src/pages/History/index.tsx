import { HistoryContainer, HistoryList, Status } from "./styles";


export function History() {
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
                        <tr>
                            <td>Tarfefas</td>
                            <td>20 minutes</td>
                            <td>Há 2 meses</td>
                            <td>
                                <Status statusColor='green'>Concluido</Status >
                            </td>
                        </tr>
                        <tr>
                            <td>Tarfefas</td>
                            <td>20 minutes</td>
                            <td>Há 2 meses</td>
                            <td>
                                <Status statusColor="green">Concluido</Status>
                            </td>
                        </tr>
                        <tr>
                            <td>Tarfefas</td>
                            <td>20 minutes</td>
                            <td>Há 2 meses</td>
                            <td>
                                <Status statusColor="yellow">Em andamento</Status>
                            </td>
                        </tr>
                        <tr>
                            <td>Tarfefas</td>
                            <td>20 minutes</td>
                            <td>Há 2 meses</td>
                            <td>
                                <Status statusColor="red">Interropido</Status>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </HistoryList>
        </HistoryContainer>
    );
} 