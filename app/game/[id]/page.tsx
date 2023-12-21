import AdvancedPlayerStats from "@/components/GamePage/AdvancedPlayerStats"
import AdvancedTeamStats from "@/components/GamePage/AdvancedTeamStats"
import BasicStats from "@/components/GamePage/BasicStats"
import GamePageHeader from "@/components/GamePage/Header"
import WinProbabilityGraph from "@/components/GamePage/WinProbabilityGraph"
import { Card } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

const YEAR = "2023"

const getGameData = async (id) => {
  const res = await fetch(
    `https://api.collegefootballdata.com/game/box/advanced?gameId=${id}`,
    {
      headers: {
        Authorization: `Bearer ${process.env.API_KEY}`,
      },
    },
  )

  return res.json()
}

const getExtraGameData = async (id) => {
  const res = await fetch(
    `https://api.collegefootballdata.com/games?id=${id}`,
    {
      headers: {
        Authorization: `Bearer ${process.env.API_KEY}`,
      },
    },
  )

  const data = await res.json()

  return data[0]
}

const getTeamsData = async () => {
  const res = await fetch(
    `https://api.collegefootballdata.com/teams/fbs?year=${YEAR}`,
    {
      headers: {
        Authorization: `Bearer ${process.env.API_KEY}`,
      },
    },
  )

  return res.json()
}

const getTeamRecord = async (team) => {
  const res = await fetch(
    `https://api.collegefootballdata.com/records?year=${YEAR}&team=${team}`,
    {
      headers: {
        Authorization: `Bearer ${process.env.API_KEY}`,
      },
    },
  )

  return res.json()
}

const getPlayerStatsData = async (gameId) => {
  const res = await fetch(
    `https://api.collegefootballdata.com/games/players?year=${YEAR}&gameId=${gameId}`,
    {
      headers: {
        Authorization: `Bearer ${process.env.API_KEY}`,
      },
    },
  )

  return res.json()
}

const getTeamStatsData = async (gameId) => {
  const res = await fetch(
    `https://api.collegefootballdata.com/games/teams?year=${YEAR}&gameId=${gameId}`,
    {
      headers: {
        Authorization: `Bearer ${process.env.API_KEY}`,
      },
    },
  )

  return res.json()
}

const getWinProbabilityData = async (gameId) => {
  const res = await fetch(
    `https://api.collegefootballdata.com/metrics/wp?gameId=${gameId}`,
    {
      headers: {
        Authorization: `Bearer ${process.env.API_KEY}`,
      },
    },
  )

  return res.json()
}

export default async function GamePage({ params }) {
  const [
    gameData,
    extraGameData,
    teamsData,
    playerStatsData,
    teamStatsData,
    winProbabilityData,
  ] = await Promise.all([
    getGameData(params.id),
    getExtraGameData(params.id),
    getTeamsData(),
    getPlayerStatsData(params.id),
    getTeamStatsData(params.id),
    getWinProbabilityData(params.id),
  ])

  let awayTeam = teamsData.find(
    (team) => team.school === gameData.gameInfo.awayTeam,
  )
  let homeTeam = teamsData.find(
    (team) => team.school === gameData.gameInfo.homeTeam,
  )

  const [awayTeamRecord, homeTeamRecord] = await Promise.all([
    getTeamRecord(awayTeam.school),
    getTeamRecord(homeTeam.school),
  ])

  awayTeam = {
    ...awayTeam,
    record: awayTeamRecord[0].total,
    stats: teamStatsData[0].teams.find((team) => team.homeAway === "away")
      .stats,
  }
  homeTeam = {
    ...homeTeam,
    record: homeTeamRecord[0].total,
    stats: teamStatsData[0].teams.find((team) => team.homeAway === "home")
      .stats,
  }

  return (
    <div className="flex flex-col gap-4">
      <GamePageHeader
        gameData={gameData}
        extraGameData={extraGameData}
        awayTeam={awayTeam}
        homeTeam={homeTeam}
      />

      <Tabs defaultValue="basic">
        <TabsList className="grid w-full grid-cols-4 w-[500px] mx-auto">
          <TabsTrigger value="basic">Basic</TabsTrigger>
          <TabsTrigger value="team">Team</TabsTrigger>
          <TabsTrigger value="player">Player</TabsTrigger>
          <TabsTrigger value="winProbability">Win Probability</TabsTrigger>
        </TabsList>
        <TabsContent value="basic">
          <Card>
            <BasicStats
              playerStats={playerStatsData[0]}
              awayTeam={awayTeam}
              homeTeam={homeTeam}
            />
          </Card>
        </TabsContent>
        <TabsContent value="team">
          <Card>
            <AdvancedTeamStats gameStats={gameData} />
          </Card>
        </TabsContent>
        <TabsContent value="player">
          <Card>
            <AdvancedPlayerStats gameStats={gameData} />
          </Card>
        </TabsContent>
        <TabsContent value="winProbability">
          <Card>
            <WinProbabilityGraph data={winProbabilityData} />
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
