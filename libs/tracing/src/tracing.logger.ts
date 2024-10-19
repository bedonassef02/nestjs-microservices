import { ConsoleLogger, Inject, Injectable, Scope } from '@nestjs/common';
import { INQUIRER } from '@nestjs/core';
import { CONTEXT, NatsContext, RequestContext } from '@nestjs/microservices';

@Injectable({ scope: Scope.REQUEST })
export class TracingLogger extends ConsoleLogger {
  constructor(
    @Inject(CONTEXT) private readonly ctx: RequestContext<unknown, NatsContext>,
    @Inject(INQUIRER) host: Object,
  ) {
    const clsName = host?.constructor?.name;
    super(clsName);
  }

  protected formatContext(context: string): string {
    const traceId = this.ctx.getContext().getHeaders().get('traceId');
    return super.formatContext(context) + `[traceId: ${traceId}]`;
  }
}
