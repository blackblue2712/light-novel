
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
