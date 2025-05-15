import { CallHandler, ExecutionContext, Injectable, Logger, NestInterceptor } from "@nestjs/common";
import { ApiCodeResponse } from "./enum";
import { configManager } from '@common/config';
import { ConfigKey } from "../enum";
import { isNil } from "lodash";
import { Observable, map, catchError, of } from "rxjs";

@Injectable()
export class ApiInterceptor implements NestInterceptor {
  private readonly logger = new Logger(ApiInterceptor.name);

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const ctx = context.switchToHttp();
    const path = ctx.getRequest().route.path;
    const req = ctx.getRequest();

    if (path.includes('webhook')) {
      return next.handle();
    }

    return next
      .handle()
      .pipe(
        map(async (response: any) => {
          return { code: this.map(path), data: response, result: true };
        }),
        catchError((error) => {
          this.logger.error(error);
          const code = error?.response?.code || ApiCodeResponse.COMMON_ERROR;
          const message = error?.response?.message || error?.message || 'Erreur inconnue';
          return of({ code, message, data: null, result: false });
        })
      );
  }

  map(path: String): ApiCodeResponse {
    this.logger.log(`path ${path}`);
    const part = path
      .replace(configManager.getValue(ConfigKey.APP_BASE_URL), '')
      .split('/')
      .filter(s => s.length > 0)
      .slice(0, 2)
      .map(s => s.toUpperCase());

    console.log(`codeResponse: ${part.join('_')}_SUCCESS`);
    const code = ApiCodeResponse[`${part.join('_')}_SUCCESS` as keyof typeof ApiCodeResponse];
    return isNil(code) ? ApiCodeResponse.COMMON_SUCCESS : code;
  }
}
