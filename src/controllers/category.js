
export const postAddCate = async (cateInfo, userInfo) => {
    return await fetch(`${process.env.REACT_APP_API_URL}/category/create/${userInfo.user._id}`, {
        method: "POST",
        headers: {
            Accept: "Application/json",
            "Content-Type": "Application/json",
            Authorization: `Bearer ${userInfo.token}`

        },
        body: JSON.stringify(cateInfo)
    })
    .then( res => {
        return res.json()
    })
    .catch( err => console.log("ERROR ADD CATEGORY", err));
}

export const getCategories = () => {
    return fetch(`${process.env.REACT_APP_API_URL}/category/get/five`, {
        method: "GET",
        headers: {
            Accept: "Application/json",
            "Content-Type": "Application/json",

        }
    })
    .then( res => {
        return res.json()
    })
    .catch( err => console.log("ERROR GET CATEGORIES", err));
}

export const getAllCategories = () => {
    return fetch(`${process.env.REACT_APP_API_URL}/category/get/all`, {
        method: "GET",
        headers: {
            Accept: "Application/json",
            "Content-Type": "Application/json",

        }
    })
    .then( res => {
        return res.json()
    })
    .catch( err => console.log("ERROR GET CATEGORIES", err));
}


export const getMoreCategories = (skipNumber) => {
    return fetch(`${process.env.REACT_APP_API_URL}/category/get/more`, {
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
    .catch( err => console.log("ERROR GET MORE CATEGORIES", err));
}

export const getSingleCate = (cateId) => {
    return fetch(`${process.env.REACT_APP_API_URL}/category/get/${cateId}`, {
        method: "GET",
        headers: {
            Accept: "Application/json",
            "Content-Type": "Application/json",

        }
    })
    .then( res => {
        return res.json()
    })
    .catch( err => console.log("ERROR GET SINGLE CATEGORY", err));
}

export const postUpdateCategory = (cateInfo, userInfo) => {
    console.log(userInfo);
    return fetch(`${process.env.REACT_APP_API_URL}/category/update/${cateInfo._id}`, {
        method: "POST",
        headers: {
            Accept: "Application/json",
            "Content-Type": "Application/json",
            Authorization: `Bearer ${userInfo.token}`
        },
        body: JSON.stringify(cateInfo)
    })
    .then( res => {
        return res.json()
    })
    .catch( err => console.log("ERROR GET SINGLE CATEGORY", err));
}