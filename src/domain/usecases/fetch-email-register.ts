export interface FetchEmailRegister {
  checkEmailAlreadyExist: (email: string) => Promise<boolean>
}
