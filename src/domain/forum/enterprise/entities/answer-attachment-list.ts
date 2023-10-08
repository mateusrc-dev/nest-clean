import { WatchedList } from '@/core/entities/watched-list'
import { AnswerAttachment } from './answer-attachment'

export class AnswerAttachmentList extends WatchedList<AnswerAttachment> {
  // this generic says what kind of class we're going to have inside
  compareItems(a: AnswerAttachment, b: AnswerAttachment): boolean {
    return a.attachmentId.equals(b.attachmentId)
  }
}
