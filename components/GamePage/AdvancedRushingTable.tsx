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
    name: "Power success",
    key: "powerSuccess",
  },
  {
    name: "Stuff rate",
    key: "stuffRate",
  },
  {
    name: "Line yards",
    key: "lineYards",
  },
  {
    name: "Line yards per rush",
    key: "lineYardsAverage",
  },
  {
    name: "Second level yards",
    key: "secondLevelYards",
  },
  {
    name: "Second level yards per rush",
    key: "secondLevelYardsAverage",
  },
  {
    name: "Open field yards",
    key: "openFieldYards",
  },
  {
    name: "Open field yards per rush",
    key: "openFieldYardsAverage",
  },
]

export default function AdvancedRushingTable({ gameStats }) {
  const { awayTeam, homeTeam } = gameStats.gameInfo

  const awayTeamStats = gameStats.teams.rushing.find(
    (team) => team.team === awayTeam,
  )
  const homeTeamStats = gameStats.teams.rushing.find(
    (team) => team.team === homeTeam,
  )

  return (
    <div>
      <div className="text-sm font-medium">Rushing</div>

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
