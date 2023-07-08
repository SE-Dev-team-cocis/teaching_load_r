import {
  Formik,
  FormikHelpers,
  FormikProps,
  Form,
  Field,
  FieldProps,
} from "formik";

interface MyFormValues {
  firstName: string;
  password: string;
}

const MyInput = () => {
  const initialValues: MyFormValues = {
    firstName: "",
    password: "",
  };
  return (
    <div>
      <h1>My Example</h1>
      <Formik
        initialValues={initialValues}
        onSubmit={(values, actions) => {
          console.log({ values, actions });
          alert(JSON.stringify(values, null, 2));
          actions.setSubmitting(false);
        }}
      >
        <Form>
          <label htmlFor="firstName" className="block">
            First Name
          </label>
          <Field id="firstName" name="firstName" placeholder="First Name" />
          <label htmlFor="password" className="block">
            Password
          </label>
          <Field id="password" name="password" placeholder="Password" />
          <button type="submit">Submit</button>
        </Form>
      </Formik>
    </div>
  );
};

export default MyInput;
