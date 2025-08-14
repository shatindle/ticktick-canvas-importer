const base = async (canvas_url, canvas_session, canvas_course, type) => {
    const myHeaders = new Headers();
    myHeaders.append("Cookie", `canvas_session=${canvas_session}`);

    const requestOptions = {
        method: "GET",
        headers: myHeaders,
        redirect: "follow"
    };

    const response = await fetch(`https://${canvas_url}/api/v1/calendar_events?per_page=100&type=${type}&context_codes%5B%5D=${canvas_course}&all_events=1&excludes%5B%5D=assignment&excludes%5B%5D=description&excludes%5B%5D=child_events`, requestOptions)
    
    return await response.json();
};

export const getEvents = async (canvas_url, canvas_session, canvas_course) => await base(canvas_url, canvas_session, canvas_course, "event");
export const getAssignments = async (canvas_url, canvas_session, canvas_course) => await base(canvas_url, canvas_session, canvas_course, "assignment");
export const getSubAssignments = async (canvas_url, canvas_session, canvas_course) => await base(canvas_url, canvas_session, canvas_course, "sub_assignment");

export const getSyllabus = async (canvas_url, canvas_session, canvas_course) => {
    const events = await getEvents(canvas_url, canvas_session, canvas_course);
    const assignments = await getAssignments(canvas_url, canvas_session, canvas_course);
    const subAssignments = await getSubAssignments(canvas_url, canvas_session, canvas_course);

    return [...events, ...assignments, ...subAssignments];
};