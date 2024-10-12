let userForm  = document.getElementById('user-form');
const retrivedEntries=()=>{
    let entries = localStorage.getItem('user-entries');
    if(entries){
        entries=JSON.parse(entries);
    }else{
        entries=[];
    }
    return entries;
};
const displayEntries=()=>{
    const entries=retrivedEntries();
    const tableEntries=entries.map((entry)=>{
        const nameCell = `<td class="border px-4 py-2">${entry.name}</td>`;
        const emailCell = `<td class="border px-4 py-2">${entry.email}</td>`;
        const passwordCell = `<td class="border px-4 py-2">${entry.password}</td>`;
        const dobCell = `<td class="border px-4 py-2">${entry.dob}</td>`;
        const acceptedTermsCell = `<td class="border px-4 py-2">${entry.acceptedTerms}</td>`;

        const row = `<tr>${nameCell} ${emailCell} ${passwordCell} ${dobCell} ${acceptedTermsCell}</tr>`;
        return row;
    }).join("\n");

    const table = `<table class="table-auto w-full">
    <tr>
    <th class="px-4 py-2">Name</th>
    <th class="px-4 py-2">Email</th>
    <th class="px-4 py-2">Password</th>
    <th class="px-4 py-2">DOB</th>
    <th class="px-4 py-2">Accepted Terms?</th>
    </tr>
    ${tableEntries}</table>`;
    
    let details = document.getElementById('user-entries');
    details.innerHTML = table;
}

let saveUserForm = (event)=>{
    event.preventDefault();
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const dob = document.getElementById('dob').value;
    const acceptedTerms = document.getElementById('acceptTerms').checked;

    const entry = {
        name,
        email,
        password,
        dob,
        acceptedTerms
    };
    
    let userEntries = retrivedEntries();
    userEntries.push(entry);
    localStorage.setItem('user-entries',JSON.stringify(userEntries));
    displayEntries();
};

window.onload = function () {
    const today = new Date();
    const minDate = new Date(today.getFullYear() - 55, today.getMonth(), today.getDate());
    const maxDate = new Date(today.getFullYear() - 18, today.getMonth(), today.getDate());

    dob.setAttribute("min", minDate.toISOString().split("T")[0]);
    dob.setAttribute("max", maxDate.toISOString().split("T")[0]);
}
userForm.addEventListener('submit',saveUserForm);
displayEntries();
