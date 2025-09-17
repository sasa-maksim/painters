import CustomerRegisterForm from "./form";

const RegisterCustomer = () => {
  return (
    <>
      <h1 className="font-serif text-3xl font-bold text-gray-900 my-2">
        Join as Customer
      </h1>
      <p className="font-sans text-gray-600 mb-8">
        Create your account to book professional painters
      </p>
      <CustomerRegisterForm />
    </>
  );
};

export default RegisterCustomer;
