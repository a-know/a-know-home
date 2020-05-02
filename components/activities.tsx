export default function Activities({ activitiesData }: { activitiesData: string[][] }) {
  return (
    <>
    {activitiesData.map(([ id, date, url, kind, text ]) => (
      <li key={id}>{date}：<a href={url} target="_blank">{kind} ＠ {text}</a></li>
    ))}
    </>
  )
}
