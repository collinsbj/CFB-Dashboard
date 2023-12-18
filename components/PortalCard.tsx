import PlayerListItem from "./PlayerListItem"

export default async function PortalCard({ year }) {
  const res = await fetch(
    `https://api.collegefootballdata.com/player/portal?year=${year}`,
    {
      headers: {
        Authorization: `Bearer ${process.env.API_KEY}`,
      },
    },
  )
  const data = await res.json()
  const players = data
    .filter((player) => player.destination === null)
    .sort((a, b) => b.rating - a.rating)
    .sort((a, b) => b.stars - a.stars)
    .slice(0, 100)

  return (
    <ul>
      {players.map((player) => (
        <PlayerListItem
          key={JSON.stringify(player)}
          player={player}
          name={`${player.firstName} ${player.lastName}`}
          school={<span className="font-bold">{player.origin}</span>}
        />
      ))}
    </ul>
  )
}
