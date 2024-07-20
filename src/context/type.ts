export interface IProfileData {
  id: number;
  name: string;
  email: string;
  emailVerifiedAt: string;
  countryCode: string | null;
  number: string | null;
  numberVerifiedAt: string | null;
  profileImageUri: string | null;
}
