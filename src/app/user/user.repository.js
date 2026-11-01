import{User} from '../../common/db/user.model.js';

export async function findUserByEmail(email) {
    const user = await User.findOne({
        email: {
            $eq: email,
            $ne: null,
            $exists: true
        }
    });

    return user;
}

export async function createUser(data) {
    const user = await User.create(data);

    return user;
}

export async function findUserById(id) {
    const user = await User.findById(id);

    return user;
}

export async function updateUserById(id, data) {
    const user = await User.findByIdAndUpdate(id, data, {
        new: true,
        runValidators: true
    });

    return user;
}

export async function deleteUserById(id) {
    const user = await User.findByIdAndDelete(id);

    return user;
}