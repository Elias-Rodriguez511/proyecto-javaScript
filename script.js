const students=[]

document.getElementById("studentForm").addEventListener("submit",function(e){
    e.preventDefault();

    document.getElementById("errorName").textContent = "";
    document.getElementById("errorLastName").textContent = "";
    document.getElementById("errorGrade").textContent = "";

    const name=document.getElementById("name").value.trim();
    const lastName=document.getElementById("lastname").value.trim();
    const gradeStr=parseFloat(document.getElementById("grade").value);
    const grade=parseFloat(gradeStr);

    let valid=true;

     if(!name){
    document.getElementById("errorName").textContent = "Debes ingresar un nombre";
    valid = false;
    }
    if(!lastName){
        document.getElementById("errorLastName").textContent = "Debes ingresar un apellido";
        valid = false;
    }
    if(!gradeStr){
        document.getElementById("errorGrade").textContent = "Debes ingresar una nota";
        valid = false;
    } else if(isNaN(grade) || grade < 1 || grade > 7){
        document.getElementById("errorGrade").textContent = "La nota debe ser entre 1 y 7.";
        valid = false;
    }

    if(!valid){
        return;
    }
    const student={name,lastName,grade}
     students.push(student)
     console.log(student)
     addstudentToTable(student)
     calcularPromedio()
     this.reset();

})
const tablebody=document.querySelector("#studentTable tbody")
function addstudentToTable(student){
    const row=document.createElement("tr")
    row.innerHTML= `
    <td>${student.name}</td>
    <td>${student.lastName}</td>
    <td>${student.grade}</td>
    <td><button class="btn">Eliminar</button></td>
    `;
    row.querySelector(".btn").addEventListener("click",function(){
        borrarEstudiante(student,row);
    })
tablebody.appendChild(row)
}

    function borrarEstudiante(student,row){
        const index=students.indexOf(student);
        if(index>-1){
            students.splice(index,1);
            row.remove();
            calcularPromedio();
        }
    }

const promDiv=document.getElementById("average");
function calcularPromedio(){
    if(students.length===0){
        promDiv.innerHTML="Promedio General del Curso : N/A";
            return
    }
   const total=students.reduce((acc,students)=>acc+students.grade,0);
   const average=total/students.length;
   promDiv.innerHTML=`Promedio General del Curso : ${average.toFixed(2)}`;
}