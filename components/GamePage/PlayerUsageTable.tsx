import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "../ui/table"

const columns = [
  {
    name: "Total",
    key: "total",
  },
  {
    name: 1,
    key: "quarter1",
  },
  {
    name: 2,
    key: "quarter2",
  },
  {
    name: 3,
    key: "quarter3",
  },
  {
    name: 4,
    key: "quarter4",
  },
  {
    name: "Rush",
    key: "rushing",
  },
  {
    name: "Pass",
    key: "passing",
  },
]

export default function PlayerUsageTable({ data, team }) {
  const athletes = data.filter((athlete) => athlete.team === team)
  return (
    <div>
      <div className="text-sm font-medium flex items-center gap-2">
        {team} usage
      </div>

      <Table>
        <TableHeader>
          <TableRow className="h-7">
            <TableHead></TableHead>
            {columns.map((column) => (
              <TableHead key={column.key}>{column.name}</TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {athletes.map((athlete) => (
            <TableRow key={athlete.player} className="h-7">
              <TableCell className="text-left">{athlete.player}</TableCell>
              {columns.map((column) => (
                <TableCell key={column.key}>
                  {(Number(athlete[column.key]) * 100).toFixed(0)}%
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
