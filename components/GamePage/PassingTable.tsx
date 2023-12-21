import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "../ui/table"

function calculatePasserRating({ comp, att, yds, tds, ints }) {
  const a = (comp / att) * 100
  const b = (tds / att) * 100
  const c = (ints / att) * 100
  const d = yds / att
  return a + 3.3 * b - 2 * c + 8.4 * d
}

const Body = ({ athletes, playerCategories, team, teamCategories }) => {
  if (!athletes.length) {
    return (
      <TableRow className="h-7">
        <TableCell colSpan={playerCategories.length} className="text-center">
          No passing data
        </TableCell>
      </TableRow>
    )
  }

  const values = {
    completionAttempts: team.stats
      .find((stat) => stat.category === "completionAttempts")
      .stat.replace("-", "/"),
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
        {teamCategories.map((category) => (
          <TableCell key={category}>{values[category]}</TableCell>
        ))}
      </TableRow>
    </>
  )
}

export default function PassingTable({ playerStats, team }) {
  const teamPassingCategories = [
    "completionAttempts",
    "netPassingYards",
    "yardsPerPass",
    "passingTDs",
    "interceptions",
  ]
  const playerPassingCategories = ["C/ATT", "YDS", "AVG", "TD", "INT", "QBR"]
  const passingStats = playerStats.categories.find(
    (stat) => stat.name === "passing",
  )
  const athletes = passingStats.types
    .find((type) => type.name === "C/ATT")
    .athletes.map((athlete) => {
      playerPassingCategories.forEach((category) => {
        if (category === "QBR") {
          athlete[category] = calculatePasserRating({
            comp: Number(
              passingStats.types
                .find((type) => type.name === "C/ATT")
                .athletes.find((a) => a.id === athlete.id)
                .stat.split("/")[0],
            ),
            att: Number(
              passingStats.types
                .find((type) => type.name === "C/ATT")
                .athletes.find((a) => a.id === athlete.id)
                .stat.split("/")[1],
            ),
            yds: Number(
              passingStats.types
                .find((type) => type.name === "YDS")
                .athletes.find((a) => a.id === athlete.id).stat,
            ),
            tds: Number(
              passingStats.types
                .find((type) => type.name === "TD")
                .athletes.find((a) => a.id === athlete.id).stat,
            ),
            ints: Number(
              passingStats.types
                .find((type) => type.name === "INT")
                .athletes.find((a) => a.id === athlete.id).stat,
            ),
          }).toFixed(1)
        } else {
          athlete[category] = passingStats.types
            .find((type) => type.name === category)
            .athletes.find((a) => a.id === athlete.id).stat
        }
      })

      return athlete
    })
    .sort((a, b) => Number(b.YDS) - Number(a.YDS))

  return (
    <div>
      <div className="text-sm font-medium flex items-center gap-2">
        <img src={team.logos[0]} className="h-4" />
        {team.school} passing
      </div>

      <Table>
        <TableHeader>
          <TableRow className="h-7">
            <TableHead></TableHead>
            {playerPassingCategories.map((category) => (
              <TableHead key={category}>{category}</TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          <Body
            athletes={athletes}
            playerCategories={playerPassingCategories}
            teamCategories={teamPassingCategories}
            team={team}
          />
        </TableBody>
      </Table>
    </div>
  )
}
