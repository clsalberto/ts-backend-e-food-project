export interface HashAdapter {
  encript(text: string): Promise<string>
  verify(text: string, hash: string): Promise<boolean>
}
