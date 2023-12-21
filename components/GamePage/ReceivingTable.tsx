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
          No receiving data
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
    REC: team.stats
      .find((stat) => stat.category === "completionAttempts")
      .stat.split("-")[0],
    AVG: (
      Number(
        team.stats
          .find((stat) => stat.category === "netPassingYards")
          .stat.replace("-", "/"),
      ) /
      Number(
        team.stats
          .find((stat) => stat.category === "completionAttempts")
          .stat.split("-")[0],
      )
    ).toFixed(1),
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

export default function ReceivingTable({ playerStats, team }) {
  const teamReceivingCategories = [
    "REC",
    "netPassingYards",
    "AVG",
    "passingTDs",
    "LONG",
  ]
  const playerReceivingCategories = ["REC", "YDS", "AVG", "TD", "LONG"]
  const receivingStats = playerStats.categories.find(
    (stat) => stat.name === "receiving",
  )
  let athletes = receivingStats.types.find(
    (type) => type.name === "REC",
  ).athletes
  athletes = athletes
    .map((athlete) => {
      playerReceivingCategories.forEach((category) => {
        athlete[category] = receivingStats.types
          .find((type) => type.name === category)
          .athletes.find((a) => a.id === athlete.id).stat
      })

      return athlete
    })
    .sort((a, b) => Number(b.YDS) - Number(a.YDS))
    .sort((a, b) => Number(b.REC) - Number(a.REC))

  return (
    <div>
      <div className="text-sm font-medium flex items-center gap-2">
        <img src={team.logos[0]} className="h-4" />
        {team.school} receiving
      </div>

      <Table>
        <TableHeader>
          <TableRow className="h-7">
            <TableHead></TableHead>
            {playerReceivingCategories.map((category) => (
              <TableHead key={category}>{category}</TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          <Body
            athletes={athletes}
            playerCategories={playerReceivingCategories}
            teamCategories={teamReceivingCategories}
            team={team}
          />
        </TableBody>
      </Table>
    </div>
  )
}
