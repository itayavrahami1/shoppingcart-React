import Axios from 'axios'
const BASE_URL = 'http://localhost:3001/api/toy'

const axios = Axios.create({
    withCredentials: true
})

const resolveData = res => res.data

export const toyService = {
    query,
    getById,
    remove,
    save
}

// function getUsers() {
//     return httpService.get('user')
// }

// function getById(userId) {
//     return httpService.get(`user/${userId}`)
// }
// function remove(userId) {
//     return httpService.delete(`user/${userId}`)
// }

// function update(user) {
//     return httpService.put(`user/${user._id}`, user)
// }

function query(filterBy = {}) {
    var queryParams = new URLSearchParams()
    for (const filterType in filterBy) {
        queryParams.set(filterType, filterBy[filterType])
    }
    return axios.get(`${BASE_URL}?${queryParams}`)
        .then(resolveData)
}

function getById(toyId) {
    return axios.get(`${BASE_URL}/${toyId}`)
        .then(resolveData)
}

function remove(toyId) {
    return axios.delete(`${BASE_URL}/${toyId}`)
}

function save(toy) {
    if (toy._id) {
        toy.updatedAt = Date.now();
        return axios.put(`${BASE_URL}/${toy._id}`, toy).then(res => {return{ toy: res.data, isNew: false}})
    } else {
        toy.createdAt = Date.now();
        toy._id = _makeId()
        toy.inStock = (Math.random() < 0.75) ? true:false
        return axios.post(BASE_URL, toy).then(res => {return{ toy: res.data, isNew: true}})
    }
}

function _makeId(length = 5) {
    var txtId = '';
    var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (var i = 0; i < length; i++) {
        txtId += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return txtId;
}
