let departments = [];

function addDzialBtn() {
    const dzialInput = document.getElementById('dzialInput');
    const dzialName = dzialInput.value.trim();
    if (dzialName) {
        departments.push({ name: dzialName, topics: [] });
        dzialInput.value = '';
        updateDepartmentList();
        updateSchema();
    }
}

function addTematBtn() {
    const tematInput = document.getElementById('tematInput');
    const wymaganiaInput = document.getElementById('wymaganiaInput');
    const tematName = tematInput.value.trim();
    const wymagania = wymaganiaInput.value.trim();
    if (tematName && departments.length > 0) {
        const lastDepartment = departments[departments.length - 1];
        lastDepartment.topics.push({ name: tematName, requirements: wymagania });
        tematInput.value = '';
        wymaganiaInput.value = '';
        updateDepartmentList();
        updateSchema();
    }
}

function updateDepartmentList() {
    const departmentList = document.getElementById('departmentList');
    departmentList.innerHTML = '';
    departments.forEach(department => {
        const departmentElement = document.createElement('div');
        departmentElement.className = 'department';
        departmentElement.innerHTML = `<h3>${department.name}</h3>`;
        if (department.topics.length > 0) {
            const topicList = document.createElement('ul');
            department.topics.forEach(topic => {
                const topicItem = document.createElement('li');
                topicItem.textContent = `${topic.name}${topic.requirements ? ` (${topic.requirements})` : ''}`;
                topicList.appendChild(topicItem);
            });
            departmentElement.appendChild(topicList);
        }
        departmentList.appendChild(departmentElement);
    });
}

function updateSchema() {
    const schemaOutput = document.getElementById('schemaOutput');
    const schema = {
        departments: departments.map(dept => ({
            name: dept.name,
            topics: dept.topics.map(topic => ({
                name: topic.name,
                requirements: topic.requirements || null
            }))
        }))
    };
    schemaOutput.textContent = JSON.stringify(schema, null, 2);
}

// Initial update
updateSchema();