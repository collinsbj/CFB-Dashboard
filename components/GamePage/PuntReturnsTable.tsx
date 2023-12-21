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
          No punt return data
        </TableCell>
      </TableRow>
    )
  }

  const values = {
    AVG: (
      Number(
        team.stats.find((stat) => stat.category === "puntReturnYards").stat,
      ) /
      Number(team.stats.find((stat) => stat.category === "puntReturns").stat)
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

export default function PuntReturnsTable({ playerStats, team }) {
  const teamPuntReturnsCategories = [
    "puntReturns",
    "puntReturnYards",
    "AVG",
    "LONG",
    "puntReturnTDs",
  ]
  const playerPuntReturnsCategories = ["NO", "YDS", "AVG", "LONG", "TD"]
  const puntReturnsStats = playerStats.categories.find(
    (stat) => stat.name === "puntReturns",
  )

  let athletes =
    puntReturnsStats?.types
      .find((type) => type.name === "NO")
      .athletes.map((athlete) => {
        playerPuntReturnsCategories.forEach((category) => {
          athlete[category] = puntReturnsStats.types
            .find((type) => type.name === category)
            .athletes.find((a) => a.id === athlete.id).stat
        })

        return athlete
      })
      .sort((a, b) => Number(b.NO) - Number(a.NO))
      .sort((a, b) => Number(b.YDS) - Number(a.YDS)) || []

  return (
    <div>
      <div className="text-sm font-medium flex items-center gap-2">
        <img src={team.logos[0]} className="h-4" />
        {team.school} punt returns
      </div>

      <Table>
        <TableHeader>
          <TableRow className="h-7">
            <TableHead className="min-w-[200px]"></TableHead>
            {playerPuntReturnsCategories.map((category) => (
              <TableHead key={category}>{category}</TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          <Body
            athletes={athletes}
            playerCategories={playerPuntReturnsCategories}
            teamCategories={teamPuntReturnsCategories}
            team={team}
          />
        </TableBody>
      </Table>
    </div>
  )
}
