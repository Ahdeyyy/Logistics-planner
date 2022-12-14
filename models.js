export class Customer {
  constructor({ id, name, pickupLocation, dropoffLocation }) {
    this.id = id;
    this.name = name;
    this.pickupLocation = pickupLocation;
    this.dropoffLocation = dropoffLocation;
  }

  html() {
    return `
                <tr id="${this.id}" class="draggable" draggable="true" >
                    <td>${this.id}</td>
                    <td>${this.name}</td>
                    <td>${this.pickupLocation}</td>
                    <td>${this.dropoffLocation}</td>
                </tr>
        `;
  }
}

export class Planner {
  constructor({ date }) {
    this.date = date;
    this.slot1 = "";
    this.slot2 = "";
    this.slot3 = "";
    this.slot4 = "";
  }

  html() {
    return `
                <tr id="${this.date.toDateString()}" >
                    <td>${this.date.toDateString()}</td>
                    <td class="drop-target" >${this.slot1}</td>
                    <td class="drop-target">${this.slot2}</td>
                    <td class="drop-target">${this.slot3}</td>
                    <td class="drop-target">${this.slot4}</td>
                </tr>
        `;
  }
}
