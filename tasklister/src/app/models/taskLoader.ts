export class taskLoader {
    private taskLoaderID: number = -1;
    private class: string = "";
    private task: string = "";
    private dueDate: string = "";
    private userID: number = -1;

    constructor(tID: number, CLASS: string, TASK: string, DUEDATE: string, ID: number) {
        this.taskLoaderID = tID;
        this.class = CLASS;
        this.task = TASK;
        this.dueDate = DUEDATE;
        this.userID = ID;
    }

    get tID(): number {
        return this.taskLoaderID;
    }
    set tID(tID: number) {
        this.taskLoaderID = tID;
    }

    get CLASS(): string {
        return this.class;
    }
    set CLASS(CLASS: string) {
        this.class = CLASS;
    }

    get TASK(): string {
        return this.task;
    }
    set TASK(TASK: string) {
        this.task = TASK;
    }

    get DUEDATE(): string {
        return this.dueDate;
    }
    set DUEDATE(DUEDATE: string) {
        this.dueDate = DUEDATE;
    }
    
    get ID(): number {
        return this.userID;
    }
    set ID(ID: number) {
        this.userID = ID;
    }
}