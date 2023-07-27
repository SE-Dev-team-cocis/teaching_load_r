import React from "react";

const Trial = () => {
  const inputString = "[4,6,2,4]";

  try {
    // Step 1: Parse the string as a JSON array
    const parsedArray: any[] = JSON.parse(inputString);

    // Step 2: Use the map() function to convert each element to a number
    const arrayOfNumbers: number[] = parsedArray.map((element: any) =>
      Number(element)
    );

    console.log(arrayOfNumbers);
  } catch (error) {
    console.error("Error parsing the string:", error);
  }

  return <div>Trial</div>;
};

export default Trial;
