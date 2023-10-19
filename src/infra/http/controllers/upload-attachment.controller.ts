import { InvalidAttachmentType } from '@/domain/forum/application/use-cases/errors/invalid-attachment-type'
import { UploadAndCreateAttachmentUseCase } from '@/domain/forum/application/use-cases/upload-and-create-attachment'
import {
  Controller,
  Post,
  UseInterceptors,
  UploadedFile,
  ParseFilePipe,
  MaxFileSizeValidator,
  FileTypeValidator,
  BadRequestException,
} from '@nestjs/common'
import { FileInterceptor } from '@nestjs/platform-express'

@Controller('/attachments')
export class UploadAttachmentController {
  constructor(
    private uploadAndCreateAttachment: UploadAndCreateAttachmentUseCase,
  ) {}

  @Post() // decorator is like a function, the elements after it are arguments
  @UseInterceptors(FileInterceptor('file'))
  async handle(
    @UploadedFile(
      new ParseFilePipe({
        // will do validation of file
        validators: [
          new MaxFileSizeValidator({ maxSize: 1024 * 1024 * 2 }), // 2mb
          new FileTypeValidator({ fileType: '.(png|jpg|jpeg|pdf)' }), // files that will be accepted
        ],
      }),
    )
    file: Express.Multer.File,
  ) {
    // UploadedFile - will returns the content of file
    const result = await this.uploadAndCreateAttachment.execute({
      fileName: file.originalname,
      fileType: file.mimetype,
      body: file.buffer,
    })

    if (result.isLeft()) {
      const error = result.value // let's store the error that occurred in variable

      switch (error.constructor) {
        // constructor returns the class that generated this error
        case InvalidAttachmentType:
          throw new BadRequestException(error.message) // error coming from nestjs will trigger error with status code
        default:
          throw new BadRequestException(error.message) // generic error
      }
    }

    const { attachment } = result.value

    return { attachmentId: attachment.id.toString() }
  }
}
