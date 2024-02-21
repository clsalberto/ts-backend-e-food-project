import { ResponseHttp, ResponseTitle } from './types'

interface ConfigOptions {
  title: ResponseTitle
  status: number
}

export function objectData<T = unknown>(args?: T): T | undefined {
  return args
}

abstract class Notify {
  protected data?: <T = unknown>(args?: T) => T
  protected message: string
  protected options: ConfigOptions

  constructor(
    message: string,
    options: ConfigOptions,
    data?: <T = unknown>(args?: T) => T
  ) {
    this.message = message
    this.options = options
    this.data = data
  }
}

export class Ok extends Notify {
  static get(message: string, data?: <T = unknown>(args?: T) => T): Ok {
    return new Ok(
      message,
      {
        title: 'OK',
        status: ResponseHttp.OK
      },
      data
    )
  }
}

export class Created extends Notify {
  static get(message: string): Created {
    return new Created(message, {
      title: 'CREATED',
      status: ResponseHttp.CREATED
    })
  }
}

export class BadRequest extends Notify {
  static get(message: string): BadRequest {
    return new BadRequest(message, {
      title: 'BAD_REQUEST',
      status: ResponseHttp.BAD_REQUEST
    })
  }
}

export class NotFound extends Notify {
  static get(message: string): NotFound {
    return new NotFound(message, {
      title: 'NOT_FOUND',
      status: ResponseHttp.NOT_FOUND
    })
  }
}

export class DatabaseError extends Notify {
  static get(message: string): DatabaseError {
    return new DatabaseError(message, {
      title: 'DATABASE_ERROR',
      status: ResponseHttp.DATABASE_ERROR
    })
  }
}

export class Unauthorized extends Notify {
  static get(message: string): Unauthorized {
    return new Unauthorized(message, {
      title: 'UNAUTHORIZED',
      status: ResponseHttp.UNAUTHORIZED
    })
  }
}
