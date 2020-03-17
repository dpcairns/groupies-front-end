import request from "superagent";

const URL = 'https://vast-ravine-67223.herokuapp.com/api/';

export const getSaved = async() => {
    const user = JSON.parse(localStorage.getItem('user'));
    const url = '${URL}me/saved';
    const token = user ? user.token : '';
    let data = await request.get(url)
        .set('Authorization', token)
        .catch(err => alert(err));
    return data;
}
export const addSaved = async(body) => {
    const user = JSON.parse(localStorage.getItem('user'));
    const url = '${URL}me/saved';
    const token = user ? user.token : '';
    let data = await request.post(url, body)
        .set('Authorization', token)
        .catch(err => alert(err));
    return data;
}
export const deleteSaved = async(id) => {
    const user = JSON.parse(localStorage.getItem('user'));
    const url = `${URL}me/saved/${id}`;
    const token = user ? user.token : '';
    let data = await request.delete(url)
        .set('Authorization', token)
        .catch(err => alert(err));
    return data;
}

export const getConcerts = (keyword = '', city = '') => request.get(`${URL}concerts?city=${city}&keyword=${keyword}`);

export const getConcert = (id) => request.get(`${URL}concerts/${id}`);

export const goFromSavedToDetails = (id) => request.get(`${URL}saved/${id}`);









