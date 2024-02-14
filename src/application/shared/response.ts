import { ResponseHttp } from './types'

interface NotifyOptions {
  status: ResponseHttp
}

abstract class Notify {
  protected message: string
  protected options: NotifyOptions

  constructor(message: string, options: NotifyOptions) {
    this.message = message
    this.options = options
  }
}

export class Created extends Notify {
  static get(message: string): Created {
    return new Created(message, {
      status: ResponseHttp.CREATED
    })
  }
}

export class BadRequest extends Notify {
  static get(message: string): BadRequest {
    return new BadRequest(message, {
      status: ResponseHttp.BAD_REQUEST
    })
  }
}

export class DatabaseError extends Notify {
  static get(message: string): DatabaseError {
    return new DatabaseError(message, {
      status: ResponseHttp.DATABASE_ERROR
    })
  }
}
