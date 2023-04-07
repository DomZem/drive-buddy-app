import Button from '@/components/atoms/Button/Button';
import Logo from '@/components/atoms/Logo/Logo';
import FormField from '@/components/molecules/FormField/FormField';
import { auth } from '@/firebase/config';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { Form, Formik, type FormikHelpers } from 'formik';
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
      console.log(e);
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
              <FormField label="Email" id="email" name="email" type="email" placeholder="Email" required />
              <FormField
                label="Password"
                id="password"
                name="password"
                type="password"
                placeholder="Password"
                required
              />
              <Button type="sumbmit">Sign in</Button>
            </Form>
          </Formik>
        </section>
      </article>
    </main>
  );
};

export default Login;
