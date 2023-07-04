import mongoose from 'mongoose'

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true,
    minlength: 8
  },
  avatar: {
    type: String,
    default: 'https://avatars.githubusercontent.com/u/106480374?v=4'
  },
  province: {
    type: String
  },
  postalCode: {
    type: Number
  },
  type: {
    type: String,
    default: 'register'
  },
  role: {
    type: String,
    default: 'jobseeker'
  },
}, {
  timestamps: true
})

const User = mongoose.models.user || mongoose.model('user', userSchema)
export default User