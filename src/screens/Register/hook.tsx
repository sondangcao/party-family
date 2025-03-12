export type ReceivedProps = {};

const useRegister = (props: ReceivedProps) => {
  return {
    ...props,
  };
};

export type Props = ReturnType<typeof useRegister>;

export default useRegister;
