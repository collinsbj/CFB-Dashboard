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
          No kick return data
        </TableCell>
      </TableRow>
    )
  }

  const values = {
    AVG: (
      Number(
        team.stats.find((stat) => stat.category === "kickReturnYards").stat,
      ) /
      Number(team.stats.find((stat) => stat.category === "kickReturns").stat)
    ).toFixed(1),
    LONG: athletes.reduce((prev, current) => {
      if (Number(current.LONG) > Number(prev)) {
        return current.LONG
      } else {
        return prev
      }
    }, "0"),
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

export default function KickReturnsTable({ playerStats, team }) {
  const teamKickReturnsCategories = [
    "kickReturns",
    "kickReturnYards",
    "AVG",
    "LONG",
    "kickReturnTDs",
  ]
  const playerKickReturnsCategories = ["NO", "YDS", "AVG", "LONG", "TD"]
  const kickReturnsStats = playerStats.categories.find(
    (stat) => stat.name === "kickReturns",
  )

  let athletes = kickReturnsStats.types.find(
    (type) => type.name === "NO",
  ).athletes
  athletes = athletes
    .map((athlete) => {
      playerKickReturnsCategories.forEach((category) => {
        athlete[category] = kickReturnsStats.types
          .find((type) => type.name === category)
          .athletes.find((a) => a.id === athlete.id).stat
      })

      return athlete
    })
    .sort((a, b) => Number(b.NO) - Number(a.NO))
    .sort((a, b) => Number(b.YDS) - Number(a.YDS))

  return (
    <div>
      <div className="text-sm font-medium flex items-center gap-2">
        <img src={team.logos[0]} className="h-4" />
        {team.school} kick returns
      </div>

      <Table>
        <TableHeader>
          <TableRow className="h-7">
            <TableHead></TableHead>
            {playerKickReturnsCategories.map((category) => (
              <TableHead key={category}>{category}</TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          <Body
            athletes={athletes}
            playerCategories={playerKickReturnsCategories}
            teamCategories={teamKickReturnsCategories}
            team={team}
          />
        </TableBody>
      </Table>
    </div>
  )
}
