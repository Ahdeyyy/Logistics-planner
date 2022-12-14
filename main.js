import { Customer, Planner } from "./models";
import "./style.css";
import { filterCustomerList } from "./utils";

window.addEventListener("load", () => {
  // customer list
  let customers = [];

  // removed customer list
  let removedCustomers = [];
  // planner list
  let plannerItems = [];

  let today = new Date();

  const [day, month, year] = [
    today.getDate(),
    today.getMonth(),
    today.getFullYear(),
  ];

  for (let i = 0; i < 7; i++) {
    plannerItems.push(
      new Planner({
        date: new Date(year, month, day + i),
      })
    );

    customers.push(
      new Customer({
        id: i + 1,
        name: `person ${i + 1}`,
        pickupLocation: `location ${i + 1}`,
        dropoffLocation: `location ${(i % 2) + 2}`,
      })
    );
  }

  // customer table

  let logisticsTable = document.createElement("table");
  let logisticsTableCaption = document.createElement("caption");
  logisticsTableCaption.innerHTML = "Logistics Table";
  logisticsTableCaption.style.fontWeight = "bold";
  logisticsTable.appendChild(logisticsTableCaption);
  logisticsTable.innerHTML += `
  <th>Id</th>
  <th>Name</th>
  <th>Pickup Location</th>
  <th>Dropoff Location</th>
  `;
  // append the header to the logistics table
  // logisticsTable.appendChild(logisticsTableHeader);
  let plannerTable = document.createElement("table");
  let plannerTableCaption = document.createElement("caption");
  plannerTableCaption.innerHTML = "Planner Table";
  plannerTableCaption.style.fontWeight = "bold";
  plannerTable.appendChild(plannerTableCaption);
  plannerTable.innerHTML += `
  <th>Date</th>
  <th>Slot 1</th>
  <th>Slot 2</th>
  <th>Slot 3</th>
  <th>Slot 4</th>
  `;

  // append each customer to the table
  customers.forEach((customer) => {
    logisticsTable.innerHTML += customer.html();
  });
  // append each planner to the table
  plannerItems.forEach((item) => {
    plannerTable.innerHTML += item.html();
  });
  // append the tables to the app div
  document.querySelector("#app").appendChild(logisticsTable);
  document.querySelector("#app").appendChild(plannerTable);

  // get all the draggable elements
  let draggables = document.querySelectorAll(".draggable");
  // get all the drop targets
  let dropTargets = document.querySelectorAll(".drop-target");

  // add event listeners to the draggable elements
  draggables.forEach((draggable) => {
    draggable.addEventListener("dragstart", (e) => {
      // set the data transfer object with the id of the draggable element
      e.dataTransfer.setData("text/plain", draggable.id);
    });
  });

  // add event listeners to the drop targets
  dropTargets.forEach((dropTarget) => {
    dropTarget.addEventListener("dragover", (e) => {
      e.preventDefault();
    });
    dropTarget.addEventListener("drop", (e) => {
      e.preventDefault();
      let id = Number(e.dataTransfer.getData("text/plain"));
      // remove the customer from the customer list
      let { filteredList, customer } = filterCustomerList(customers, id);
      customers = filteredList;

      // append customer to the removed customer list
      removedCustomers.push(customer);

      // remove the customer from the table
      document.getElementById(`${id}`).parentElement.remove();

      e.target.innerHTML = ` 
      ${customer.id}
      `;

      // disable the drop target from accepting any more drops
      e.target.classList.remove("drop-target");

      // we can send the planner item to the server here
    });
  });
  import("./style.css");
});
