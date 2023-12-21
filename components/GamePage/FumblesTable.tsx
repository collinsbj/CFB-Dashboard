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
          No fumbles data
        </TableCell>
      </TableRow>
    )
  }

  const values = {}
  teamCategories.forEach((category) => {
    if (!values[category]) {
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

export default function FumblesTable({ playerStats, team }) {
  const teamFumblesCategories = [
    "totalFumbles",
    "fumblesLost",
    "fumblesRecovered",
  ]
  const playerFumblesCategories = ["FUM", "LOST", "REC"]
  const fumblesStats = playerStats.categories.find(
    (stat) => stat.name === "fumbles",
  )

  let athletes = fumblesStats.types.find((type) => type.name === "FUM").athletes
  athletes = athletes
    .map((athlete) => {
      playerFumblesCategories.forEach((category) => {
        athlete[category] = fumblesStats.types
          .find((type) => type.name === category)
          .athletes.find((a) => a.id === athlete.id).stat
      })

      return athlete
    })
    .sort((a, b) => Number(b.FUM) - Number(a.FUM))

  return (
    <div>
      <div className="text-sm font-medium flex items-center gap-2">
        <img src={team.logos[0]} className="h-4" />
        {team.school} fumbles
      </div>

      <Table>
        <TableHeader>
          <TableRow className="h-7">
            <TableHead></TableHead>
            {playerFumblesCategories.map((category) => (
              <TableHead key={category}>{category}</TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          <Body
            athletes={athletes}
            playerCategories={playerFumblesCategories}
            teamCategories={teamFumblesCategories}
            team={team}
          />
        </TableBody>
      </Table>
    </div>
  )
}
