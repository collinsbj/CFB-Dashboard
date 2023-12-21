import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "../ui/table"

const rows = [
  {
    name: "Total",
    key: "total",
  },
  {
    name: "Front seven",
    key: "frontSeven",
  },
  {
    name: "DB",
    key: "db",
  },
]

export default function DefensiveHavocTable({ gameStats }) {
  const { awayTeam, homeTeam } = gameStats.gameInfo

  const awayTeamStats = gameStats.teams.havoc.find(
    (team) => team.team === awayTeam,
  )
  const homeTeamStats = gameStats.teams.havoc.find(
    (team) => team.team === homeTeam,
  )

  return (
    <div>
      <div className="text-sm font-medium">Defensive havoc</div>

      <Table>
        <TableHeader>
          <TableRow className="h-7">
            <TableHead></TableHead>
            <TableHead className="w-[125px]">{awayTeam}</TableHead>
            <TableHead className="w-[125px]">{homeTeam}</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {rows.map(({ key, name }) => (
            <TableRow key={key} className="h-7">
              <TableCell className="text-left">{name}</TableCell>
              <TableCell>
                {(Number(awayTeamStats[key]) * 100).toFixed(1)}%
              </TableCell>
              <TableCell>
                {(Number(homeTeamStats[key]) * 100).toFixed(1)}%
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
