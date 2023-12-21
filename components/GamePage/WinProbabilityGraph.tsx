"use client"

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts"
import { Card } from "../ui/card"

const CustomTooltip = ({ active, payload }) => {
  if (!active) {
    return null
  }
  const data = payload[0].payload

  const winningTeam =
    data.homeWinProb === 50
      ? null
      : data.homeWinProb > 50
        ? data.home
        : data.away
  const winProbability =
    data.homeWinProb < 50 ? 100 - data.homeWinProb : data.homeWinProb

  return (
    <Card className="p-3 w-[400px] text-sm">
      <div className="flex justify-between">
        <div>
          {winningTeam} {winProbability}%
        </div>
        <div>
          {data.away} {data.awayScore} - {data.home} {data.homeScore}
        </div>
      </div>
      {!!data.down && (
        <div>
          {data.down === 1 && "1st"}
          {data.down === 2 && "2nd"}
          {data.down === 3 && "3rd"}
          {data.down === 4 && "4th"}
          &nbsp;and&nbsp;
          {data.distance}
        </div>
      )}
      <div className="text-gray-500 dark:text-gray-400">{data.playText}</div>
    </Card>
  )
}

export default function WinProbabilityGraph({ data }) {
  const graphData = []
  data.forEach((play) => {
    const newData = { ...play }
    newData.homeWinProb = Number((Number(newData.homeWinProb) * 100).toFixed(1))
    graphData.push(newData)
  })

  return (
    <div className="h-[600px]">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          width={500}
          height={300}
          data={graphData}
          margin={{
            top: 20,
            right: 20,
            left: 20,
            bottom: 20,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis />
          <YAxis />
          <Tooltip content={<CustomTooltip />} />
          <Line dataKey="homeWinProb" stroke="#020817" activeDot={{ r: 4 }} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}
