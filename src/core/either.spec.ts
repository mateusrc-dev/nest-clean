import { Either, left, right } from './either'

function doSomething(shouldSuccess: boolean): Either<string, number> {
  if (shouldSuccess) {
    return right(10)
  } else {
    return left('error')
  }
}

test('success result', () => {
  const result = doSomething(true)

  expect(result.isLeft()).toBe(false)
  expect(result.isRight()).toBe(true) // it is possible to access this method because the class 'right' is already instantiated
})

test('error result', () => {
  const result = doSomething(false)

  expect(result.isRight()).toBe(false)
  expect(result.isLeft()).toBe(true) // it is possible to access this method because the class 'right' is already instantiated
})
