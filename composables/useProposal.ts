export default function useProposal() {
  const skipProposal = useState<boolean>("skipProposal", () => false);

  return {
    skipProposal,
  };
}
