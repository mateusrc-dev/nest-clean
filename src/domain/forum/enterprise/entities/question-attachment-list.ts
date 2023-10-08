import { WatchedList } from '@/core/entities/watched-list'
import { QuestionAttachment } from './question-attachment'

export class QuestionAttachmentList extends WatchedList<QuestionAttachment> {
  // this generic says what kind of class we're going to have inside
  compareItems(a: QuestionAttachment, b: QuestionAttachment): boolean {
    return a.attachmentId.equals(b.attachmentId)
  }
}
