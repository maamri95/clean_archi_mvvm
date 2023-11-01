import DependencyContainer from "tsyringe/dist/typings/types/dependency-container";
import {GlobalErrorHandler} from "#infrastructure/errorHandler/globalErrorHandler.ts";

/**
 * Setup error handler for client application
 * @param container
 */
export const setupErrorHandler = (container: DependencyContainer) => {
    const globalErrorHandler = container.resolve<GlobalErrorHandler>(GlobalErrorHandler);
    globalThis.onerror = (message, _source, _lineno, _colno, error) => {
        globalErrorHandler.execute(error, message.toString());
        return false;
    };
    globalThis.onunhandledrejection = (error) => {
        globalErrorHandler.execute(error, error.reason);
    };
}