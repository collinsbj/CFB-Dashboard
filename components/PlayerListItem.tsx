function StarIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
  )
}

export default function PlayerListItem({
  attributes,
  highSchool,
  name,
  player,
  school,
}) {
  const {
    rating,
    stars,
    origin,
    position,
    eligibility,
    destination,
    transferDate,
  } = player
  const formattedDate = transferDate
    ? new Intl.DateTimeFormat("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      }).format(new Date(transferDate))
    : null

  return (
    <a
      className="flex items-center gap-3 justify-between hover:bg-gray-200 dark:hover:bg-gray-800 transition-colors duration-200 p-4 rounded-md"
      href="#"
    >
      <div className="grid gap-0.5 text-xs">
        <div className="font-medium text-lg">
          {name} ({position})
        </div>
        <div className="flex items-center">
          {Array(stars)
            .fill(null)
            .map((_, i) => (
              <StarIcon
                key={i}
                className="w-5 h-5 text-yellow-500 fill-yellow-500"
              />
            ))}
          {Array(5 - stars)
            .fill(null)
            .map((_, i) => (
              <StarIcon
                key={i}
                className="w-5 h-5 text-yellow-500 fill-yellow-500 opacity-30"
              />
            ))}
        </div>
        <div className="text-gray-500 dark:text-gray-400">{school}</div>
        <div className="text-gray-500 dark:text-gray-400">{attributes}</div>
        <div className="text-gray-500 dark:text-gray-400">{highSchool}</div>
        <div className="text-gray-500 dark:text-gray-400">{formattedDate}</div>
        <div className="text-gray-500 dark:text-gray-400">{eligibility}</div>
      </div>

      <div className="flex items-center">
        <div className="text-gray-500 dark:text-gray-400 text-xs font-medium self-start ml-auto">
          {rating}
        </div>
      </div>
    </a>
  )
}
