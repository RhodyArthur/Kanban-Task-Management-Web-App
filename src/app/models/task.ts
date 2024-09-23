import { Subtask } from "./subtask";

export interface Task {
    id:string;
    title: string;
    description: string;
    status: string;
    subtasks: Subtask[]
}
