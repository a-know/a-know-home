export default function OldActivities({ oldActivitiesData }: { oldActivitiesData: string[][] }) {
  return (
    <details>
      <summary>2017年以前</summary>
      {oldActivitiesData.map(([ id, date, url, kind, text ]) => (
        <li key={id}>{date}：<a href={url} target="_blank">{kind} ＠ {text}</a></li>
      ))}
    </details>
  )
}
