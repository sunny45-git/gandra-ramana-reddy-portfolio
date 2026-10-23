const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const AdminUserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Name is required'],
      trim: true,
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: [true, 'Password is required'],
      minlength: [6, 'Password must be at least 6 characters'],
    },
    role: {
      type: String,
      enum: ['admin', 'superadmin'],
      default: 'admin',
    },
    lastLogin: {
      type: Date,
    },
  },
  { timestamps: true }
);

// Encrypt password before save
AdminUserSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  // Prevent double hashing if already bcrypt hashed
  if (this.password && (this.password.startsWith('$2a$') || this.password.startsWith('$2b$'))) {
    return next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// Compare password
AdminUserSchema.methods.matchPassword = async function (enteredPassword) {
  if (!this.password) return false;
  // Support auto-upgrade if password was stored unhashed in legacy DB
  if (!this.password.startsWith('$2a$') && !this.password.startsWith('$2b$')) {
    if (this.password === enteredPassword) {
      this.password = enteredPassword;
      await this.save();
      return true;
    }
    return false;
  }
  return await bcrypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.model('AdminUser', AdminUserSchema);
