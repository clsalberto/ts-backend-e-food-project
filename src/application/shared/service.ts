export interface Service<Input, Output> {
  execute(data: Input): Promise<Output>
}
