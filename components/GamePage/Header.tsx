import { cn } from "@/lib/utils"
import { Card } from "../ui/card"
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "../ui/table"

export default function Header({
  awayTeam,
  homeTeam,
  gameData,
  extraGameData,
}) {
  return (
    <Card className="flex h-20 justify-center items-center gap-4 px-8">
      <div className="flex items-center w-full">
        <div className="relative h-20 w-20 overflow-hidden mr-auto">
          <img
            src={awayTeam.logos[0]}
            className="min-h-[128px] min-w-[128px] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
          />
        </div>

        <div className="flex gap-3 items-center">
          <div>
            <div className="text-lg">
              {awayTeam.school} {awayTeam.mascot}
            </div>
            <div className="text-sm text-right">
              {awayTeam.record.wins}-{awayTeam.record.losses}
            </div>
          </div>

          <img src={awayTeam.logos[0]} className="h-10 w-10" />

          <div
            className={cn(
              "text-3xl font-bold",
              extraGameData.completed &&
                extraGameData.away_points < extraGameData.home_points &&
                "text-gray-500 dark:text-gray-400",
            )}
          >
            {gameData.gameInfo.awayPoints}
          </div>
        </div>
      </div>

      <div className="flex flex-col items-center min-w-[196px]">
        <div className="text-xs">Final</div>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-12"></TableHead>
              <TableHead>1</TableHead>
              <TableHead>2</TableHead>
              <TableHead>3</TableHead>
              <TableHead>4</TableHead>
              <TableHead>T</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow className="border-none">
              <TableCell className="w-12 text-left">
                {awayTeam.abbreviation}
              </TableCell>
              <TableCell className="text-gray-500 dark:text-gray-400">
                {extraGameData.away_line_scores[0]}
              </TableCell>
              <TableCell className="text-gray-500 dark:text-gray-400">
                {extraGameData.away_line_scores[1]}
              </TableCell>
              <TableCell className="text-gray-500 dark:text-gray-400">
                {extraGameData.away_line_scores[2]}
              </TableCell>
              <TableCell className="text-gray-500 dark:text-gray-400">
                {extraGameData.away_line_scores[3]}
              </TableCell>
              <TableCell>{extraGameData.away_points}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="w-12 text-left">
                {homeTeam.abbreviation}
              </TableCell>
              <TableCell className="text-gray-500 dark:text-gray-400">
                {extraGameData.home_line_scores[0]}
              </TableCell>
              <TableCell className="text-gray-500 dark:text-gray-400">
                {extraGameData.home_line_scores[1]}
              </TableCell>
              <TableCell className="text-gray-500 dark:text-gray-400">
                {extraGameData.home_line_scores[2]}
              </TableCell>
              <TableCell className="text-gray-500 dark:text-gray-400">
                {extraGameData.home_line_scores[3]}
              </TableCell>
              <TableCell>{extraGameData.home_points}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>

      <div className="flex items-center w-full">
        <div className="flex gap-3 items-center">
          <div className="text-3xl font-bold">
            {gameData.gameInfo.homePoints}
          </div>

          <img src={homeTeam.logos[0]} className="h-10 w-10" />

          <div>
            <div className="text-lg">
              {homeTeam.school} {homeTeam.mascot}
            </div>
            <div className="text-sm">
              {homeTeam.record.wins}-{homeTeam.record.losses}
            </div>
          </div>
        </div>

        <div className="relative h-20 w-20 overflow-hidden ml-auto">
          <img
            src={homeTeam.logos[0]}
            className="min-h-[128px] min-w-[128px] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
          />
        </div>
      </div>
    </Card>
  )
}
