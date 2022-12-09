import {
  User
} from '../../models/User'

export function processUser(uid: string): void{
  let user = User.load(uid)
  if (!user) {
    user = new User(uid)
    user.save()
  }
}
