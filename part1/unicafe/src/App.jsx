import { useState } from "react";
import Title from "../components/Title";
import Button from "../components/Button";
import Statistics from "../components/Statistics";

const App = () => {
  // save clicks of each button to its own state
  const [stats, setStats] = useState({
    good: 0,
    bad: 0,
    neutral: 0,
    all: 0,
    average: 0.0,
    positive: 0.0,
  });

  function calculateAverage(good, bad, netural) {
    return (good - bad) / (good + bad + netural);
  }
  function calculatePositive(good, bad, neutral) {
    return (good / (good + bad + neutral)) * 100;
  }

  return (
    <div>
      <Title text="give feedback"></Title>
      <Button
        onClick={() => {
          const newStats = {
            ...stats,
            good: stats.good + 1,
            all: stats.all + 1,
            average: calculateAverage(stats.good + 1, stats.bad, stats.neutral),
            positive: calculatePositive(
              stats.good + 1,
              stats.bad,
              stats.neutral
            ),
          };
          setStats(newStats);
        }}
        text="good"
      ></Button>
      <Button
        onClick={() => {
          const newStats = {
            ...stats,
            neutral: stats.neutral + 1,
            all: stats.all + 1,
            average: calculateAverage(stats.good, stats.bad, stats.neutral + 1),
            positive: calculatePositive(
              stats.good,
              stats.bad,
              stats.neutral + 1
            ),
          };
          setStats(newStats);
        }}
        text="neutral"
      ></Button>
      <Button
        onClick={() => {
          const newStats = {
            ...stats,
            bad: stats.bad + 1,
            all: stats.all + 1,
            average: calculateAverage(stats.good, stats.bad + 1, stats.neutral),
            positive: calculatePositive(
              stats.good,
              stats.bad + 1,
              stats.neutral
            ),
          };
          setStats(newStats);
        }}
        text="bad"
      ></Button>
      <Title text="statistics"></Title>
      <Statistics stats={stats}></Statistics>
    </div>
  );
};

export default App;
