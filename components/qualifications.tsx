export default function Qualifications({ qualificationsData }: { qualificationsData: string[][] }) {
    return (
      <div className="col-sm-9">
        <div className="row">
          <div className="col-sm-12">
            <ul className="service-list">
              {qualificationsData.map(([ id, date, qualification ]) => (
                <li key={id}>{date} : {qualification}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    )
  }
  