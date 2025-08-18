export const createTask = async (
    ticktick_access_token,
    title,
    projectId,
    isAllDay,
    startDate,
    dueDate,
    tags
) => {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Authorization", `Bearer ${ticktick_access_token}`);

    const raw = JSON.stringify({
        title,
        projectId,
        isAllDay,
        "startDate": startDate,
        "dueDate": dueDate,
        tags
    });

    const requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: raw,
        redirect: "follow"
    };

    await fetch("https://ticktick.com/open/v1/task", requestOptions);
}

export const updateTask = async (
    ticktick_access_token,
    id,
    title,
    projectId,
    isAllDay,
    startDate,
    dueDate,
    tags
) => {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Authorization", `Bearer ${ticktick_access_token}`);

    const raw = JSON.stringify({
        id,
        title,
        projectId,
        isAllDay,
        "startDate": startDate,
        "dueDate": dueDate,
        tags
    });

    const requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: raw,
        redirect: "follow"
    };

    await fetch(`https://ticktick.com/open/v1/task/${id}`, requestOptions);
}

export const deleteTask = async (ticktick_access_token, projectId, taskId) => {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Authorization", `Bearer ${ticktick_access_token}`);

    const requestOptions = {
        method: "DELETE",
        headers: myHeaders,
        redirect: "follow"
    };

    await fetch(`https://ticktick.com/open/v1/project/${projectId}/task/${taskId}`, requestOptions);
}