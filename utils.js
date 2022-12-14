export const filterCustomerList = (customerList, id) => {
  // filter the customer list to remove the customer with the id
  let filteredList = customerList.filter((customer) => customer.id !== id);
  // get the customer with the id
  let customer = customerList.find((customer) => customer.id === id);

  return { filteredList, customer };
};
