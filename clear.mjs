import { getProjects, getProjectTasks } from "./ticktick/projects.mjs";
import { deleteTask } from "./ticktick/tasks.mjs";
import canvas_courses from "./canvas_courses.json" with { type: "json" };
import 'dotenv/config'

const projects = await getProjects(process.env.ticktick_access_token);

const projectId = projects.find(t => t.name === canvas_courses.ticktick_project_name).id;

const tasks = await getProjectTasks(process.env.ticktick_access_token, projectId);

console.dir(projects);
console.dir(projectId);
console.dir(tasks);

for (const item of tasks) {
    await deleteTask(process.env.ticktick_access_token,
        projectId,
        item.id);
}

console.log("exit");