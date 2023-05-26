import Ticket from "./Ticket.js";
import TicketFull from "./TicketFull.js";

export default class Controller {
  constructor(data) {
    this.data = data;
  }

  getAllTickets() {
    const ticketsCollection = this.data.map((e) => new Ticket(e));
    return ticketsCollection;
  }

  getTicketsByID(id) {
    if (this.data.some((e) => e.id === id)) {
      return this.data.find((e) => e.id === id);
    }

    throw new Error("ID not found!");
  }

  changeStatus(id) {
    if (this.getTicketsByID(id)) {
      const ticket = this.getTicketsByID(id);
      ticket.status = !ticket.status;
      return { success: true };
    }

    return { success: false };
  }

  createTicket(name, description) {
    const date = +new Date();
    const formatDate = new Date(date).toLocaleString("ru", {
      year: "2-digit",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit"
    })
    const ticket = new TicketFull(
      name,
      description,
      formatDate,
    );
    this.data.push(ticket);
    return ticket;
  }

  editTicket(id, name, description) {
    if (this.getTicketsByID(id)) {
      const ticket = this.getTicketsByID(id);
      ticket.name = name;
      ticket.description = description;
      this.created = +new Date();
      return this.getAllTickets();
    }
  }

  deleteTicket(id) {
    if (this.getTicketsByID(id)) {
      const idx = this.data.findIndex((e) => e.id === id);
      this.data.splice(idx, 1);
      return this.getAllTickets();
    }
  }
}
