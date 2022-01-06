namespace App{
    export class ProjectList extends Component<HTMLDivElement,HTMLElement> implements DragTarget{

        assignedProjects: Project[] = [];
        constructor(private type: 'active' | 'finished'){
            super('project-list','app',false,`${type}`);
            this.configure();
            this.renderContent();
        }

        @Autobind
        dragOverHandler(event: DragEvent): void {
            if(event.dataTransfer && event.dataTransfer.types[0] === 'text/plain'){
                event.preventDefault();
                const listEl = this.element.querySelector('ul')!;
                listEl.classList.add('droppable');
            }
            // console.log(event);
        }
        @Autobind
        dragLeaveHandler(_: DragEvent): void {
            const listEl = this.element.querySelector('ul')!;
            listEl.classList.remove('droppable')
            // console.log(event);
        }
        @Autobind
        dropHandler(event: DragEvent): void {
            const projectId = event.dataTransfer!.getData('text/plain');
            projectState.moveProject(projectId,this.type === 'active' ? ProjectStatus.Active : ProjectStatus.Finished)

        }

        renderProjects(){
            const listEl = document.getElementById(`${this.type}-projects-list`)! as HTMLUListElement;
            listEl.innerHTML='';
            for(const prjItem of this.assignedProjects){
                new ProjectItem(this.element.querySelector('ul')!.id,prjItem)
            }
        }
        configure(): void {
            this.element.addEventListener('dragover',this.dragOverHandler)
            this.element.addEventListener('dragleave',this.dragLeaveHandler)
            this.element.addEventListener('drop',this.dropHandler)
            projectState.addListener((projects: Project[])=>{
                const relevantProject = projects.filter(project => {
                    if(this.type ==='active')
                        return project.status === ProjectStatus.Active;
                    return project.status === ProjectStatus.Finished;
                })
                this.assignedProjects = relevantProject;
                this.renderProjects();
            })
        }
        renderContent(){
            const listId= `${this.type}-projects-list`;
            this.element.querySelector('ul')!.id = listId;
            this.element.querySelector('h2')!.textContent = this.type.toUpperCase() + ' PROJECTS'
        }
    }
}