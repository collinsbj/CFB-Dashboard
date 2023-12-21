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
    name: "Average start",
    key: "averageStart",
  },
  {
    name: "Average Expected Points",
    key: "averageStartingPredictedPoints",
  },
]

export default function FieldPositionTable({ gameStats }) {
  const { awayTeam, homeTeam } = gameStats.gameInfo

  const awayTeamStats = gameStats.teams.fieldPosition.find(
    (team) => team.team === awayTeam,
  )
  const homeTeamStats = gameStats.teams.fieldPosition.find(
    (team) => team.team === homeTeam,
  )

  return (
    <div>
      <div className="text-sm font-medium">Field position</div>

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
              <TableCell>{awayTeamStats[key]}</TableCell>
              <TableCell>{homeTeamStats[key]}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
