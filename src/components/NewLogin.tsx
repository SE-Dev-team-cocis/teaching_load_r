// import * as yup from "yup";
// import { useFormik } from "formik";

// const NewLogin = () => {
//   const validate = yup.object({
//     username: yup
//       .string()
//       .email("Enter a valid email address")
//       .required("Username is required"),
//     password: yup.string().required("Password is required"),
//   });

//   const { handleSubmit, values, handleChange, errors, touched } = useFormik({
//     initialValues: {
//       username: "",
//       password: "",
//     },
//     onSubmit: (values) => {
//       alert(JSON.stringify(values));
//     },
//     validationSchema: validate,
//   });

//   console.log("touched: ", touched);

//   return (
//     <div>
//       <form action="" onSubmit={handleSubmit}>
//         <div>
//           <label htmlFor="" className="block">
//             Username
//           </label>
//           {/* <input
//             type="text"
//             name="username"
//             value={values.username}
//             onChange={handleChange}
//             className={`focus:outline-none focus:ring-1 focus:ring-green-700 shadow-sm py-2 px-4 bg-white border border-gray focus:border-teal-500 w-full rounded ${
//               errors.username &&
//               touched.username &&
//               "border-red-600 input-error"}`: ""}

//           /> */}
//           <input
//             type="email"
//             name="username"
//             value={values.username}
//             onChange={handleChange}
//             className={touched.username && errors.username ? "input-error" : ""}
//           />

//           {/* <input
//             type="text"
//             name="username"
//             value={values.username}
//             onChange={handleChange}
//             className={`focus:outline-none focus:ring-1 focus:ring-green-700 shadow-sm py-2 px-4 bg-white border border-gray focus:border-teal-500 w-50 rounded
//             ${
//               touched.username &&
//               errors.username &&
//               "border-red-600 input-error"
//             }`}
//             autoComplete="off"
//           /> */}
//           {errors.username && touched.username ? (
//             <span className="text-red-600 block">{errors.username}</span>
//           ) : (
//             ""
//           )}
//         </div>
//         <div>
//           <label htmlFor="" className="block">
//             Password
//           </label>
//           <input
//             type="password"
//             name="password"
//             value={values.password}
//             onChange={handleChange}
//             className={errors.password && touched.password ? "input-error" : ""}
//           />
//           {errors.password ? (
//             <span className="text-red-600 block">{errors.password}</span>
//           ) : (
//             ""
//           )}
//         </div>
//         <button type="submit">Login</button>
//       </form>
//     </div>
//   );
// };

// export default NewLogin;

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
      {(props: FormikProps<Values>) => (
        <Form>
          <MyTextField name="firstName" type="text" label="First Name" />
          <MyTextField name="lastName" type="text" label="Last Name" />
          <MyTextField name="email" type="email" label="Email" />
          <button type="submit">Submit</button>
        </Form>
      )}
    </Formik>
  </div>
);

// const NewLogin = () => {
//   return (
//     <div>NewLogin</div>
//   )
// }

export default NewLogin;
