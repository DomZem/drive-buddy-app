import Button from '@/components/atoms/Button/Button';
import InputField from '@/components/atoms/InputField/InputField';
import Logo from '@/components/atoms/Logo/Logo';
import { auth } from '@/firebase/config';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { Form, Formik, type FormikHelpers } from 'formik';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router';

const initialValues = {
  email: '',
  password: '',
};

interface LoginFieldsType {
  email: string;
  password: string;
}

const Login = () => {
  const navitage = useNavigate();

  const handleLogin = async (values: LoginFieldsType, { setSubmitting }: FormikHelpers<LoginFieldsType>) => {
    const email = values.email;
    const password = values.password;
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navitage('/lessons');
    } catch (e) {
      toast.error('Invalid email or password');
    }
  };

  return (
    <main className="flex h-screen items-center justify-center bg-slate-gray p-5">
      <article className="flex w-full max-w-md flex-col items-center justify-center">
        <header className="flex items-center justify-center gap-x-2 rounded-t-lg bg-rich-black p-2 shadow-lg">
          <Logo />
          <h1 className="text-xl font-semibold text-white lg:text-2xl">Drive buddy</h1>
        </header>
        <section className="w-full rounded-lg bg-white p-5 shadow-lg">
          <h2 className="mb-4 text-center text-xl font-semibold lg:text-2xl">Sign in</h2>
          <Formik initialValues={initialValues} onSubmit={handleLogin}>
            <Form className="flex flex-col gap-y-5">
              <InputField id="email" name="email" type="email" label="Email" />
              <InputField id="password" name="password" type="password" label="Password" />

              <Button className="p-[9px]" type="submit">
                Sign in
              </Button>
            </Form>
          </Formik>
        </section>
      </article>
    </main>
  );
};

export default Login;
