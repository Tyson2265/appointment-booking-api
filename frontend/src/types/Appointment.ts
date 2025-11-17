export interface Appointment {
  appointmentId: number;
  branchId: number;
  branchName: string;
  branchAddress: string;
  confirmationCode: string;
  customerName: string;
  customerContact: string;
  startTime: string; // ISO string
}
