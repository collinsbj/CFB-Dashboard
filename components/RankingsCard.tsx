import TeamListItem from "./TeamListItem"

const getRankData = async (year) => {
  const res = await fetch(
    `https://api.collegefootballdata.com/rankings?year=${year}`,
    {
      headers: {
        Authorization: `Bearer ${process.env.API_KEY}`,
      },
    },
  )

  return res.json()
}

const getTeamsData = async (year) => {
  const res = await fetch(
    `https://api.collegefootballdata.com/teams/fbs?year=${year}`,
    {
      headers: {
        Authorization: `Bearer ${process.env.API_KEY}`,
      },
    },
  )

  return res.json()
}

export default async function RankingsCard({ year }) {
  const [rankData, teamsData] = await Promise.all([
    getRankData(year),
    getTeamsData(year),
  ])

  const mostRecentWeek = rankData[rankData.length - 1]

  const playoffPoll = mostRecentWeek.polls.find(
    (poll) => poll.poll === "Playoff Committee Rankings",
  )
  const apPoll = mostRecentWeek.polls.find((poll) => poll.poll === "AP Top 25")

  const poll = playoffPoll || apPoll

  let rankings = poll.ranks.map((rankedTeam) => {
    const foundTeam = teamsData.find(
      (team) => team.school === rankedTeam.school,
    )

    return { ...rankedTeam, ...foundTeam }
  })

  return (
    <ul>
      {rankings.map((team) => (
        <TeamListItem key={team.school} team={team} />
      ))}
    </ul>
  )
}
