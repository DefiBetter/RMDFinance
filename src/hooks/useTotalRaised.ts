export default function useTotalRaised() {
  const target = 30000;
  const raised = 26000;

  return { totalRaised: raised, totalRaisedPercent: (raised * 100) / target, target: target};
}
