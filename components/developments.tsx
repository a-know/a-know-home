export default function Developments({ developmentsData }: { developmentsData: string[][] }) {
  return (
    <div className="col-sm-9">
      <div className="row">
        <div className="col-sm-12">
          <ul className="service-list">
            {developmentsData.map(([ id, kind, url, text ]) => (
              <li key={id}>{kind} ／ <a href={url} target="_blank">{text}</a></li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}
