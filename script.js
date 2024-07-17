let departments = [];

function addDzialBtn() {
    const dzialInput = document.getElementById('dzialInput');
    const dzialOpis = document.getElementById('dzialOpis');
    const dzialName = dzialInput.value.trim();
    const dzialDescription = dzialOpis.value.trim();
    if (dzialName) {
        departments.push({ name: dzialName, description: dzialDescription, topics: [] });
        dzialInput.value = '';
        dzialOpis.value = '';
        updateDepartmentList();
        updateSchema();
    }
}

function addTematBtn() {
    const tematInput = document.getElementById('tematInput');
    const wymaganiaInput = document.getElementById('wymaganiaInput');
    const tematName = tematInput.value.trim();
    const wymagania = wymaganiaInput.value.trim().split('\n').filter(req => req.trim() !== '');
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
        departmentElement.innerHTML = `<h3>${department.name}</h3><p>${department.description}</p>`;
        if (department.topics.length > 0) {
            const topicList = document.createElement('ul');
            department.topics.forEach(topic => {
                const topicItem = document.createElement('li');
                topicItem.textContent = `${topic.name}`;
                if (topic.requirements.length > 0) {
                    const reqList = document.createElement('ul');
                    topic.requirements.forEach(req => {
                        const reqItem = document.createElement('li');
                        reqItem.textContent = req;
                        reqList.appendChild(reqItem);
                    });
                    topicItem.appendChild(reqList);
                }
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
            description: dept.description,
            topics: dept.topics.map(topic => ({
                name: topic.name,
                requirements: topic.requirements
            }))
        }))
    };
    schemaOutput.textContent = JSON.stringify(schema, null, 2);
}

// Initial update
updateSchema();