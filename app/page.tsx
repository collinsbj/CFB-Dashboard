import GamesCard from "@/components/GamesCard"
import PortalCard from "@/components/PortalCard"
import RankingsCard from "@/components/RankingsCard"
import RecruitingCard from "@/components/RecruitingCard"
import TransfersCard from "@/components/TransfersCard"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card"
import Loading from "@/icons/loading"
import { Suspense } from "react"

function getCurrentWeek(calendar) {
  const now = new Date()
  const firstGameStart = new Date(calendar[0].firstGameStart)
  const lastGameStart = new Date(calendar[calendar.length - 1].lastGameStart)

  if (now < firstGameStart) {
    return calendar[0]
  } else if (now > lastGameStart) {
    return calendar[calendar.length - 1]
  } else {
    const currentWeek = calendar.find((week) => {
      const previousWeek = calendar[calendar.indexOf(week) - 1]
      if (!previousWeek) return false
      const lastGameStart = new Date(week.lastGameStart)
      const previousLastGameStart = new Date(previousWeek.lastGameStart)
      return now >= previousLastGameStart && now < lastGameStart
    })
    return currentWeek
  }
}

export default async function Home() {
  const res = await fetch(
    "https://api.collegefootballdata.com/calendar?year=2023",
    {
      headers: {
        Authorization: `Bearer ${process.env.API_KEY}`,
      },
    },
  )
  const calendar = await res.json()
  const { week, season, seasonType } = getCurrentWeek(calendar)
  const nextYear = Number(season) + 1

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 items-start">
        <div>
          <Card className="flex flex-col md:col-span-1 h-[450px] hover:shadow-lg transition-shadow duration-200">
            <CardHeader>
              <CardTitle>Players in portal</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col justify-between flex-grow overflow-y-auto">
              <Suspense
                fallback={
                  <div className="flex justify-center items-center h-full">
                    <Loading className="w-10 h-10 animate-spin" />
                  </div>
                }
              >
                <PortalCard year={nextYear} />
              </Suspense>
            </CardContent>
            <CardFooter className="p-6">
              <Button size="sm">View Page</Button>
            </CardFooter>
          </Card>
        </div>

        <div>
          <Card className="flex flex-col md:col-span-1 h-[450px] hover:shadow-lg transition-shadow duration-200">
            <CardHeader>
              <CardTitle>Transfers</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col justify-between flex-grow overflow-y-auto">
              <Suspense
                fallback={
                  <div className="flex justify-center items-center h-full">
                    <Loading className="w-10 h-10 animate-spin" />
                  </div>
                }
              >
                <TransfersCard year={nextYear} />
              </Suspense>
            </CardContent>
            <CardFooter className="p-6">
              <Button size="sm">View Page</Button>
            </CardFooter>
          </Card>
        </div>

        <div>
          <Card className="flex flex-col md:col-span-1 h-[450px] hover:shadow-lg transition-shadow duration-200">
            <CardHeader>
              <CardTitle>Rankings</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col justify-between flex-grow overflow-y-auto">
              <Suspense
                fallback={
                  <div className="flex justify-center items-center h-full">
                    <Loading className="w-10 h-10 animate-spin" />
                  </div>
                }
              >
                <RankingsCard year={season} />
              </Suspense>
            </CardContent>
            <CardFooter className="p-6">
              <Button size="sm">View Page</Button>
            </CardFooter>
          </Card>
        </div>

        <div>
          <Card className="flex flex-col md:col-span-1 h-[450px] hover:shadow-lg transition-shadow duration-200">
            <CardHeader>
              <CardTitle>Recruiting</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col justify-between flex-grow overflow-y-auto">
              <Suspense
                fallback={
                  <div className="flex justify-center items-center h-full">
                    <Loading className="w-10 h-10 animate-spin" />
                  </div>
                }
              >
                <RecruitingCard year={nextYear} />
              </Suspense>
            </CardContent>
            <CardFooter className="p-6">
              <Button size="sm">View Page</Button>
            </CardFooter>
          </Card>
        </div>

        <div>
          <Card className="flex flex-col md:col-span-1 h-[450px] hover:shadow-lg transition-shadow duration-200">
            <CardHeader>
              <CardTitle>Games</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col justify-between flex-grow overflow-y-auto">
              <Suspense
                fallback={
                  <div className="flex justify-center items-center h-full">
                    <Loading className="w-10 h-10 animate-spin" />
                  </div>
                }
              >
                <GamesCard week={week} year={season} seasonType={seasonType} />
              </Suspense>
            </CardContent>
            <CardFooter className="p-6">
              <Button size="sm">View Page</Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </>
  )
}
