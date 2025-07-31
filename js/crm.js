// CRM Application JavaScript
class CRMApp {
  constructor() {
    this.contacts = [
      {
        id: 1,
        firstName: 'Sarah',
        lastName: 'Johnson',
        email: 'sarah@company.com',
        company: 'TechCorp Solutions',
        phone: '+1 (555) 123-4567',
        status: 'active',
        lastContact: '2 days ago',
        avatar: 'https://images.unsplash.com/photo-1541101767792-f9b2b1c4f127?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=facearea&facepad=3&w=320&h=320&q=80'
      },
      {
        id: 2,
        firstName: 'Michael',
        lastName: 'Chen',
        email: 'michael@techcorp.com',
        company: 'TechCorp Solutions',
        phone: '+1 (555) 234-5678',
        status: 'prospect',
        lastContact: '1 week ago',
        avatar: 'https://images.unsplash.com/photo-1568602471122-7832951cc4c5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=facearea&facepad=3&w=320&h=320&q=80'
      },
      {
        id: 3,
        firstName: 'Emma',
        lastName: 'Davis',
        email: 'emma@startup.io',
        company: 'StartupXYZ',
        phone: '+1 (555) 345-6789',
        status: 'lead',
        lastContact: '3 days ago',
        avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=facearea&facepad=3&w=320&h=320&q=80'
      },
      {
        id: 4,
        firstName: 'David',
        lastName: 'Wilson',
        email: 'david@medtech.com',
        company: 'MedTech Innovations',
        phone: '+1 (555) 456-7890',
        status: 'customer',
        lastContact: '1 day ago',
        avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=facearea&facepad=3&w=320&h=320&q=80'
      },
      {
        id: 5,
        firstName: 'Lisa',
        lastName: 'Anderson',
        email: 'lisa@financeflow.com',
        company: 'FinanceFlow Inc',
        phone: '+1 (555) 567-8901',
        status: 'active',
        lastContact: '5 days ago',
        avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=facearea&facepad=3&w=320&h=320&q=80'
      }
    ];

    this.currentSection = 'dashboard';
    this.init();
  }

  init() {
    this.renderContacts();
    this.bindEvents();
  }

  bindEvents() {
    // Navigation
    window.showSection = (section) => this.showSection(section);
    window.addContact = () => this.addContact();

    // Search functionality
    const searchInput = document.querySelector('input[placeholder*="Search"]');
    if (searchInput) {
      searchInput.addEventListener('input', (e) => this.handleSearch(e.target.value));
    }
  }

  showSection(section) {
    // Hide all sections
    document.querySelectorAll('.section').forEach(el => {
      el.classList.add('hidden');
    });

    // Show selected section
    const targetSection = document.getElementById(`${section}-section`);
    if (targetSection) {
      targetSection.classList.remove('hidden');
    }

    // Update navigation
    document.querySelectorAll('nav a').forEach(link => {
      link.classList.remove('bg-gray-100', 'dark:bg-neutral-700');
      link.classList.add('hover:bg-gray-100', 'dark:hover:bg-neutral-700');
    });

    const activeLink = document.querySelector(`nav a[onclick="showSection('${section}')"]`);
    if (activeLink) {
      activeLink.classList.add('bg-gray-100', 'dark:bg-neutral-700');
      activeLink.classList.remove('hover:bg-gray-100', 'dark:hover:bg-neutral-700');
    }

    this.currentSection = section;
  }

  renderContacts() {
    const tbody = document.getElementById('contacts-tbody');
    if (!tbody) return;

    tbody.innerHTML = this.contacts.map(contact => this.createContactRow(contact)).join('');
  }

  createContactRow(contact) {
    const statusColors = {
      active: 'bg-green-100 text-green-800 dark:bg-green-800/30 dark:text-green-500',
      prospect: 'bg-blue-100 text-blue-800 dark:bg-blue-800/30 dark:text-blue-500',
      lead: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-800/30 dark:text-yellow-500',
      customer: 'bg-purple-100 text-purple-800 dark:bg-purple-800/30 dark:text-purple-500'
    };

    return `
      <tr data-contact-id="${contact.id}">
        <td class="size-px whitespace-nowrap">
          <div class="ps-6 py-3">
            <label for="hs-at-with-checkboxes-${contact.id}" class="flex">
              <input type="checkbox" class="shrink-0 border-gray-300 rounded text-blue-600 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-800 dark:border-neutral-600 dark:checked:bg-blue-500 dark:checked:border-blue-500 dark:focus:ring-offset-gray-800" id="hs-at-with-checkboxes-${contact.id}">
              <span class="sr-only">Checkbox</span>
            </label>
          </div>
        </td>
        <td class="size-px whitespace-nowrap">
          <div class="ps-6 lg:ps-3 xl:ps-0 pe-6 py-3">
            <div class="flex items-center gap-x-3">
              <img class="inline-block size-[38px] rounded-full" src="${contact.avatar}" alt="Avatar">
              <div class="grow">
                <span class="block text-sm font-semibold text-gray-800 dark:text-neutral-200">${contact.firstName} ${contact.lastName}</span>
                <span class="block text-sm text-gray-500 dark:text-neutral-500">${contact.email}</span>
              </div>
            </div>
          </div>
        </td>
        <td class="h-px w-72 whitespace-nowrap">
          <div class="px-6 py-3">
            <span class="block text-sm font-semibold text-gray-800 dark:text-neutral-200">${contact.company}</span>
            <span class="block text-sm text-gray-500 dark:text-neutral-500">${contact.phone}</span>
          </div>
        </td>
        <td class="h-px w-72 whitespace-nowrap">
          <div class="px-6 py-3">
            <span class="inline-flex items-center gap-x-1.5 py-1.5 px-3 rounded-full text-xs font-medium ${statusColors[contact.status]}">
              <span class="size-1.5 inline-block rounded-full ${statusColors[contact.status]?.includes('green') ? 'bg-green-800 dark:bg-green-500' : statusColors[contact.status]?.includes('blue') ? 'bg-blue-800 dark:bg-blue-500' : statusColors[contact.status]?.includes('yellow') ? 'bg-yellow-800 dark:bg-yellow-500' : 'bg-purple-800 dark:bg-purple-500'}"></span>
              ${contact.status.charAt(0).toUpperCase() + contact.status.slice(1)}
            </span>
          </div>
        </td>
        <td class="h-px w-72 whitespace-nowrap">
          <div class="px-6 py-3">
            <span class="text-sm text-gray-500 dark:text-neutral-500">${contact.lastContact}</span>
          </div>
        </td>
        <td class="size-px whitespace-nowrap">
          <div class="px-6 py-1.5">
            <div class="hs-dropdown [--placement:bottom-right] relative inline-block">
              <button id="hs-table-dropdown-${contact.id}" type="button" class="hs-dropdown-toggle py-1.5 px-2 inline-flex justify-center items-center gap-2 rounded-lg text-gray-700 align-middle disabled:opacity-50 disabled:pointer-events-none focus:outline-hidden focus:ring-2 focus:ring-offset-2 focus:ring-offset-white focus:ring-blue-600 transition-all text-sm dark:text-neutral-400 dark:hover:text-white dark:focus:ring-offset-gray-800" aria-haspopup="menu" aria-expanded="false" aria-label="Dropdown">
                <svg class="shrink-0 size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <circle cx="12" cy="12" r="1"/>
                  <circle cx="12" cy="5" r="1"/>
                  <circle cx="12" cy="19" r="1"/>
                </svg>
              </button>
              <div class="hs-dropdown-menu transition-[opacity,margin] duration hs-dropdown-open:opacity-100 opacity-0 hidden divide-y divide-gray-200 min-w-40 z-20 bg-white shadow-2xl rounded-lg mt-2 dark:divide-neutral-700 dark:bg-neutral-800 dark:border dark:border-neutral-700" role="menu" aria-orientation="vertical" aria-labelledby="hs-table-dropdown-${contact.id}">
                <div class="py-2 first:pt-0 last:pb-0">
                  <a class="flex items-center gap-x-3 py-2 px-3 rounded-lg text-sm text-gray-800 hover:bg-gray-100 focus:ring-2 focus:ring-blue-500 dark:text-neutral-400 dark:hover:bg-neutral-700 dark:hover:text-neutral-300" href="#" onclick="crm.editContact(${contact.id})">
                    Edit
                  </a>
                  <a class="flex items-center gap-x-3 py-2 px-3 rounded-lg text-sm text-gray-800 hover:bg-gray-100 focus:ring-2 focus:ring-blue-500 dark:text-neutral-400 dark:hover:bg-neutral-700 dark:hover:text-neutral-300" href="#" onclick="crm.viewContact(${contact.id})">
                    View Details
                  </a>
                  <a class="flex items-center gap-x-3 py-2 px-3 rounded-lg text-sm text-gray-800 hover:bg-gray-100 focus:ring-2 focus:ring-blue-500 dark:text-neutral-400 dark:hover:bg-neutral-700 dark:hover:text-neutral-300" href="#" onclick="crm.contactCustomer(${contact.id})">
                    Send Email
                  </a>
                </div>
                <div class="py-2 first:pt-0 last:pb-0">
                  <a class="flex items-center gap-x-3 py-2 px-3 rounded-lg text-sm text-red-600 hover:bg-gray-100 focus:ring-2 focus:ring-blue-500 dark:text-red-500 dark:hover:bg-neutral-700" href="#" onclick="crm.deleteContact(${contact.id})">
                    Delete
                  </a>
                </div>
              </div>
            </div>
          </div>
        </td>
      </tr>
    `;
  }

  addContact() {
    const form = document.getElementById('add-contact-form');
    const formData = new FormData(form);
    
    const newContact = {
      id: this.contacts.length + 1,
      firstName: formData.get('first-name'),
      lastName: formData.get('last-name'),
      email: formData.get('email'),
      company: formData.get('company') || 'N/A',
      phone: formData.get('phone') || 'N/A',
      status: 'lead',
      lastContact: 'Just now',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=facearea&facepad=3&w=320&h=320&q=80'
    };

    if (this.validateContact(newContact)) {
      this.contacts.push(newContact);
      this.renderContacts();
      this.closeModal();
      this.showSuccessMessage('Contact added successfully!');
      form.reset();
    }
  }

  validateContact(contact) {
    if (!contact.firstName || !contact.lastName || !contact.email) {
      this.showErrorMessage('Please fill in all required fields.');
      return false;
    }

    // Check for duplicate email
    if (this.contacts.some(c => c.email === contact.email && c.id !== contact.id)) {
      this.showErrorMessage('A contact with this email already exists.');
      return false;
    }

    return true;
  }

  editContact(id) {
    const contact = this.contacts.find(c => c.id === id);
    if (contact) {
      // Populate form with contact data
      document.getElementById('first-name').value = contact.firstName;
      document.getElementById('last-name').value = contact.lastName;
      document.getElementById('email').value = contact.email;
      document.getElementById('company').value = contact.company;
      document.getElementById('phone').value = contact.phone;
      
      // Open modal
      const modal = document.getElementById('add-contact-modal');
      if (window.HSOverlay) {
        window.HSOverlay.open(modal);
      }
    }
  }

  viewContact(id) {
    const contact = this.contacts.find(c => c.id === id);
    if (contact) {
      this.showInfoMessage(`Viewing details for ${contact.firstName} ${contact.lastName}`);
    }
  }

  contactCustomer(id) {
    const contact = this.contacts.find(c => c.id === id);
    if (contact) {
      this.showInfoMessage(`Opening email to ${contact.email}`);
    }
  }

  deleteContact(id) {
    if (confirm('Are you sure you want to delete this contact?')) {
      this.contacts = this.contacts.filter(contact => contact.id !== id);
      this.renderContacts();
      this.showSuccessMessage('Contact deleted successfully!');
    }
  }

  handleSearch(query) {
    const filteredContacts = this.contacts.filter(contact => 
      contact.firstName.toLowerCase().includes(query.toLowerCase()) ||
      contact.lastName.toLowerCase().includes(query.toLowerCase()) ||
      contact.email.toLowerCase().includes(query.toLowerCase()) ||
      contact.company.toLowerCase().includes(query.toLowerCase())
    );
    
    const tbody = document.getElementById('contacts-tbody');
    if (tbody) {
      tbody.innerHTML = filteredContacts.map(contact => this.createContactRow(contact)).join('');
    }
  }

  closeModal() {
    const modal = document.getElementById('add-contact-modal');
    if (window.HSOverlay) {
      window.HSOverlay.close(modal);
    }
  }

  showSuccessMessage(message) {
    this.showToast(message, 'success');
  }

  showErrorMessage(message) {
    this.showToast(message, 'error');
  }

  showInfoMessage(message) {
    this.showToast(message, 'info');
  }

  showToast(message, type = 'info') {
    const colors = {
      success: 'bg-green-100 text-green-800 border-green-200 dark:bg-green-800/30 dark:text-green-500 dark:border-green-700',
      error: 'bg-red-100 text-red-800 border-red-200 dark:bg-red-800/30 dark:text-red-500 dark:border-red-700',
      info: 'bg-blue-100 text-blue-800 border-blue-200 dark:bg-blue-800/30 dark:text-blue-500 dark:border-blue-700'
    };

    const toast = document.createElement('div');
    toast.className = `fixed top-4 right-4 z-[100] p-4 rounded-lg border ${colors[type]} shadow-lg transition-all duration-300 transform translate-x-full max-w-sm`;
    toast.textContent = message;

    document.body.appendChild(toast);

    // Animate in
    setTimeout(() => {
      toast.classList.remove('translate-x-full');
    }, 100);

    // Remove after 3 seconds
    setTimeout(() => {
      toast.classList.add('translate-x-full');
      setTimeout(() => {
        if (document.body.contains(toast)) {
          document.body.removeChild(toast);
        }
      }, 300);
    }, 3000);
  }
}

// Initialize CRM when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  window.crm = new CRMApp();
  
  // Re-initialize Preline components after DOM updates
  if (window.HSDropdown) {
    window.HSDropdown.autoInit();
  }
  if (window.HSOverlay) {
    window.HSOverlay.autoInit();
  }
});

// Utility functions for demo data
class CRMUtils {
  static generateRandomContact() {
    const firstNames = ['John', 'Jane', 'Michael', 'Sarah', 'David', 'Emma', 'Chris', 'Lisa', 'Mark', 'Anna'];
    const lastNames = ['Smith', 'Johnson', 'Williams', 'Brown', 'Jones', 'Garcia', 'Miller', 'Davis', 'Rodriguez', 'Martinez'];
    const companies = ['TechCorp', 'InnovateLab', 'DataFlow', 'CloudTech', 'StartupXYZ', 'MegaCorp', 'SoftSolutions', 'DigitalFirst'];
    const statuses = ['lead', 'prospect', 'active', 'customer'];

    const firstName = firstNames[Math.floor(Math.random() * firstNames.length)];
    const lastName = lastNames[Math.floor(Math.random() * lastNames.length)];
    const company = companies[Math.floor(Math.random() * companies.length)];
    const status = statuses[Math.floor(Math.random() * statuses.length)];

    return {
      firstName,
      lastName,
      email: `${firstName.toLowerCase()}.${lastName.toLowerCase()}@${company.toLowerCase()}.com`,
      company: `${company} Inc`,
      phone: `+1 (555) ${Math.floor(Math.random() * 900) + 100}-${Math.floor(Math.random() * 9000) + 1000}`,
      status,
      lastContact: `${Math.floor(Math.random() * 30) + 1} days ago`,
      avatar: `https://images.unsplash.com/photo-${1472099645785 + Math.floor(Math.random() * 1000)}?ixlib=rb-4.0.3&auto=format&fit=facearea&facepad=3&w=320&h=320&q=80`
    };
  }

  static exportContacts(contacts) {
    const csvContent = [
      ['First Name', 'Last Name', 'Email', 'Company', 'Phone', 'Status', 'Last Contact'],
      ...contacts.map(contact => [
        contact.firstName,
        contact.lastName,
        contact.email,
        contact.company,
        contact.phone,
        contact.status,
        contact.lastContact
      ])
    ].map(row => row.join(',')).join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'contacts.csv';
    a.click();
    window.URL.revokeObjectURL(url);
  }
}