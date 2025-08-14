export const getProjects = async (ticktick_access_token) => {
    const myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${ticktick_access_token}`);

    const requestOptions = {
        method: "GET",
        headers: myHeaders,
        redirect: "follow"
    };

    const response = await fetch("https://ticktick.com/open/v1/project", requestOptions);

    return await response.json();
}

export const getProjectData = async (ticktick_access_token, project_id) => {
    const myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${ticktick_access_token}`);

    const requestOptions = {
        method: "GET",
        headers: myHeaders,
        redirect: "follow"
    };

    const response = await fetch(`https://ticktick.com/open/v1/project/${project_id}/data`, requestOptions);

    return await response.json();
}

export const getProjectTasks = async (ticktick_access_token, project_id) => {
    const projectData = await getProjectData(ticktick_access_token, project_id);

    return projectData.tasks;
}