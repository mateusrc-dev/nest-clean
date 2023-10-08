import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import {
  Notification,
  NotificationProps,
} from '@/domain/notification/enterprise/entities/notification'
import { faker } from '@faker-js/faker'

export function makeNotification(
  override: Partial<NotificationProps> = {},
  id?: UniqueEntityID,
) {
  // 'Partial' makes all properties in 'NotificationProps' optional
  const notification = Notification.create(
    {
      title: faker.lorem.sentence(4), // 'sentence' created a text small
      // slug: Slug.create('example-notification'), // automated creation
      recipientId: new UniqueEntityID(),
      content: faker.lorem.sentence(10),
      ...override, // to overwrite any value that was sent in 'override'
    },
    id,
  )

  return notification
}
