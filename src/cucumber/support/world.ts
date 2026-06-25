import { IWorldOptions, setWorldConstructor, World } from '@cucumber/cucumber';
import type { Page } from '@playwright/test';

export interface ICustomWorld {
  page: Page;
}

export class CustomWorld extends World implements ICustomWorld {
  page!: Page;

  constructor(options: IWorldOptions) {
    super(options);
  }
}

setWorldConstructor(CustomWorld);
