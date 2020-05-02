export default function Careers({ careersData }: { careersData: string[][] }) {
  return (
    <div className="col-sm-9">
      <div className="row">
        <div className="col-sm-12">
          <ul className="service-list">
            {careersData.map(([ id, period, companyName ]) => (
              <li key={id}>{period} ：{companyName}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}
