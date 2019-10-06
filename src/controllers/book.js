
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
    console.log(process.env.REACT_APP_API_URL + "/book/get/all")
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


export const getMoreBooks = (skipNumber) => {
    return fetch(`${process.env.REACT_APP_API_URL}/book/get/more`, {
        method: "POST",
        headers: {
            Accept: "Application/json",
            "Content-Type": "Application/json",

        },
        body: JSON.stringify({skipNumber})
    })
    .then( res => {
        return res.json()
    })
    .catch( err => console.log("ERROR GET MORE BOOKS", err));
}

export const postUpdateBook = async (bookInfo, userInfo, bookId) => {
    return await fetch(`${process.env.REACT_APP_API_URL}/book/update/${bookId}`, {
        method: "POST",
        headers: {
            Accept: "Application/json",
            Authorization: `Bearer ${userInfo.token}`

        },
        body: bookInfo
    })
    .then( res => {
        return res.json()
    })
    .catch( err => console.log("ERROR UPDATE BOOK", err));
}

export const postDeleteBook = (bookId, userInfo) => {
    return fetch(`${process.env.REACT_APP_API_URL}/book/delete/${bookId}`, {
        method: "DELETE",
        headers: {
            Accept: "Application/json",
            Authorization: `Bearer ${userInfo.token}`

        }
    })
    .then( res => {
        return res.json()
    })
    .catch( err => console.log("ERROR DELETE BOOK", err));
}