/// <reference path="../decorator/autobind.ts" />
/// <reference path="../models/drag-drop-interfaces.ts" />
/// <reference path="../models/project-model.ts" />

/// <reference path="component.ts" />

namespace App{
    export class ProjectItem extends Component<HTMLUListElement,HTMLLIElement> implements Draggable{
        get people(): string{
            return `${this.project.numOfPeople === 1 ? '1 Person' : `${this.project.numOfPeople} People`}`
        }

        constructor(hostId: string, private project:  Project){
            super('single-project',hostId,false,project.id);
            this.configure();
            this.renderContent();
        }
        @Autobind
        dragStartHandler(event: DragEvent): void {
            event.dataTransfer!.setData('text/plain',this.project.id);
            event.dataTransfer!.effectAllowed = 'move';
        }
        @Autobind
        dragEndHandler(_: DragEvent): void {
            // console.log(event);
        }
        configure(): void {
            this.element.addEventListener('dragstart',this.dragStartHandler)
            this.element.addEventListener('dragend',this.dragStartHandler)
        }
        renderContent(): void {
            this.element.querySelector('h2')!.textContent = this.project.title;
            this.element.querySelector('h3')!.textContent = `Assigned to ${this.people}`;
            this.element.querySelector('p')!.textContent = this.project.description;
        }
    }

}