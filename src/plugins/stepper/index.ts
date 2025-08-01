/*
 * HSStepper
 * @version: 3.0.1
 * @author: Preline Labs Ltd.
 * @license: Licensed under MIT and Preline UI Fair Use License (https://preline.co/docs/license.html)
 * Copyright 2024 Preline Labs Ltd.
 */

import { dispatch } from '../../utils';

import { IStepperOptions, IStepper, IStepperItem } from '../stepper/interfaces';

import HSBasePlugin from '../base-plugin';
import { ICollectionItem } from '../../interfaces';

class HSStepper extends HSBasePlugin<{}> implements IStepper {
	private currentIndex: number | null;
	private readonly mode: string | null;
	private isCompleted: boolean | null;

	private totalSteps: number | null;

	private navItems: IStepperItem[] | null;
	private contentItems: IStepperItem[] | null;
	private backBtn: HTMLElement | null;
	private nextBtn: HTMLElement | null;
	private skipBtn: HTMLElement | null;
	private completeStepBtn: HTMLElement | null;
	private completeStepBtnDefaultText: string | null;
	private finishBtn: HTMLElement | null;
	private resetBtn: HTMLElement | null;

	private onNavItemClickListener:
		| {
				el: HTMLElement;
				fn: () => void;
		  }[]
		| null;
	private onBackClickListener: () => void;
	private onNextClickListener: () => void;
	private onSkipClickListener: () => void;
	private onCompleteStepBtnClickListener: () => void;
	private onFinishBtnClickListener: () => void;
	private onResetBtnClickListener: () => void;

	constructor(el: HTMLElement, options?: IStepperOptions) {
		super(el, options);

		const data = el.getAttribute('data-hs-stepper');
		const dataOptions: IStepperOptions = data ? JSON.parse(data) : {};
		const concatOptions = {
			...dataOptions,
			...options,
		};

		this.currentIndex = concatOptions?.currentIndex || 1;
		this.mode = concatOptions?.mode || 'linear';
		this.isCompleted =
			typeof concatOptions?.isCompleted !== 'undefined'
				? concatOptions?.isCompleted
				: false;

		this.totalSteps = 1;

		this.navItems = [];
		this.contentItems = [];

		this.onNavItemClickListener = [];

		this.init();
	}

	private navItemClick(item: IStepperItem) {
		this.handleNavItemClick(item);
	}

	private backClick() {
		this.handleBackButtonClick();

		if (this.mode === 'linear') {
			const currentNavItem = this.navItems.find(
				({ index }) => index === this.currentIndex,
			);
			const currentContentItem = this.contentItems.find(
				({ index }) => index === this.currentIndex,
			);

			if (!currentNavItem || !currentContentItem) return;

			if (currentNavItem.isCompleted) {
				currentNavItem.isCompleted = false;
				currentNavItem.isSkip = false;

				currentNavItem.el.classList.remove('success', 'skipped');
			}

			if (currentContentItem.isCompleted) {
				currentContentItem.isCompleted = false;
				currentContentItem.isSkip = false;

				currentContentItem.el.classList.remove('success', 'skipped');
			}

			if (this.mode === 'linear' && this.currentIndex !== this.totalSteps) {
				if (this.nextBtn) this.nextBtn.style.display = '';
				if (this.completeStepBtn) this.completeStepBtn.style.display = '';
			}

			this.showSkipButton();
			this.showFinishButton();
			this.showCompleteStepButton();
		}
	}

	private nextClick() {
		this.fireEvent('beforeNext', this.currentIndex);
		dispatch('beforeNext.hs.stepper', this.el, this.currentIndex);

		if (this.getNavItem(this.currentIndex)?.isProcessed) {
			this.disableAll();

			return false;
		}

		this.goToNext();
	}

	private skipClick() {
		this.handleSkipButtonClick();

		if (this.mode === 'linear' && this.currentIndex === this.totalSteps) {
			if (this.nextBtn) this.nextBtn.style.display = 'none';
			if (this.completeStepBtn) this.completeStepBtn.style.display = 'none';
			if (this.finishBtn) this.finishBtn.style.display = '';
		}
	}

	private completeStepBtnClick() {
		this.handleCompleteStepButtonClick();
	}

	private finishBtnClick() {
		this.handleFinishButtonClick();
	}

	private resetBtnClick() {
		this.handleResetButtonClick();
	}

	private init() {
		this.createCollection(window.$hsStepperCollection, this);

		this.buildNav();
		this.buildContent();
		this.buildButtons();
		this.setTotalSteps();
	}

	private getUncompletedSteps(inIncludedSkipped: boolean = false) {
		return this.navItems.filter(({ isCompleted, isSkip }) =>
			inIncludedSkipped ? !isCompleted || isSkip : !isCompleted && !isSkip,
		);
	}

	private setTotalSteps() {
		this.navItems.forEach((item) => {
			const { index } = item;

			if (index > this.totalSteps) this.totalSteps = index;
		});
	}

	// Nav
	private buildNav() {
		this.el
			.querySelectorAll('[data-hs-stepper-nav-item]')
			.forEach((el) => this.addNavItem(el as HTMLElement));

		this.navItems.forEach((item) => this.buildNavItem(item));
	}

	private buildNavItem(item: IStepperItem) {
		const { index, isDisabled, el } = item;

		if (index === this.currentIndex) this.setCurrentNavItem();

		if (this.mode !== 'linear' || isDisabled) {
			this.onNavItemClickListener.push({
				el,
				fn: () => this.navItemClick(item),
			});

			el.addEventListener(
				'click',
				this.onNavItemClickListener.find((navItem) => navItem.el === el).fn,
			);
		}
	}

	private addNavItem(el: HTMLElement) {
		const {
			index,
			isFinal = false,
			isCompleted = false,
			isSkip = false,
			isOptional = false,
			isDisabled = false,
			isProcessed = false,
			hasError = false,
		} = JSON.parse(el.getAttribute('data-hs-stepper-nav-item'));

		if (isCompleted) el.classList.add('success');
		if (isSkip) el.classList.add('skipped');
		if (isDisabled) {
			if (el.tagName === 'BUTTON' || el.tagName === 'INPUT')
				el.setAttribute('disabled', 'disabled');

			el.classList.add('disabled');
		}
		if (hasError) el.classList.add('error');

		this.navItems.push({
			index,
			isFinal,
			isCompleted,
			isSkip,
			isOptional,
			isDisabled,
			isProcessed,
			hasError,
			el: el as HTMLElement,
		});
	}

	private setCurrentNavItem() {
		this.navItems.forEach((item) => {
			const { index, el } = item;

			if (index === this.currentIndex) this.setCurrentNavItemActions(el);
			else this.unsetCurrentNavItemActions(el);
		});
	}

	private setCurrentNavItemActions(el: HTMLElement) {
		el.classList.add('active');

		this.fireEvent('active', this.currentIndex);
		dispatch('active.hs.stepper', this.el, this.currentIndex);
	}

	private getNavItem(n = this.currentIndex) {
		return this.navItems.find(({ index }) => index === n);
	}

	private setProcessedNavItemActions(item: IStepperItem) {
		item.isProcessed = true;

		item.el.classList.add('processed');
	}

	private setErrorNavItemActions(item: IStepperItem) {
		item.hasError = true;

		item.el.classList.add('error');
	}

	private unsetCurrentNavItemActions(el: HTMLElement) {
		el.classList.remove('active');
	}

	private handleNavItemClick(item: IStepperItem) {
		const { index } = item;

		this.currentIndex = index;

		this.setCurrentNavItem();
		this.setCurrentContentItem();

		this.checkForTheFirstStep();
	}

	// Content
	private buildContent() {
		this.el
			.querySelectorAll('[data-hs-stepper-content-item]')
			.forEach((el) => this.addContentItem(el as HTMLElement));

		this.navItems.forEach((item) => this.buildContentItem(item));
	}

	private buildContentItem(item: IStepperItem) {
		const { index } = item;

		if (index === this.currentIndex) this.setCurrentContentItem();
	}

	private addContentItem(el: HTMLElement) {
		const {
			index,
			isFinal = false,
			isCompleted = false,
			isSkip = false,
		} = JSON.parse(el.getAttribute('data-hs-stepper-content-item'));

		if (isCompleted) el.classList.add('success');
		if (isSkip) el.classList.add('skipped');

		this.contentItems.push({
			index,
			isFinal,
			isCompleted,
			isSkip,
			el: el as HTMLElement,
		});
	}

	private setCurrentContentItem() {
		if (this.isCompleted) {
			const finalContentItem = this.contentItems.find(({ isFinal }) => isFinal);
			const otherContentItems = this.contentItems.filter(
				({ isFinal }) => !isFinal,
			);
			finalContentItem.el.style.display = '';
			otherContentItems.forEach(({ el }) => (el.style.display = 'none'));

			return false;
		}

		this.contentItems.forEach((item) => {
			const { index, el } = item;

			if (index === this.currentIndex) this.setCurrentContentItemActions(el);
			else this.unsetCurrentContentItemActions(el);
		});
	}

	private hideAllContentItems() {
		this.contentItems.forEach(({ el }) => (el.style.display = 'none'));
	}

	private setCurrentContentItemActions(el: HTMLElement) {
		el.style.display = '';
	}

	private unsetCurrentContentItemActions(el: HTMLElement) {
		el.style.display = 'none';
	}

	private disableAll() {
		const currentNavItem = this.getNavItem(this.currentIndex);
		currentNavItem.hasError = false;
		currentNavItem.isCompleted = false;
		currentNavItem.isDisabled = false;
		currentNavItem.el.classList.remove('error', 'success');

		this.disableButtons();
	}

	private disableNavItemActions(item: IStepperItem) {
		item.isDisabled = true;
		item.el.classList.add('disabled');
	}

	private enableNavItemActions(item: IStepperItem) {
		item.isDisabled = false;
		item.el.classList.remove('disabled');
	}

	// Buttons
	private buildButtons() {
		this.backBtn = this.el.querySelector('[data-hs-stepper-back-btn]');
		this.nextBtn = this.el.querySelector('[data-hs-stepper-next-btn]');
		this.skipBtn = this.el.querySelector('[data-hs-stepper-skip-btn]');
		this.completeStepBtn = this.el.querySelector(
			'[data-hs-stepper-complete-step-btn]',
		);
		this.finishBtn = this.el.querySelector('[data-hs-stepper-finish-btn]');
		this.resetBtn = this.el.querySelector('[data-hs-stepper-reset-btn]');

		this.buildBackButton();
		this.buildNextButton();
		this.buildSkipButton();
		this.buildCompleteStepButton();
		this.buildFinishButton();
		this.buildResetButton();
	}

	// back
	private buildBackButton() {
		if (!this.backBtn) return;

		this.checkForTheFirstStep();

		this.onBackClickListener = () => this.backClick();

		this.backBtn.addEventListener('click', this.onBackClickListener);
	}

	private handleBackButtonClick() {
		if (this.currentIndex === 1) return;

		if (this.mode === 'linear') {
			this.removeOptionalClasses();
		}

		this.currentIndex--;

		if (this.mode === 'linear') {
			this.removeOptionalClasses();
		}

		this.setCurrentNavItem();
		this.setCurrentContentItem();

		this.checkForTheFirstStep();
		if (this.completeStepBtn)
			this.changeTextAndDisableCompleteButtonIfStepCompleted();

		this.fireEvent('back', this.currentIndex);
		dispatch('back.hs.stepper', this.el, this.currentIndex);
	}

	private checkForTheFirstStep() {
		if (this.currentIndex === 1) {
			this.setToDisabled(this.backBtn);
		} else {
			this.setToNonDisabled(this.backBtn);
		}
	}

	private setToDisabled(el: HTMLElement) {
		if (el.tagName === 'BUTTON' || el.tagName === 'INPUT')
			el.setAttribute('disabled', 'disabled');

		el.classList.add('disabled');
	}

	private setToNonDisabled(el: HTMLElement) {
		if (el.tagName === 'BUTTON' || el.tagName === 'INPUT')
			el.removeAttribute('disabled');

		el.classList.remove('disabled');
	}

	// next
	private buildNextButton() {
		if (!this.nextBtn) return;

		this.onNextClickListener = () => this.nextClick();

		this.nextBtn.addEventListener('click', this.onNextClickListener);
	}

	private unsetProcessedNavItemActions(item: IStepperItem) {
		item.isProcessed = false;

		item.el.classList.remove('processed');
	}

	private handleNextButtonClick(infinite = true) {
		if (infinite) {
			if (this.currentIndex === this.totalSteps) this.currentIndex = 1;
			else this.currentIndex++;
		} else {
			const nonCompletedSteps = this.getUncompletedSteps();

			if (nonCompletedSteps.length === 1) {
				const { index } = nonCompletedSteps[0];

				this.currentIndex = index;
			} else {
				if (this.currentIndex === this.totalSteps) return;

				this.currentIndex++;
			}
		}

		if (this.mode === 'linear') {
			this.removeOptionalClasses();
		}

		this.setCurrentNavItem();
		this.setCurrentContentItem();

		this.checkForTheFirstStep();
		if (this.completeStepBtn)
			this.changeTextAndDisableCompleteButtonIfStepCompleted();

		this.showSkipButton();
		this.showFinishButton();
		this.showCompleteStepButton();

		this.fireEvent('next', this.currentIndex);
		dispatch('next.hs.stepper', this.el, this.currentIndex);
	}

	private removeOptionalClasses() {
		const currentNavItem = this.navItems.find(
			({ index }) => index === this.currentIndex,
		);
		const currentContentItem = this.contentItems.find(
			({ index }) => index === this.currentIndex,
		);

		currentNavItem.isSkip = false;
		currentNavItem.hasError = false;
		currentNavItem.isDisabled = false;
		currentContentItem.isSkip = false;

		currentNavItem.el.classList.remove('skipped', 'success', 'error');
		currentContentItem.el.classList.remove('skipped', 'success', 'error');
	}

	// skip
	private buildSkipButton() {
		if (!this.skipBtn) return;

		this.showSkipButton();

		this.onSkipClickListener = () => this.skipClick();

		this.skipBtn.addEventListener('click', this.onSkipClickListener);
	}

	private setSkipItem(n?: number) {
		const targetNavItem = this.navItems.find(
			({ index }) => index === (n || this.currentIndex),
		);
		const targetContentItem = this.contentItems.find(
			({ index }) => index === (n || this.currentIndex),
		);

		if (!targetNavItem || !targetContentItem) return;

		this.setSkipItemActions(targetNavItem);
		this.setSkipItemActions(targetContentItem);
	}

	private setSkipItemActions(item: IStepperItem) {
		item.isSkip = true;

		item.el.classList.add('skipped');
	}

	private showSkipButton() {
		if (!this.skipBtn) return;

		const { isOptional } = this.navItems.find(
			({ index }) => index === this.currentIndex,
		);

		if (isOptional) this.skipBtn.style.display = '';
		else this.skipBtn.style.display = 'none';
	}

	private handleSkipButtonClick() {
		this.setSkipItem();
		this.handleNextButtonClick();

		this.fireEvent('skip', this.currentIndex);
		dispatch('skip.hs.stepper', this.el, this.currentIndex);
	}

	// complete
	private buildCompleteStepButton() {
		if (!this.completeStepBtn) return;

		this.completeStepBtnDefaultText = this.completeStepBtn.innerText;

		this.onCompleteStepBtnClickListener = () => this.completeStepBtnClick();

		this.completeStepBtn.addEventListener(
			'click',
			this.onCompleteStepBtnClickListener,
		);
	}

	private changeTextAndDisableCompleteButtonIfStepCompleted() {
		const currentNavItem = this.navItems.find(
			({ index }) => index === this.currentIndex,
		);
		const { completedText } = JSON.parse(
			this.completeStepBtn.getAttribute('data-hs-stepper-complete-step-btn'),
		);

		if (!currentNavItem) return;

		if (currentNavItem.isCompleted) {
			this.completeStepBtn.innerText =
				completedText || this.completeStepBtnDefaultText;
			this.completeStepBtn.setAttribute('disabled', 'disabled');
			this.completeStepBtn.classList.add('disabled');
		} else {
			this.completeStepBtn.innerText = this.completeStepBtnDefaultText;
			this.completeStepBtn.removeAttribute('disabled');
			this.completeStepBtn.classList.remove('disabled');
		}
	}

	private setCompleteItem(n?: number) {
		const targetNavItem = this.navItems.find(
			({ index }) => index === (n || this.currentIndex),
		);
		const targetContentItem = this.contentItems.find(
			({ index }) => index === (n || this.currentIndex),
		);

		if (!targetNavItem || !targetContentItem) return;

		this.setCompleteItemActions(targetNavItem);
		this.setCompleteItemActions(targetContentItem);
	}

	private setCompleteItemActions(item: IStepperItem) {
		item.isCompleted = true;

		item.el.classList.add('success');
	}

	private showCompleteStepButton() {
		if (!this.completeStepBtn) return;

		const nonCompletedSteps = this.getUncompletedSteps();

		if (nonCompletedSteps.length === 1)
			this.completeStepBtn.style.display = 'none';
		else this.completeStepBtn.style.display = '';
	}

	private handleCompleteStepButtonClick() {
		this.setCompleteItem();

		this.fireEvent('complete', this.currentIndex);
		dispatch('complete.hs.stepper', this.el, this.currentIndex);

		this.handleNextButtonClick(false);
		this.showFinishButton();
		this.showCompleteStepButton();
		this.checkForTheFirstStep();
		if (this.completeStepBtn)
			this.changeTextAndDisableCompleteButtonIfStepCompleted();
		this.showSkipButton();
	}

	// finish
	private buildFinishButton() {
		if (!this.finishBtn) return;

		if (this.isCompleted) {
			this.setCompleted();
		}

		this.onFinishBtnClickListener = () => this.finishBtnClick();

		this.finishBtn.addEventListener('click', this.onFinishBtnClickListener);
	}

	private setCompleted() {
		this.el.classList.add('completed');
	}

	private unsetCompleted() {
		this.el.classList.remove('completed');
	}

	private showFinishButton() {
		if (!this.finishBtn) return;

		const nonCompletedSteps = this.getUncompletedSteps();

		if (nonCompletedSteps.length === 1) this.finishBtn.style.display = '';
		else this.finishBtn.style.display = 'none';
	}

	private handleFinishButtonClick() {
		const uncompletedSteps = this.getUncompletedSteps();
		const uncompletedOrSkipSteps = this.getUncompletedSteps(true);
		const { el } = this.contentItems.find(({ isFinal }) => isFinal);

		if (uncompletedSteps.length)
			uncompletedSteps.forEach(({ index }) => this.setCompleteItem(index));

		this.currentIndex = this.totalSteps;

		this.setCurrentNavItem();
		this.hideAllContentItems();

		const currentNavItem = this.navItems.find(
			({ index }) => index === this.currentIndex,
		);
		const currentNavItemEl = currentNavItem ? currentNavItem.el : null;

		currentNavItemEl.classList.remove('active');

		el.style.display = 'block';
		if (this.backBtn) this.backBtn.style.display = 'none';
		if (this.nextBtn) this.nextBtn.style.display = 'none';
		if (this.skipBtn) this.skipBtn.style.display = 'none';
		if (this.completeStepBtn) this.completeStepBtn.style.display = 'none';
		if (this.finishBtn) this.finishBtn.style.display = 'none';
		if (this.resetBtn) this.resetBtn.style.display = '';

		if (uncompletedOrSkipSteps.length <= 1) {
			this.isCompleted = true;
			this.setCompleted();
		}

		this.fireEvent('finish', this.currentIndex);
		dispatch('finish.hs.stepper', this.el, this.currentIndex);
	}

	// reset
	private buildResetButton() {
		if (!this.resetBtn) return;

		this.onResetBtnClickListener = () => this.resetBtnClick();

		this.resetBtn.addEventListener('click', this.onResetBtnClickListener);
	}

	private handleResetButtonClick() {
		if (this.backBtn) this.backBtn.style.display = '';
		if (this.nextBtn) this.nextBtn.style.display = '';
		if (this.completeStepBtn) {
			this.completeStepBtn.style.display = '';
			this.completeStepBtn.innerText = this.completeStepBtnDefaultText;
			this.completeStepBtn.removeAttribute('disabled');
			this.completeStepBtn.classList.remove('disabled');
		}
		if (this.resetBtn) this.resetBtn.style.display = 'none';

		this.navItems.forEach((item) => {
			const { el } = item;
			item.isSkip = false;
			item.isCompleted = false;

			this.unsetCurrentNavItemActions(el);
			el.classList.remove('success', 'skipped');
		});

		this.contentItems.forEach((item) => {
			const { el } = item;
			item.isSkip = false;
			item.isCompleted = false;

			this.unsetCurrentContentItemActions(el);
			el.classList.remove('success', 'skipped');
		});

		this.currentIndex = 1;

		this.unsetCompleted();
		this.isCompleted = false;

		this.showSkipButton();
		this.setCurrentNavItem();
		this.setCurrentContentItem();
		this.showFinishButton();
		this.showCompleteStepButton();
		this.checkForTheFirstStep();

		this.fireEvent('reset', this.currentIndex);
		dispatch('reset.hs.stepper', this.el, this.currentIndex);
	}

	// Public methods
	public setProcessedNavItem(n?: number) {
		const targetNavItem = this.getNavItem(n);

		if (!targetNavItem) return;

		this.setProcessedNavItemActions(targetNavItem);
	}

	public unsetProcessedNavItem(n?: number) {
		const targetNavItem = this.getNavItem(n);

		if (!targetNavItem) return;

		this.unsetProcessedNavItemActions(targetNavItem);
	}

	public goToNext() {
		if (this.mode === 'linear') this.setCompleteItem();

		this.handleNextButtonClick(this.mode !== 'linear');

		if (this.mode === 'linear' && this.currentIndex === this.totalSteps) {
			if (this.nextBtn) this.nextBtn.style.display = 'none';
			if (this.completeStepBtn) this.completeStepBtn.style.display = 'none';
		}
	}

	public disableButtons() {
		if (this.backBtn) this.setToDisabled(this.backBtn);
		if (this.nextBtn) this.setToDisabled(this.nextBtn);
	}

	public enableButtons() {
		if (this.backBtn) this.setToNonDisabled(this.backBtn);
		if (this.nextBtn) this.setToNonDisabled(this.nextBtn);
	}

	public setErrorNavItem(n?: number) {
		const targetNavItem = this.getNavItem(n);

		if (!targetNavItem) return;

		this.setErrorNavItemActions(targetNavItem);
	}

	public destroy() {
		// Remove classes
		this.el.classList.remove('completed');
		this.el.querySelectorAll('[data-hs-stepper-nav-item]').forEach((el) => {
			el.classList.remove('active', 'success', 'skipped', 'disabled', 'error');

			if (el.tagName === 'BUTTON' || el.tagName === 'INPUT')
				el.removeAttribute('disabled');
		});
		this.el.querySelectorAll('[data-hs-stepper-content-item]').forEach((el) => {
			el.classList.remove('success', 'skipped');
		});
		if (this.backBtn) this.backBtn.classList.remove('disabled');
		if (this.nextBtn) this.nextBtn.classList.remove('disabled');
		if (this.completeStepBtn) this.completeStepBtn.classList.remove('disabled');

		// Remove attributes
		if (this.backBtn) this.backBtn.style.display = '';
		if (this.nextBtn) this.nextBtn.style.display = '';
		if (this.skipBtn) this.skipBtn.style.display = '';
		if (this.finishBtn) this.finishBtn.style.display = 'none';
		if (this.resetBtn) this.resetBtn.style.display = 'none';

		// Remove listeners
		if (this.onNavItemClickListener.length)
			this.onNavItemClickListener.forEach(({ el, fn }) => {
				el.removeEventListener('click', fn);
			});
		if (this.backBtn)
			this.backBtn.removeEventListener('click', this.onBackClickListener);
		if (this.nextBtn)
			this.nextBtn.removeEventListener('click', this.onNextClickListener);
		if (this.skipBtn)
			this.skipBtn.removeEventListener('click', this.onSkipClickListener);
		if (this.completeStepBtn)
			this.completeStepBtn.removeEventListener(
				'click',
				this.onCompleteStepBtnClickListener,
			);
		if (this.finishBtn)
			this.finishBtn.removeEventListener(
				'click',
				this.onFinishBtnClickListener,
			);
		if (this.resetBtn)
			this.resetBtn.removeEventListener('click', this.onResetBtnClickListener);

		window.$hsStepperCollection = window.$hsStepperCollection.filter(
			({ element }) => element.el !== this.el,
		);
	}

	// Static methods
	static getInstance(target: HTMLElement | string, isInstance?: boolean) {
		const elInCollection = window.$hsStepperCollection.find(
			(el) =>
				el.element.el ===
				(typeof target === 'string' ? document.querySelector(target) : target),
		);

		return elInCollection
			? isInstance
				? elInCollection
				: elInCollection.element
			: null;
	}

	static autoInit() {
		if (!window.$hsStepperCollection) window.$hsStepperCollection = [];

		if (window.$hsStepperCollection)
			window.$hsStepperCollection = window.$hsStepperCollection.filter(
				({ element }) => document.contains(element.el),
			);

		document
			.querySelectorAll('[data-hs-stepper]:not(.--prevent-on-load-init)')
			.forEach((el: HTMLElement) => {
				if (
					!window.$hsStepperCollection.find(
						(elC) => (elC?.element?.el as HTMLElement) === el,
					)
				)
					new HSStepper(el);
			});
	}
}

declare global {
	interface Window {
		HSStepper: typeof HSStepper;
		$hsStepperCollection: ICollectionItem<HSStepper>[];
	}
}

window.addEventListener('load', () => {
	HSStepper.autoInit();

	// Uncomment for debug
	// console.log('Stepper collection:', window.$hsStepperCollection);
});

export default HSStepper;
