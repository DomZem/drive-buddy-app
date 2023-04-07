import Button from '@/components/atoms/Button/Button';
import FormField from '@/components/molecules/FormField/FormField';
import { auth } from '@/firebase/config';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { Form, Formik, type FormikHelpers } from 'formik';
import { GiCarSeat } from 'react-icons/gi';
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
      const authResult = await signInWithEmailAndPassword(auth, email, password);
      console.log(authResult.user);
      navitage('/lessons');
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <main className="flex h-screen items-center justify-center bg-slate-gray">
      <article className="flex w-full max-w-lg flex-col items-center justify-center px-6 py-8 lg:py-0">
        <header className="flex h-[3.5rem] items-center justify-center gap-x-3 rounded-t-lg bg-rich-black p-2">
          <div className="flex h-full w-10 items-center justify-center rounded-lg bg-blue-600">
            <GiCarSeat className="text-2xl text-white lg:text-3xl" />
          </div>
          <h1 className="text-2xl font-semibold text-white">Drive buddy</h1>
        </header>
        <section className="w-full rounded-lg bg-white p-4 shadow-lg">
          <h2 className="text-center text-xl font-bold text-gray-900 md:text-2xl">Sign in</h2>
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
              <Button type="sumbmit" className="p-2.5">
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
