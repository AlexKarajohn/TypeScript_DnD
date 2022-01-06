import Component from './component'
import { Autobind} from '../decorator/autobind'
import * as Validation from '../util/validation'
import { projectState } from '../state/project-state';
export class ProjectInput extends Component<HTMLDivElement,HTMLFormElement>{
    titleInputElement: HTMLInputElement;
    descriptionInputElement: HTMLInputElement;
    peopleInputElement: HTMLInputElement;
    constructor(){
        super('project-input','app',true,'user-input');
        this.titleInputElement = this.element.querySelector('#title') as HTMLInputElement;
        this.descriptionInputElement = this.element.querySelector('#description') as HTMLInputElement;
        this.peopleInputElement = this.element.querySelector('#people') as HTMLInputElement;
        this.configure();
    }
    renderContent(){}
    configure(){
        this.element.addEventListener('submit',this.submitHandler)
    }

    private gatherUserInput() : [string,string,number] | void{
        const enteredTitle= this.titleInputElement.value 
        const enteredDescription= this.descriptionInputElement.value 
        const enteredPeople= this.peopleInputElement.value 

        const titleValidatable : Validation.Validatable = {
            value : enteredTitle,
            required: true,
            minLength: 1,
            maxLength: 20
        }
        const descriptionValidatable : Validation.Validatable = {
            value : enteredDescription,
            required: true,
            minLength: 1,
            maxLength: 20
        }
        const peopleValidatable : Validation.Validatable = {
            value : +enteredPeople,
            required: true,
            min: 1,
            max: 10
        }
        if(
            !Validation.Validate(titleValidatable) ||
            !Validation.Validate(descriptionValidatable) ||
            !Validation.Validate(peopleValidatable) 
        ){
            alert('invalid input');
            return;
        }else{
            return [enteredTitle,enteredDescription, +enteredPeople]
        }
    }
    private clearInputs(){
        this.titleInputElement.value = '';
        this.descriptionInputElement.value = '';
        this.peopleInputElement.value= '';
    }

    @Autobind
    private submitHandler(e : SubmitEvent){
        e.preventDefault();
        const userInput = this.gatherUserInput();
        if(Array.isArray(userInput)){
            this.clearInputs();
            const [title,description,people] = userInput;
            projectState.addProject(title,description,people);
            
        }

    }
}
