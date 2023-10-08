// this class is a object-value

export class Slug {
  public value: string

  private constructor(value: string) {
    this.value = value
  }

  static create(slug: string) {
    // let's create this method so we don't need to format the slug
    return new Slug(slug)
  }

  /**
   * receives a string and normalize it as a slug.
   *
   * example: "An example title" => "an-example-title"
   *
   * @param text {string}
   */
  static createFromText(text: string) {
    // static - we can use this function without instantiating this class
    const slugText = text
      .normalize('NFKD') // normalize function will remove any kind of accent
      .toLowerCase()
      .trim()
      .replace(/\s+/g, '-') // regex to delete empty spaces in string
      .replace(/[^\w-]+/g, '') // [] => to match character set - let's delete everything other than words
      .replace(/_/g, '-') // we let's to replace '_' to '-'
      .replace(/--+/g, '-')
      .replace(/-$/g, '') // if at the end of the string there is a '-', we will replace it with nothing

    return new Slug(slugText)
  }
}
