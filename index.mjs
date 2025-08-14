import { getFilteredSyllabus } from "./canvas/syllabus.mjs";
import { getProjects, getProjectTasks } from "./ticktick/projects.mjs";
import { createTask } from "./ticktick/tasks.mjs";
import canvas_courses from "./canvas_courses.json" with { type: "json" };
import 'dotenv/config'
import { getCourses } from "./canvas/courses.mjs";

const projects = await getProjects(process.env.ticktick_access_token);
const projectId = projects.find(t => t.name === canvas_courses.ticktick_project_name).id;

const createAllTasks = async (canvas_course, projectId) => {
    const syllabus = await getFilteredSyllabus(process.env.canvas_url, process.env.canvas_session, canvas_course);

    const END_DATE = Date.parse("2025-08-31T00:00:00").valueOf();
    const YESTERDAY = Date.now().valueOf() - 1000*60*60*12;
    
    // TODO: use this to prevent duplicates when we can pull everything...
    //const tasks = await getProjectTasks(process.env.ticktick_access_token, projectId);

    for (const item of syllabus) {
        let start_at = new Date(item.start_at);

        if (start_at.valueOf() < END_DATE && start_at.valueOf() > YESTERDAY) {
            /* !tasks.find(t => t.title === taskName) && */
            await createTask(process.env.ticktick_access_token, 
                item.title,
                projectId,
                item.all_day,
                item.start_at?.replace("Z","+0000"),
                item.end_at?.replace("Z","+0000"),
                [item.context_name, canvas_courses.student]);

            console.log(item.title);

            await new Promise(r => setTimeout(r, 1000));
        }
    }
}

const courses = await getCourses(process.env.canvas_url, process.env.canvas_session);
const courseIds = [...courses.map(t => t.id)];

for (const course_id of courseIds) 
    await createAllTasks(`course_${course_id}`, projectId)


console.log("exit");

