export class userProfile {
    private userID: number = -1;
    private name: string = "";
    private password: string = "";
    private email: string = "";

    constructor(ID: number, NAME: string, PASSWORD: string, EMAIL: string) {
        this.userID = ID;
        this.name = NAME;
        this.password = PASSWORD;
        this.email = EMAIL;
    }

    get ID(): number {
        return this.userID;
    }
    set ID(ID: number) {
        this.userID = ID;
    }

    get NAME(): string {
        return this.name;
    }
    set NAME(NAME: string) {
        this.name = NAME;
    }

    get PASSWORD(): string {
        return this.password;
    }
    set PASSWORD(PASSWORD: string) {
        this.password = PASSWORD;
    }

    get EMAIL(): string {
        return this.email;
    }
    set EMAIL(EMAIL: string) {
        this.email = EMAIL;
    }

}