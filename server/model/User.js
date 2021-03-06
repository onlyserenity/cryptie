import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import validator from 'validator';

import * as Config from '../config';

const Schema = mongoose.Schema;

// User Schema
const UserSchema = new Schema({

    email: {
        type: String,
        required: true,
        unique: true,
        minlength: 2,
        validate: {
            validator: validator.isEmail
        }
    },
    password: {
        type: String,
        required: true,
        minlength: 4
    },
    fullname: {
        type: String,
        required: true,
        minlength: 4
    }
});

// User's password prehook
UserSchema.pre('save', function(next) {
    let user = this

    bcrypt.hash(user.password, Config.saltRounds, (error, hash) => {
        if (error) return next(error);
        user.password = hash
        next();
    })
})

export const UserModel = mongoose.model('users', UserSchema);