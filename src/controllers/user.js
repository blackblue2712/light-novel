
export const postSignin = async (userInfo) => {
    return await fetch(`${process.env.REACT_APP_API_URL}/user/signin`, {
        method: "POST",
        headers: {
            Accept: "Application/json",
            "Content-Type": "Application/json"
        },
        body: JSON.stringify(userInfo)
    })
    .then( res => {
        return res.json()
    })
    .catch( err => console.log("ERROR SIGNIN", err));
}

export const authenticate = (data, callback) => {
    if(typeof window === undefined) return false;
    localStorage.setItem("jwt", JSON.stringify(data));
    callback();
}

export const isAuthenticated = () => {
    if(typeof window === undefined) return false;
    if(localStorage.getItem("jwt")) {
        return JSON.parse(localStorage.getItem("jwt"));
    }
    return false;
}

export const getUsers = () => {
    return fetch(`${process.env.REACT_APP_API_URL}/user/get/all`, {
        method: "GET",
        headers: {
            Accept: "Application/json",
            "Content-Type": "Application/json"
        }
    })
    .then( res => {
        return res.json()
    })
    .catch( err => console.log("ERROR GET USERS", err));
}

export const getMoreUsers = (skipNumber) => {
    return fetch(`${process.env.REACT_APP_API_URL}/user/get/more`, {
        method: "POST",
        headers: {
            Accept: "Application/json",
            "Content-Type": "Application/json"
        },
        body: JSON.stringify({skipNumber})
    })
    .then( res => {
        return res.json()
    })
    .catch( err => console.log("ERROR GET MROE USERS", err));
}

export const getSingleUser = userId => {
    return fetch(`${process.env.REACT_APP_API_URL}/user/get/${userId}`, {
        method: "GET",
        headers: {
            Accept: "Application/json",
            "Content-Type": "Application/json"
        }
    })
    .then( res => {
        return res.json()
    })
    .catch( err => console.log("ERROR GET SINGLE USER", err));
}

export const updateUser = (userInfo, token) => {
    return fetch(`${process.env.REACT_APP_API_URL}/user/update`, {
        method: "POST",
        headers: {
            Accept: "Application/json",
            "Content-Type": "Application/json",
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(userInfo)
    })
    .then( res => {
        return res.json()
    })
    .catch( err => console.log("ERROR UPDATE", err));
}