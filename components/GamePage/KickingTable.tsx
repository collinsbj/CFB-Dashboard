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
          No kicking data
        </TableCell>
      </TableRow>
    )
  }

  const values = {
    FG: athletes.reduce((prev, current) => {
      const [prevMade, prevAttempted] = prev.split("/")
      const [currentMade, currentAttempted] = current.FG.split("/")

      return `${Number(prevMade) + Number(currentMade)}/${
        Number(prevAttempted) + Number(currentAttempted)
      }`
    }, "0/0"),
    XP: athletes.reduce((prev, current) => {
      const [prevMade, prevAttempted] = prev.split("/")
      const [currentMade, currentAttempted] = current.XP.split("/")

      return `${Number(prevMade) + Number(currentMade)}/${
        Number(prevAttempted) + Number(currentAttempted)
      }`
    }, "0/0"),
    LONG: athletes.reduce(
      (prev, current) =>
        Number(prev) > Number(current.LONG) ? prev : current.LONG,
      "0",
    ),
  }

  values.PCT = (
    (values.FG.split("/")[0] / values.FG.split("/")[1]) * 100 || 0
  ).toFixed(1)

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

export default function KickingTable({ playerStats, team }) {
  const teamKickingCategories = ["FG", "PCT", "LONG", "XP", "kickingPoints"]
  const playerKickingCategories = ["FG", "PCT", "LONG", "XP", "PTS"]
  const kickingStats = playerStats.categories.find(
    (stat) => stat.name === "kicking",
  )
  let athletes = kickingStats.types.find((type) => type.name === "FG").athletes
  athletes = athletes
    .map((athlete) => {
      playerKickingCategories.forEach((category) => {
        athlete[category] = kickingStats.types
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
        {team.school} kicking
      </div>

      <Table>
        <TableHeader>
          <TableRow className="h-7">
            <TableHead></TableHead>
            {playerKickingCategories.map((category) => (
              <TableHead key={category}>{category}</TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          <Body
            athletes={athletes}
            playerCategories={playerKickingCategories}
            teamCategories={teamKickingCategories}
            team={team}
          />
        </TableBody>
      </Table>
    </div>
  )
}
