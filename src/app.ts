/*
 * Stefan's Dashboard Application
 * @version: 1.0.0
 * @author: Stefan
 */

import './styles/main.css';

// Import Preline components
import HSAccordion from './plugins/accordion';
import HSCarousel from './plugins/carousel';
import HSCollapse from './plugins/collapse';
import HSComboBox from './plugins/combobox';
import HSCopyMarkup from './plugins/copy-markup';
import HSDropdown from './plugins/dropdown';
import HSInputNumber from './plugins/input-number';
import HSLayoutSplitter from './plugins/layout-splitter';
import HSOverlay from './plugins/overlay';
import HSPinInput from './plugins/pin-input';
import HSRemoveElement from './plugins/remove-element';
import HSScrollNav from './plugins/scroll-nav';
import HSScrollspy from './plugins/scrollspy';
import HSSelect from './plugins/select';
import HSStepper from './plugins/stepper';
import HSStrongPassword from './plugins/strong-password';
import HSTabs from './plugins/tabs';
import HSTextareaAutoHeight from './plugins/textarea-auto-height';
import HSThemeSwitch from './plugins/theme-switch';
import HSToggleCount from './plugins/toggle-count';
import HSTogglePassword from './plugins/toggle-password';
import HSTooltip from './plugins/tooltip';
import HSTreeView from './plugins/tree-view';

// Dashboard Application Class
class StefansDashboard {
  private currentPage: string = 'dashboard';
  private sidebarOpen: boolean = false;

  constructor() {
    this.init();
  }

  private init() {
    this.render();
    this.bindEvents();
    this.initializePrelineComponents();
  }

  private initializePrelineComponents() {
    // Initialize all Preline components
    HSAccordion.autoInit();
    HSCarousel.autoInit();
    HSCollapse.autoInit();
    HSComboBox.autoInit();
    HSCopyMarkup.autoInit();
    HSDropdown.autoInit();
    HSInputNumber.autoInit();
    HSLayoutSplitter.autoInit();
    HSOverlay.autoInit();
    HSPinInput.autoInit();
    HSRemoveElement.autoInit();
    HSScrollNav.autoInit();
    HSScrollspy.autoInit();
    HSSelect.autoInit();
    HSStepper.autoInit();
    HSStrongPassword.autoInit();
    HSTabs.autoInit();
    HSTextareaAutoHeight.autoInit();
    HSThemeSwitch.autoInit();
    HSToggleCount.autoInit();
    HSTogglePassword.autoInit();
    HSTooltip.autoInit();
    HSTreeView.autoInit();
  }

  private bindEvents() {
    // Sidebar toggle
    document.addEventListener('click', (e) => {
      const target = e.target as HTMLElement;
      
      if (target.closest('[data-sidebar-toggle]')) {
        this.toggleSidebar();
      }

      if (target.closest('[data-page]')) {
        const page = target.closest('[data-page]')?.getAttribute('data-page');
        if (page) this.navigateTo(page);
      }
    });

    // Close sidebar on outside click
    document.addEventListener('click', (e) => {
      const target = e.target as HTMLElement;
      const sidebar = document.querySelector('#sidebar');
      const sidebarToggle = document.querySelector('[data-sidebar-toggle]');
      
      if (this.sidebarOpen && !sidebar?.contains(target) && !sidebarToggle?.contains(target)) {
        this.closeSidebar();
      }
    });
  }

  private toggleSidebar() {
    this.sidebarOpen = !this.sidebarOpen;
    const sidebar = document.querySelector('#sidebar');
    const overlay = document.querySelector('#sidebar-overlay');
    
    if (this.sidebarOpen) {
      sidebar?.classList.remove('-translate-x-full');
      overlay?.classList.remove('hidden');
    } else {
      sidebar?.classList.add('-translate-x-full');
      overlay?.classList.add('hidden');
    }
  }

  private closeSidebar() {
    this.sidebarOpen = false;
    const sidebar = document.querySelector('#sidebar');
    const overlay = document.querySelector('#sidebar-overlay');
    
    sidebar?.classList.add('-translate-x-full');
    overlay?.classList.add('hidden');
  }

  private navigateTo(page: string) {
    this.currentPage = page;
    this.updateActiveNavigation();
    this.renderPageContent();
    this.closeSidebar();
  }

  private updateActiveNavigation() {
    // Remove active class from all nav items
    document.querySelectorAll('[data-page]').forEach(el => {
      el.classList.remove('bg-gray-100', 'text-gray-900', 'dark:bg-neutral-700', 'dark:text-white');
      el.classList.add('text-gray-700', 'hover:text-gray-900', 'hover:bg-gray-100', 'dark:text-neutral-400', 'dark:hover:text-neutral-300', 'dark:hover:bg-neutral-700');
    });

    // Add active class to current page
    const activeNav = document.querySelector(`[data-page="${this.currentPage}"]`);
    if (activeNav) {
      activeNav.classList.add('bg-gray-100', 'text-gray-900', 'dark:bg-neutral-700', 'dark:text-white');
      activeNav.classList.remove('text-gray-700', 'hover:text-gray-900', 'hover:bg-gray-100', 'dark:text-neutral-400', 'dark:hover:text-neutral-300', 'dark:hover:bg-neutral-700');
    }
  }

  private renderPageContent() {
    const contentArea = document.querySelector('#main-content');
    if (!contentArea) return;

    switch (this.currentPage) {
      case 'dashboard':
        contentArea.innerHTML = this.getDashboardContent();
        break;
      case 'analytics':
        contentArea.innerHTML = this.getAnalyticsContent();
        break;
      case 'projects':
        contentArea.innerHTML = this.getProjectsContent();
        break;
      case 'tasks':
        contentArea.innerHTML = this.getTasksContent();
        break;
      case 'team':
        contentArea.innerHTML = this.getTeamContent();
        break;
      case 'settings':
        contentArea.innerHTML = this.getSettingsContent();
        break;
      default:
        contentArea.innerHTML = this.getDashboardContent();
    }

    // Re-initialize Preline components after content change
    setTimeout(() => {
      this.initializePrelineComponents();
    }, 100);
  }

  private getDashboardContent() {
    return `
      <div class="p-4 sm:p-6 space-y-4 sm:space-y-6">
        <!-- Page Header -->
        <div class="mb-8">
          <h1 class="text-2xl font-semibold text-gray-800 dark:text-neutral-200">Dashboard Overview</h1>
          <p class="text-sm text-gray-600 dark:text-neutral-400">Welcome back, Stefan! Here's what's happening with your projects today.</p>
        </div>

        <!-- Stats Cards -->
        <div class="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          <div class="flex flex-col bg-white border shadow-sm rounded-xl dark:bg-neutral-800 dark:border-neutral-700">
            <div class="p-4 md:p-5">
              <div class="flex items-center">
                <div class="flex-shrink-0">
                  <svg class="flex-shrink-0 size-5 text-blue-600 dark:text-blue-500" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/>
                    <circle cx="9" cy="7" r="4"/>
                    <path d="m22 21-3-3m0 0a5.5 5.5 0 1 0-7.78-7.78 5.5 5.5 0 0 0 7.78 7.78Z"/>
                  </svg>
                </div>
                <div class="grow ms-5">
                  <h3 class="text-xs uppercase tracking-wide text-gray-500 dark:text-neutral-500">Total Users</h3>
                  <div class="flex items-center gap-x-2">
                    <p class="text-xl sm:text-2xl font-medium text-gray-800 dark:text-neutral-200">2,845</p>
                    <span class="flex items-center gap-x-1 text-green-600">
                      <svg class="inline-block size-4 self-center" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <polyline points="22 7 13.5 15.5 8.5 10.5 2 17"/>
                        <polyline points="16 7 22 7 22 13"/>
                      </svg>
                      <span class="inline-block text-xs">12.5%</span>
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="flex flex-col bg-white border shadow-sm rounded-xl dark:bg-neutral-800 dark:border-neutral-700">
            <div class="p-4 md:p-5">
              <div class="flex items-center">
                <div class="flex-shrink-0">
                  <svg class="flex-shrink-0 size-5 text-green-600 dark:text-green-500" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M12 2v20m8-10H4"/>
                  </svg>
                </div>
                <div class="grow ms-5">
                  <h3 class="text-xs uppercase tracking-wide text-gray-500 dark:text-neutral-500">Revenue</h3>
                  <div class="flex items-center gap-x-2">
                    <p class="text-xl sm:text-2xl font-medium text-gray-800 dark:text-neutral-200">$89,425</p>
                    <span class="flex items-center gap-x-1 text-green-600">
                      <svg class="inline-block size-4 self-center" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <polyline points="22 7 13.5 15.5 8.5 10.5 2 17"/>
                        <polyline points="16 7 22 7 22 13"/>
                      </svg>
                      <span class="inline-block text-xs">8.1%</span>
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="flex flex-col bg-white border shadow-sm rounded-xl dark:bg-neutral-800 dark:border-neutral-700">
            <div class="p-4 md:p-5">
              <div class="flex items-center">
                <div class="flex-shrink-0">
                  <svg class="flex-shrink-0 size-5 text-yellow-600 dark:text-yellow-500" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M14 9V5a3 3 0 0 0-6 0v4"/>
                    <rect x="2" y="9" width="20" height="11" rx="2" ry="2"/>
                  </svg>
                </div>
                <div class="grow ms-5">
                  <h3 class="text-xs uppercase tracking-wide text-gray-500 dark:text-neutral-500">Active Projects</h3>
                  <div class="flex items-center gap-x-2">
                    <p class="text-xl sm:text-2xl font-medium text-gray-800 dark:text-neutral-200">24</p>
                    <span class="flex items-center gap-x-1 text-red-600">
                      <svg class="inline-block size-4 self-center" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <polyline points="22 17 13.5 8.5 8.5 13.5 2 7"/>
                        <polyline points="16 17 22 17 22 11"/>
                      </svg>
                      <span class="inline-block text-xs">2.1%</span>
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="flex flex-col bg-white border shadow-sm rounded-xl dark:bg-neutral-800 dark:border-neutral-700">
            <div class="p-4 md:p-5">
              <div class="flex items-center">
                <div class="flex-shrink-0">
                  <svg class="flex-shrink-0 size-5 text-purple-600 dark:text-purple-500" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M22 12h-4l-3 9L9 3l-3 9H2"/>
                  </svg>
                </div>
                <div class="grow ms-5">
                  <h3 class="text-xs uppercase tracking-wide text-gray-500 dark:text-neutral-500">Conversion Rate</h3>
                  <div class="flex items-center gap-x-2">
                    <p class="text-xl sm:text-2xl font-medium text-gray-800 dark:text-neutral-200">3.2%</p>
                    <span class="flex items-center gap-x-1 text-green-600">
                      <svg class="inline-block size-4 self-center" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <polyline points="22 7 13.5 15.5 8.5 10.5 2 17"/>
                        <polyline points="16 7 22 7 22 13"/>
                      </svg>
                      <span class="inline-block text-xs">0.8%</span>
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Charts and Recent Activity -->
        <div class="grid lg:grid-cols-2 gap-4 sm:gap-6">
          <!-- Chart Card -->
          <div class="flex flex-col bg-white border shadow-sm rounded-xl dark:bg-neutral-800 dark:border-neutral-700">
            <div class="p-4 md:p-5">
              <h3 class="text-lg font-bold text-gray-800 dark:text-white">Revenue Overview</h3>
              <div class="mt-4">
                <div class="h-64 bg-gray-50 dark:bg-neutral-700 rounded-lg flex items-center justify-center">
                  <p class="text-gray-500 dark:text-neutral-400">Chart placeholder - Revenue data visualization</p>
                </div>
              </div>
            </div>
          </div>

          <!-- Recent Activity -->
          <div class="flex flex-col bg-white border shadow-sm rounded-xl dark:bg-neutral-800 dark:border-neutral-700">
            <div class="p-4 md:p-5">
              <h3 class="text-lg font-bold text-gray-800 dark:text-white">Recent Activity</h3>
              <div class="mt-4 space-y-3">
                <div class="flex items-center gap-x-3">
                  <div class="flex-shrink-0">
                    <img class="size-8 rounded-full" src="https://images.unsplash.com/photo-1568602471122-7832951cc4c5?ixlib=rb-4.0.3&auto=format&fit=facearea&facepad=2&w=320&h=320&q=80" alt="Avatar">
                  </div>
                  <div class="grow">
                    <p class="text-sm text-gray-800 dark:text-neutral-200">
                      <span class="font-semibold">John Doe</span> completed project "Website Redesign"
                    </p>
                    <p class="text-xs text-gray-500 dark:text-neutral-500">2 hours ago</p>
                  </div>
                </div>

                <div class="flex items-center gap-x-3">
                  <div class="flex-shrink-0">
                    <img class="size-8 rounded-full" src="https://images.unsplash.com/photo-1541101767792-f9b2b1c4f127?ixlib=rb-4.0.3&auto=format&fit=facearea&facepad=2&w=320&h=320&q=80" alt="Avatar">
                  </div>
                  <div class="grow">
                    <p class="text-sm text-gray-800 dark:text-neutral-200">
                      <span class="font-semibold">Sarah Wilson</span> added new task to "Mobile App"
                    </p>
                    <p class="text-xs text-gray-500 dark:text-neutral-500">4 hours ago</p>
                  </div>
                </div>

                <div class="flex items-center gap-x-3">
                  <div class="flex-shrink-0">
                    <img class="size-8 rounded-full" src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=facearea&facepad=2&w=320&h=320&q=80" alt="Avatar">
                  </div>
                  <div class="grow">
                    <p class="text-sm text-gray-800 dark:text-neutral-200">
                      <span class="font-semibold">Mike Johnson</span> updated project timeline
                    </p>
                    <p class="text-xs text-gray-500 dark:text-neutral-500">6 hours ago</p>
                  </div>
                </div>

                <div class="flex items-center gap-x-3">
                  <div class="flex-shrink-0">
                    <img class="size-8 rounded-full" src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&auto=format&fit=facearea&facepad=2&w=320&h=320&q=80" alt="Avatar">
                  </div>
                  <div class="grow">
                    <p class="text-sm text-gray-800 dark:text-neutral-200">
                      <span class="font-semibold">Emma Davis</span> submitted design review
                    </p>
                    <p class="text-xs text-gray-500 dark:text-neutral-500">1 day ago</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Quick Actions -->
        <div class="flex flex-col bg-white border shadow-sm rounded-xl dark:bg-neutral-800 dark:border-neutral-700">
          <div class="p-4 md:p-5">
            <h3 class="text-lg font-bold text-gray-800 dark:text-white mb-4">Quick Actions</h3>
            <div class="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
              <button type="button" class="py-3 px-4 inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none">
                <svg class="flex-shrink-0 size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M5 12h14"/>
                  <path d="M12 5v14"/>
                </svg>
                New Project
              </button>
              <button type="button" class="py-3 px-4 inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-gray-200 text-gray-500 hover:border-blue-600 hover:text-blue-600 disabled:opacity-50 disabled:pointer-events-none dark:border-neutral-700 dark:text-neutral-400 dark:hover:text-blue-500 dark:hover:border-blue-600">
                <svg class="flex-shrink-0 size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/>
                  <circle cx="9" cy="7" r="4"/>
                  <path d="m22 21-3-3m0 0a5.5 5.5 0 1 0-7.78-7.78 5.5 5.5 0 0 0 7.78 7.78Z"/>
                </svg>
                Add Team Member
              </button>
              <button type="button" class="py-3 px-4 inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-gray-200 text-gray-500 hover:border-blue-600 hover:text-blue-600 disabled:opacity-50 disabled:pointer-events-none dark:border-neutral-700 dark:text-neutral-400 dark:hover:text-blue-500 dark:hover:border-blue-600">
                <svg class="flex-shrink-0 size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z"/>
                  <circle cx="12" cy="13" r="3"/>
                </svg>
                Generate Report
              </button>
              <button type="button" class="py-3 px-4 inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-gray-200 text-gray-500 hover:border-blue-600 hover:text-blue-600 disabled:opacity-50 disabled:pointer-events-none dark:border-neutral-700 dark:text-neutral-400 dark:hover:text-blue-500 dark:hover:border-blue-600">
                <svg class="flex-shrink-0 size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
                </svg>
                Send Message
              </button>
            </div>
          </div>
        </div>
      </div>
    `;
  }

  private getAnalyticsContent() {
    return `
      <div class="p-4 sm:p-6 space-y-4 sm:space-y-6">
        <div class="mb-8">
          <h1 class="text-2xl font-semibold text-gray-800 dark:text-neutral-200">Analytics</h1>
          <p class="text-sm text-gray-600 dark:text-neutral-400">Detailed insights and performance metrics</p>
        </div>

        <!-- Analytics Cards -->
        <div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          <div class="flex flex-col bg-white border shadow-sm rounded-xl dark:bg-neutral-800 dark:border-neutral-700">
            <div class="p-4 md:p-5">
              <h3 class="text-lg font-bold text-gray-800 dark:text-white">Page Views</h3>
              <p class="text-3xl font-bold text-blue-600 dark:text-blue-500 mt-2">125,847</p>
              <p class="text-sm text-gray-500 dark:text-neutral-400 mt-1">+15.3% from last month</p>
            </div>
          </div>

          <div class="flex flex-col bg-white border shadow-sm rounded-xl dark:bg-neutral-800 dark:border-neutral-700">
            <div class="p-4 md:p-5">
              <h3 class="text-lg font-bold text-gray-800 dark:text-white">Unique Visitors</h3>
              <p class="text-3xl font-bold text-green-600 dark:text-green-500 mt-2">42,156</p>
              <p class="text-sm text-gray-500 dark:text-neutral-400 mt-1">+8.7% from last month</p>
            </div>
          </div>

          <div class="flex flex-col bg-white border shadow-sm rounded-xl dark:bg-neutral-800 dark:border-neutral-700">
            <div class="p-4 md:p-5">
              <h3 class="text-lg font-bold text-gray-800 dark:text-white">Bounce Rate</h3>
              <p class="text-3xl font-bold text-red-600 dark:text-red-500 mt-2">24.8%</p>
              <p class="text-sm text-gray-500 dark:text-neutral-400 mt-1">-2.1% from last month</p>
            </div>
          </div>
        </div>

        <!-- Traffic Sources -->
        <div class="flex flex-col bg-white border shadow-sm rounded-xl dark:bg-neutral-800 dark:border-neutral-700">
          <div class="p-4 md:p-5">
            <h3 class="text-lg font-bold text-gray-800 dark:text-white mb-4">Traffic Sources</h3>
            <div class="space-y-3">
              <div class="flex items-center justify-between">
                <span class="text-sm text-gray-600 dark:text-neutral-400">Organic Search</span>
                <div class="flex items-center gap-x-2">
                  <div class="w-32 bg-gray-200 rounded-full h-2 dark:bg-neutral-700">
                    <div class="bg-blue-600 h-2 rounded-full" style="width: 65%"></div>
                  </div>
                  <span class="text-sm font-medium text-gray-800 dark:text-neutral-200">65%</span>
                </div>
              </div>
              <div class="flex items-center justify-between">
                <span class="text-sm text-gray-600 dark:text-neutral-400">Direct</span>
                <div class="flex items-center gap-x-2">
                  <div class="w-32 bg-gray-200 rounded-full h-2 dark:bg-neutral-700">
                    <div class="bg-green-600 h-2 rounded-full" style="width: 20%"></div>
                  </div>
                  <span class="text-sm font-medium text-gray-800 dark:text-neutral-200">20%</span>
                </div>
              </div>
              <div class="flex items-center justify-between">
                <span class="text-sm text-gray-600 dark:text-neutral-400">Social Media</span>
                <div class="flex items-center gap-x-2">
                  <div class="w-32 bg-gray-200 rounded-full h-2 dark:bg-neutral-700">
                    <div class="bg-purple-600 h-2 rounded-full" style="width: 10%"></div>
                  </div>
                  <span class="text-sm font-medium text-gray-800 dark:text-neutral-200">10%</span>
                </div>
              </div>
              <div class="flex items-center justify-between">
                <span class="text-sm text-gray-600 dark:text-neutral-400">Referral</span>
                <div class="flex items-center gap-x-2">
                  <div class="w-32 bg-gray-200 rounded-full h-2 dark:bg-neutral-700">
                    <div class="bg-yellow-600 h-2 rounded-full" style="width: 5%"></div>
                  </div>
                  <span class="text-sm font-medium text-gray-800 dark:text-neutral-200">5%</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;
  }

  private getProjectsContent() {
    return `
      <div class="p-4 sm:p-6 space-y-4 sm:space-y-6">
        <div class="flex justify-between items-center mb-8">
          <div>
            <h1 class="text-2xl font-semibold text-gray-800 dark:text-neutral-200">Projects</h1>
            <p class="text-sm text-gray-600 dark:text-neutral-400">Manage and track your project progress</p>
          </div>
          <button type="button" class="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700">
            <svg class="flex-shrink-0 size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M5 12h14"/>
              <path d="M12 5v14"/>
            </svg>
            New Project
          </button>
        </div>

        <!-- Project Cards -->
        <div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          <div class="group flex flex-col h-full bg-white border border-gray-200 shadow-sm rounded-xl dark:bg-neutral-800 dark:border-neutral-700">
            <div class="h-52 flex flex-col justify-center items-center bg-blue-600 rounded-t-xl">
              <svg class="size-28 text-white" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <rect width="18" height="18" x="3" y="4" rx="2" ry="2"/>
                <line x1="16" x2="16" y1="2" y2="6"/>
                <line x1="8" x2="8" y1="2" y2="6"/>
                <line x1="3" x2="21" y1="10" y2="10"/>
              </svg>
            </div>
            <div class="p-4 md:p-6">
              <span class="block mb-1 text-xs font-semibold uppercase text-blue-600 dark:text-blue-500">Web Development</span>
              <h3 class="text-xl font-semibold text-gray-800 dark:text-neutral-300 dark:hover:text-white">E-commerce Platform</h3>
              <p class="mt-3 text-gray-500 dark:text-neutral-500">Building a modern e-commerce solution with React and Node.js</p>
              <div class="mt-4">
                <div class="flex justify-between items-center mb-2">
                  <span class="text-sm text-gray-600 dark:text-neutral-400">Progress</span>
                  <span class="text-sm font-medium text-gray-800 dark:text-neutral-200">75%</span>
                </div>
                <div class="w-full bg-gray-200 rounded-full h-2 dark:bg-neutral-700">
                  <div class="bg-blue-600 h-2 rounded-full" style="width: 75%"></div>
                </div>
              </div>
            </div>
            <div class="mt-auto flex border-t border-gray-200 divide-x divide-gray-200 dark:border-neutral-700 dark:divide-neutral-700">
              <a class="w-full py-3 px-4 inline-flex justify-center items-center gap-x-2 text-sm font-medium rounded-es-xl bg-white text-gray-800 shadow-sm hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-800 dark:border-neutral-700 dark:text-white dark:hover:bg-neutral-800" href="#">
                View Details
              </a>
              <a class="w-full py-3 px-4 inline-flex justify-center items-center gap-x-2 text-sm font-medium rounded-ee-xl bg-white text-gray-800 shadow-sm hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-800 dark:border-neutral-700 dark:text-white dark:hover:bg-neutral-800" href="#">
                Edit
              </a>
            </div>
          </div>

          <div class="group flex flex-col h-full bg-white border border-gray-200 shadow-sm rounded-xl dark:bg-neutral-800 dark:border-neutral-700">
            <div class="h-52 flex flex-col justify-center items-center bg-green-600 rounded-t-xl">
              <svg class="size-28 text-white" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <rect width="16" height="20" x="4" y="2" rx="2" ry="2"/>
                <path d="M9 22v-4h6v4"/>
                <path d="M8 6h.01"/>
                <path d="M16 6h.01"/>
                <path d="M12 6h.01"/>
                <path d="M12 10h.01"/>
                <path d="M12 14h.01"/>
                <path d="M16 10h.01"/>
                <path d="M16 14h.01"/>
                <path d="M8 10h.01"/>
                <path d="M8 14h.01"/>
              </svg>
            </div>
            <div class="p-4 md:p-6">
              <span class="block mb-1 text-xs font-semibold uppercase text-green-600 dark:text-green-500">Mobile App</span>
              <h3 class="text-xl font-semibold text-gray-800 dark:text-neutral-300 dark:hover:text-white">Task Manager App</h3>
              <p class="mt-3 text-gray-500 dark:text-neutral-500">Cross-platform mobile application for task management</p>
              <div class="mt-4">
                <div class="flex justify-between items-center mb-2">
                  <span class="text-sm text-gray-600 dark:text-neutral-400">Progress</span>
                  <span class="text-sm font-medium text-gray-800 dark:text-neutral-200">45%</span>
                </div>
                <div class="w-full bg-gray-200 rounded-full h-2 dark:bg-neutral-700">
                  <div class="bg-green-600 h-2 rounded-full" style="width: 45%"></div>
                </div>
              </div>
            </div>
            <div class="mt-auto flex border-t border-gray-200 divide-x divide-gray-200 dark:border-neutral-700 dark:divide-neutral-700">
              <a class="w-full py-3 px-4 inline-flex justify-center items-center gap-x-2 text-sm font-medium rounded-es-xl bg-white text-gray-800 shadow-sm hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-800 dark:border-neutral-700 dark:text-white dark:hover:bg-neutral-800" href="#">
                View Details
              </a>
              <a class="w-full py-3 px-4 inline-flex justify-center items-center gap-x-2 text-sm font-medium rounded-ee-xl bg-white text-gray-800 shadow-sm hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-800 dark:border-neutral-700 dark:text-white dark:hover:bg-neutral-800" href="#">
                Edit
              </a>
            </div>
          </div>

          <div class="group flex flex-col h-full bg-white border border-gray-200 shadow-sm rounded-xl dark:bg-neutral-800 dark:border-neutral-700">
            <div class="h-52 flex flex-col justify-center items-center bg-purple-600 rounded-t-xl">
              <svg class="size-28 text-white" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/>
                <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/>
              </svg>
            </div>
            <div class="p-4 md:p-6">
              <span class="block mb-1 text-xs font-semibold uppercase text-purple-600 dark:text-purple-500">Documentation</span>
              <h3 class="text-xl font-semibold text-gray-800 dark:text-neutral-300 dark:hover:text-white">API Documentation</h3>
              <p class="mt-3 text-gray-500 dark:text-neutral-500">Comprehensive API documentation and developer guides</p>
              <div class="mt-4">
                <div class="flex justify-between items-center mb-2">
                  <span class="text-sm text-gray-600 dark:text-neutral-400">Progress</span>
                  <span class="text-sm font-medium text-gray-800 dark:text-neutral-200">90%</span>
                </div>
                <div class="w-full bg-gray-200 rounded-full h-2 dark:bg-neutral-700">
                  <div class="bg-purple-600 h-2 rounded-full" style="width: 90%"></div>
                </div>
              </div>
            </div>
            <div class="mt-auto flex border-t border-gray-200 divide-x divide-gray-200 dark:border-neutral-700 dark:divide-neutral-700">
              <a class="w-full py-3 px-4 inline-flex justify-center items-center gap-x-2 text-sm font-medium rounded-es-xl bg-white text-gray-800 shadow-sm hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-800 dark:border-neutral-700 dark:text-white dark:hover:bg-neutral-800" href="#">
                View Details
              </a>
              <a class="w-full py-3 px-4 inline-flex justify-center items-center gap-x-2 text-sm font-medium rounded-ee-xl bg-white text-gray-800 shadow-sm hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-800 dark:border-neutral-700 dark:text-white dark:hover:bg-neutral-800" href="#">
                Edit
              </a>
            </div>
          </div>
        </div>
      </div>
    `;
  }

  private getTasksContent() {
    return `
      <div class="p-4 sm:p-6 space-y-4 sm:space-y-6">
        <div class="flex justify-between items-center mb-8">
          <div>
            <h1 class="text-2xl font-semibold text-gray-800 dark:text-neutral-200">Tasks</h1>
            <p class="text-sm text-gray-600 dark:text-neutral-400">Manage your daily tasks and priorities</p>
          </div>
          <button type="button" class="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700">
            <svg class="flex-shrink-0 size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M5 12h14"/>
              <path d="M12 5v14"/>
            </svg>
            Add Task
          </button>
        </div>

        <!-- Task Filters -->
        <div class="flex flex-wrap gap-2 mb-6">
          <button type="button" class="py-2 px-3 inline-flex items-center gap-x-2 text-xs font-medium rounded-lg border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 dark:bg-neutral-800 dark:border-neutral-700 dark:text-white dark:hover:bg-neutral-800">
            All Tasks
          </button>
          <button type="button" class="py-2 px-3 inline-flex items-center gap-x-2 text-xs font-medium rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700">
            In Progress
          </button>
          <button type="button" class="py-2 px-3 inline-flex items-center gap-x-2 text-xs font-medium rounded-lg border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 dark:bg-neutral-800 dark:border-neutral-700 dark:text-white dark:hover:bg-neutral-800">
            Completed
          </button>
          <button type="button" class="py-2 px-3 inline-flex items-center gap-x-2 text-xs font-medium rounded-lg border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 dark:bg-neutral-800 dark:border-neutral-700 dark:text-white dark:hover:bg-neutral-800">
            Overdue
          </button>
        </div>

        <!-- Task List -->
        <div class="flex flex-col bg-white border shadow-sm rounded-xl dark:bg-neutral-800 dark:border-neutral-700">
          <div class="p-4 md:p-5">
            <h3 class="text-lg font-bold text-gray-800 dark:text-white mb-4">Today's Tasks</h3>
            <div class="space-y-3">
              <div class="flex items-center gap-x-3 p-3 bg-gray-50 rounded-lg dark:bg-neutral-700">
                <input type="checkbox" class="shrink-0 border-gray-300 rounded text-blue-600 focus:ring-blue-500 dark:bg-neutral-800 dark:border-neutral-600">
                <div class="grow">
                  <p class="text-sm font-medium text-gray-800 dark:text-neutral-200">Review project proposals</p>
                  <p class="text-xs text-gray-500 dark:text-neutral-500">Due: Today, 2:00 PM</p>
                </div>
                <span class="inline-flex items-center gap-x-1.5 py-1.5 px-3 rounded-full text-xs font-medium bg-red-100 text-red-800 dark:bg-red-800/30 dark:text-red-500">High</span>
              </div>

              <div class="flex items-center gap-x-3 p-3 bg-gray-50 rounded-lg dark:bg-neutral-700">
                <input type="checkbox" class="shrink-0 border-gray-300 rounded text-blue-600 focus:ring-blue-500 dark:bg-neutral-800 dark:border-neutral-600">
                <div class="grow">
                  <p class="text-sm font-medium text-gray-800 dark:text-neutral-200">Update team documentation</p>
                  <p class="text-xs text-gray-500 dark:text-neutral-500">Due: Tomorrow, 10:00 AM</p>
                </div>
                <span class="inline-flex items-center gap-x-1.5 py-1.5 px-3 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800 dark:bg-yellow-800/30 dark:text-yellow-500">Medium</span>
              </div>

              <div class="flex items-center gap-x-3 p-3 bg-gray-50 rounded-lg dark:bg-neutral-700">
                <input type="checkbox" checked class="shrink-0 border-gray-300 rounded text-blue-600 focus:ring-blue-500 dark:bg-neutral-800 dark:border-neutral-600">
                <div class="grow">
                  <p class="text-sm font-medium text-gray-800 dark:text-neutral-200 line-through">Send weekly report</p>
                  <p class="text-xs text-gray-500 dark:text-neutral-500">Completed: Today, 9:00 AM</p>
                </div>
                <span class="inline-flex items-center gap-x-1.5 py-1.5 px-3 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-800/30 dark:text-green-500">Completed</span>
              </div>

              <div class="flex items-center gap-x-3 p-3 bg-gray-50 rounded-lg dark:bg-neutral-700">
                <input type="checkbox" class="shrink-0 border-gray-300 rounded text-blue-600 focus:ring-blue-500 dark:bg-neutral-800 dark:border-neutral-600">
                <div class="grow">
                  <p class="text-sm font-medium text-gray-800 dark:text-neutral-200">Schedule client meeting</p>
                  <p class="text-xs text-gray-500 dark:text-neutral-500">Due: Friday, 3:00 PM</p>
                </div>
                <span class="inline-flex items-center gap-x-1.5 py-1.5 px-3 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-800/30 dark:text-blue-500">Low</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;
  }

  private getTeamContent() {
    return `
      <div class="p-4 sm:p-6 space-y-4 sm:space-y-6">
        <div class="flex justify-between items-center mb-8">
          <div>
            <h1 class="text-2xl font-semibold text-gray-800 dark:text-neutral-200">Team</h1>
            <p class="text-sm text-gray-600 dark:text-neutral-400">Manage your team members and their roles</p>
          </div>
          <button type="button" class="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700">
            <svg class="flex-shrink-0 size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/>
              <circle cx="9" cy="7" r="4"/>
              <line x1="19" x2="19" y1="8" y2="14"/>
              <line x1="22" x2="16" y1="11" y2="11"/>
            </svg>
            Add Member
          </button>
        </div>

        <!-- Team Members Grid -->
        <div class="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
          <div class="flex flex-col bg-white border shadow-sm rounded-xl dark:bg-neutral-800 dark:border-neutral-700">
            <div class="p-4 md:p-5">
              <div class="flex items-center gap-x-2">
                <img class="inline-block size-12 rounded-full" src="https://images.unsplash.com/photo-1568602471122-7832951cc4c5?ixlib=rb-4.0.3&auto=format&fit=facearea&facepad=2&w=320&h=320&q=80" alt="Avatar">
                <div class="grow">
                  <h3 class="font-medium text-gray-800 dark:text-neutral-200">John Doe</h3>
                  <p class="text-xs uppercase text-gray-500 dark:text-neutral-500">Frontend Developer</p>
                </div>
                <div class="hs-dropdown relative inline-flex">
                  <button type="button" class="hs-dropdown-toggle size-8 inline-flex justify-center items-center gap-x-2 rounded-full border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-800 dark:border-neutral-700 dark:text-white dark:hover:bg-neutral-800">
                    <svg class="flex-shrink-0 size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                      <circle cx="12" cy="12" r="1"/>
                      <circle cx="12" cy="5" r="1"/>
                      <circle cx="12" cy="19" r="1"/>
                    </svg>
                  </button>
                  <div class="hs-dropdown-menu transition-[opacity,margin] duration hs-dropdown-open:opacity-100 opacity-0 hidden min-w-60 bg-white shadow-md rounded-lg p-2 mt-2 dark:bg-neutral-800 dark:border dark:border-neutral-700">
                    <a class="flex items-center gap-x-3.5 py-2 px-3 rounded-lg text-sm text-gray-800 hover:bg-gray-100 focus:ring-2 focus:ring-blue-500 dark:text-neutral-400 dark:hover:bg-neutral-700 dark:hover:text-neutral-300" href="#">
                      View Profile
                    </a>
                    <a class="flex items-center gap-x-3.5 py-2 px-3 rounded-lg text-sm text-gray-800 hover:bg-gray-100 focus:ring-2 focus:ring-blue-500 dark:text-neutral-400 dark:hover:bg-neutral-700 dark:hover:text-neutral-300" href="#">
                      Send Message
                    </a>
                  </div>
                </div>
              </div>
              <div class="mt-3">
                <p class="text-xs text-gray-500 dark:text-neutral-500">john.doe@company.com</p>
                <div class="flex items-center gap-x-1 mt-2">
                  <span class="size-2 inline-block bg-green-500 rounded-full"></span>
                  <span class="text-xs text-gray-600 dark:text-neutral-400">Online</span>
                </div>
              </div>
            </div>
          </div>

          <div class="flex flex-col bg-white border shadow-sm rounded-xl dark:bg-neutral-800 dark:border-neutral-700">
            <div class="p-4 md:p-5">
              <div class="flex items-center gap-x-2">
                <img class="inline-block size-12 rounded-full" src="https://images.unsplash.com/photo-1541101767792-f9b2b1c4f127?ixlib=rb-4.0.3&auto=format&fit=facearea&facepad=2&w=320&h=320&q=80" alt="Avatar">
                <div class="grow">
                  <h3 class="font-medium text-gray-800 dark:text-neutral-200">Sarah Wilson</h3>
                  <p class="text-xs uppercase text-gray-500 dark:text-neutral-500">UX Designer</p>
                </div>
                <div class="hs-dropdown relative inline-flex">
                  <button type="button" class="hs-dropdown-toggle size-8 inline-flex justify-center items-center gap-x-2 rounded-full border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-800 dark:border-neutral-700 dark:text-white dark:hover:bg-neutral-800">
                    <svg class="flex-shrink-0 size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                      <circle cx="12" cy="12" r="1"/>
                      <circle cx="12" cy="5" r="1"/>
                      <circle cx="12" cy="19" r="1"/>
                    </svg>
                  </button>
                  <div class="hs-dropdown-menu transition-[opacity,margin] duration hs-dropdown-open:opacity-100 opacity-0 hidden min-w-60 bg-white shadow-md rounded-lg p-2 mt-2 dark:bg-neutral-800 dark:border dark:border-neutral-700">
                    <a class="flex items-center gap-x-3.5 py-2 px-3 rounded-lg text-sm text-gray-800 hover:bg-gray-100 focus:ring-2 focus:ring-blue-500 dark:text-neutral-400 dark:hover:bg-neutral-700 dark:hover:text-neutral-300" href="#">
                      View Profile
                    </a>
                    <a class="flex items-center gap-x-3.5 py-2 px-3 rounded-lg text-sm text-gray-800 hover:bg-gray-100 focus:ring-2 focus:ring-blue-500 dark:text-neutral-400 dark:hover:bg-neutral-700 dark:hover:text-neutral-300" href="#">
                      Send Message
                    </a>
                  </div>
                </div>
              </div>
              <div class="mt-3">
                <p class="text-xs text-gray-500 dark:text-neutral-500">sarah.wilson@company.com</p>
                <div class="flex items-center gap-x-1 mt-2">
                  <span class="size-2 inline-block bg-green-500 rounded-full"></span>
                  <span class="text-xs text-gray-600 dark:text-neutral-400">Online</span>
                </div>
              </div>
            </div>
          </div>

          <div class="flex flex-col bg-white border shadow-sm rounded-xl dark:bg-neutral-800 dark:border-neutral-700">
            <div class="p-4 md:p-5">
              <div class="flex items-center gap-x-2">
                <img class="inline-block size-12 rounded-full" src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=facearea&facepad=2&w=320&h=320&q=80" alt="Avatar">
                <div class="grow">
                  <h3 class="font-medium text-gray-800 dark:text-neutral-200">Mike Johnson</h3>
                  <p class="text-xs uppercase text-gray-500 dark:text-neutral-500">Backend Developer</p>
                </div>
                <div class="hs-dropdown relative inline-flex">
                  <button type="button" class="hs-dropdown-toggle size-8 inline-flex justify-center items-center gap-x-2 rounded-full border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-800 dark:border-neutral-700 dark:text-white dark:hover:bg-neutral-800">
                    <svg class="flex-shrink-0 size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                      <circle cx="12" cy="12" r="1"/>
                      <circle cx="12" cy="5" r="1"/>
                      <circle cx="12" cy="19" r="1"/>
                    </svg>
                  </button>
                  <div class="hs-dropdown-menu transition-[opacity,margin] duration hs-dropdown-open:opacity-100 opacity-0 hidden min-w-60 bg-white shadow-md rounded-lg p-2 mt-2 dark:bg-neutral-800 dark:border dark:border-neutral-700">
                    <a class="flex items-center gap-x-3.5 py-2 px-3 rounded-lg text-sm text-gray-800 hover:bg-gray-100 focus:ring-2 focus:ring-blue-500 dark:text-neutral-400 dark:hover:bg-neutral-700 dark:hover:text-neutral-300" href="#">
                      View Profile
                    </a>
                    <a class="flex items-center gap-x-3.5 py-2 px-3 rounded-lg text-sm text-gray-800 hover:bg-gray-100 focus:ring-2 focus:ring-blue-500 dark:text-neutral-400 dark:hover:bg-neutral-700 dark:hover:text-neutral-300" href="#">
                      Send Message
                    </a>
                  </div>
                </div>
              </div>
              <div class="mt-3">
                <p class="text-xs text-gray-500 dark:text-neutral-500">mike.johnson@company.com</p>
                <div class="flex items-center gap-x-1 mt-2">
                  <span class="size-2 inline-block bg-yellow-500 rounded-full"></span>
                  <span class="text-xs text-gray-600 dark:text-neutral-400">Away</span>
                </div>
              </div>
            </div>
          </div>

          <div class="flex flex-col bg-white border shadow-sm rounded-xl dark:bg-neutral-800 dark:border-neutral-700">
            <div class="p-4 md:p-5">
              <div class="flex items-center gap-x-2">
                <img class="inline-block size-12 rounded-full" src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&auto=format&fit=facearea&facepad=2&w=320&h=320&q=80" alt="Avatar">
                <div class="grow">
                  <h3 class="font-medium text-gray-800 dark:text-neutral-200">Emma Davis</h3>
                  <p class="text-xs uppercase text-gray-500 dark:text-neutral-500">Project Manager</p>
                </div>
                <div class="hs-dropdown relative inline-flex">
                  <button type="button" class="hs-dropdown-toggle size-8 inline-flex justify-center items-center gap-x-2 rounded-full border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-800 dark:border-neutral-700 dark:text-white dark:hover:bg-neutral-800">
                    <svg class="flex-shrink-0 size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                      <circle cx="12" cy="12" r="1"/>
                      <circle cx="12" cy="5" r="1"/>
                      <circle cx="12" cy="19" r="1"/>
                    </svg>
                  </button>
                  <div class="hs-dropdown-menu transition-[opacity,margin] duration hs-dropdown-open:opacity-100 opacity-0 hidden min-w-60 bg-white shadow-md rounded-lg p-2 mt-2 dark:bg-neutral-800 dark:border dark:border-neutral-700">
                    <a class="flex items-center gap-x-3.5 py-2 px-3 rounded-lg text-sm text-gray-800 hover:bg-gray-100 focus:ring-2 focus:ring-blue-500 dark:text-neutral-400 dark:hover:bg-neutral-700 dark:hover:text-neutral-300" href="#">
                      View Profile
                    </a>
                    <a class="flex items-center gap-x-3.5 py-2 px-3 rounded-lg text-sm text-gray-800 hover:bg-gray-100 focus:ring-2 focus:ring-blue-500 dark:text-neutral-400 dark:hover:bg-neutral-700 dark:hover:text-neutral-300" href="#">
                      Send Message
                    </a>
                  </div>
                </div>
              </div>
              <div class="mt-3">
                <p class="text-xs text-gray-500 dark:text-neutral-500">emma.davis@company.com</p>
                <div class="flex items-center gap-x-1 mt-2">
                  <span class="size-2 inline-block bg-gray-400 rounded-full"></span>
                  <span class="text-xs text-gray-600 dark:text-neutral-400">Offline</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;
  }

  private getSettingsContent() {
    return `
      <div class="p-4 sm:p-6 space-y-4 sm:space-y-6">
        <div class="mb-8">
          <h1 class="text-2xl font-semibold text-gray-800 dark:text-neutral-200">Settings</h1>
          <p class="text-sm text-gray-600 dark:text-neutral-400">Manage your account and application preferences</p>
        </div>

        <!-- Settings Tabs -->
        <div class="border-b border-gray-200 dark:border-neutral-700">
          <nav class="-mb-0.5 flex space-x-6" role="tablist">
            <button type="button" class="hs-tab-active:font-semibold hs-tab-active:border-blue-600 hs-tab-active:text-blue-600 py-4 px-1 inline-flex items-center gap-x-2 border-b-2 border-transparent text-sm whitespace-nowrap text-gray-500 hover:text-blue-600 focus:outline-none focus:text-blue-600 disabled:opacity-50 disabled:pointer-events-none dark:text-neutral-400 dark:hover:text-blue-500 active" id="tabs-with-underline-item-1" data-hs-tab="#tabs-with-underline-1" aria-controls="tabs-with-underline-1" role="tab">
              Profile
            </button>
            <button type="button" class="hs-tab-active:font-semibold hs-tab-active:border-blue-600 hs-tab-active:text-blue-600 py-4 px-1 inline-flex items-center gap-x-2 border-b-2 border-transparent text-sm whitespace-nowrap text-gray-500 hover:text-blue-600 focus:outline-none focus:text-blue-600 disabled:opacity-50 disabled:pointer-events-none dark:text-neutral-400 dark:hover:text-blue-500" id="tabs-with-underline-item-2" data-hs-tab="#tabs-with-underline-2" aria-controls="tabs-with-underline-2" role="tab">
              Notifications
            </button>
            <button type="button" class="hs-tab-active:font-semibold hs-tab-active:border-blue-600 hs-tab-active:text-blue-600 py-4 px-1 inline-flex items-center gap-x-2 border-b-2 border-transparent text-sm whitespace-nowrap text-gray-500 hover:text-blue-600 focus:outline-none focus:text-blue-600 disabled:opacity-50 disabled:pointer-events-none dark:text-neutral-400 dark:hover:text-blue-500" id="tabs-with-underline-item-3" data-hs-tab="#tabs-with-underline-3" aria-controls="tabs-with-underline-3" role="tab">
              Security
            </button>
          </nav>
        </div>

        <div class="mt-3">
          <div id="tabs-with-underline-1" role="tabpanel" aria-labelledby="tabs-with-underline-item-1">
            <div class="flex flex-col bg-white border shadow-sm rounded-xl dark:bg-neutral-800 dark:border-neutral-700">
              <div class="p-4 md:p-5">
                <h3 class="text-lg font-bold text-gray-800 dark:text-white mb-4">Profile Information</h3>
                <div class="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label for="first-name" class="block text-sm font-medium mb-2 dark:text-white">First Name</label>
                    <input type="text" id="first-name" class="py-3 px-4 block w-full border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400" value="Stefan">
                  </div>
                  <div>
                    <label for="last-name" class="block text-sm font-medium mb-2 dark:text-white">Last Name</label>
                    <input type="text" id="last-name" class="py-3 px-4 block w-full border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400" value="Anderson">
                  </div>
                  <div class="sm:col-span-2">
                    <label for="email" class="block text-sm font-medium mb-2 dark:text-white">Email</label>
                    <input type="email" id="email" class="py-3 px-4 block w-full border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400" value="stefan.anderson@company.com">
                  </div>
                  <div class="sm:col-span-2">
                    <label for="bio" class="block text-sm font-medium mb-2 dark:text-white">Bio</label>
                    <textarea id="bio" class="py-3 px-4 block w-full border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400" rows="3">Experienced project manager with a passion for technology and team leadership.</textarea>
                  </div>
                </div>
                <div class="mt-6">
                  <button type="button" class="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700">
                    Save Changes
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div id="tabs-with-underline-2" class="hidden" role="tabpanel" aria-labelledby="tabs-with-underline-item-2">
            <div class="flex flex-col bg-white border shadow-sm rounded-xl dark:bg-neutral-800 dark:border-neutral-700">
              <div class="p-4 md:p-5">
                <h3 class="text-lg font-bold text-gray-800 dark:text-white mb-4">Notification Preferences</h3>
                <div class="space-y-4">
                  <div class="flex items-center justify-between">
                    <div>
                      <h4 class="text-sm font-medium text-gray-800 dark:text-neutral-200">Email Notifications</h4>
                      <p class="text-xs text-gray-500 dark:text-neutral-500">Receive notifications via email</p>
                    </div>
                    <input type="checkbox" class="relative w-11 h-6 bg-gray-100 checked:bg-none checked:bg-blue-600 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 ring-1 ring-transparent focus:border-blue-600 focus:ring-blue-600 ring-offset-white focus:outline-none appearance-none dark:bg-neutral-700 dark:checked:bg-blue-600 dark:focus:ring-offset-neutral-800 before:inline-block before:size-5 before:bg-white checked:before:bg-blue-200 before:translate-x-0 checked:before:translate-x-full before:shadow before:rounded-full before:transform before:ring-0 before:transition before:ease-in-out before:duration-200 dark:before:bg-neutral-400 dark:checked:before:bg-blue-200" checked>
                  </div>
                  <div class="flex items-center justify-between">
                    <div>
                      <h4 class="text-sm font-medium text-gray-800 dark:text-neutral-200">Push Notifications</h4>
                      <p class="text-xs text-gray-500 dark:text-neutral-500">Receive push notifications on your device</p>
                    </div>
                    <input type="checkbox" class="relative w-11 h-6 bg-gray-100 checked:bg-none checked:bg-blue-600 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 ring-1 ring-transparent focus:border-blue-600 focus:ring-blue-600 ring-offset-white focus:outline-none appearance-none dark:bg-neutral-700 dark:checked:bg-blue-600 dark:focus:ring-offset-neutral-800 before:inline-block before:size-5 before:bg-white checked:before:bg-blue-200 before:translate-x-0 checked:before:translate-x-full before:shadow before:rounded-full before:transform before:ring-0 before:transition before:ease-in-out before:duration-200 dark:before:bg-neutral-400 dark:checked:before:bg-blue-200">
                  </div>
                  <div class="flex items-center justify-between">
                    <div>
                      <h4 class="text-sm font-medium text-gray-800 dark:text-neutral-200">SMS Notifications</h4>
                      <p class="text-xs text-gray-500 dark:text-neutral-500">Receive notifications via SMS</p>
                    </div>
                    <input type="checkbox" class="relative w-11 h-6 bg-gray-100 checked:bg-none checked:bg-blue-600 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 ring-1 ring-transparent focus:border-blue-600 focus:ring-blue-600 ring-offset-white focus:outline-none appearance-none dark:bg-neutral-700 dark:checked:bg-blue-600 dark:focus:ring-offset-neutral-800 before:inline-block before:size-5 before:bg-white checked:before:bg-blue-200 before:translate-x-0 checked:before:translate-x-full before:shadow before:rounded-full before:transform before:ring-0 before:transition before:ease-in-out before:duration-200 dark:before:bg-neutral-400 dark:checked:before:bg-blue-200">
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div id="tabs-with-underline-3" class="hidden" role="tabpanel" aria-labelledby="tabs-with-underline-item-3">
            <div class="flex flex-col bg-white border shadow-sm rounded-xl dark:bg-neutral-800 dark:border-neutral-700">
              <div class="p-4 md:p-5">
                <h3 class="text-lg font-bold text-gray-800 dark:text-white mb-4">Security Settings</h3>
                <div class="space-y-4">
                  <div>
                    <label for="current-password" class="block text-sm font-medium mb-2 dark:text-white">Current Password</label>
                    <input type="password" id="current-password" class="py-3 px-4 block w-full border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400">
                  </div>
                  <div>
                    <label for="new-password" class="block text-sm font-medium mb-2 dark:text-white">New Password</label>
                    <input type="password" id="new-password" class="py-3 px-4 block w-full border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400">
                  </div>
                  <div>
                    <label for="confirm-password" class="block text-sm font-medium mb-2 dark:text-white">Confirm New Password</label>
                    <input type="password" id="confirm-password" class="py-3 px-4 block w-full border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400">
                  </div>
                  <div class="flex items-center justify-between">
                    <div>
                      <h4 class="text-sm font-medium text-gray-800 dark:text-neutral-200">Two-Factor Authentication</h4>
                      <p class="text-xs text-gray-500 dark:text-neutral-500">Add an extra layer of security to your account</p>
                    </div>
                    <input type="checkbox" class="relative w-11 h-6 bg-gray-100 checked:bg-none checked:bg-blue-600 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 ring-1 ring-transparent focus:border-blue-600 focus:ring-blue-600 ring-offset-white focus:outline-none appearance-none dark:bg-neutral-700 dark:checked:bg-blue-600 dark:focus:ring-offset-neutral-800 before:inline-block before:size-5 before:bg-white checked:before:bg-blue-200 before:translate-x-0 checked:before:translate-x-full before:shadow before:rounded-full before:transform before:ring-0 before:transition before:ease-in-out before:duration-200 dark:before:bg-neutral-400 dark:checked:before:bg-blue-200">
                  </div>
                </div>
                <div class="mt-6">
                  <button type="button" class="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700">
                    Update Security
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;
  }

  private render() {
    const app = document.getElementById('app');
    if (!app) return;

    app.innerHTML = `
      <div class="bg-gray-50 dark:bg-neutral-900">
        <!-- Sidebar Overlay -->
        <div id="sidebar-overlay" class="fixed inset-0 z-40 bg-gray-900/50 dark:bg-neutral-900/80 lg:hidden hidden"></div>

        <!-- Sidebar -->
        <div id="sidebar" class="hs-overlay hs-overlay-open:translate-x-0 -translate-x-full transition-all duration-300 transform fixed top-0 start-0 bottom-0 z-50 w-64 bg-white border-e border-gray-200 pt-7 pb-10 overflow-y-auto lg:block lg:translate-x-0 lg:end-auto lg:bottom-0 dark:bg-neutral-800 dark:border-neutral-700">
          <div class="px-6">
            <a class="flex-none text-xl font-semibold dark:text-white" href="#" aria-label="Brand">Stefan's Dashboard</a>
          </div>

          <nav class="hs-accordion-group p-6 w-full flex flex-col flex-wrap" data-hs-accordion-always-open>
            <ul class="space-y-1.5">
              <li>
                <a class="flex items-center gap-x-3.5 py-2 px-2.5 bg-gray-100 text-sm text-gray-900 rounded-lg hover:bg-gray-100 dark:bg-neutral-700 dark:text-white" href="#" data-page="dashboard">
                  <svg class="flex-shrink-0 size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
                    <polyline points="9,22 9,12 15,12 15,22"/>
                  </svg>
                  Dashboard
                </a>
              </li>

              <li>
                <a class="flex items-center gap-x-3.5 py-2 px-2.5 text-sm text-gray-700 rounded-lg hover:bg-gray-100 dark:text-neutral-400 dark:hover:text-neutral-300 dark:hover:bg-neutral-700" href="#" data-page="analytics">
                  <svg class="flex-shrink-0 size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M3 3v18h18"/>
                    <path d="m19 9-5 5-4-4-3 3"/>
                  </svg>
                  Analytics
                </a>
              </li>

              <li>
                <a class="flex items-center gap-x-3.5 py-2 px-2.5 text-sm text-gray-700 rounded-lg hover:bg-gray-100 dark:text-neutral-400 dark:hover:text-neutral-300 dark:hover:bg-neutral-700" href="#" data-page="projects">
                  <svg class="flex-shrink-0 size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <rect width="8" height="4" x="8" y="2" rx="1" ry="1"/>
                    <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"/>
                  </svg>
                  Projects
                </a>
              </li>

              <li>
                <a class="flex items-center gap-x-3.5 py-2 px-2.5 text-sm text-gray-700 rounded-lg hover:bg-gray-100 dark:text-neutral-400 dark:hover:text-neutral-300 dark:hover:bg-neutral-700" href="#" data-page="tasks">
                  <svg class="flex-shrink-0 size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M9 12l2 2 4-4"/>
                    <path d="M21 12c.552 0 1-.448 1-1V5c0-.552-.448-1-1-1H3c-.552 0-1 .448-1 1v6c0 .552.448 1 1 1h18z"/>
                    <path d="M3 12v6c0 .552.448 1 1 1h16c.552 0 1-.448 1-1v-6"/>
                  </svg>
                  Tasks
                </a>
              </li>

              <li>
                <a class="flex items-center gap-x-3.5 py-2 px-2.5 text-sm text-gray-700 rounded-lg hover:bg-gray-100 dark:text-neutral-400 dark:hover:text-neutral-300 dark:hover:bg-neutral-700" href="#" data-page="team">
                  <svg class="flex-shrink-0 size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/>
                    <circle cx="9" cy="7" r="4"/>
                    <path d="m22 21-3-3m0 0a5.5 5.5 0 1 0-7.78-7.78 5.5 5.5 0 0 0 7.78 7.78Z"/>
                  </svg>
                  Team
                </a>
              </li>

              <li class="pt-4">
                <a class="flex items-center gap-x-3.5 py-2 px-2.5 text-sm text-gray-700 rounded-lg hover:bg-gray-100 dark:text-neutral-400 dark:hover:text-neutral-300 dark:hover:bg-neutral-700" href="#" data-page="settings">
                  <svg class="flex-shrink-0 size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"/>
                    <circle cx="12" cy="12" r="3"/>
                  </svg>
                  Settings
                </a>
              </li>
            </ul>
          </div>
        </div>

        <!-- Content -->
        <div class="w-full lg:ps-64">
          <!-- Header -->
          <div class="sticky top-0 inset-x-0 z-20 bg-white border-y px-4 sm:px-6 md:px-8 lg:hidden dark:bg-neutral-800 dark:border-neutral-700">
            <div class="flex items-center py-4">
              <!-- Navigation Toggle -->
              <button type="button" class="text-gray-500 hover:text-gray-600" data-sidebar-toggle>
                <span class="sr-only">Toggle Navigation</span>
                <svg class="flex-shrink-0 size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <line x1="3" x2="21" y1="6" y2="6"/>
                  <line x1="3" x2="21" y1="12" y2="12"/>
                  <line x1="3" x2="21" y1="18" y2="18"/>
                </svg>
              </button>
              <!-- End Navigation Toggle -->

              <!-- Breadcrumb -->
              <ol class="ms-3 flex items-center whitespace-nowrap">
                <li class="flex items-center text-sm text-gray-800 dark:text-neutral-400">
                  Stefan's Dashboard
                  <svg class="flex-shrink-0 mx-3 overflow-visible size-2.5 text-gray-400 dark:text-neutral-500" width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M5 1L10.6869 7.16086C10.8637 7.35239 10.8637 7.64761 10.6869 7.83914L5 14" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
                  </svg>
                </li>
                <li class="text-sm font-semibold text-gray-800 truncate dark:text-neutral-400" aria-current="page">
                  Dashboard
                </li>
              </ol>
              <!-- End Breadcrumb -->
            </div>
          </div>

          <!-- Main Content -->
          <main id="main-content">
            ${this.getDashboardContent()}
          </main>
        </div>
      </div>
    `;

    this.updateActiveNavigation();
  }
}

// Initialize the dashboard when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  new StefansDashboard();
});