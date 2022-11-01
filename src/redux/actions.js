export const userLogIn = (data) => {
    return {
    type: 'user/userLogIn',
    payload: {
        _id: data._id,
        avatar: data.avatar,
        email: data.email,
        skillset: data.skillset,
    }
}
}

export const addProjectList = (data) => {
    return {
    type: 'projectList/projectListAdd',
    payload: {
        projectList: data,
    }
}
}

export const searchProject = (data) => {
    return {
    type: 'searchList/searchProject',
    payload: {
        search: data,
    }
}
}