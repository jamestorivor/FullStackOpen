import Stat from "./Stat";

const Statistics = ({ stats }) => {
  if (stats.all == 0) {
    return <p>No Feedback Given</p>;
  } else {
    return (
      <table>
        <Stat text="good" val={stats.good}></Stat>
        <Stat text="neutral" val={stats.neutral}></Stat>
        <Stat text="bad" val={stats.bad}></Stat>
        <Stat text="all" val={stats.all}></Stat>
        <Stat text="average" val={stats.average}></Stat>
        <Stat text="positive" val={`${stats.positive}%`}></Stat>
      </table>
    );
  }
};

export default Statistics;
