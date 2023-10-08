import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { Optional } from '@/core/types/optional'
import { Comment, CommentProps } from './comment'

export interface QuestionCommentProps extends CommentProps {
  // we will only put the information that we have the most in comment
  questionId: UniqueEntityID
}

export class QuestionComment extends Comment<QuestionCommentProps> {
  get questionId() {
    return this.props.questionId
  }

  static create(
    props: Optional<QuestionCommentProps, 'createdAt'>,
    id?: UniqueEntityID,
  ) {
    // createdAt will be optional when creating a new question - but not database optional
    const questionComment = new QuestionComment(
      {
        ...props,
        createdAt: props.createdAt ?? new Date(),
      },
      id, // let's automate the creation of createdAt and slug
    ) // we can call Question class because we extend Entity class

    return questionComment
  }
}
