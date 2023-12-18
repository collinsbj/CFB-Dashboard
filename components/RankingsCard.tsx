import TeamListItem from "./TeamListItem"
import { Button } from "./ui/button"
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "./ui/card"

export default async function RankingsCard({ year }) {
  const res = await fetch(
    `https://api.collegefootballdata.com/rankings?year=${year}`,
    {
      headers: {
        Authorization: `Bearer ${process.env.API_KEY}`,
      },
    },
  )

  const data = await res.json()

  const teamsRes = await fetch(
    `https://api.collegefootballdata.com/teams/fbs?year=${year}`,
    {
      headers: {
        Authorization: `Bearer ${process.env.API_KEY}`,
      },
    },
  )
  const teamsData = await teamsRes.json()

  const mostRecentWeek = data[data.length - 1]

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
