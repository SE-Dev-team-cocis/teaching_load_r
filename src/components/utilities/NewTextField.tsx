import { useField, Form, FormikProps, Formik, useFormik } from "formik";

interface Values {
  firstName: string;
  lastName: string;
  email: string;
}

interface FormikProps {
//   props: FormikProps
label: string
}

const MyTextField = ({ ...props }: FormikProps) => {
  const [field, meta ] = useField<FormikProps>(props);
  return (
    <>
      <label>
        {props.label}
        <input {...field} {...props} />
      </label>
      {meta.touched && meta.error ? (
        <div className="error">{meta.error}</div>
      ) : null}
    </>
  );
};

const NewTextLogin = () => {
     const {values, handleSubmit, handleBlur, handleChange} = useFormik({
       initialValues: {
         firstName: "",
         lastName: "",
         email: "",
       },
       onSubmit: (values) => {
         alert(JSON.stringify(values));
       },
     });
   return (
  <div>
    <h1>My Form</h1>
 
     
        <form onSubmit={handleSubmit}>
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
        </form>
    
  </div>
)};

