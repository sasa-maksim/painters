import PainterLoginForm from "./form";

const RegisterPainter = () => {
  return (
    <>
      <h1 className="font-serif text-3xl font-bold text-gray-900 my-2">
        Welcome back, Painter
      </h1>
      <p className="font-sans text-gray-600 mb-8">
        Login to see who&apos;s requesting your services
      </p>
      <PainterLoginForm />
    </>
  );
};

export default RegisterPainter;
