import PlayerUsageTable from "./PlayerUsageTable"
import PlayerPPATable from "./PlayerPPATable"

export default function AdvancedPlayerStats({ gameStats }) {
  return (
    <div className="[&>*]:flex [&>*]:divide-x [&>*]:[&>*]:p-3 [&>*]:[&>*]:w-1/2">
      <div>
        <PlayerUsageTable
          team={gameStats.gameInfo.awayTeam}
          data={gameStats.players.usage}
        />
        <PlayerUsageTable
          team={gameStats.gameInfo.homeTeam}
          data={gameStats.players.usage}
        />
      </div>

      <div>
        <PlayerPPATable
          team={gameStats.gameInfo.awayTeam}
          data={gameStats.players.ppa}
          type="average"
        />
        <PlayerPPATable
          team={gameStats.gameInfo.homeTeam}
          data={gameStats.players.ppa}
          type="average"
        />
      </div>

      <div>
        <PlayerPPATable
          team={gameStats.gameInfo.awayTeam}
          data={gameStats.players.ppa}
          type="cumulative"
        />
        <PlayerPPATable
          team={gameStats.gameInfo.homeTeam}
          data={gameStats.players.ppa}
          type="cumulative"
        />
      </div>
    </div>
  )
}
