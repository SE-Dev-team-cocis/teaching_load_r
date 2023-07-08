export default NewLogin;

import { useField, Form, FormikProps, Formik } from "formik";

interface Values {
  firstName: string;
  lastName: string;
  email: string;
}

const MyTextField = ({ label, ...props }) => {
  const [field, meta, helpers] = useField(props);
  return (
    <>
      <label>
        {label}
        <input {...field} {...props} />
      </label>
      {meta.touched && meta.error ? (
        <div className="error">{meta.error}</div>
      ) : null}
    </>
  );
};

const NewLogin = () => (
  <div>
    <h1>My Form</h1>
    <Formik
      initialValues={{
        email: "",
        firstName: "red",
        lastName: "",
      }}
      onSubmit={(values, actions) => {
        setTimeout(() => {
          alert(JSON.stringify(values, null, 2));
          actions.setSubmitting(false);
        }, 1000);
      }}
    >
      {({ values, handleChange }: FormikProps<Values>) => (
        <Form>
          <MyTextField
            name="firstName"
            value={values.firstName}
            onChange={handleChange}
            type="text"
            label="First Name"
          />
          <MyTextField name="lastName" type="text" label="Last Name" />
          <MyTextField name="email" type="email" label="Email" />
          <button type="submit">Submit</button>
        </Form>
      )}
    </Formik>
  </div>
);

const NewLogin = () => {
  return <div>NewLogin</div>;
};
