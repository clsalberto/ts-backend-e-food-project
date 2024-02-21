interface MailInput {
  name: string
  email: string
}

export interface MailMessage {
  from: MailInput
  subject: string
  body: string
}

export interface MailAdapter {
  send(message: MailMessage): Promise<void>
}
