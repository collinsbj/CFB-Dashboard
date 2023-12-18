import { cn } from "@/lib/utils"

export default function GameListItem({ game }) {
  const {
    away_points,
    away_team,
    completed,
    home_points,
    home_team,
    notes,
    start_date,
    status,
    venue,
  } = game
  const formattedDate = new Intl.DateTimeFormat("en-US", {
    year: "2-digit",
    month: "short",
    day: "numeric",
  }).format(new Date(start_date))
  const formattedTime = new Intl.DateTimeFormat("en-US", {
    hour: "numeric",
    minute: "numeric",
  }).format(new Date(start_date))

  const winner = away_points > home_points ? "Away" : "Home"

  return (
    <a
      className="flex flex-col hover:bg-gray-200 dark:hover:bg-gray-800 transition-colors duration-200 p-4 rounded-md"
      href="#"
    >
      <div className="grid gap-0.5">
        {notes && <div>{notes}</div>}
        <div className="w-full flex justify-between items-center">
          <div>
            <div className="font-medium text-lg">{away_team}</div>
            <div className="font-medium text-lg">{home_team}</div>
          </div>
          <div>
            {status === "Upcoming" && (
              <>
                <div className="text-sm text-right">{formattedDate}</div>
                <div className="text-sm text-right">{formattedTime}</div>
              </>
            )}

            {status === "In progress" && (
              <div className="text-sm text-right">In progress</div>
            )}

            {status === "Final" && (
              <>
                <div
                  className={cn(
                    "text-lg text-right",
                    completed && winner === "Away" && "font-bold",
                  )}
                >
                  {away_points}
                </div>
                <div
                  className={cn(
                    "text-lg text-right",
                    completed && winner === "Home" && "font-bold",
                  )}
                >
                  {home_points}
                </div>
              </>
            )}
          </div>
        </div>
        <div className="text-xs">{venue}</div>
      </div>
    </a>
  )
}
