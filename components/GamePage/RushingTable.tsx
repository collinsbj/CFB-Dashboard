import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "../ui/table"

const Body = ({ athletes, playerCategories, team, teamCategories }) => {
  if (!athletes.length) {
    return (
      <TableRow className="h-7">
        <TableCell colSpan={playerCategories.length} className="text-center">
          No rushing data
        </TableCell>
      </TableRow>
    )
  }

  const values = {
    LONG: athletes.reduce(
      (prev, current) =>
        Number(prev) > Number(current.LONG) ? prev : current.LONG,
      "0",
    ),
  }

  teamCategories.forEach((category) => {
    if (!Object.keys(values).includes(category)) {
      values[category] = team.stats.find(
        (stat) => stat.category === category,
      ).stat
    }
  })

  return (
    <>
      {athletes.map(({ id, name, ...athlete }) => (
        <TableRow key={id} className="h-7">
          <TableCell className="text-left">{name}</TableCell>
          {playerCategories.map((category) => (
            <TableCell key={category}>{athlete[category]}</TableCell>
          ))}
        </TableRow>
      ))}

      <TableRow className="h-7 font-medium">
        <TableCell className="text-left">TEAM</TableCell>
        {teamCategories.map((category) => {
          return <TableCell key={category}>{values[category]}</TableCell>
        })}
      </TableRow>
    </>
  )
}

export default function RushingTable({ playerStats, team }) {
  const teamRushingCategories = [
    "rushingAttempts",
    "rushingYards",
    "yardsPerRushAttempt",
    "rushingTDs",
    "LONG",
  ]
  const playerRushingCategories = ["CAR", "YDS", "AVG", "TD", "LONG"]
  const rushingStats = playerStats.categories.find(
    (stat) => stat.name === "rushing",
  )
  let athletes = rushingStats.types.find((type) => type.name === "CAR").athletes
  athletes = athletes
    .map((athlete) => {
      playerRushingCategories.forEach((category) => {
        athlete[category] = rushingStats.types
          .find((type) => type.name === category)
          .athletes.find((a) => a.id === athlete.id).stat
      })

      return athlete
    })
    .sort((a, b) => Number(b.YDS) - Number(a.YDS))

  return (
    <div>
      <div className="text-sm font-medium flex items-center gap-2">
        <img src={team.logos[0]} className="h-4" />
        {team.school} rushing
      </div>

      <Table>
        <TableHeader>
          <TableRow className="h-7">
            <TableHead></TableHead>
            {playerRushingCategories.map((category) => (
              <TableHead key={category}>{category}</TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          <Body
            athletes={athletes}
            playerCategories={playerRushingCategories}
            teamCategories={teamRushingCategories}
            team={team}
          />
        </TableBody>
      </Table>
    </div>
  )
}
