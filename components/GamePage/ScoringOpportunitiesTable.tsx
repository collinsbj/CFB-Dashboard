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
    name: "Opportunities",
    key: "opportunities",
  },
  {
    name: "Points",
    key: "points",
  },
  {
    name: "Points per opportunity",
    key: "pointsPerOpportunity",
  },
]

export default function ScoringOpportunitiesTable({ gameStats }) {
  const { awayTeam, homeTeam } = gameStats.gameInfo

  const awayTeamStats = gameStats.teams.scoringOpportunities.find(
    (team) => team.team === awayTeam,
  )
  const homeTeamStats = gameStats.teams.scoringOpportunities.find(
    (team) => team.team === homeTeam,
  )

  return (
    <div>
      <div className="text-sm font-medium">Scoring opportunities</div>

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
