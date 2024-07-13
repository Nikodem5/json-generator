let dzialy = [];

document.getElementById('addDzialBtn').addEventListener('click', function() {
    const nazwa = document.getElementById('nazwa').value;
    const opis = document.getElementById('opis').value;
    
    if (nazwa && opis) {
        dzialy.push({ nazwa, opis, tematy: [] });
        updateDepartmentList();
        updateSchema();
        
        // Clear department inputs
        document.getElementById('nazwa').value = '';
        document.getElementById('opis').value = '';
        
        // Enable the "Add Topic" button
        document.getElementById('addTematBtn').disabled = false;
    } else {
        alert('Proszę wypełnić nazwę i opis działu.');
    }
});

document.getElementById('addTematBtn').addEventListener('click', function() {
    const tematNazwa = document.getElementById('tematNazwa').value;
    const tematWymagania = document.getElementById('tematWymagania').value.split('\n').filter(req => req.trim() !== '');
    
    if (tematNazwa && tematWymagania.length > 0) {
        if (dzialy.length > 0) {
            const lastDzial = dzialy[dzialy.length - 1];
            lastDzial.tematy.push({ nazwa: tematNazwa, wymagania: tematWymagania });
            updateDepartmentList();
            updateSchema();
            
            // Clear topic inputs
            document.getElementById('tematNazwa').value = '';
            document.getElementById('tematWymagania').value = '';
        } else {
            alert('Proszę najpierw dodać dział.');
        }
    } else {
        alert('Proszę wypełnić nazwę tematu i przynajmniej jedno wymaganie.');
    }
});

function updateDepartmentList() {
    const list = document.getElementById('departmentList');
    list.innerHTML = '';
    
    dzialy.forEach((dzial, index) => {
        const div = document.createElement('div');
        div.className = 'department';
        div.innerHTML = `
            <h3>${dzial.nazwa}</h3>
            <p>${dzial.opis}</p>
            <h4>Tematy:</h4>
            <ul>
                ${dzial.tematy.map(temat => `
                    <li>
                        <strong>${temat.nazwa}</strong>
                        <ul>
                            ${temat.wymagania.map(wymaganie => `<li>${wymaganie}</li>`).join('')}
                        </ul>
                    </li>
                `).join('')}
            </ul>
        `;
        list.appendChild(div);
    });
}

function updateSchema() {
    const schema = { dzialy };
    document.getElementById('schemaOutput').textContent = JSON.stringify(schema, null, 2);
}