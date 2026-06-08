import { apiClient, ApiResponse } from "./apiClient";
import {
  AddUserRequest,
  Asset,
  BookedTicket,
  BookingRequest,
  BoxOfficeEvent,
  ChangePasswordRequest,
  ColumnMaster,
  ColumnValue,
  CompanyDetail,
  ContactUs,
  CronUpdateRequest,
  JwtAuthResponse,
  LoginRequest,
  PricingConfig,
  RegisterRequest,
  ReviewPaymentRequest,
  Ticket,
  UserProfileUpdate,
  VerifyBookingOtpRequest,
  VerifyEmailOtpRequest,
} from "@/utils/types/boxOffice";

const withTenant = (tenantId?: string): HeadersInit =>
  tenantId ? { "X-Tenant-Id": tenantId } : {};

const queryString = (params: Record<string, string | number | undefined>) => {
  const search = new URLSearchParams();
  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== "") {
      search.set(key, String(value));
    }
  });
  const value = search.toString();
  return value ? `?${value}` : "";
};

export const getPublicEvents = (filters: {
  cityName?: string;
  locality?: string;
} = {}) =>
  apiClient<BoxOfficeEvent[]>(
    `/api/v1/events/public/search${queryString(filters)}`,
    { cache: "no-store" }
  );

export const getAllEvents = () =>
  apiClient<BoxOfficeEvent[]>("/api/v1/events", { cache: "no-store" });

export const getTenantEvents = (tenantId: string) =>
  apiClient<BoxOfficeEvent[]>("/api/v1/events/tenant", {
    cache: "no-store",
    headers: withTenant(tenantId),
  });

export const getEventById = (eventId: number) =>
  apiClient<BoxOfficeEvent>(`/api/v1/events/${eventId}`, { cache: "no-store" });

export const addEvent = (tenantId: string, payload: Partial<BoxOfficeEvent>) =>
  apiClient<string>("/api/v1/events", {
    method: "POST",
    headers: withTenant(tenantId),
    body: JSON.stringify(payload),
  });

export const updateEvent = (
  tenantId: string,
  eventId: number,
  payload: Partial<BoxOfficeEvent>
) =>
  apiClient<string>(`/api/v1/events/${eventId}`, {
    method: "PUT",
    headers: withTenant(tenantId),
    body: JSON.stringify(payload),
  });

export const deleteEvent = (eventId: number) =>
  apiClient<string>(`/api/v1/events/${eventId}`, { method: "DELETE" });

export const getEventBySlugOrId = async (
  eventNameOrId: string
): Promise<ApiResponse<BoxOfficeEvent | null>> => {
  const numericId = Number(eventNameOrId);
  if (!Number.isNaN(numericId) && numericId > 0) {
    return getEventById(numericId);
  }

  const events = await getPublicEvents();
  if (events.status !== 1) {
    return { ...events, data: null };
  }

  const normalizedParam = decodeURIComponent(eventNameOrId)
    .toLowerCase()
    .replace(/\s+/g, "");
  const event =
    events.data?.find(
      (item) =>
        item.eventName?.toLowerCase().replace(/\s+/g, "") === normalizedParam
    ) ?? null;

  return { status: event ? 1 : 0, data: event, error: event ? null : "Event not found" };
};

export const getTicketsByEventId = (eventId: number) =>
  apiClient<Ticket[]>(`/api/tickets/${eventId}`, { cache: "no-store" });

export const addTicket = (
  tenantId: string,
  eventId: number,
  payload: Partial<Ticket>
) =>
  apiClient<string>(`/api/tickets/${eventId}`, {
    method: "POST",
    headers: withTenant(tenantId),
    body: JSON.stringify(payload),
  });

export const updateTicket = (
  tenantId: string,
  ticketId: number,
  payload: Partial<Ticket>
) =>
  apiClient<string>(`/api/tickets/${ticketId}`, {
    method: "PUT",
    headers: withTenant(tenantId),
    body: JSON.stringify(payload),
  });

export const getAdminTicketsByEventId = (eventId: number, tenantId: string) =>
  apiClient<Ticket[]>(`/api/tickets/admin/${eventId}`, {
    cache: "no-store",
    headers: withTenant(tenantId),
  });

export const toggleTicketActive = (tenantId: string, ticketId: number) =>
  apiClient<string>(`/api/tickets/toggle_active/${ticketId}`, {
    headers: withTenant(tenantId),
  });

export const bookTicket = (tenantId: string, payload: BookingRequest) =>
  apiClient<BookedTicket>("/api/v1/book", {
    method: "POST",
    headers: withTenant(tenantId),
    body: JSON.stringify(payload),
  });

export const verifyBookingOtp = (
  tenantId: string,
  payload: VerifyBookingOtpRequest
) =>
  apiClient<BookedTicket>("/api/v1/book/verify-otp", {
    method: "PUT",
    headers: withTenant(tenantId),
    body: JSON.stringify(payload),
  });

export const reviewPayment = (tenantId: string, payload: ReviewPaymentRequest) =>
  apiClient<BookedTicket>("/api/v1/book/review-payment", {
    method: "PUT",
    headers: withTenant(tenantId),
    body: JSON.stringify(payload),
  });

export const getUserTickets = (tenantId: string, email: string) =>
  apiClient<BookedTicket[]>(
    `/api/v1/book/user${queryString({ email })}`,
    {
      cache: "no-store",
      headers: withTenant(tenantId),
    }
  );

export const getEventBookings = (tenantId: string, eventId: number) =>
  apiClient<BookedTicket[]>(`/api/v1/book/event/${eventId}`, {
    cache: "no-store",
    headers: withTenant(tenantId),
  });

export const cancelTicket = (
  tenantId: string,
  ticketCode: string,
  reason?: string
) =>
  apiClient<string>(
    `/api/v1/book/cancel/${ticketCode}${queryString({ reason })}`,
    {
      method: "PUT",
      headers: withTenant(tenantId),
    }
  );

export const login = (payload: LoginRequest) =>
  apiClient<JwtAuthResponse>("/api/auth/login", {
    method: "POST",
    body: JSON.stringify(payload),
  });

export const register = (payload: RegisterRequest) =>
  apiClient<JwtAuthResponse | string>("/api/auth/register", {
    method: "POST",
    body: JSON.stringify(payload),
  });

export const verifyEmailOtp = (payload: VerifyEmailOtpRequest) =>
  apiClient<string>("/api/auth/verify/email/otp", {
    method: "PUT",
    body: JSON.stringify(payload),
  });

export const createCompany = (payload: CompanyDetail) =>
  apiClient<CompanyDetail | string>("/api/v1/company/add", {
    method: "POST",
    body: JSON.stringify(payload),
  });

export const updateCompany = (companyId: number, payload: CompanyDetail) =>
  apiClient<CompanyDetail | string>(`/api/v1/company/update/${companyId}`, {
    method: "PUT",
    body: JSON.stringify(payload),
  });

export const deleteCompany = (companyId: number) =>
  apiClient<string>(`/api/v1/company/delete/${companyId}`, {
    method: "DELETE",
  });

export const getCompanyByUserId = (userId: number) =>
  apiClient<CompanyDetail[]>(`/api/v1/company/get/${userId}`, {
    cache: "no-store",
  });

export const addCompanyUser = (
  companyId: number,
  payload: AddUserRequest
) =>
  apiClient<string>(`/api/v1/company/addUser/${companyId}`, {
    method: "POST",
    body: JSON.stringify(payload),
  });

export const getAllUsers = () =>
  apiClient<unknown[]>("/api/user", { cache: "no-store" });

export const getUser = (userId: number) =>
  apiClient<unknown>(`/api/user/${userId}`, { cache: "no-store" });

export const addUser = (payload: AddUserRequest) =>
  apiClient<string>("/api/user/add-user", {
    method: "POST",
    body: JSON.stringify(payload),
  });

export const updateUser = (userId: number, payload: UserProfileUpdate) =>
  apiClient<string>(`/api/user/${userId}`, {
    method: "PUT",
    body: JSON.stringify(payload),
  });

export const deleteUser = (userId: number) =>
  apiClient<string>(`/api/user/${userId}`, { method: "DELETE" });

export const changePassword = (payload: ChangePasswordRequest) =>
  apiClient<string>("/api/user/change-password", {
    method: "PUT",
    body: JSON.stringify(payload),
  });

export const getPricingConfig = () =>
  apiClient<PricingConfig>("/api/super-admin/pricing", { cache: "no-store" });

export const updatePricingConfig = (payload: PricingConfig) =>
  apiClient<PricingConfig | string>("/api/super-admin/pricing", {
    method: "PUT",
    body: JSON.stringify(payload),
  });

export const updateCron = (payload: CronUpdateRequest) =>
  apiClient<string>("/api/cron/update-cron", {
    method: "PUT",
    body: JSON.stringify(payload),
  });

export const submitContactUs = (payload: ContactUs) =>
  apiClient<ContactUs | string>("/contact-us", {
    method: "POST",
    body: JSON.stringify(payload),
  });

export const getContactForms = () =>
  apiClient<ContactUs[]>("/contact-us", { cache: "no-store" });

export const markContactResponded = (id: number) =>
  apiClient<string>(`/contact-us/${id}`, { method: "PATCH" });

export const getAllColumns = () =>
  apiClient<ColumnMaster[]>("/api/column-master", { cache: "no-store" });

export const addColumnValue = (payload: ColumnValue) =>
  apiClient<ColumnValue | string>("/api/column-master/value", {
    method: "POST",
    body: JSON.stringify(payload),
  });

export const getColumnValues = (columnId: number) =>
  apiClient<ColumnValue[]>(`/api/column-master/${columnId}/values`, {
    cache: "no-store",
  });

export const getColumnDropdown = (columnName: string) =>
  apiClient<ColumnValue[]>(
    `/api/column-master/dropdown/${encodeURIComponent(columnName)}`,
    { cache: "no-store" }
  );

export const deleteColumnValue = (valueId: number) =>
  apiClient<string>(`/api/column-master/value/${valueId}`, {
    method: "DELETE",
  });

export const getAssetsByUser = (userId: number) =>
  apiClient<Asset[]>(`/api/asset/by_user/${userId}`, { cache: "no-store" });

export const addAsset = (payload: Asset) =>
  apiClient<Asset | string>("/api/asset/add", {
    method: "POST",
    body: JSON.stringify(payload),
  });

export const deleteAsset = (id: number) =>
  apiClient<string>(`/api/asset/delete/${id}`, { method: "DELETE" });
