import PlayerListItem from "./PlayerListItem"
import { Button } from "./ui/button"
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "./ui/card"

export default async function TransfersCard({ year }) {
  const res = await fetch(
    `https://api.collegefootballdata.com/player/portal?year=${year}`,
    {
      headers: {
        Authorization: `Bearer ${process.env.API_KEY}`,
      },
    },
  )
  const data = await res.json()

  const sortedData = data
    .sort((a, b) => b.rating - a.rating)
    .sort((a, b) => b.stars - a.stars)
    .slice(0, 100)

  const transfers = sortedData.filter((player) => player.destination !== null)

  return (
    <ul>
      {transfers.map((player) => (
        <PlayerListItem
          key={JSON.stringify(player)}
          player={player}
          name={`${player.firstName} ${player.lastName}`}
          school={
            <>
              {player.destination && (
                <>
                  <span className="font-bold">{player.destination}</span> from
                </>
              )}{" "}
              <span className="font-bold">{player.origin}</span>
            </>
          }
        />
      ))}
    </ul>
  )
}
