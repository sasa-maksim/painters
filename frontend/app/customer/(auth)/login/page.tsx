import CustomerLoginForm from "./form";

const RegisterCustomer = () => {
  return (
    <>
      <h1 className="font-serif text-3xl font-bold text-gray-900 my-2">
        Welcome back
      </h1>
      <p className="font-sans text-gray-600 mb-8">
        Login to book professional painters
      </p>
      <CustomerLoginForm />
    </>
  );
};

export default RegisterCustomer;
