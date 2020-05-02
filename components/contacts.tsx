export default function Contacts({ contactsData }: { contactsData: string[][] }) {
  return (
    <div className="col-sm-9">
      <ul>
        {contactsData.map(([ contactBy, url, text ]) => (
          <li key={contactBy}>{contactBy}: <a href={url} target="_blank">{text}</a></li>
        ))}
      </ul>
    </div>
  )
}
