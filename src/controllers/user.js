
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