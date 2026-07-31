export interface Booking {
  id: string;
  name: string;
  email: string;
  phone: string;
  eventName: string;
  visitDate: string;
  ticketType: string;
  numTickets: number;
  totalPrice: number;
  paymentStatus: string;
}



export function saveBooking(booking: Booking) {
  const bookings = getBookings();
  bookings.push(booking);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(bookings));
}

export function deleteBooking(id: string) {
  const bookings = getBookings().filter((b) => b.id !== id);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(bookings));
}
