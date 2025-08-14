export const getCourses = async (canvas_url, canvas_session) => {
    const myHeaders = new Headers();
    myHeaders.append("Cookie", `canvas_session=${canvas_session}`);

    const requestOptions = {
        method: "GET",
        headers: myHeaders,
        redirect: "follow"
    };

    const response = await fetch(`https://${canvas_url}/api/v1/users/self/favorites/courses?include[]=term&include[]=sections&sort=nickname`, requestOptions);

    if (!response.ok) throw response.statusText;
    
    return await response.json();
};