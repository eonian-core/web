const formUrl = 'https://docs.google.com/forms/d/e/1FAIpQLSfx0jx3sNnxkJxWiScPiiMVVSQW3EaOUEtkjwv8phhEBKlonw/formResponse'
const tokenEntryId = 'entry.1169450829'
const emailEntryId = 'entry.1642066663'

export async function notifyToken(token: string): Promise<void> {
  const data = new FormData()

  data.append(tokenEntryId, token)

  await fetch(formUrl, {
    method: 'POST',
    body: data,
    mode: 'no-cors',
  })
}

export async function notifyEmail(token: string, email: string): Promise<void> {
  const data = new FormData()

  data.append(tokenEntryId, token)
  data.append(emailEntryId, email)

  await fetch(formUrl, {
    method: 'POST',
    body: data,
    mode: 'no-cors',
  })
}
