export type BookingStatus =
  | "PENDING_PAYMENT"
  | "PENDING_OTP"
  | "CONFIRMED"
  | "REJECTED"
  | "CANCELLED";

export interface BoxOfficeEvent {
  eventId: number;
  tenantId: string;
  createdByUserId?: number | null;
  eventName: string;
  eventLogoIcon?: string | null;
  eventBanner?: string | null;
  cityName?: string | null;
  locality?: string | null;
  venue?: string | null;
  eventDateTime?: string | null;
  eventStatus?: string | null;
  eventCategory?: string | null;
  publicEnabled?: boolean | null;
  inviteOnly?: boolean | null;
  paidEvent?: boolean | null;
  accountDetails?: string | null;
  attendeeCapacity?: number | null;
  notifyAttendees?: boolean | null;
  greetingEnabled?: boolean | null;
  basicInvitationEnabled?: boolean | null;
  proInvitationRequested?: boolean | null;
  invitationTemplate?: string | null;
  invitationBannerUrl?: string | null;
  registrationQrCodeUrl?: string | null;
  platformPaymentRequired?: boolean | null;
  platformPaymentReason?: string | null;
  description?: string | null;
  eventTags?: string[] | null;
  eventBlog?: string | null;
  companyId?: number | null;
}

export interface Ticket {
  ticketId: number;
  tenantId?: string | null;
  ticketPrefix?: string | null;
  ticketName: string;
  ticketPrice?: number | null;
  isTicketFree?: boolean | null;
  ticketQuantity?: number | null;
  bookedQuantity?: number | null;
  availableQuantity?: number | null;
  isActive?: boolean | null;
  eventId?: number | null;
}

export interface BookingRequest {
  ticketId: number;
  fullName: string;
  email: string;
  mobile: string;
  paymentProofUrl?: string;
}

export interface BookedTicket {
  ticketCode: string;
  tenantId: string;
  fullName: string;
  email: string;
  mobile: string;
  isAvailed?: boolean | null;
  expireDateTime?: string | null;
  bookingStatus: BookingStatus;
  paymentProofUrl?: string | null;
  paymentVerified?: boolean | null;
  cancelReason?: string | null;
  eventId?: number | null;
  ticketId?: number | null;
  ticket?: Ticket | null;
  createdAt?: string | null;
}

export interface VerifyBookingOtpRequest {
  ticketCode: string;
  otp: string;
}

export interface ReviewPaymentRequest {
  ticketCode: string;
  approved: boolean;
  rejectionReason?: string;
}

export interface JwtAuthResponse {
  accessToken: string;
  tokenType?: string;
  role?: string;
  userId?: string;
  tenantId?: string;
  permissions?: string[];
}

export interface LoginRequest {
  emailOrMobile: string;
  password: string;
}

export interface RegisterRequest {
  fullName: string;
  mobile: string;
  email: string;
  password: string;
  tenantId: string;
}

export interface VerifyEmailOtpRequest {
  otp: string;
}

export interface CompanyDetail {
  companyId?: number;
  name?: string;
  logoUrl?: string;
  coverUrl?: string;
  address?: string;
  whatsapp?: string;
  email?: string;
  facebook?: string;
  instagram?: string;
  linkedin?: string;
  twitter?: string;
  youtube?: string;
  userId?: number;
}

export interface UserProfileUpdate {
  email?: string;
  fullName?: string;
  organisationName?: string;
  domainName?: string;
  iconUrl?: string;
}

export interface ChangePasswordRequest {
  userNameOrEmail: string;
  oldPassword: string;
  newPassword: string;
}

export interface AddUserRequest {
  email: string;
  password: string;
}

export interface PricingConfig {
  id?: number;
  paidEventRequiresPayment?: boolean;
  freeAttendeeLimit?: number;
  proInvitationEnabled?: boolean;
  proInvitationPrice?: number;
}

export interface CronUpdateRequest {
  taskName: string;
  cronExp: string;
}

export interface ContactUs {
  id?: number;
  fullName: string;
  email: string;
  phone?: string;
  serviceRequired?: string;
  message?: string;
}

export interface ColumnValue {
  id?: number;
  value: string;
  columnId: number;
}

export interface ColumnMaster {
  id?: number;
  columnId?: number;
  columnName?: string;
  name?: string;
  values?: ColumnValue[];
}

export interface Asset {
  assetId?: number;
  userId: number;
  name: string;
  assetUrl: string;
  createdAt?: string;
}
