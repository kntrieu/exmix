import axios from 'axios';


export const fetchArticleDetails = () => {
    return function (dispatch) {
        return axios.get("http://localhost:3001/api/posts")
            .then(({ data }) => {
                console.log(data);
                //dispatch(setArticleDetails(data));
            });
    };
}

export const postFile = (fileData) => {
    const url = '/api/files';
    return (dispatch) => {
        return axios.post(url, fileData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
            .then(({ data }) => {
                console.log(data);
            });
    }
}