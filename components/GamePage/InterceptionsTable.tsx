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
          No interception data
        </TableCell>
      </TableRow>
    )
  }

  const values = {}
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

export default function InterceptionsTable({ playerStats, team }) {
  const teamInterceptionsCategories = [
    "passesIntercepted",
    "interceptionYards",
    "interceptionTDs",
  ]
  const playerInterceptionsCategories = ["INT", "YDS", "TD"]
  const interceptionsStats = playerStats.categories.find(
    (stat) => stat.name === "interceptions",
  )

  let athletes = interceptionsStats.types.find(
    (type) => type.name === "INT",
  ).athletes
  athletes = athletes
    .map((athlete) => {
      playerInterceptionsCategories.forEach((category) => {
        athlete[category] = interceptionsStats.types
          .find((type) => type.name === category)
          .athletes.find((a) => a.id === athlete.id).stat
      })

      return athlete
    })
    .sort((a, b) => Number(b.INT) - Number(a.INT))
    .sort((a, b) => Number(b.YDS) - Number(a.YDS))

  return (
    <div>
      <div className="text-sm font-medium flex items-center gap-2">
        <img src={team.logos[0]} className="h-4" />
        {team.school} interceptions
      </div>
      <Table>
        <TableHeader>
          <TableRow className="h-7">
            <TableHead></TableHead>
            {playerInterceptionsCategories.map((category) => (
              <TableHead key={category}>{category}</TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          <Body
            athletes={athletes}
            playerCategories={playerInterceptionsCategories}
            teamCategories={teamInterceptionsCategories}
            team={team}
          />
        </TableBody>
      </Table>
    </div>
  )
}
