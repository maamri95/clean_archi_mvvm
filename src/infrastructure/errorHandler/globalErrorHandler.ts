import {ErrorHandler} from "#contracts/ErrorHandler.ts";
import {DI_TOKENS} from "#config/diTokens.ts";
import {inject, injectable} from "tsyringe";
import { Logger } from "#src/contracts/logger";
@injectable()
export class GlobalErrorHandler extends ErrorHandler {
    constructor(@inject(DI_TOKENS.logger) private logger: Logger) {
        super();
    }

    /**
     * Handle an error send only in development
     * @param error
     * @param message
     */
    handle(error: any, message: string): void {
        this.logger.error(message, error);
    }

    /**
     * Report an error send only in production
     * @param error
     * @param message
     */
    report(error: any, message: string): void {
        this.logger.error(message, error);
    }

}