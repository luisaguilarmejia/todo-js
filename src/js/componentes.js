import { Todo } from "../classes";
import { todoList } from "../index";

// Referencias en el HTML 
const divTodoList   = document.querySelector('.todo-list');
const txtInput      = document.querySelector('.new-todo');
const btnBorrar     = document.querySelector('.clear-completed');
const ulFiltros     = document.querySelector('.filters');
const anchorFiltros = document.querySelectorAll('.filtro');



export const crearTodoHtml = ( todo ) =>{

    const htmlTodo = ` 
    <li class=" ${ (todo.completado) ? 'completed' : '' }" data-id="${ todo.id}">
    <div class="view">
        <input class="toggle" type="checkbox" ${ (todo.completado)? 'checked' : ''} >
        <label> ${ todo.tarea } </label>
        <button class="destroy"></button>
    </div>
    <input class="edit" value="Create a TodoMVC template">
</li>`;

//crear el elemento html
const div = document.createElement('div');
div.innerHTML = htmlTodo;

divTodoList.append( div.firstElementChild );
return div.firstElementChild;
}

// Eventos
// event - te dice que tecla presionó el usuario
txtInput.addEventListener('keyup', ( event ) =>{

    if( event.keyCode === 13 && txtInput.value.length > 0 ){
        console.log(txtInput.value);
        const nuevoTodo = new Todo (txtInput.value);
        todoList.nuevoTodo (nuevoTodo);

        console.log(todoList);
        //Para insertar en el HTML
        crearTodoHtml( nuevoTodo ) ;
        txtInput.value = '';
    }
});


divTodoList.addEventListener('click', (event) =>{
    const nombreElemento = event.target.localName; // input, label, button
    const todoElemento   = event.target.parentElement.parentElement; //para tomar el ID
    const todoId         = todoElemento.getAttribute('data-id'); //extrar el ID anterior

    
    if( nombreElemento.includes('input') ){ // click en el check 
        todoList.marcarCompletado ( todoId);
        todoElemento.classList.toggle('completed'); // Agregar / cambiar una clave.
    }else if( nombreElemento.includes('button')){ // hay que borrar el todo
            todoList.eliminarTodo( todoId);
            divTodoList.removeChild( todoElemento);
    }

    // console.log(todoList);
    // console.log(todoElemento);
    // console.log(todoId);
});


btnBorrar.addEventListener('click', () =>{

    todoList.elminarCompletados();

    for (let i = divTodoList.children.length -1; i>=0; i--){

        const elemento = divTodoList.children[i];
        
        if (elemento.classList.contains('completed')){
            divTodoList.removeChild(elemento);
        }
    }

});


ulFiltros.addEventListener( 'click', (event)=>{

    const filtro = event.target.text;
    if( !filtro) {
        return;
    }

    //Barrer anchor tax
    anchorFiltros.forEach(elem => elem.classList.remove('selected'));
    event.target.classList.add('selected');

    for (const elemento of divTodoList.children){

        elemento.classList.remove('hidden');
        const completado = elemento.classList.contains('completed'); //preguntas si el registro esta completado

        switch (filtro) {
            case 'Pendientes':
                if(completado){
                    elemento.classList.add('hidden');
                }
                break;

            case 'Completados':
            if(!completado){ //si NO está completado
                elemento.classList.add('hidden');  //entonces, le agrego la clase hidden
            }
            break;
        }

    }

    
});