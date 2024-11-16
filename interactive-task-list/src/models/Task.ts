export type Priority = 'High' | 'Medium' | 'Low'

export default class Task {
  public id: number
  public title: string
  public description: string
  public completed: boolean
  public priority: Priority
  public createdDate: number

  constructor(id: number, title: string, description: string, priority: Priority) {
    this.id = id
    this.title = title
    this.description = description
    this.completed = false
    this.priority = priority
    this.createdDate = new Date().getTime()
  }
}
