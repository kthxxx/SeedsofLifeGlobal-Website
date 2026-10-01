export const contactTopics = {
  volunteer: {
    subject: "Volunteering",
    prompt: "Tell us about the time, skills, or interests you would like to share.",
  },
  partner: {
    subject: "Partnership",
    prompt: "Tell us about your organization and the kind of partnership you have in mind.",
  },
  give: {
    subject: "Giving or support",
    prompt: "Tell us how you would like to support the work or what giving details you need.",
  },
} as const

export type ContactTopic = keyof typeof contactTopics

export function isContactTopic(value: string | undefined): value is ContactTopic {
  return value !== undefined && Object.hasOwn(contactTopics, value)
}
