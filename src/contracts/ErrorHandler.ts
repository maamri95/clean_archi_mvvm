import {Env} from "#utils/env.ts";

export abstract class ErrorHandler {
    protected debug: boolean = Env("NODE_ENV") === "development";
    protected sendReport: boolean = Env("NODE_ENV") === "production";
    abstract handle(error: any, message: string): void;
    abstract report(error: any, message: string): void;

    protected isDebuggingEnabled(): boolean {
        return this.debug;
    }

    protected shouldReport(): boolean {
        return this.sendReport;
    }

    execute(error: any, message: string): void {
        if (this.isDebuggingEnabled()) {
            this.handle(error, message)
        }

        if (this.shouldReport()) {
            this.report(error, message);
        }
    }
}