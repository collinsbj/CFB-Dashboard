import FumblesTable from "./FumblesTable"
import InterceptionsTable from "./InterceptionsTable"
import KickReturnsTable from "./KickReturnsTable"
import KickingTable from "./KickingTable"
import PassingTable from "./PassingTable"
import PuntReturnsTable from "./PuntReturnsTable"
import PuntingTable from "./PuntingTable"
import ReceivingTable from "./ReceivingTable"
import RushingTable from "./RushingTable"

export default function BasicStats({ awayTeam, homeTeam, playerStats }) {
  const awayTeamPlayerStats = playerStats.teams.find(
    (team) => team.homeAway === "away",
  )

  const homeTeamPlayerStats = playerStats.teams.find(
    (team) => team.homeAway === "home",
  )

  return (
    <div className="[&>*]:flex [&>*]:divide-x [&>*]:[&>*]:p-3 [&>*]:[&>*]:w-1/2">
      <div>
        <PassingTable playerStats={awayTeamPlayerStats} team={awayTeam} />
        <PassingTable playerStats={homeTeamPlayerStats} team={homeTeam} />
      </div>

      <div>
        <RushingTable playerStats={awayTeamPlayerStats} team={awayTeam} />
        <RushingTable playerStats={homeTeamPlayerStats} team={homeTeam} />
      </div>

      <div>
        <ReceivingTable playerStats={awayTeamPlayerStats} team={awayTeam} />
        <ReceivingTable playerStats={homeTeamPlayerStats} team={homeTeam} />
      </div>

      <div>
        <FumblesTable playerStats={awayTeamPlayerStats} team={awayTeam} />
        <FumblesTable playerStats={homeTeamPlayerStats} team={homeTeam} />
      </div>

      <div>
        <InterceptionsTable playerStats={awayTeamPlayerStats} team={awayTeam} />
        <InterceptionsTable playerStats={homeTeamPlayerStats} team={homeTeam} />
      </div>

      <div>
        <KickReturnsTable playerStats={awayTeamPlayerStats} team={awayTeam} />
        <KickReturnsTable playerStats={homeTeamPlayerStats} team={homeTeam} />
      </div>

      <div>
        <PuntReturnsTable playerStats={awayTeamPlayerStats} team={awayTeam} />
        <PuntReturnsTable playerStats={homeTeamPlayerStats} team={homeTeam} />
      </div>

      <div>
        <KickingTable playerStats={awayTeamPlayerStats} team={awayTeam} />
        <KickingTable playerStats={homeTeamPlayerStats} team={homeTeam} />
      </div>

      <div>
        <PuntingTable playerStats={awayTeamPlayerStats} team={awayTeam} />
        <PuntingTable playerStats={homeTeamPlayerStats} team={homeTeam} />
      </div>
    </div>
  )
}
