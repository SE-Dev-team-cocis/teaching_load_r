type TotalLoadDetails = {
  total: number;
  id: number;
  staffId: number;
  staffName: object;
};

type LoadPops = {
  totalLoad: TotalLoadDetails[];
};

const LoadSummary = ({ totalLoad }: LoadPops) => {
  return (
    <div className="card p-3 bg-white ml-3 rounded-lg mr-2 ">
      <div className="px-2 ">
        <p className="mb-4 text-xl font-semibold">Teaching Load Summary</p>

        <div className="flex justify-between items-center px-2">
          <p className="text-lg font-medium">Lecturer</p>
          <p className="text-lg font-medium pr-3">Load</p>
        </div>

        <div className="list">
          <div className="flex justify-between">
            <div className="flex justify-center items-left flex-col pr-3">
              {totalLoad?.map((lecturer: TotalLoadDetails) => (
                <div
                  key={lecturer.id}
                  className="flex justify-between items-center px-2"
                >
                  <p key={lecturer.id}>
                    {lecturer.staffName.firstName} {lecturer.staffName.lastName}
                  </p>
                </div>
              ))}
            </div>

            <div className="flex justify-center items-center flex-col pr-4">
              {totalLoad?.map((load) => (
                <p key={load.id}>
                  {load.total === 0 ? (
                    <span className="text-red-700 ml-5 ">{load.total}</span>
                  ) : load.total < 10 ? (
                    <span className="text-yellow-500 ">{load.total}</span>
                  ) : (
                    <span className="text-green-700 ">{load.total}</span>
                  )}
                </p>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoadSummary;