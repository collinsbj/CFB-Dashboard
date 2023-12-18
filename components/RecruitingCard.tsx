import PlayerListItem from "./PlayerListItem"

export default async function RecruitingCard({ year }) {
  const res = await fetch(
    `https://api.collegefootballdata.com/recruiting/players?year=${year}`,
    {
      headers: {
        Authorization: `Bearer ${process.env.API_KEY}`,
      },
    },
  )
  const data = await res.json()
  const players = data.sort((a, b) => a.ranking - b.ranking).slice(0, 100)

  return (
    <ul>
      {players.map((player) => {
        const feet = Math.floor(player.height / 12)
        const inches = player.height % 12

        return (
          <PlayerListItem
            key={JSON.stringify(player)}
            attributes={`${feet}ft ${!!inches ? `${inches}in` : ""} ${
              player.weight
            }lbs`}
            player={player}
            name={player.name}
            school={
              player.committedTo ? (
                <span className="font-bold">{player.committedTo}</span>
              ) : (
                "Uncommitted"
              )
            }
            highSchool={`${player.school} (${player.city}, ${player.stateProvince})`}
          />
        )
      })}
    </ul>
  )
}
