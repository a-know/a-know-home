export default function Summary({ summaryData }: { summaryData: string[][] }) {
  return (
    <div className="col-sm-9">
      <ul>
      {summaryData.map(([ id, kind, url, text ]) => (
        <li key={id}>{kind}：<a href={url} target="_blank">{text}</a></li>
      ))}
      </ul>
    </div>
  )
}
