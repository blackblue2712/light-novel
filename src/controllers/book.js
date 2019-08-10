
export const postAddbook = async (bookInfo, userInfo) => {
    return await fetch(`${process.env.REACT_APP_API_URL}/book/create/${userInfo.user._id}`, {
        method: "POST",
        headers: {
            Accept: "Application/json",
            "Content-Type": "Application/json",
            Authorization: `Bearer ${userInfo.token}`

        },
        body: JSON.stringify(bookInfo)
    })
    .then( res => {
        return res.json()
    })
    .catch( err => console.log("ERROR ADD BOOK", err));
}

export const getBooks = () => {
    return fetch(`${process.env.REACT_APP_API_URL}/book/get/all`, {
        method: "GET",
        headers: {
            Accept: "Application/json",
            "Content-Type": "Application/json",
        }
    })
    .then( res => {
        return res.json()
    })
    .catch( err => console.log("ERROR GET BOOKS", err));
}


export const getSingleBook = _id => {
    return fetch(`${process.env.REACT_APP_API_URL}/book/${_id}`, {
        method: "GET",
        headers: {
            Accept: "Application/json",
            "Content-Type": "Application/json"
        }
    })
    .then( res => {
        return res.json()
    })
    .catch( err => console.log("ERROR GET SINGLE BOOK", err));
}