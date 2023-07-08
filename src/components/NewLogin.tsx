import { useFormik } from "formik";
import { LoginSchema } from "./YupSchemas/schema";

const NewLogin = () => {
  const {
    handleSubmit,
    values,
    handleChange,
    handleBlur,
    errors,
    touched,
    getFieldProps,
  } = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    onSubmit: (values) => {
      console.log(values);
    },
    validationSchema: LoginSchema,
  });

  return (
    <div>
      <form action="" onSubmit={handleSubmit}>
        <div>
          <label htmlFor="" className="block">
            Username
          </label>
          {/* <input
            type="text"
            name="username"
            value={values.username}
            onChange={handleChange}
            className={`focus:outline-none focus:ring-1 focus:ring-green-700 shadow-sm py-2 px-4 bg-white border border-gray focus:border-teal-500 w-full rounded ${
              errors.username &&
              touched.username &&
              "border-red-600 input-error"}`: ""}

          /> */}
          <input
            type="text"
            // name="username"
            {...getFieldProps("username")}
            // value={values.username}
            // onChange={handleChange}
            className={`${
              touched.username && errors.username
                ? "outline-none  p-2 border-2 rounded-md w-1/2 border-red-500 ring-red-500 focus:ring-red-500"
                : "outline-none border-gray-500 p-2 border-2 rounded-md w-1/2 focus:border-teal-500 focus:ring-teal-500"
            }`}
            // onBlur={handleBlur}
          />
          {touched.username && errors.username ? (
            <span className="text-red-500 block">{errors.username}</span>
          ) : (
            ""
          )}
        </div>
        <div>
          <label htmlFor="" className="block">
            Password
          </label>
          <input
            type="password"
            name="password"
            value={values.password}
            onChange={handleChange}
            className={errors.password && touched.password ? "input-error" : ""}
            onBlur={handleBlur}
          />
          {errors.password ? (
            <span className="text-red-600 block">{errors.password}</span>
          ) : (
            ""
          )}
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

// export default NewLogin;

// import { useField, Form, FormikProps, Formik } from "formik";

// interface Values {
//   firstName: string;
//   lastName: string;
//   email: string;
// }

// const MyTextField = ({...props }) => {
//   const [field, meta, helpers] = useField(props);
//   return (
//     <>
//       <label>
//         {label}
//         <input {...field} {...props} />
//       </label>
//       {meta.touched && meta.error ? (
//         <div className="error">{meta.error}</div>
//       ) : null}
//     </>
//   );
// };

// const NewLogin = () => (
//   <div>
//     <h1>My Form</h1>
//     <Formik
//       initialValues={{
//         email: "",
//         firstName: "red",
//         lastName: "",
//       }}
//       onSubmit={(values, actions) => {
//         setTimeout(() => {
//           alert(JSON.stringify(values, null, 2));
//           actions.setSubmitting(false);
//         }, 1000);
//       }}
//     >
//       {({ values, handleChange }: FormikProps<Values>) => (
//         <Form>
//           <MyTextField
//             name="firstName"
//             value={values.firstName}
//             onChange={handleChange}
//             type="text"
//             label="First Name"
//           />
//           <MyTextField name="lastName" type="text" label="Last Name" />
//           <MyTextField name="email" type="email" label="Email" />
//           <button type="submit">Submit</button>
//         </Form>
//       )}
//     </Formik>
//   </div>
// );

// const NewLogin = () => {
//   return (
//     <div>NewLogin</div>
//   )
// }

export default NewLogin;
