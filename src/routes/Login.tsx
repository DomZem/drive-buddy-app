import Button from '@/components/atoms/Button/Button';
import InputField from '@/components/atoms/InputField/InputField';
import Logo from '@/components/atoms/Logo/Logo';
import { auth } from '@/firebase/config';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { Form, Formik } from 'formik';
import { motion } from 'framer-motion';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router';
import * as Yup from 'yup';

interface LoginFieldsType {
  email: string;
  password: string;
}

const initialValues = {
  email: '',
  password: '',
};

const Login = () => {
  const navitage = useNavigate();

  const handleLogin = async (values: LoginFieldsType) => {
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
      <motion.article
        className="flex w-full max-w-md flex-col items-center justify-center"
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{
          duration: 0.8,
          delay: 0.5,
          ease: [0, 0.71, 0.2, 1.01],
        }}
      >
        <header className="flex items-center justify-center gap-x-2 rounded-t-lg bg-rich-black p-2 shadow-lg">
          <Logo />
          <h1 className="text-xl font-semibold text-white lg:text-2xl">Drive buddy</h1>
        </header>
        <section className="w-full rounded-lg bg-white p-5 shadow-lg">
          <h2 className="mb-4 text-center text-xl font-semibold lg:text-2xl">Sign in</h2>
          <Formik
            initialValues={initialValues}
            onSubmit={handleLogin}
            validationSchema={Yup.object({
              email: Yup.string().email('Invalid email addresss').required('Required'),
              password: Yup.string().required('Required'),
            })}
          >
            <Form className="flex flex-col gap-y-5">
              <InputField id="email" name="email" type="email" label="Email" />

              <InputField id="password" name="password" type="password" label="Password" />
              <Button className="p-[9px]" type="submit">
                Sign in
              </Button>
            </Form>
          </Formik>
        </section>
      </motion.article>
    </main>
  );
};

export default Login;
