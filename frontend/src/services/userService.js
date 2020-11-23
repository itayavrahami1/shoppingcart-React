import httpService from './httpService'

export const userService = {
    login,
    logout,
    signup,
    getUsers,
    getById,
    remove,
    update,
    updateCart
}

function getUsers() {
    return httpService.get('user')
}

function getById(userId) {
    return httpService.get(`user/${userId}`)
}
function remove(userId) {
    return httpService.delete(`user/${userId}`)
}

function update(user) {
    return httpService.put(`user/${user._id}`, user)
}

function updateCart(user, item, diff = 1) {
    debugger
    if (!user.cart || !user.cart.length) {
        item['amount']= 1
        user['cart'] = [item];
    } else {
        const itemIdx = user.cart.findIndex(currItem => {return item._id === currItem._id})
        if (itemIdx !== -1) {
            user.cart[itemIdx]['amount'] = user.cart[itemIdx]['amount'] + diff
        } else {
            item['amount'] = 1
            user.cart.push(item)
        }
    }
    return httpService.put(`user/${user._id}`, user)
}

async function login(userCred) {
    const user = await httpService.post('auth/login', userCred)
    return _handleLogin(user)
}
async function signup(userCred) {
    userCred['cart'] = [];
    console.log(userCred);
    const user = await httpService.post('auth/signup', userCred)
    return _handleLogin(user)
}
async function logout() {
    await httpService.post('auth/logout');
    sessionStorage.clear();
}
function _handleLogin(user) {
    sessionStorage.setItem('user', JSON.stringify(user))
    return user;
}