import Controller from "./api/Controller.js";
import { default as tickets } from "./api/Tickets.js";
import * as http from "http";
import Koa from "koa";
import { koaBody } from "koa-body";
import pkg from "@koa/cors";

const app = new Koa();
const controller = new Controller(tickets);

app.use(pkg());

app.use(
  koaBody({
    urlencoded: true,
    multipart: true,
    json: true,
  })
);

app.use(async (ctx, next) => {
  const { method, id } = ctx.request.query;

  switch (method) {
    case "allTickets":
      try {
        ctx.response.body = controller.getAllTickets();
      } catch (err) {
        console.error(err);
        ctx.status = 500;
        ctx.response.body = 'Internal error. Method "allTickets"';
      }
      return;
    case "createTicket":
      try {
        const { name, description } = ctx.request.body;
        const result = controller.createTicket(name, description);
        ctx.response.body = result;
      } catch (err) {
        console.error(err);
        ctx.status = 500;
        ctx.response.body = 'Internal error. Method "createTicket"';
      }
      return;
    case "ticketByID":
      try {
        ctx.response.body = controller.getTicketsByID(id);
      } catch (err) {
        console.error(err);
        ctx.status = 400;
        ctx.response.body = `${err.message}. Method "ticketById"`;
      }
      return;
    case "editTicket":
      try {
        const { name, description } = ctx.request.body;
        ctx.response.body = controller.editTicket(id, name, description);
      } catch (err) {
        console.error(err);
        ctx.status = 400;
        ctx.response.body = `${err.message}. Method "editTicket"`;
      }
      return;
    case "deleteTicket":
      try {
        ctx.response.body = controller.deleteTicket(id);
      } catch (err) {
        console.error(err);
        ctx.status = 400;
        ctx.response.body = err.message;
      }
      return;
    case "changeStatus":
      try {
        ctx.response.body = controller.changeStatus(id);
      } catch (err) {
        console.error(err);
        ctx.status = 400;
        ctx.response.body = `${err.message}. Method "changeStatus"`;
      }
      return;
    default:
      ctx.response.body = `Method "${method} is not known`;
      ctx.response.status = 404;
      return;
  }
});

const server = http.createServer(app.callback());

const port = 7070;

server.listen(port, (err) => {
  if (err) {
    console.log(err);

    return;
  }
  console.log("Server is listening to " + port);
});
