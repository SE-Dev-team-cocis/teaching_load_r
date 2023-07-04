const TeachingLoadSummary = () => {
  const teachingLoad = [
    { id: 1, lecturer: "Loor Jacobson", load: 0 },
    { id: 2, lecturer: "Mary Nsabagwa", load: 5 },
    { id: 3, lecturer: "Joseph Balikuddembe", load: 6 },
    { id: 4, lecturer: "Micheal Kizito", load: 10 },
    { id: 5, lecturer: "Milly Nakafuluma", load: 0 },
  ];
  return (
    <div className="card p-3 bg-white ml-3 rounded-lg mr-2 ">
      <div className="px-2 ">
        <p className="mb-4 text-xl font-semibold">Teaching Load Summary</p>

        <div className="flex justify-between items-center px-2">
          <p className="text-lg font-medium">Lecturer</p>
          <p className="text-lg font-medium">Load</p>
        </div>

        <div className="flex justify-center items-left flex-col">
          {teachingLoad.map((teachingLoad) => (
            <div
              key={teachingLoad.id}
              className="flex justify-between items-center px-2"
            >
              <p>{teachingLoad.lecturer}</p>
              <p className="ml-5 text-center pr-4">
                {teachingLoad.load === 0 ? (
                  <span className="text-red-700 ml-5 ">
                    {teachingLoad.load}
                  </span>
                ) : teachingLoad.load < 10 ? (
                  <span className="text-yellow-500 ">{teachingLoad.load}</span>
                ) : (
                  <span className="text-green-700 ">{teachingLoad.load}</span>
                )}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TeachingLoadSummary;
