import React, { useState, useEffect } from 'react';
import './App.css';

interface user {
  name: string,
  tickets: number,
  percentage: number
}

function App() {
  const [users, setUsers] = useState<user[]>([]);
  const [name, setName] = useState("");
  const [tickets, setTickets] = useState(0);
  const [totalTickets, setTotalTickets] = useState(0);
  const [winner, setWinner] = useState("");
  const [winners, setWinners] = useState<string[]>([]);
  const [winnersQuantity, setWinnersQuantity] = useState(1);

  useEffect(() => {
    console.log(users)
    console.log(totalTickets)
  }, [users])

  function handleAdd(event: React.MouseEvent) {
    event.preventDefault();

    const _users = [...users.filter(user => user.name !== name), { name, tickets, percentage: 0 }]
    const totalTickets = _users.reduce((previous, current) => { return Number(previous) + Number(current.tickets) }, 0)
    _users.map(user => {
      user.percentage = (user.tickets * 100 / totalTickets).toFixed(2) as unknown as number
    })
    setUsers(_users)
    setTotalTickets(totalTickets)
  }

  function handleDraw(event: React.MouseEvent) {
    event.preventDefault();
    let entries: string[] = []
    users.forEach(user => {
      for (let index = 0; index < user.tickets; index++) {
        entries.push(user.name)
      }
    })
    
    const _winners: string[] = []

    for (let i = 0; i < winnersQuantity; i++) {
      const _winner = entries[Math.floor(Math.random() * entries.length)];
      _winners.push(_winner)
      console.log(_winner)
      entries = entries.filter(e => e !== _winner)
    }
    setWinners(_winners)
  }

  return (
    <div className="App">
      <form autoComplete="off">
        <h2>Adicionar Tickets</h2>
        <label htmlFor="name">Nome de Família</label>
        <input type="text" name="name" id="name" value={name} onChange={(e) => setName(e.target.value.toLowerCase())} />

        <label htmlFor="tickets">Tickets</label>
        <input type="number" name="tickets" id="tickets" value={tickets} onChange={(e) => setTickets(e.target.value as unknown as number)} />

        <button onClick={handleAdd}>Adicionar</button>
      </form>
      
      <div>
        {winners.length > 0 && (
          <span>
            <h1>Sorteados</h1>
            {winners.map(winner => (
              <h2>{winner}</h2>
            ))}
          </span>
        )}
        <label htmlFor="name">Quantidade de Sorteados</label>
        <input type="number" name="winnersQuantity" id="winnersQuantity" value={winnersQuantity} onChange={(e) => setWinnersQuantity(e.target.value as unknown as number)} />
        <button onClick={handleDraw}>Sortear</button>
      </div>
      <h2>Participantes</h2>
      <table>
        <thead>
          <tr>
            <th>Nome de Família</th>
            <th>Tickets</th>
            <th>Chance de Vitória</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user.name}>
              <td>{user.name}</td>
              <td>{user.tickets}</td>
              <td>{user.percentage}%</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;
