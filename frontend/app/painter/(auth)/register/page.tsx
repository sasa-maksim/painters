import PainterRegisterForm from "./form";

const RegisterPainter = () => {
  return (
    <>
      <h1 className="font-serif text-3xl font-bold text-gray-900 my-2">
        Join as Painter
      </h1>
      <p className="font-sans text-gray-600 mb-8">
        Create your account to start painting for customers
      </p>
      <PainterRegisterForm />
    </>
  );
};

export default RegisterPainter;
