export const crawlChapter = (url, sliceNumber, token) => {
    return fetch(`${process.env.REACT_APP_API_URL}/chapter/create/crawl-links`, {
        method: "POST",
        headers: {
            Accept: "Application/json",
            "Content-Type": "Application/json",
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({url, sliceNumber})
    })
    .then( res => {
        return res.json()
    })
    .catch( err => console.log("ERROR POST CRAWL CHAPTER", err));
}

export const getContentFromCrawlLinks = (links) => {
    return fetch(`${process.env.REACT_APP_API_URL}/chapter/create/crawl-data`, {
        method: "POST",
        headers: {
            Accept: "Application/json",
            "Content-Type": "Application/json"
        },
        body: JSON.stringify({links})
    })
    .then( res => {
        return res.json()
    })
    .catch( err => console.log("ERROR POST CRAWL CHAPTER", err));
}

export const postAddChapter = (chapters, titles, bookId, userId, token) => {
    console.log(chapters)
    return fetch(`${process.env.REACT_APP_API_URL}/chapter/create/${userId}`, {
        method: "POST",
        headers: {
            Accept: "Application/json",
            "Content-Type": "Application/json",
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({chapters, titles, bookId})
    })
    .then( res => {
        return res.json()
    })
    .catch( err => console.log("ERROR POST ADD CHAPTER", err));
}

export const getChapters = (bookId) => {
    return fetch(`${process.env.REACT_APP_API_URL}/chapter/get/${bookId}`, {
        method: "GET",
        headers: {
            Accept: "Application/json",
            "Content-Type": "Application/json"
        },
    })
    .then( res => {
        return res.json()
    })
    .catch( err => console.log("ERROR GET CHAPTERS", err));
}

export const getSingleChapter = chapterId => {
    return fetch(`${process.env.REACT_APP_API_URL}/chapter/${chapterId}`, {
        method: "GET",
        headers: {
            Accept: "Application/json",
            "Content-Type": "Application/json"
        }
    })
    .then( res => {
        return res.json()
    })
    .catch( err => console.log("ERROR GET SINGLE CHAPTER", err));
}

export const postDeleteChapter = (chapterId, token) => {
    return fetch(`${process.env.REACT_APP_API_URL}/chapter/delete/${chapterId}`, {
        method: "DELETE",
        headers: {
            Accept: "Application/json",
            Authorization: `Bearer ${token}`
        }
    })
    .then( res => {
        return res.json()
    })
    .catch( err => console.log("ERROR DELETE CHAPTER", err));
}