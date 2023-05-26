import { v4 as uuidv4 } from 'uuid'


export default class TicketFull {
    constructor(name, description, date){
        this.id = uuidv4();
        this.name = name;
        this.description = description || '';
        this.status = false;
        this.created = date;

    }
}