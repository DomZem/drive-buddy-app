import { auth } from '@/firebase/config';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { Field, Form, Formik, type FormikHelpers } from 'formik';
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
        <section className="flex h-[3.5rem] items-center justify-center gap-x-3 rounded-t-lg bg-rich-black p-2">
          <div className="flex h-full w-10 items-center justify-center rounded-lg bg-blue-600">
            <GiCarSeat className="text-2xl text-white lg:text-3xl" />
          </div>
          <h1 className="text-2xl font-semibold text-white">Drive buddy</h1>
        </section>
        <section className="w-full rounded-lg bg-white shadow-lg md:mt-0 xl:p-0">
          <div className="space-y-4 p-6 sm:p-8 md:space-y-6">
            <h2 className="text-center text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
              Sign in to your account
            </h2>
            <Formik initialValues={initialValues} onSubmit={handleLogin}>
              <Form className="space-y-4 md:space-y-6">
                <div>
                  <label htmlFor="email" className="mb-2 block text-sm font-medium text-gray-900">
                    Your email
                  </label>

                  <Field
                    id="email"
                    name="email"
                    type="email"
                    className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-gray-900 sm:text-sm"
                    placeholder="anakin.skywalker@gmail.com"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="password" className="mb-2 block text-sm font-medium text-gray-900">
                    Password
                  </label>
                  <Field
                    id="password"
                    name="password"
                    type="password"
                    className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-gray-900 sm:text-sm"
                    placeholder="••••••••"
                    required
                  />
                </div>
                <button
                  type="submit"
                  className="w-full rounded-lg bg-blue-600 px-5 py-2.5 text-center text-sm font-medium text-white duration-200 hover:bg-blue-700 focus:outline-none"
                >
                  Sign in
                </button>
              </Form>
            </Formik>
          </div>
        </section>
      </article>
    </main>
  );
};

export default Login;
