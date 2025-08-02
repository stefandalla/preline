/*
 * HSAccordion
 * @version: 3.0.1
 * @author: Preline Labs Ltd.
 * @license: Licensed under MIT and Preline UI Fair Use License (https://preline.co/docs/license.html)
 * Copyright 2024 Preline Labs Ltd.
 */

import { dispatch } from '../../utils';

import {
	IAccordionOptions,
	IAccordion,
	IAccordionTreeViewStaticOptions,
} from './interfaces';

import HSBasePlugin from '../base-plugin';
import { ICollectionItem } from '../../interfaces';

class HSAccordion extends HSBasePlugin<IAccordionOptions> implements IAccordion {
	private readonly toggle: HTMLElement | null;
	public content: HTMLElement | null;
	private animationInProcess: boolean;

	constructor(el: HTMLElement, options?: IAccordionOptions, events?: {}) {
		super(el, options, events);

		const data = el.getAttribute('data-hs-accordion');
		const dataOptions: IAccordionOptions = data ? JSON.parse(data) : {};
		const concatOptions = {
			...dataOptions,
			...options,
		};

		this.toggle =
			this.el.querySelector(':scope > .hs-accordion-toggle') ||
			this.el.querySelector(':scope > .hs-accordion-active');
		this.content = this.el.querySelector(':scope > .hs-accordion-content');
		this.animationInProcess = false;

		if (this.toggle && this.content) this.init();
	}

	private init() {
		this.createCollection(window.$hsAccordionCollection, this);

		this.toggle.addEventListener('click', (evt) => {
			evt.stopPropagation();
			this.toggleClick(evt);
		});
	}

	public toggleClick(evt: Event) {
		if (this.el.classList.contains('active')) {
			this.hide();
		} else {
			this.show();
		}
	}

	private hideAll() {
		const parent = this.el.closest('.hs-accordion-group');
		const items = parent
			? parent.querySelectorAll('.hs-accordion')
			: document.querySelectorAll('.hs-accordion');

		items.forEach((el: HTMLElement) => {
			const instance = window.$hsAccordionCollection.find(
				(accordion) => accordion.element.el === el,
			);

			if (instance && instance.element.el.classList.contains('active')) {
				instance.element.hide();
			}
		});
	}

	public update() {
		// Re-evaluate properties based on current DOM state
		const data = this.el.getAttribute('data-hs-accordion');
		const dataOptions: IAccordionOptions = data ? JSON.parse(data) : {};
		
		// Update options if they've changed
		this.options = { ...this.options, ...dataOptions };
		
		// Update collection if necessary
		const existingIndex = window.$hsAccordionCollection.findIndex(
			(item) => item.element.el === this.el
		);
		if (existingIndex !== -1) {
			window.$hsAccordionCollection[existingIndex].element = this;
		}
	}

	public destroy() {
		// Remove event listeners
		if (this.toggle) {
			this.toggle.removeEventListener('click', this.toggleClick);
		}
		
		// Remove from collection
		window.$hsAccordionCollection = window.$hsAccordionCollection.filter(
			(item) => item.element.el !== this.el
		);
		
		// Clean up properties
		this.content = null;
	}

	// Public methods
	public show() {
		if (
			this.animationInProcess ||
			this.el.classList.contains('active')
		)
			return false;

		this.animationInProcess = true;

		this.el.classList.add('active');
		this.content.style.display = 'block';
		this.content.style.height = '0';

		setTimeout(() => {
			this.content.style.height = `${this.content.scrollHeight}px`;
		});

		this.afterTransition(this.content, () => {
			this.content.style.display = 'block';
			this.content.style.height = '';

			this.fireEvent('open', this.el);
			dispatch('open.hs.accordion', this.el, this.el);

			this.animationInProcess = false;
		});

		this.hideAll();
	}

	public hide() {
		if (
			this.animationInProcess ||
			!this.el.classList.contains('active')
		)
			return false;

		this.animationInProcess = true;

		this.el.classList.remove('active');
		this.content.style.height = `${this.content.scrollHeight}px`;

		setTimeout(() => {
			this.content.style.height = '0';
		});

		this.afterTransition(this.content, () => {
			this.content.style.display = 'none';
			this.content.style.height = '';

			this.fireEvent('close', this.el);
			dispatch('close.hs.accordion', this.el, this.el);

			this.animationInProcess = false;
		});
	}

	// Static methods
	static getInstance(target: HTMLElement | string, isInstance?: boolean) {
		const elInCollection = window.$hsAccordionCollection.find(
			(el) =>
				el.element.el ===
				(typeof target === 'string' ? document.querySelector(target) : target),
		);

		return elInCollection
			? isInstance
				? elInCollection
				: elInCollection.element.el
			: null;
	}

	static autoInit() {
		if (!window.$hsAccordionCollection) window.$hsAccordionCollection = [];

		if (window.$hsAccordionCollection)
			window.$hsAccordionCollection = window.$hsAccordionCollection.filter(
				({ element }) => document.contains(element.el),
			);

		document
			.querySelectorAll('.hs-accordion:not(.--prevent-on-load-init)')
			.forEach((el: HTMLElement) => {
				if (
					!window.$hsAccordionCollection.find(
						(elC) => (elC?.element?.el as HTMLElement) === el,
					)
				)
					new HSAccordion(el);
			});
	}

	static show(target: HTMLElement) {
		const elInCollection = window.$hsAccordionCollection.find(
			(el) => el.element.el === target,
		);

		if (elInCollection && elInCollection.element.content.style.display !== 'block')
			elInCollection.element.show();
	}

	static hide(target: HTMLElement) {
		const elInCollection = window.$hsAccordionCollection.find(
			(el) => el.element.el === target,
		);

		if (elInCollection && elInCollection.element.content.style.display === 'block')
			elInCollection.element.hide();
	}

	// Backward compatibility
	static on(evt: string, target: HTMLElement, cb: Function) {
		const elInCollection = window.$hsAccordionCollection.find(
			(el) => el.element.el === target,
		);

		if (elInCollection) elInCollection.element.events[evt] = cb;
	}

	static treeView(options?: IAccordionTreeViewStaticOptions) {
		const items = document.querySelectorAll('.hs-accordion-treeview-root');

		if (!items.length) return false;

		items.forEach((el) => {
			const data = el.getAttribute('data-hs-accordion-options');
			const dataOptions: IAccordionTreeViewStaticOptions = data
				? JSON.parse(data)
				: {};
			const concatOptions = { ...dataOptions, ...options };

			el.querySelectorAll('.hs-accordion').forEach((accordion) => {
				new HSAccordion(
					accordion as HTMLElement,
					concatOptions?.accordion,
				);
			});
		});
	}
}

declare global {
	interface Window {
		HSAccordion: typeof HSAccordion;
		$hsAccordionCollection: ICollectionItem<HSAccordion>[];
	}
}

window.addEventListener('load', () => {
	HSAccordion.autoInit();

	// Uncomment for debug
	// console.log('Accordion collection:', window.$hsAccordionCollection);
});

if (typeof window !== 'undefined') {
	window.HSAccordion = HSAccordion;
}

export default HSAccordion;