export interface Task {
    id: number;
    name: string;
    status: Status;
}

export type Status = 'completed' | 'uncompleted';