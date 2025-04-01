// Check if user is authenticated
function checkAuth() {
  const isAuthenticated = localStorage.getItem('adminAuthenticated');
  if (!isAuthenticated || isAuthenticated !== 'true') {
    window.location.href = '/admin/login.html';
  }
}

// Run auth check when page loads
checkAuth();

// Handle logout
document.getElementById('logoutBtn').addEventListener('click', function() {
  localStorage.removeItem('adminAuthenticated');
  window.location.href = '/admin/login.html';
});

// Navigation functionality
const navItems = document.querySelectorAll('.admin-nav-item');
const sections = document.querySelectorAll('.admin-section');

navItems.forEach(item => {
  item.addEventListener('click', function() {
    const sectionId = this.getAttribute('data-section');
    
    // Update active nav item
    navItems.forEach(nav => nav.classList.remove('active'));
    this.classList.add('active');
    
    // Show selected section
    sections.forEach(section => section.classList.remove('active'));
    document.getElementById(`${sectionId}-section`).classList.add('active');
  });
});

// Initialize data storage if not exists
if (!localStorage.getItem('portfolioProjects')) {
  localStorage.setItem('portfolioProjects', JSON.stringify([]));
}

if (!localStorage.getItem('portfolioSkills')) {
  localStorage.setItem('portfolioSkills', JSON.stringify([]));
}

if (!localStorage.getItem('portfolioExperience')) {
  localStorage.setItem('portfolioExperience', JSON.stringify([]));
}

// Projects Management
const projectForm = document.getElementById('projectForm');
const projectsList = document.getElementById('projectsList');

// Load existing projects
function loadProjects() {
  const projects = JSON.parse(localStorage.getItem('portfolioProjects')) || [];
  projectsList.innerHTML = '';
  
  projects.forEach((project, index) => {
    const projectItem = document.createElement('div');
    projectItem.className = 'item-card';
    projectItem.innerHTML = `
      <div>
        <strong>${project.title}</strong> - ${project.category}
      </div>
      <div class="item-actions">
        <button class="edit-btn" data-index="${index}"><i class="fas fa-edit"></i></button>
        <button class="delete-btn" data-index="${index}"><i class="fas fa-trash"></i></button>
      </div>
    `;
    projectsList.appendChild(projectItem);
  });
  
  // Add event listeners to edit and delete buttons
  document.querySelectorAll('#projectsList .edit-btn').forEach(btn => {
    btn.addEventListener('click', editProject);
  });
  
  document.querySelectorAll('#projectsList .delete-btn').forEach(btn => {
    btn.addEventListener('click', deleteProject);
  });
}

// Save project
projectForm.addEventListener('submit', function(e) {
  e.preventDefault();
  
  const projectData = {
    id: Date.now(), // Unique ID based on timestamp
    title: document.getElementById('projectTitle').value,
    description: document.getElementById('projectDescription').value,
    category: document.getElementById('projectCategory').value,
    image: document.getElementById('projectImage').value,
    link: document.getElementById('projectLink').value,
    github: document.getElementById('projectGithub').value,
    tags: document.getElementById('projectTags').value.split(',').map(tag => tag.trim())
  };
  
  // Check if we're editing an existing project
  const editIndex = projectForm.getAttribute('data-edit-index');
  
  let projects = JSON.parse(localStorage.getItem('portfolioProjects')) || [];
  
  if (editIndex !== null && editIndex !== undefined) {
    // Update existing project
    projects[editIndex] = projectData;
    projectForm.removeAttribute('data-edit-index');
  } else {
    // Add new project
    projects.push(projectData);
  }
  
  localStorage.setItem('portfolioProjects', JSON.stringify(projects));
  projectForm.reset();
  loadProjects();
});

// Edit project
function editProject() {
  const index = this.getAttribute('data-index');
  const projects = JSON.parse(localStorage.getItem('portfolioProjects'));
  const project = projects[index];
  
  document.getElementById('projectTitle').value = project.title;
  document.getElementById('projectDescription').value = project.description;
  document.getElementById('projectCategory').value = project.category;
  document.getElementById('projectImage').value = project.image;
  document.getElementById('projectLink').value = project.link || '';
  document.getElementById('projectGithub').value = project.github || '';
  document.getElementById('projectTags').value = project.tags.join(', ');
  
  projectForm.setAttribute('data-edit-index', index);
}

// Delete project
function deleteProject() {
  if (confirm('Are you sure you want to delete this project?')) {
    const index = this.getAttribute('data-index');
    let projects = JSON.parse(localStorage.getItem('portfolioProjects'));
    projects.splice(index, 1);
    localStorage.setItem('portfolioProjects', JSON.stringify(projects));
    loadProjects();
  }
}

// Clear project form
document.getElementById('clearProjectBtn').addEventListener('click', function() {
  projectForm.reset();
  projectForm.removeAttribute('data-edit-index');
});

// Skills Management
const skillForm = document.getElementById('skillForm');
const skillsList = document.getElementById('skillsList');

// Load existing skills
function loadSkills() {
  const skills = JSON.parse(localStorage.getItem('portfolioSkills')) || [];
  skillsList.innerHTML = '';
  
  skills.forEach((skill, index) => {
    const skillItem = document.createElement('div');
    skillItem.className = 'item-card';
    skillItem.innerHTML = `
      <div>
        <strong>${skill.name}</strong> - ${skill.category} (${skill.level}%)
      </div>
      <div class="item-actions">
        <button class="edit-btn" data-index="${index}"><i class="fas fa-edit"></i></button>
        <button class="delete-btn" data-index="${index}"><i class="fas fa-trash"></i></button>
      </div>
    `;
    skillsList.appendChild(skillItem);
  });
  
  // Add event listeners to edit and delete buttons
  document.querySelectorAll('#skillsList .edit-btn').forEach(btn => {
    btn.addEventListener('click', editSkill);
  });
  
  document.querySelectorAll('#skillsList .delete-btn').forEach(btn => {
    btn.addEventListener('click', deleteSkill);
  });
}

// Save skill
skillForm.addEventListener('submit', function(e) {
  e.preventDefault();
  
  const skillData = {
    id: Date.now(),
    name: document.getElementById('skillName').value,
    category: document.getElementById('skillCategory').value,
    level: document.getElementById('skillLevel').value
  };
  
  // Check if we're editing an existing skill
  const editIndex = skillForm.getAttribute('data-edit-index');
  
  let skills = JSON.parse(localStorage.getItem('portfolioSkills')) || [];
  
  if (editIndex !== null && editIndex !== undefined) {
    // Update existing skill
    skills[editIndex] = skillData;
    skillForm.removeAttribute('data-edit-index');
  } else {
    // Add new skill
    skills.push(skillData);
  }
  
  localStorage.setItem('portfolioSkills', JSON.stringify(skills));
  skillForm.reset();
  loadSkills();
});

// Edit skill
function editSkill() {
  const index = this.getAttribute('data-index');
  const skills = JSON.parse(localStorage.getItem('portfolioSkills'));
  const skill = skills[index];
  
  document.getElementById('skillName').value = skill.name;
  document.getElementById('skillCategory').value = skill.category;
  document.getElementById('skillLevel').value = skill.level;
  
  skillForm.setAttribute('data-edit-index', index);
}

// Delete skill
function deleteSkill() {
  if (confirm('Are you sure you want to delete this skill?')) {
    const index = this.getAttribute('data-index');
    let skills = JSON.parse(localStorage.getItem('portfolioSkills'));
    skills.splice(index, 1);
    localStorage.setItem('portfolioSkills', JSON.stringify(skills));
    loadSkills();
  }
}

// Clear skill form
document.getElementById('clearSkillBtn').addEventListener('click', function() {
  skillForm.reset();
  skillForm.removeAttribute('data-edit-index');
});

// Experience Management
const experienceForm = document.getElementById('experienceForm');
const experienceList = document.getElementById('experienceList');

// Load existing experience items
function loadExperience() {
  const experiences = JSON.parse(localStorage.getItem('portfolioExperience')) || [];
  experienceList.innerHTML = '';
  
  experiences.forEach((exp, index) => {
    const expItem = document.createElement('div');
    expItem.className = 'item-card';
    expItem.innerHTML = `
      <div>
        <strong>${exp.title}</strong> at ${exp.company} (${exp.period})
      </div>
      <div class="item-actions">
        <button class="edit-btn" data-index="${index}"><i class="fas fa-edit"></i></button>
        <button class="delete-btn" data-index="${index}"><i class="fas fa-trash"></i></button>
      </div>
    `;
    experienceList.appendChild(expItem);
  });
  
  // Add event listeners to edit and delete buttons
  document.querySelectorAll('#experienceList .edit-btn').forEach(btn => {
    btn.addEventListener('click', editExperience);
  });
  
  document.querySelectorAll('#experienceList .delete-btn').forEach(btn => {
    btn.addEventListener('click', deleteExperience);
  });
}

// Save experience
experienceForm.addEventListener('submit', function(e) {
  e.preventDefault();
  
  const expData = {
    id: Date.now(),
    title: document.getElementById('experienceTitle').value,
    company: document.getElementById('experienceCompany').value,
    period: document.getElementById('experiencePeriod').value,
    description: document.getElementById('experienceDescription').value
  };
  
  // Check if we're editing an existing experience
  const editIndex = experienceForm.getAttribute('data-edit-index');
  
  let experiences = JSON.parse(localStorage.getItem('portfolioExperience')) || [];
  
  if (editIndex !== null && editIndex !== undefined) {
    // Update existing experience
    experiences[editIndex] = expData;
    experienceForm.removeAttribute('data-edit-index');
  } else {
    // Add new experience
    experiences.push(expData);
  }
  
  localStorage.setItem('portfolioExperience', JSON.stringify(experiences));
  experienceForm.reset();
  loadExperience();
});

// Edit experience
function editExperience() {
  const index = this.getAttribute('data-index');
  const experiences = JSON.parse(localStorage.getItem('portfolioExperience'));
  const exp = experiences[index];
  
  document.getElementById('experienceTitle').value = exp.title;
  document.getElementById('experienceCompany').value = exp.company;
  document.getElementById('experiencePeriod').value = exp.period;
  document.getElementById('experienceDescription').value = exp.description;
  
  experienceForm.setAttribute('data-edit-index', index);
}

// Delete experience
function deleteExperience() {
  if (confirm('Are you sure you want to delete this experience?')) {
    const index = this.getAttribute('data-index');
    let experiences = JSON.parse(localStorage.getItem('portfolioExperience'));
    experiences.splice(index, 1);
    localStorage.setItem('portfolioExperience', JSON.stringify(experiences));
    loadExperience();
  }
}

// Clear experience form
document.getElementById('clearExperienceBtn').addEventListener('click', function() {
  experienceForm.reset();
  experienceForm.removeAttribute('data-edit-index');
});

// Settings Management
const settingsForm = document.getElementById('settingsForm');

settingsForm.addEventListener('submit', function(e) {
  e.preventDefault();
  
  const newPassword = document.getElementById('adminPassword').value;
  
  if (newPassword) {
    // In a real app, you'd want to hash this password and store it securely
    localStorage.setItem('adminPassword', newPassword);
    alert('Password updated successfully!');
  }
  
  settingsForm.reset();
});

// Export data
document.getElementById('exportDataBtn').addEventListener('click', function() {
  const exportData = {
    projects: JSON.parse(localStorage.getItem('portfolioProjects')) || [],
    skills: JSON.parse(localStorage.getItem('portfolioSkills')) || [],
    experience: JSON.parse(localStorage.getItem('portfolioExperience')) || []
  };
  
  const dataStr = JSON.stringify(exportData, null, 2);
  const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
  
  const exportFileDefaultName = 'portfolio-data.json';
  
  const linkElement = document.createElement('a');
  linkElement.setAttribute('href', dataUri);
  linkElement.setAttribute('download', exportFileDefaultName);
  linkElement.click();
});

// Import data
document.getElementById('importData').addEventListener('change', function(e) {
  const file = e.target.files[0];
  
  if (file) {
    const reader = new FileReader();
    
    reader.onload = function(e) {
      try {
        const importedData = JSON.parse(e.target.result);
        
        if (importedData.projects) {
          localStorage.setItem('portfolioProjects', JSON.stringify(importedData.projects));
        }
        
        if (importedData.skills) {
          localStorage.setItem('portfolioSkills', JSON.stringify(importedData.skills));
        }
        
        if (importedData.experience) {
          localStorage.setItem('portfolioExperience', JSON.stringify(importedData.experience));
        }
        
        alert('Data imported successfully!');
        
        // Reload data
        loadProjects();
        loadSkills();
        loadExperience();
      } catch (error) {
        alert('Error importing data: ' + error.message);
      }
    };
    
    reader.readAsText(file);
  }
});

// Load all data when page loads
loadProjects();
loadSkills();
loadExperience();