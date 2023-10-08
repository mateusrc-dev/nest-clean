import { SendNotificationUseCase } from './send-notification'
import { InMemoryNotificationsRepository } from 'test/repositories/in-memory-notifications-repository'

let inMemoryNotificationRepository: InMemoryNotificationsRepository
let sut: SendNotificationUseCase // sut = system under test

describe('Send Notification', () => {
  beforeEach(() => {
    inMemoryNotificationRepository = new InMemoryNotificationsRepository()
    sut = new SendNotificationUseCase(inMemoryNotificationRepository)
  })

  it('should be able to send a notification', async () => {
    const result = await sut.execute({
      recipientId: '1',
      title: 'Nova notificação',
      content: 'Conteúdo da notificação',
    })

    expect(result.isRight()).toBe(true) // id cannot be undefined, null
    expect(inMemoryNotificationRepository.items[0].id).toEqual(
      result.value?.notification.id,
    )
  })
})
