import AdvancedRushingTable from "./AdvancedRushingTable"
import DefensiveHavocTable from "./DefensiveHavocTable"
import ExplosivenessTable from "./ExplosivenessTable"
import FieldPositionTable from "./FieldPositionTable"
import TeamPPATable from "./TeamPPATable"
import ScoringOpportunitiesTable from "./ScoringOpportunitiesTable"
import SuccessRateTable from "./SuccessRateTable"
import TeamMetrics from "./TeamMetrics"

export default function AdvancedTeamStats({ gameStats }) {
  return (
    <div className="[&>*]:flex [&>*]:divide-x [&>*]:[&>*]:p-3 [&>*]:[&>*]:w-1/2">
      <div>
        <TeamMetrics gameStats={gameStats} />
        <div></div>
      </div>

      <div>
        <ScoringOpportunitiesTable gameStats={gameStats} />
        <FieldPositionTable gameStats={gameStats} />
      </div>

      <div>
        <ExplosivenessTable gameStats={gameStats} />
        <DefensiveHavocTable gameStats={gameStats} />
      </div>

      <div>
        <TeamPPATable gameStats={gameStats} />
        <SuccessRateTable gameStats={gameStats} />
      </div>

      <div>
        <AdvancedRushingTable gameStats={gameStats} />
        <div></div>
      </div>
    </div>
  )
}
