export const getGroups = () => {
    return fetch(`${process.env.REACT_APP_API_URL}/group/get/all`, {
        method: "GET",
        headers: {
            Accept: "Application/json",
            "Content-Type": "Application/json"
        }
    })
    .then( res => {
        return res.json()
    })
    .catch( err => console.log("ERROR GET GROUPS", err));
}


export const getMoreGroups = (skipNumber) => {
    return fetch(`${process.env.REACT_APP_API_URL}/group/get/more`, {
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
    .catch( err => console.log("ERROR GET MORE GROUP", err));
}

export const getSingleGroup = groupId => {
    return fetch(`${process.env.REACT_APP_API_URL}/group/get/${groupId}`, {
        method: "GET",
        headers: {
            Accept: "Application/json",
            "Content-Type": "Application/json"
        }
    })
    .then( res => {
        return res.json()
    })
    .catch( err => console.log("ERROR GET SINGLE GROUP", err));
}

export const updateGroup = (groupInfo, token) => {
    console.log(groupInfo);
    return fetch(`${process.env.REACT_APP_API_URL}/group/update`, {
        method: "POST",
        headers: {
            Accept: "Application/json",
            "Content-Type": "Application/json",
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(groupInfo)
    })
    .then( res => {
        return res.json()
    })
    .catch( err => console.log("ERROR UPDATE GROUP", err));
}