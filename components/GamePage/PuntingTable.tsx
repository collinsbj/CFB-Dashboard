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
          No punting data
        </TableCell>
      </TableRow>
    )
  }

  const values = {
    NO: athletes.reduce(
      (prev, current) => Number(prev) + Number(current.NO),
      "0",
    ),
    YDS: athletes.reduce(
      (prev, current) => Number(prev) + Number(current.YDS),
      "0",
    ),
    TB: athletes.reduce(
      (prev, current) => Number(prev) + Number(current.TB),
      "0",
    ),
    "In 20": athletes.reduce(
      (prev, current) => Number(prev) + Number(current["In 20"]),
      "0",
    ),
    LONG: athletes.reduce(
      (prev, current) =>
        Number(prev) > Number(current.LONG) ? prev : current.LONG,
      "0",
    ),
  }
  values.AVG = (Number(values.YDS) / Number(values.NO)).toFixed(1)
  teamCategories.forEach((category) => {
    if (!Object.keys(values).includes(category)) {
      values[category] = team.stats
        .find((stat) => stat.category === category)
        .stat.replace("-", "/")
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

export default function PuntingTable({ playerStats, team }) {
  const teamPuntingCategories = ["NO", "YDS", "AVG", "TB", "In 20", "LONG"]
  const playerPuntingCategories = ["NO", "YDS", "AVG", "TB", "In 20", "LONG"]
  const puntingStats = playerStats.categories.find(
    (stat) => stat.name === "punting",
  )
  let athletes = puntingStats.types.find((type) => type.name === "NO").athletes
  athletes = athletes
    .map((athlete) => {
      playerPuntingCategories.forEach((category) => {
        athlete[category] = puntingStats.types
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
        {team.school} punting
      </div>

      <Table>
        <TableHeader>
          <TableRow className="h-7">
            <TableHead></TableHead>
            {playerPuntingCategories.map((category) => (
              <TableHead key={category}>{category}</TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          <Body
            athletes={athletes}
            playerCategories={playerPuntingCategories}
            teamCategories={teamPuntingCategories}
            team={team}
          />
        </TableBody>
      </Table>
    </div>
  )
}
