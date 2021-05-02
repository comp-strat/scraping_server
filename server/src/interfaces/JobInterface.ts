export interface JobInterface {
    URLs: Array<string>,
    status: string,
    createdDate: Date,
    completedDate: Date | null
}