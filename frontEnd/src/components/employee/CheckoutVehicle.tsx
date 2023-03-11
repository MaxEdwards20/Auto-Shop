import { checkUserIsEmployeeAndRedirect } from "../../hooks/validationHooks";

export const CheckoutVehicle = () => {
  checkUserIsEmployeeAndRedirect();
  return <div>Checkout Vehicle Page</div>;
};
