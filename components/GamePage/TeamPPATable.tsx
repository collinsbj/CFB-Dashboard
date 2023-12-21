import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "../ui/table"

const tables = [
  {
    name: "Overall",
    key: "overall",
  },
  {
    name: "Passing",
    key: "passing",
  },
  {
    name: "Rushing",
    key: "rushing",
  },
]

const columns = [
  {
    name: "1",
    key: "quarter1",
  },
  {
    name: "2",
    key: "quarter2",
  },
  {
    name: "3",
    key: "quarter3",
  },
  {
    name: "4",
    key: "quarter4",
  },
  {
    name: "Total",
    key: "total",
  },
]

export default function TeamPPATable({ gameStats }) {
  const { awayTeam, homeTeam } = gameStats.gameInfo

  const awayTeamStats = gameStats.teams.ppa.find(
    (team) => team.team === awayTeam,
  )
  const homeTeamStats = gameStats.teams.ppa.find(
    (team) => team.team === homeTeam,
  )

  return (
    <div className="flex flex-col gap-3">
      <div className="text-sm font-medium">Predicted points added</div>

      <div className="flex flex-col gap-3">
        {tables.map(({ key, name }) => (
          <div key={key}>
            <div className="text-sm">{name}</div>

            <Table>
              <TableHeader>
                <TableRow className="h-7">
                  <TableHead></TableHead>
                  {columns.map((column) => (
                    <TableHead key={column.key} className="w-[75px]">
                      {column.name}
                    </TableHead>
                  ))}
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow className="h-7">
                  <TableCell className="text-left">{awayTeam}</TableCell>
                  {columns.map((column) => (
                    <TableCell key={column.key}>
                      {awayTeamStats[key][column.key]}
                    </TableCell>
                  ))}
                </TableRow>
                <TableRow className="h-7">
                  <TableCell className="text-left">{homeTeam}</TableCell>
                  {columns.map((column) => (
                    <TableCell key={column.key}>
                      {homeTeamStats[key][column.key]}
                    </TableCell>
                  ))}
                </TableRow>
              </TableBody>
            </Table>
          </div>
        ))}
      </div>
    </div>
  )
}
