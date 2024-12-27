export interface FetchEmailRegisterRepository {
  checkEmailAlreadyExist: (registerEmail: string) => Promise<boolean>
}
