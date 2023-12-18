import GameListItem from "./GameListItem"

export default async function GamesCard({ seasonType, week, year }) {
  let url = `https://api.collegefootballdata.com/games?year=${year}&division=fbs&`
  if (seasonType === "postseason") url += `seasonType=${seasonType}`
  else url += `week=${week}`

  const res = await fetch(url, {
    headers: {
      Authorization: `Bearer ${process.env.API_KEY}`,
    },
  })
  const data = await res.json()
  const games = data
    .slice(0, 100)
    .map((game) => {
      const isInProgress =
        !game.completed && new Date() > new Date(game.start_date)
      const gameStatus =
        new Date() < new Date(game.start_date)
          ? "Upcoming"
          : isInProgress
            ? "In progress"
            : "Final"

      game.status = gameStatus

      return game
    })
    .sort((a, b) => {
      if (a.status === "In progress" && b.status !== "In progress") return -1
      if (a.status !== "In progress" && b.status === "In progress") return 1
      return 0
    })

  return (
    <ul>
      {games.map((game) => (
        <GameListItem key={game.id} game={game}></GameListItem>
      ))}
    </ul>
  )
}
