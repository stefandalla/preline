// Dashboard functionality
class AgentDashboard {
  constructor() {
    this.agents = [
      {
        id: 1,
        name: 'Customer Support Bot',
        type: 'conversational',
        description: 'Handles customer inquiries and support tickets',
        status: 'active',
        lastActive: '2 minutes ago',
        model: 'gpt-4',
        apiCalls: 245,
        successRate: 98.5
      },
      {
        id: 2,
        name: 'Content Generator',
        type: 'creative',
        description: 'Creates marketing content and blog posts',
        status: 'active',
        lastActive: '5 minutes ago',
        model: 'gpt-4',
        apiCalls: 156,
        successRate: 97.2
      },
      {
        id: 3,
        name: 'Data Analyzer',
        type: 'analytical',
        description: 'Processes and analyzes business data',
        status: 'idle',
        lastActive: '1 hour ago',
        model: 'claude-3',
        apiCalls: 89,
        successRate: 99.1
      },
      {
        id: 4,
        name: 'Security Monitor',
        type: 'security',
        description: 'Monitors system security and threats',
        status: 'error',
        lastActive: '3 hours ago',
        model: 'gpt-3.5-turbo',
        apiCalls: 12,
        successRate: 85.3
      }
    ];

    this.init();
  }

  init() {
    this.bindEvents();
    this.updateStats();
  }

  bindEvents() {
    // Add agent form submission
    const createAgentBtn = document.querySelector('[data-hs-overlay="#add-agent-modal"] + div button[type="button"]:last-child');
    if (createAgentBtn) {
      createAgentBtn.addEventListener('click', (e) => this.handleCreateAgent(e));
    }

    // Search functionality
    const searchInput = document.querySelector('input[placeholder="Search agents..."]');
    if (searchInput) {
      searchInput.addEventListener('input', (e) => this.handleSearch(e.target.value));
    }

    // Filter functionality
    const filterCheckboxes = document.querySelectorAll('[id^="hs-as-filters-dropdown-"]');
    filterCheckboxes.forEach(checkbox => {
      checkbox.addEventListener('change', () => this.handleFilter());
    });
  }

  handleCreateAgent(e) {
    e.preventDefault();
    
    const form = document.querySelector('#add-agent-modal form');
    const formData = new FormData(form);
    
    const newAgent = {
      id: this.agents.length + 1,
      name: document.getElementById('agent-name').value,
      type: document.getElementById('agent-type').value,
      description: document.getElementById('agent-description').value,
      model: document.getElementById('agent-model').value,
      systemPrompt: document.getElementById('system-prompt').value,
      status: 'active',
      lastActive: 'Just now',
      apiCalls: 0,
      successRate: 100
    };

    if (this.validateAgent(newAgent)) {
      this.agents.push(newAgent);
      this.renderAgents();
      this.updateStats();
      this.closeModal();
      this.showSuccessMessage('Agent created successfully!');
      form.reset();
    }
  }

  validateAgent(agent) {
    if (!agent.name || !agent.type || !agent.description || !agent.model) {
      this.showErrorMessage('Please fill in all required fields.');
      return false;
    }
    return true;
  }

  handleSearch(query) {
    const filteredAgents = this.agents.filter(agent => 
      agent.name.toLowerCase().includes(query.toLowerCase()) ||
      agent.description.toLowerCase().includes(query.toLowerCase()) ||
      agent.type.toLowerCase().includes(query.toLowerCase())
    );
    this.renderAgents(filteredAgents);
  }

  handleFilter() {
    const allChecked = document.getElementById('hs-as-filters-dropdown-all').checked;
    const activeChecked = document.getElementById('hs-as-filters-dropdown-active').checked;
    const inactiveChecked = document.getElementById('hs-as-filters-dropdown-inactive').checked;

    let filteredAgents = this.agents;

    if (!allChecked) {
      filteredAgents = this.agents.filter(agent => {
        if (activeChecked && agent.status === 'active') return true;
        if (inactiveChecked && (agent.status === 'idle' || agent.status === 'error')) return true;
        return false;
      });
    }

    this.renderAgents(filteredAgents);
  }

  renderAgents(agentsToRender = this.agents) {
    const tbody = document.querySelector('tbody');
    if (!tbody) return;

    tbody.innerHTML = agentsToRender.map(agent => this.createAgentRow(agent)).join('');
    this.bindRowEvents();
  }

  createAgentRow(agent) {
    const statusColors = {
      active: 'bg-teal-100 text-teal-800 dark:bg-teal-800/30 dark:text-teal-500',
      idle: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-800/30 dark:text-yellow-500',
      error: 'bg-red-100 text-red-800 dark:bg-red-800/30 dark:text-red-500'
    };

    const typeColors = {
      conversational: 'bg-blue-100 text-blue-800 dark:bg-blue-800/30 dark:text-blue-500',
      creative: 'bg-purple-100 text-purple-800 dark:bg-purple-800/30 dark:text-purple-500',
      analytical: 'bg-orange-100 text-orange-800 dark:bg-orange-800/30 dark:text-orange-500',
      security: 'bg-red-100 text-red-800 dark:bg-red-800/30 dark:text-red-500',
      automation: 'bg-green-100 text-green-800 dark:bg-green-800/30 dark:text-green-500'
    };

    const typeIcons = {
      conversational: `<path d="M9 12l2 2 4-4"/><path d="M21 12c.552 0 1-.448 1-1V5c0-.552-.448-1-1-1H3c-.552 0-1 .448-1 1v6c0 .552.448 1 1 1h18z"/><path d="M3 12v6c0 .552.448 1 1 1h16c.552 0 1-.448 1-1v-6"/>`,
      creative: `<path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/><polyline points="14,2 14,8 20,8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10,9 9,9 8,9"/>`,
      analytical: `<path d="M9 11H1v3h8v3l3-4-3-4v2z"/><path d="M22 12h-6"/><path d="M16 16h6"/><path d="M16 8h6"/>`,
      security: `<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10"/><path d="M9 12l2 2 4-4"/>`,
      automation: `<path d="M12 2v6m0 6v6"/><path d="m21 12-6 0m-6 0-6 0"/>`
    };

    return `
      <tr data-agent-id="${agent.id}">
        <td class="size-px whitespace-nowrap">
          <div class="ps-6 py-3">
            <label for="hs-at-with-checkboxes-${agent.id}" class="flex">
              <input type="checkbox" class="shrink-0 border-gray-300 rounded text-blue-600 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-800 dark:border-neutral-600 dark:checked:bg-blue-500 dark:checked:border-blue-500 dark:focus:ring-offset-gray-800" id="hs-at-with-checkboxes-${agent.id}">
              <span class="sr-only">Checkbox</span>
            </label>
          </div>
        </td>
        <td class="size-px whitespace-nowrap">
          <div class="ps-6 lg:ps-3 xl:ps-0 pe-6 py-3">
            <div class="flex items-center gap-x-3">
              <div class="shrink-0">
                <div class="size-10 inline-flex items-center justify-center ${typeColors[agent.type]?.replace('text-', 'text-').replace('dark:text-', 'dark:text-')} rounded-lg">
                  <svg class="shrink-0 size-5" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    ${typeIcons[agent.type] || typeIcons.conversational}
                  </svg>
                </div>
              </div>
              <div class="grow">
                <span class="block text-sm font-semibold text-gray-800 dark:text-neutral-200">${agent.name}</span>
                <span class="block text-sm text-gray-500 dark:text-neutral-500">${agent.description}</span>
              </div>
            </div>
          </div>
        </td>
        <td class="h-px w-72 whitespace-nowrap">
          <div class="px-6 py-3">
            <span class="inline-flex items-center gap-x-1.5 py-1.5 px-3 rounded-full text-xs font-medium ${typeColors[agent.type] || typeColors.conversational}">
              <svg class="size-2.5" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.061L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z"/>
              </svg>
              ${agent.type.charAt(0).toUpperCase() + agent.type.slice(1)}
            </span>
          </div>
        </td>
        <td class="h-px w-72 whitespace-nowrap">
          <div class="px-6 py-3">
            <span class="inline-flex items-center gap-x-1.5 py-1.5 px-3 rounded-full text-xs font-medium ${statusColors[agent.status]}">
              <span class="size-1.5 inline-block rounded-full ${statusColors[agent.status]?.includes('teal') ? 'bg-teal-800 dark:bg-teal-500' : statusColors[agent.status]?.includes('yellow') ? 'bg-yellow-800 dark:bg-yellow-500' : 'bg-red-800 dark:bg-red-500'}"></span>
              ${agent.status.charAt(0).toUpperCase() + agent.status.slice(1)}
            </span>
          </div>
        </td>
        <td class="h-px w-72 whitespace-nowrap">
          <div class="px-6 py-3">
            <span class="text-sm text-gray-500 dark:text-neutral-500">${agent.lastActive}</span>
          </div>
        </td>
        <td class="size-px whitespace-nowrap">
          <div class="px-6 py-1.5">
            <div class="hs-dropdown [--placement:bottom-right] relative inline-block">
              <button id="hs-table-dropdown-${agent.id}" type="button" class="hs-dropdown-toggle py-1.5 px-2 inline-flex justify-center items-center gap-2 rounded-lg text-gray-700 align-middle disabled:opacity-50 disabled:pointer-events-none focus:outline-hidden focus:ring-2 focus:ring-offset-2 focus:ring-offset-white focus:ring-blue-600 transition-all text-sm dark:text-neutral-400 dark:hover:text-white dark:focus:ring-offset-gray-800" aria-haspopup="menu" aria-expanded="false" aria-label="Dropdown">
                <svg class="shrink-0 size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <circle cx="12" cy="12" r="1"/>
                  <circle cx="12" cy="5" r="1"/>
                  <circle cx="12" cy="19" r="1"/>
                </svg>
              </button>
              <div class="hs-dropdown-menu transition-[opacity,margin] duration hs-dropdown-open:opacity-100 opacity-0 hidden divide-y divide-gray-200 min-w-40 z-20 bg-white shadow-2xl rounded-lg mt-2 dark:divide-neutral-700 dark:bg-neutral-800 dark:border dark:border-neutral-700" role="menu" aria-orientation="vertical" aria-labelledby="hs-table-dropdown-${agent.id}">
                <div class="py-2 first:pt-0 last:pb-0">
                  <a class="flex items-center gap-x-3 py-2 px-3 rounded-lg text-sm text-gray-800 hover:bg-gray-100 focus:ring-2 focus:ring-blue-500 dark:text-neutral-400 dark:hover:bg-neutral-700 dark:hover:text-neutral-300" href="#" onclick="dashboard.editAgent(${agent.id})">
                    Edit
                  </a>
                  <a class="flex items-center gap-x-3 py-2 px-3 rounded-lg text-sm text-gray-800 hover:bg-gray-100 focus:ring-2 focus:ring-blue-500 dark:text-neutral-400 dark:hover:bg-neutral-700 dark:hover:text-neutral-300" href="#" onclick="dashboard.configureAgent(${agent.id})">
                    Configure
                  </a>
                  <a class="flex items-center gap-x-3 py-2 px-3 rounded-lg text-sm text-gray-800 hover:bg-gray-100 focus:ring-2 focus:ring-blue-500 dark:text-neutral-400 dark:hover:bg-neutral-700 dark:hover:text-neutral-300" href="#" onclick="dashboard.viewLogs(${agent.id})">
                    View Logs
                  </a>
                </div>
                <div class="py-2 first:pt-0 last:pb-0">
                  <a class="flex items-center gap-x-3 py-2 px-3 rounded-lg text-sm text-red-600 hover:bg-gray-100 focus:ring-2 focus:ring-blue-500 dark:text-red-500 dark:hover:bg-neutral-700" href="#" onclick="dashboard.deleteAgent(${agent.id})">
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

  bindRowEvents() {
    // Re-initialize Preline dropdowns for new rows
    if (window.HSDropdown) {
      window.HSDropdown.autoInit();
    }
  }

  updateStats() {
    const totalAgents = this.agents.length;
    const activeAgents = this.agents.filter(agent => agent.status === 'active').length;
    const totalApiCalls = this.agents.reduce((sum, agent) => sum + agent.apiCalls, 0);
    const avgSuccessRate = this.agents.reduce((sum, agent) => sum + agent.successRate, 0) / totalAgents;

    // Update stat cards
    const statCards = document.querySelectorAll('.grid.sm\\:grid-cols-2.lg\\:grid-cols-4 > div');
    if (statCards.length >= 4) {
      statCards[0].querySelector('h3').textContent = totalAgents;
      statCards[1].querySelector('h3').textContent = activeAgents;
      statCards[2].querySelector('h3').textContent = totalApiCalls.toLocaleString();
      statCards[3].querySelector('h3').textContent = `${avgSuccessRate.toFixed(1)}%`;
    }

    // Update results count
    const resultsText = document.querySelector('.px-6.py-4 p');
    if (resultsText) {
      resultsText.innerHTML = `<span class="font-semibold text-gray-800 dark:text-neutral-200">${totalAgents}</span> results`;
    }
  }

  editAgent(id) {
    const agent = this.agents.find(a => a.id === id);
    if (agent) {
      // Populate form with agent data
      document.getElementById('agent-name').value = agent.name;
      document.getElementById('agent-type').value = agent.type;
      document.getElementById('agent-description').value = agent.description;
      document.getElementById('agent-model').value = agent.model;
      document.getElementById('system-prompt').value = agent.systemPrompt || '';
      
      // Open modal
      const modal = document.getElementById('add-agent-modal');
      if (window.HSOverlay) {
        window.HSOverlay.open(modal);
      }
    }
  }

  configureAgent(id) {
    this.showInfoMessage(`Configuring agent ${id}...`);
  }

  viewLogs(id) {
    this.showInfoMessage(`Viewing logs for agent ${id}...`);
  }

  deleteAgent(id) {
    if (confirm('Are you sure you want to delete this agent?')) {
      this.agents = this.agents.filter(agent => agent.id !== id);
      this.renderAgents();
      this.updateStats();
      this.showSuccessMessage('Agent deleted successfully!');
    }
  }

  closeModal() {
    const modal = document.getElementById('add-agent-modal');
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
      success: 'bg-green-100 text-green-800 border-green-200',
      error: 'bg-red-100 text-red-800 border-red-200',
      info: 'bg-blue-100 text-blue-800 border-blue-200'
    };

    const toast = document.createElement('div');
    toast.className = `fixed top-4 right-4 z-[100] p-4 rounded-lg border ${colors[type]} shadow-lg transition-all duration-300 transform translate-x-full`;
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
        document.body.removeChild(toast);
      }, 300);
    }, 3000);
  }
}

// Initialize dashboard when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  window.dashboard = new AgentDashboard();
});

// API simulation functions
class AgentAPI {
  static async fetchAgents() {
    // Simulate API call
    return new Promise(resolve => {
      setTimeout(() => {
        resolve(window.dashboard?.agents || []);
      }, 500);
    });
  }

  static async createAgent(agentData) {
    // Simulate API call
    return new Promise(resolve => {
      setTimeout(() => {
        resolve({ success: true, id: Date.now() });
      }, 1000);
    });
  }

  static async updateAgent(id, agentData) {
    // Simulate API call
    return new Promise(resolve => {
      setTimeout(() => {
        resolve({ success: true });
      }, 1000);
    });
  }

  static async deleteAgent(id) {
    // Simulate API call
    return new Promise(resolve => {
      setTimeout(() => {
        resolve({ success: true });
      }, 500);
    });
  }

  static async getAgentLogs(id) {
    // Simulate API call
    return new Promise(resolve => {
      setTimeout(() => {
        resolve({
          logs: [
            { timestamp: new Date(), level: 'info', message: 'Agent started successfully' },
            { timestamp: new Date(), level: 'debug', message: 'Processing user request' },
            { timestamp: new Date(), level: 'info', message: 'Response generated' }
          ]
        });
      }, 500);
    });
  }
}