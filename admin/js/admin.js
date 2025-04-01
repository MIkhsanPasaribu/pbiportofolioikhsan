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

// Education Management
let currentEducationIndex = null;

function saveEducation(e) {
  e.preventDefault();
  
  const education = {
    school: document.getElementById('educationSchool').value,
    degree: document.getElementById('educationDegree').value,
    field: document.getElementById('educationField').value,
    startDate: document.getElementById('educationStartDate').value,
    endDate: document.getElementById('educationEndDate').value || 'Present',
    grade: document.getElementById('educationGrade').value,
    location: document.getElementById('educationLocation').value,
    description: document.getElementById('educationDescription').value,
    logo: document.getElementById('educationLogo').value,
    skills: document.getElementById('educationSkills').value.split(',').map(skill => skill.trim()).filter(skill => skill)
  };
  
  let educations = JSON.parse(localStorage.getItem('portfolioEducation')) || [];
  
  if (currentEducationIndex !== null) {
    educations[currentEducationIndex] = education;
    currentEducationIndex = null;
  } else {
    educations.push(education);
  }
  
  localStorage.setItem('portfolioEducation', JSON.stringify(educations));
  document.getElementById('educationForm').reset();
  loadEducation();
  showNotification('Education saved successfully!', 'success');
}

function editEducation(e) {
  const index = e.currentTarget.dataset.index;
  const educations = JSON.parse(localStorage.getItem('portfolioEducation')) || [];
  const education = educations[index];
  
  document.getElementById('educationSchool').value = education.school;
  document.getElementById('educationDegree').value = education.degree;
  document.getElementById('educationField').value = education.field;
  document.getElementById('educationStartDate').value = education.startDate;
  document.getElementById('educationEndDate').value = education.endDate === 'Present' ? '' : education.endDate;
  document.getElementById('educationGrade').value = education.grade || '';
  document.getElementById('educationLocation').value = education.location;
  document.getElementById('educationDescription').value = education.description || '';
  document.getElementById('educationLogo').value = education.logo || '';
  document.getElementById('educationSkills').value = (education.skills || []).join(', ');
  
  currentEducationIndex = parseInt(index);
}

function deleteEducation(e) {
  if (confirm('Are you sure you want to delete this education?')) {
    const index = e.currentTarget.dataset.index;
    const educations = JSON.parse(localStorage.getItem('portfolioEducation')) || [];
    educations.splice(index, 1);
    localStorage.setItem('portfolioEducation', JSON.stringify(educations));
    loadEducation();
    showNotification('Education deleted successfully!', 'success');
  }
}

function loadEducation() {
  const educations = JSON.parse(localStorage.getItem('portfolioEducation')) || [];
  const educationList = document.getElementById('educationList');
  educationList.innerHTML = '';
  
  educations.forEach((edu, index) => {
    const eduItem = document.createElement('div');
    eduItem.className = 'item-card';
    eduItem.innerHTML = `
      <div>
        <strong>${edu.degree}</strong> in ${edu.field} at ${edu.school} (${edu.startDate} - ${edu.endDate})
      </div>
      <div class="item-actions">
        <button class="edit-btn" data-index="${index}"><i class="fas fa-edit"></i></button>
        <button class="delete-btn" data-index="${index}"><i class="fas fa-trash"></i></button>
      </div>
    `;
    educationList.appendChild(eduItem);
  });
  
  // Add event listeners to edit and delete buttons
  document.querySelectorAll('#educationList .edit-btn').forEach(btn => {
    btn.addEventListener('click', editEducation);
  });
  
  document.querySelectorAll('#educationList .delete-btn').forEach(btn => {
    btn.addEventListener('click', deleteEducation);
  });
}

// Certifications Management
let currentCertificationIndex = null;

function saveCertification(e) {
  e.preventDefault();
  
  const certification = {
    name: document.getElementById('certificationName').value,
    issuer: document.getElementById('certificationIssuer').value,
    issueDate: document.getElementById('certificationDate').value,
    expiryDate: document.getElementById('certificationExpiry').value,
    credentialId: document.getElementById('certificationCredentialID').value,
    credentialUrl: document.getElementById('certificationCredentialURL').value,
    logo: document.getElementById('certificationLogo').value
  };
  
  let certifications = JSON.parse(localStorage.getItem('portfolioCertifications')) || [];
  
  if (currentCertificationIndex !== null) {
    certifications[currentCertificationIndex] = certification;
    currentCertificationIndex = null;
  } else {
    certifications.push(certification);
  }
  
  localStorage.setItem('portfolioCertifications', JSON.stringify(certifications));
  document.getElementById('certificationForm').reset();
  loadCertifications();
  showNotification('Certification saved successfully!', 'success');
}

function editCertification(e) {
  const index = e.currentTarget.dataset.index;
  const certifications = JSON.parse(localStorage.getItem('portfolioCertifications')) || [];
  const certification = certifications[index];
  
  document.getElementById('certificationName').value = certification.name;
  document.getElementById('certificationIssuer').value = certification.issuer;
  document.getElementById('certificationDate').value = certification.issueDate;
  document.getElementById('certificationExpiry').value = certification.expiryDate || '';
  document.getElementById('certificationCredentialID').value = certification.credentialId || '';
  document.getElementById('certificationCredentialURL').value = certification.credentialUrl || '';
  document.getElementById('certificationLogo').value = certification.logo || '';
  
  currentCertificationIndex = parseInt(index);
}

function deleteCertification(e) {
  if (confirm('Are you sure you want to delete this certification?')) {
    const index = e.currentTarget.dataset.index;
    const certifications = JSON.parse(localStorage.getItem('portfolioCertifications')) || [];
    certifications.splice(index, 1);
    localStorage.setItem('portfolioCertifications', JSON.stringify(certifications));
    loadCertifications();
    showNotification('Certification deleted successfully!', 'success');
  }
}

function loadCertifications() {
  const certifications = JSON.parse(localStorage.getItem('portfolioCertifications')) || [];
  const certificationsList = document.getElementById('certificationsList');
  certificationsList.innerHTML = '';
  
  certifications.forEach((cert, index) => {
    const certItem = document.createElement('div');
    certItem.className = 'item-card';
    certItem.innerHTML = `
      <div>
        <strong>${cert.name}</strong> by ${cert.issuer} (${cert.issueDate})
      </div>
      <div class="item-actions">
        <button class="edit-btn" data-index="${index}"><i class="fas fa-edit"></i></button>
        <button class="delete-btn" data-index="${index}"><i class="fas fa-trash"></i></button>
      </div>
    `;
    certificationsList.appendChild(certItem);
  });
  
  // Add event listeners to edit and delete buttons
  document.querySelectorAll('#certificationsList .edit-btn').forEach(btn => {
    btn.addEventListener('click', editCertification);
  });
  
  document.querySelectorAll('#certificationsList .delete-btn').forEach(btn => {
    btn.addEventListener('click', deleteCertification);
  });
}

// Organizations Management
let currentOrganizationIndex = null;

function saveOrganization(e) {
  e.preventDefault();
  
  const organization = {
    name: document.getElementById('organizationName').value,
    role: document.getElementById('organizationRole').value,
    startDate: document.getElementById('organizationStartDate').value,
    endDate: document.getElementById('organizationEndDate').value || 'Present',
    location: document.getElementById('organizationLocation').value,
    description: document.getElementById('organizationDescription').value,
    logo: document.getElementById('organizationLogo').value
  };
  
  let organizations = JSON.parse(localStorage.getItem('portfolioOrganizations')) || [];
  
  if (currentOrganizationIndex !== null) {
    organizations[currentOrganizationIndex] = organization;
    currentOrganizationIndex = null;
  } else {
    organizations.push(organization);
  }
  
  localStorage.setItem('portfolioOrganizations', JSON.stringify(organizations));
  document.getElementById('organizationForm').reset();
  loadOrganizations();
  showNotification('Organization saved successfully!', 'success');
}

function editOrganization(e) {
  const index = e.currentTarget.dataset.index;
  const organizations = JSON.parse(localStorage.getItem('portfolioOrganizations')) || [];
  const organization = organizations[index];
  
  document.getElementById('organizationName').value = organization.name;
  document.getElementById('organizationRole').value = organization.role;
  document.getElementById('organizationStartDate').value = organization.startDate;
  document.getElementById('organizationEndDate').value = organization.endDate === 'Present' ? '' : organization.endDate;
  document.getElementById('organizationLocation').value = organization.location || '';
  document.getElementById('organizationDescription').value = organization.description || '';
  document.getElementById('organizationLogo').value = organization.logo || '';
  
  currentOrganizationIndex = parseInt(index);
}

function deleteOrganization(e) {
  if (confirm('Are you sure you want to delete this organization?')) {
    const index = e.currentTarget.dataset.index;
    const organizations = JSON.parse(localStorage.getItem('portfolioOrganizations')) || [];
    organizations.splice(index, 1);
    localStorage.setItem('portfolioOrganizations', JSON.stringify(organizations));
    loadOrganizations();
    showNotification('Organization deleted successfully!', 'success');
  }
}

function loadOrganizations() {
  const organizations = JSON.parse(localStorage.getItem('portfolioOrganizations')) || [];
  const organizationsList = document.getElementById('organizationsList');
  organizationsList.innerHTML = '';
  
  organizations.forEach((org, index) => {
    const orgItem = document.createElement('div');
    orgItem.className = 'item-card';
    orgItem.innerHTML = `
      <div>
        <strong>${org.role}</strong> at ${org.name} (${org.startDate} - ${org.endDate})
      </div>
      <div class="item-actions">
        <button class="edit-btn" data-index="${index}"><i class="fas fa-edit"></i></button>
        <button class="delete-btn" data-index="${index}"><i class="fas fa-trash"></i></button>
      </div>
    `;
    organizationsList.appendChild(orgItem);
  });
  // Add event listeners to edit and delete buttons
  document.querySelectorAll('#organizationsList .edit-btn').forEach(btn => {
    btn.addEventListener('click', editOrganization);
  });
  
  document.querySelectorAll('#organizationsList .delete-btn').forEach(btn => {
    btn.addEventListener('click', deleteOrganization);
  });
}

// Awards Management
let currentAwardIndex = null;

function saveAward(e) {
  e.preventDefault();
  
  const award = {
    title: document.getElementById('awardTitle').value,
    issuer: document.getElementById('awardIssuer').value,
    date: document.getElementById('awardDate').value,
    description: document.getElementById('awardDescription').value
  };
  
  let awards = JSON.parse(localStorage.getItem('portfolioAwards')) || [];
  
  if (currentAwardIndex !== null) {
    awards[currentAwardIndex] = award;
    currentAwardIndex = null;
  } else {
    awards.push(award);
  }
  
  localStorage.setItem('portfolioAwards', JSON.stringify(awards));
  document.getElementById('awardForm').reset();
  loadAwards();
  showNotification('Award saved successfully!', 'success');
}

function editAward(e) {
  const index = e.currentTarget.dataset.index;
  const awards = JSON.parse(localStorage.getItem('portfolioAwards')) || [];
  const award = awards[index];
  
  document.getElementById('awardTitle').value = award.title;
  document.getElementById('awardIssuer').value = award.issuer;
  document.getElementById('awardDate').value = award.date;
  document.getElementById('awardDescription').value = award.description || '';
  
  currentAwardIndex = parseInt(index);
}

function deleteAward(e) {
  if (confirm('Are you sure you want to delete this award?')) {
    const index = e.currentTarget.dataset.index;
    const awards = JSON.parse(localStorage.getItem('portfolioAwards')) || [];
    awards.splice(index, 1);
    localStorage.setItem('portfolioAwards', JSON.stringify(awards));
    loadAwards();
    showNotification('Award deleted successfully!', 'success');
  }
}

function loadAwards() {
  const awards = JSON.parse(localStorage.getItem('portfolioAwards')) || [];
  const awardsList = document.getElementById('awardsList');
  awardsList.innerHTML = '';
  
  awards.forEach((award, index) => {
    const awardItem = document.createElement('div');
    awardItem.className = 'item-card';
    awardItem.innerHTML = `
      <div>
        <strong>${award.title}</strong> from ${award.issuer} (${award.date})
      </div>
      <div class="item-actions">
        <button class="edit-btn" data-index="${index}"><i class="fas fa-edit"></i></button>
        <button class="delete-btn" data-index="${index}"><i class="fas fa-trash"></i></button>
      </div>
    `;
    awardsList.appendChild(awardItem);
  });
  
  // Add event listeners to edit and delete buttons
  document.querySelectorAll('#awardsList .edit-btn').forEach(btn => {
    btn.addEventListener('click', editAward);
  });
  
  document.querySelectorAll('#awardsList .delete-btn').forEach(btn => {
    btn.addEventListener('click', deleteAward);
  });
}

// Initialize all forms when the page loads
document.addEventListener('DOMContentLoaded', function() {
  // Your existing initialization code
  
  // Initialize new forms
  const educationForm = document.getElementById('educationForm');
  if (educationForm) {
    educationForm.addEventListener('submit', saveEducation);
    document.getElementById('clearEducationBtn').addEventListener('click', () => {
      educationForm.reset();
      currentEducationIndex = null;
    });
    loadEducation();
  }
  
  const certificationForm = document.getElementById('certificationForm');
  if (certificationForm) {
    certificationForm.addEventListener('submit', saveCertification);
    document.getElementById('clearCertificationBtn').addEventListener('click', () => {
      certificationForm.reset();
      currentCertificationIndex = null;
    });
    loadCertifications();
  }
  
  const organizationForm = document.getElementById('organizationForm');
  if (organizationForm) {
    organizationForm.addEventListener('submit', saveOrganization);
    document.getElementById('clearOrganizationBtn').addEventListener('click', () => {
      organizationForm.reset();
      currentOrganizationIndex = null;
    });
    loadOrganizations();
  }
  
  const awardForm = document.getElementById('awardForm');
  if (awardForm) {
    awardForm.addEventListener('submit', saveAward);
    document.getElementById('clearAwardBtn').addEventListener('click', () => {
      awardForm.reset();
      currentAwardIndex = null;
    });
    loadAwards();
  }
});