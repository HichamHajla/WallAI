import axios from 'axios'


// export const register = abc => {
//     return axios.post('http://localhost:8080/auth/register', {
//         username : abc.username,
//         first_name : abc.first_name,
//         last_name : abc.last_name,
//         email : abc.email,
//         password : abc.password,
//         image : abc.image
//     })
//     .then(res => console.log('Registered'))
//     .catch(err => console.log(err))
// }

export const login = user => {
    return axios.post('http://localhost:8080/auth/login', {
        email : user.email,
        password : user.password
    })
    .then(res => {
        // console.log(res.headers.get('auth-token'))
        localStorage.setItem('usertoken', res.data[0]) // sets a usertoken into the localstorage coming from res.data
        localStorage.setItem('details', JSON.stringify(res.data[1]))
        return res.data
    }) 
    .catch(err => console.error(err))
}