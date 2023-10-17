import { Attachment } from '../../enterprise/entities/attachment'

export abstract class AttachmentsRepository {
  // this is repository is only a contract
  // nestjs don't understand typescript, then let's use abstract class
  abstract create(attachment: Attachment): Promise<void>
}
