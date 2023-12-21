export default function TeamMetrics({ gameStats }) {
  const winProb = (
    Math.max(
      Number(gameStats.gameInfo.homeWinProb),
      Number(gameStats.gameInfo.awayWinProb),
    ) * 100
  ).toFixed(0)
  const winProbTeam =
    gameStats.gameInfo.homeWinProb > gameStats.gameInfo.awayWinProb
      ? gameStats.gameInfo.homeTeam
      : gameStats.gameInfo.awayTeam

  return (
    <div className="flex justify-between">
      <div>
        <div className="text-sm font-medium">Postgame win expectancy</div>
        <div className="text-sm">
          {winProbTeam} {winProb}%
        </div>
      </div>

      <div>
        <div className="text-sm font-medium">Excitement index</div>
        <div className="text-sm">
          {Number(gameStats.gameInfo.excitement).toFixed(1)}
        </div>
      </div>
    </div>
  )
}
