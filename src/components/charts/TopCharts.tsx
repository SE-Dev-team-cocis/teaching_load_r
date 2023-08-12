const TopCharts = ({collegeLoad, totalStaff}: any) => {
  return (
    <div className="grid grid-cols-12 gap-4 dashboard">
      <div className="col-span-6 dashboard_card rounded-lg">
        <p>Lecturers progress</p>
        <div>
          <p>Min load: {collegeLoad.min_load}</p>
          <p>Under load: {collegeLoad.under_load}</p>
          <p>Extra load: {collegeLoad.extra_load}</p>
          <p>Total staff: {totalStaff}</p>
        </div>
      </div>
      <div className="col-span-6 dashboard_card rounded-lg">
        <p>Courses summary</p>
      </div>
    </div>
  );
};

export default TopCharts;
