let _faker: any = null;

async function getFaker(): Promise<any> {
  if (!_faker) {
    const mod = await import('@faker-js/faker');
    _faker = mod.faker;
  }
  return _faker;
}

export interface UserData {
  username: string;
  password: string;
}

export interface PersonalInfo {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
}

export interface AddressData {
  street: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
}

export interface PaymentData {
  cardHolder: string;
  cardNumber: string;
  expiryMonth: string;
  expiryYear: string;
  cvv: string;
}

export interface CheckoutData {
  personalInfo: PersonalInfo;
  address: AddressData;
  payment: PaymentData;
}

export async function generateUsername(): Promise<string> {
  const faker = await getFaker();
  return faker.internet.username().toLowerCase();
}

export async function generatePassword(length: number = 12): Promise<string> {
  const faker = await getFaker();
  return faker.internet.password({ length, memorable: false });
}

export async function generateUserData(): Promise<UserData> {
  const faker = await getFaker();
  return {
    username: faker.internet.username().toLowerCase(),
    password: faker.internet.password({ length: 12, memorable: false }),
  };
}

export async function generatePersonalInfo(): Promise<PersonalInfo> {
  const faker = await getFaker();
  return {
    firstName: faker.person.firstName(),
    lastName: faker.person.lastName(),
    email: faker.internet.email(),
    phone: faker.phone.number(),
  };
}

export async function generateAddress(): Promise<AddressData> {
  const faker = await getFaker();
  return {
    street: faker.location.streetAddress(),
    city: faker.location.city(),
    state: faker.location.state(),
    zipCode: faker.location.zipCode(),
    country: faker.location.country(),
  };
}

export async function generatePaymentData(): Promise<PaymentData> {
  const faker = await getFaker();
  return {
    cardHolder: faker.person.fullName(),
    cardNumber: faker.finance.creditCardNumber(),
    expiryMonth: String(faker.number.int({ min: 1, max: 12 })).padStart(2, '0'),
    expiryYear: String(faker.date.future({ years: 5 }).getFullYear()),
    cvv: faker.finance.creditCardCVV(),
  };
}

export async function generateCheckoutData(): Promise<CheckoutData> {
  const [personalInfo, address, payment] = await Promise.all([
    generatePersonalInfo(),
    generateAddress(),
    generatePaymentData(),
  ]);
  return { personalInfo, address, payment };
}

export const STATIC_USERS = {
  standard: { username: 'standard_user', password: 'secret_sauce' },
  locked: { username: 'locked_out_user', password: 'secret_sauce' },
  problem: { username: 'problem_user', password: 'secret_sauce' },
  performance: { username: 'performance_glitch_user', password: 'secret_sauce' },
} as const satisfies Record<string, UserData>;
