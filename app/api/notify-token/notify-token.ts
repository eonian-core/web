import { requireEnv } from '@/api/environment'

const tokenEntryId = requireEnv('NEXT_NOTIFY_TOKEN_ENTRY_ID', process.env.NEXT_NOTIFY_TOKEN_ENTRY_ID)
const emailEntryId = requireEnv('NEXT_NOTIFY_TOKEN_EMAIL_ENTRY_ID', process.env.NEXT_NOTIFY_TOKEN_EMAIL_ENTRY_ID)
const formUrl = requireEnv('NEXT_NOTIFY_TOKEN_URL', process.env.NEXT_NOTIFY_TOKEN_URL)

interface FormEntry {
  name: string
  value: string
}

async function submitForm(entries: FormEntry[]): Promise<void> {
  const data = new FormData()
  entries.forEach(entry => data.append(entry.name, entry.value))

  await fetch(formUrl, {
    method: 'POST',
    body: data,
    mode: 'no-cors',
  })
}

export async function notifyToken(token: string): Promise<void> {
  return await submitForm([{ name: tokenEntryId, value: token }])
}

export async function notifyEmail(token: string, email: string): Promise<void> {
  return await submitForm([{ name: tokenEntryId, value: token }, { name: emailEntryId, value: email }])
}
