import { getSyllabus } from "./canvas/syllabus.mjs";
import { getProjects, getProjectTasks } from "./ticktick/projects.mjs";
import { createTask } from "./ticktick/tasks.mjs";
import canvas_courses from "./canvas_courses.json" with { type: "json" };
import 'dotenv/config'

const projects = await getProjects(process.env.ticktick_access_token);
const projectId = projects.find(t => t.name === canvas_courses.ticktick_project_name).id;

const createAllTasks = async (canvas_course, projectId) => {
    const syllabus = await getSyllabus(process.env.canvas_url, process.env.canvas_session, canvas_course);

    const twoWeeksFromNow = 1000*60*60*24*14 + Date.now().valueOf();
    const now = Date.now().valueOf();
    
    // TODO: use this to prevent duplicates when we can pull everything...
    //const tasks = await getProjectTasks(process.env.ticktick_access_token, projectId);

    for (const item of syllabus) {
        let taskName = `${item.context_name} - ${item.title}`;

        let start_at = new Date(item.start_at);

        if (start_at.valueOf() < 1000*60*60*24*14 + Date.now().valueOf() && start_at.valueOf() > now) {
            /* !tasks.find(t => t.title === taskName) && */
            if (item.title.toUpperCase().indexOf("OFFICE HOURS") === -1)
                await createTask(process.env.ticktick_access_token, 
                taskName,
                projectId,
                item.all_day,
                item.start_at?.replace("Z","+0000"),
                item.end_at?.replace("Z","+0000"));
            }
        
    }
}

for (const course_id of canvas_courses.course_ids) 
    await createAllTasks("course_" + course_id, projectId)


console.log("exit");

